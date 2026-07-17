import OpenAI from 'openai';
import { Pinecone } from '@pinecone-database/pinecone';
import config from '../config.js';

const embedding_model = 'text-embedding-3-small';
const chat_model = 'gpt-4o-mini';
const min_score = 0.35;

function parse_args(argv) {
  let lang = 'de';
  let top_k = 5;
  let show_sources = false;
  const question_parts = [];

  for (const arg of argv) {
    if (arg.startsWith('--lang=')) {
      lang = arg.slice('--lang='.length);
    } else if (arg.startsWith('--top-k=')) {
      top_k = Number(arg.slice('--top-k='.length));
    } else if (arg === '--sources') {
      show_sources = true;
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
    show_sources,
    question: question_parts.join(' ').trim(),
  };
}

function print_help() {
  console.log(`Usage:
  npm run chat:kb -- "Was hast du bei Alignment.io gemacht?"
  npm run chat:kb -- --lang=en --sources "When can you start?"
  npm run chat:kb -- --lang=de --top-k=6 "Welche Skills hast du?"
`);
}

function system_prompt(lang) {
  const language = lang === 'de' ? 'German' : 'English';
  return [
    'You are Nick Nikolaev’s portfolio assistant.',
    'Answer ONLY using the provided context about Nick.',
    'If the context does not contain the answer, say you do not know based on the portfolio knowledge base.',
    'Do not invent employers, dates, skills, or achievements.',
    'Be concise and factual (a few short paragraphs or bullets when helpful).',
    `Reply in ${language}.`,
  ].join(' ');
}

function build_context(matches) {
  return matches
    .map((match, i) => {
      const meta = match.metadata ?? {};
      const score = match.score?.toFixed(3) ?? '?';
      const section = meta.section ?? '';
      const title = meta.title || section;
      const text = String(meta.text ?? '').trim();
      return `[${i + 1}] score=${score} section=${section} title=${title}\n${text}`;
    })
    .join('\n\n');
}

async function main() {
  const args = parse_args(process.argv.slice(2));

  if (args.help || !args.question) {
    print_help();
    process.exit(args.help ? 0 : 1);
  }

  const { lang, top_k, show_sources, question } = args;

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

  console.log(`Chat [${lang}] topK=${top_k}: ${question}\n`);

  const embedding = await openai.embeddings.create({
    model: embedding_model,
    input: question,
  });

  const result = await index.namespace(lang).query({
    vector: embedding.data[0].embedding,
    topK: top_k,
    includeMetadata: true,
  });

  const matches = (result.matches ?? []).filter(
    (match) => (match.score ?? 0) >= min_score,
  );

  if (matches.length === 0) {
    console.log(
      lang === 'de'
        ? 'Keine ausreichend relevanten Quellen gefunden — ich kann das anhand der Knowledge Base nicht beantworten.'
        : 'No sufficiently relevant sources found — I cannot answer from the knowledge base.',
    );
    return;
  }

  if (show_sources) {
    console.log('Sources:');
    matches.forEach((match, i) => {
      const meta = match.metadata ?? {};
      console.log(
        `  ${i + 1}. score=${match.score?.toFixed(4)} section=${meta.section} title=${meta.title || ''}`,
      );
    });
    console.log('');
  }

  const context = build_context(matches);
  const completion = await openai.chat.completions.create({
    model: chat_model,
    temperature: 0.2,
    messages: [
      { role: 'system', content: system_prompt(lang) },
      {
        role: 'user',
        content: `Context:\n<<<\n${context}\n>>>\n\nQuestion: ${question}`,
      },
    ],
  });

  const answer = completion.choices[0]?.message?.content?.trim() ?? '';
  console.log(answer);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
