import OpenAI from 'openai';
import { Pinecone } from '@pinecone-database/pinecone';
import config from '../config.js';

const embedding_model = 'text-embedding-3-small';

function parse_args(argv) {
  let lang = 'de';
  let top_k = 5;
  const question_parts = [];

  for (const arg of argv) {
    if (arg.startsWith('--lang=')) {
      lang = arg.slice('--lang='.length);
    } else if (arg.startsWith('--top-k=')) {
      top_k = Number(arg.slice('--top-k='.length));
    } else if (arg === '--help' || arg === '-h') {
      return { help: true };
    } else {
      question_parts.push(arg);
    }
  }

  return {
    help: false,
    lang,
    top_k,
    question: question_parts.join(' ').trim(),
  };
}

function print_help() {
  console.log(`Usage:
  npm run query:kb -- "Was hast du bei Alignment.io gemacht?"
  npm run query:kb -- --lang=en "What did you build at Alignment.io?"
  npm run query:kb -- --lang=de --top-k=8 "Welche Tech-Skills hast du?"
`);
}

async function main() {
  const args = parse_args(process.argv.slice(2));

  if (args.help || !args.question) {
    print_help();
    process.exit(args.help ? 0 : 1);
  }

  const { lang, top_k, question } = args;

  if (lang !== 'de' && lang !== 'en') {
    throw new Error(`Invalid --lang=${lang} (use de or en)`);
  }
  if (!Number.isInteger(top_k) || top_k < 1) {
    throw new Error(`Invalid --top-k=${top_k}`);
  }

  const { api_key: pinecone_api_key, host, index_name } = config.pinecone;
  const { api_key: openai_api_key } = config.openai;

  const openai = new OpenAI({ apiKey: openai_api_key });
  const pinecone = new Pinecone({ apiKey: pinecone_api_key });
  const index = pinecone.index(index_name, host);

  console.log(`Query [${lang}] topK=${top_k}: ${question}\n`);

  const embedding = await openai.embeddings.create({
    model: embedding_model,
    input: question,
  });

  const result = await index.namespace(lang).query({
    vector: embedding.data[0].embedding,
    topK: top_k,
    includeMetadata: true,
  });

  const matches = result.matches ?? [];
  if (matches.length === 0) {
    console.log('No matches.');
    return;
  }

  matches.forEach((match, i) => {
    const score = match.score?.toFixed(4) ?? '?';
    const meta = match.metadata ?? {};
    const title = meta.title || meta.section || '';
    const text = String(meta.text ?? '').slice(0, 400);

    console.log(`--- ${i + 1}. score=${score} id=${match.id}`);
    console.log(`section=${meta.section ?? ''} title=${title}`);
    console.log(text);
    console.log('');
  });
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
