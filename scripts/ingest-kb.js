import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import matter from 'gray-matter';
import OpenAI from 'openai';
import { Pinecone } from '@pinecone-database/pinecone';
import config from '../config.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const kb_root = path.join(__dirname, '..', 'content', 'kb');
const embedding_model = 'text-embedding-3-small';

/**
 * Split markdown body into chunks on ## headings (keep H1 with first chunk).
 */
function chunk_markdown(body) {
  const trimmed = body.trim();
  if (!trimmed) return [];

  const parts = trimmed.split(/\n(?=## )/);
  return parts.map((part) => part.trim()).filter(Boolean);
}

function chunk_title(text) {
  const match = text.match(/^##\s+(.+)$/m) || text.match(/^#\s+(.+)$/m);
  return match ? match[1].trim() : '';
}

async function load_kb_files() {
  const langs = ['de', 'en'];
  const files = [];

  for (const lang of langs) {
    const dir = path.join(kb_root, lang);
    const names = await readdir(dir);
    for (const name of names) {
      if (!name.endsWith('.md')) continue;
      files.push(path.join(dir, name));
    }
  }

  return files;
}

async function build_records(file_paths) {
  const records = [];

  for (const file_path of file_paths) {
    const raw = await readFile(file_path, 'utf8');
    const { data, content } = matter(raw);
    const lang = data.lang;
    const doc_id = data.id;
    const section = data.section;
    const source = data.source;

    if (!lang || !doc_id || !section) {
      console.warn(`Skip (missing frontmatter): ${file_path}`);
      continue;
    }

    const chunks = chunk_markdown(content);
    chunks.forEach((text, index) => {
      records.push({
        id: `${lang}-${doc_id}-${index}`,
        text,
        metadata: {
          lang,
          section,
          source: source ?? 'unknown',
          doc_id,
          chunk_index: index,
          title: chunk_title(text),
          text,
        },
      });
    });
  }

  return records;
}

async function embed_texts(openai, texts) {
  const response = await openai.embeddings.create({
    model: embedding_model,
    input: texts,
  });

  return response.data
    .sort((a, b) => a.index - b.index)
    .map((item) => item.embedding);
}

async function main() {
  const { api_key: pinecone_api_key, host, index_name } = config.pinecone;
  const { api_key: openai_api_key } = config.openai;

  if (!pinecone_api_key || !host || !index_name || !openai_api_key) {
    throw new Error('Missing pinecone or openai keys in config.js');
  }

  const file_paths = await load_kb_files();
  const records = await build_records(file_paths);

  if (records.length === 0) {
    throw new Error('No KB chunks found');
  }

  console.log(`Loaded ${file_paths.length} files → ${records.length} chunks`);

  const openai = new OpenAI({ apiKey: openai_api_key });
  const pinecone = new Pinecone({ apiKey: pinecone_api_key });
  const index = pinecone.index(index_name, host);

  const batch_size = 64;
  let upserted = 0;

  for (let i = 0; i < records.length; i += batch_size) {
    const batch = records.slice(i, i + batch_size);
    const embeddings = await embed_texts(
      openai,
      batch.map((r) => r.text),
    );

    const by_lang = new Map();
    batch.forEach((record, j) => {
      const lang = record.metadata.lang;
      if (!by_lang.has(lang)) by_lang.set(lang, []);
      by_lang.get(lang).push({
        id: record.id,
        values: embeddings[j],
        metadata: record.metadata,
      });
    });

    for (const [lang, vectors] of by_lang) {
      await index.namespace(lang).upsert({ records: vectors });
      upserted += vectors.length;
    }

    console.log(`Upserted ${upserted}/${records.length}`);
  }

  console.log('Done.');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
