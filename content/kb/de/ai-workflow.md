---
id: ai-workflow
lang: de
section: ai-workflow
source: website
---

# KI-Workflow in der Entwicklung

Strukturierter Prozess — von der Spec bis zum Commit — mit Claude Code und Cursor.

## Spec zuerst

Cursor generiert die Spec-Datei `01-feature.md` mit User Stories (Given/When/Then), Acceptance Criteria, Tech Stack und Constraints.

Warum: Eine KI ohne klare Spec löst das falsche Problem.

## Design Handoff + Iteration

Claude Design generiert eine Visualisierung basierend auf `requirements.md`. Nach abgeschlossener Iteration wird der Handoff-Ordner exportiert.

Warum: Eine einzige Quelldatei verhindert, dass Spec und Design auseinanderlaufen.

## Tests vor Code

Claude Code generiert eine komplette Test-Suite (Unit / Component / E2E) inklusive Edge Cases. Alle Tests schlagen fehl — das ist korrekt.

Warum: Tests definieren «done». Ohne Tests passt die KI den Code an — nicht das Problem.

## Code-Generierung

Claude Code (Agent Mode) implementiert die Lösung gegen die bestehende Test-Suite. Der Prompt enthält: «Ändere die Tests nicht, um sie zu bestehen.»

Warum: Dieser eine Satz verhindert, dass die KI sich selbst betrügt.

## Abnahme via Slash Command

Claude Code führt `/verify docs/specs/YYYY/MM/01-feature.md` aus — prüft, ob alle User Stories abgedeckt und die `CONSTITUTION.md`-Regeln eingehalten sind.

Warum: Grüne Tests ≠ vollständige Lösung.

## Commit & GitHub Push

Commit im Conventional-Commits-Format, Push zu GitHub, CI/CD läuft automatisch durch.

Warum: Nachvollziehbarkeit ist Professionalität.
