# Portfolio Knowledge Base

Markdown source for future semantic search / RAG (Pinecone).

## Rules

- **Website** (`src/i18n/translations.ts` + sections) is source of truth for narrative content.
- **CV PDFs** only supply facts missing from the site (dates, tech stack, skills, education grade, languages, impact metrics).
- Do **not** index raw PDFs or HTML. Update these `.md` files, then re-run ingest.
- Keep DE and EN in sync structurally; do not mix languages in one file.

## Layout

```
content/kb/
  de/ … profile, experience, skills, work-alignment, tasks-alignment, faq, mission
  en/ … same filenames
```

## Frontmatter

| Field     | Purpose                          |
|-----------|----------------------------------|
| `id`      | Stable chunk/document id         |
| `lang`    | `de` \| `en` (Pinecone filter)   |
| `section` | Logical section name             |
| `source`  | `website` \| `cv` \| `merged`    |

`source: merged` = website narrative + CV-only facts in one file (no duplicate full CV dump).

## Ingest to Pinecone

Requires `config.js` (gitignored) with `pinecone` + `openai` keys, and an OpenAI account with billing/credits.

```bash
npm run ingest:kb
```

Chunks are upserted into namespaces `de` and `en` (model: `text-embedding-3-small`).

## Test a query

```bash
npm run query:kb -- "Was hast du bei Alignment.io gemacht?"
npm run query:kb -- --lang=en "What skills do you have?"
```

## Chat (retrieve + LLM)

```bash
npm run chat:kb -- "Was hast du bei Alignment.io gemacht?"
npm run chat:kb -- --lang=en --sources "When can you start?"
```
