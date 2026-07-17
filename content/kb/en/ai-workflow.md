---
id: ai-workflow
lang: en
section: ai-workflow
source: website
---

# AI workflow in development

Structured process — from spec to commit — with Claude Code and Cursor.

## Spec first

Cursor generates the spec file `01-feature.md` with user stories (Given/When/Then), acceptance criteria, tech stack and constraints.

Why: An AI without a clear spec solves the wrong problem.

## Design Handoff + Iteration

Claude Design generates a visualization based on `requirements.md`. Once the iteration is complete, the handoff folder is exported.

Why: A single source file keeps spec and design from drifting apart.

## Tests before code

Claude Code generates a complete test suite (unit / component / E2E) including edge cases. All tests fail — that is correct.

Why: Tests define "done". Without tests the AI adapts the code — not the problem.

## Code generation

Claude Code (Agent Mode) implements the solution against the existing test suite. The prompt includes: "Do not change the tests to make them pass."

Why: That single sentence stops the AI from cheating itself.

## Acceptance via slash command

Claude Code runs `/verify docs/specs/YYYY/MM/01-feature.md` — checking that all user stories are covered and the `CONSTITUTION.md` rules are followed.

Why: Green tests ≠ complete solution.

## Commit & GitHub push

Commit in Conventional Commits format, push to GitHub, CI/CD runs automatically.

Why: Traceability is professionalism.
