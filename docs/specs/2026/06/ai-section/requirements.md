# AI-Workflow Section — Requirements

**Status:** Implementiert (v1) — Aktualisiert: 15. Juni 2026

## Ziel

Neui Sektion **«Wie ich KI einsetz»**: zeigt Besuchern — vor allem Gründern und Recruitern — meinen **konkreten, repetierbaren Prozess** für Feature-Entwicklung und Bug-Fixing mit KI-Unterstützig. Kein Hype, nur Methode.

Zielgruppe: Recruiter und Gründer vo Early-Stage-Startups, die verstöh wönd, wie ich als Entwickler arbeite.

Umsetzung: `AiWorkflow.astro`, iigbunde in `index.astro` nach `<Impact />`.

---

## Sektions-Header

- **Label:** `05 — KI-Workflow` *(Nummerierung anpassen je nach Platzierung)*
- **H2:** «Wie ich KI in der Entwicklung einsetze»
- **Intro:** «Kein Copy-Paste. Ich folge einem strukturierten Prozess — von der Spec bis zum Commit — mit **Claude Code** und **Cursor** als KI-Tools.»
- **Tool-Badges** *(direkt under em Intro-Satz)*:  
  E horizontali Reihe vo 2 Pill-Badges mit Logo + Name:  
  `[Claude Code Logo] Claude Code` · `[Cursor Logo] Cursor`  
  Stil: subtil, kleini Logos (16×16px), gedämpfti Farb (z. B. `slate-600`), kein Border — numme s Logo und dr Name nebenanand.  
  Kei «Powered by»-Label nötig — d Badges reded für sich.

---

## Layout

- Sektions-Header: mono-Label + H2 + Intro-Satz
- **Schritte als vertikale Timeline** (Desktop: 2 Spalten Label/Inhalt, Mobile: 1 Spalte)
- Pro Schritt: **Nummer** + **Titel** + **kurze Beschreibung** + optionaler Code-Snippet/Callout
- Optionale Schritte erhalten ein Badge «Optional»
- Hintergrund: neutrales `slate-50` oder passend zum bestehenden Theme
- **Jeder Schritt hat eine eigene Web-/Motion-Animation** (CSS scroll-driven animations oder Framer Motion `whileInView`)
- Animatione laufe nur einmal beim Einscrollen — kei Loop
- **Logos:** Claude Code Logo vo [anthropic.com/brand](https://anthropic.com) · Cursor Logo vo [cursor.com](https://cursor.com) — beidi als SVG oder PNG (16×16 / 20×20px)

---

## Inhalt — Schritte

### Schritt 1 — Spec schriibe
**Titel:** Spec zerscht  
**Beschreibig:**  
Bevor ich en einzigi Zile Code schriibe, definier ich s Ziel — und **Claude Code** generiert d Spec-Datei `docs/specs/YYYY/MM/01-feature.md` im richtige Format: User Stories im Given/When/Then-Format, klari Acceptance Criteria, Tech Stack, Constraints und offeni Froge.

**Warum:** E KI ohni klar Spec produziert Code, wo technisch lauft — aber s falsche Problem löst.

**Animation:** Typewriter-Effekt — dr Dateiname `01-feature.md` wird Buchstabe für Buchstabe iigschriibe, mit emene blinkende Cursor am End.

---

### Schritt 2 — Claude Design Handoff *(Optional)*
**Titel:** Design Handoff + Iteration  
**Badge:** `Optional — nur wenn UI-Design nötig`  
**Beschreibig:**  
Wenn d Komponente es durchdachts visuells Design bruucht, nutzi ich **Claude** mit em Claude-Design-Tool — es generiert e `design.md` mit dr exakte Component-Struktur, Props, States und Tailwind-Klasse. Danach iterier ich in **Cursor** bis s Design stimmt. Dr Inhalt vo `design.md` wird in `01-feature.md` integriert, sodass alles in eire einzige Datei zämmegfüehrt isch. `design.md` wird aschliessend glöscht.

**Warum:** E einzigi Quelldatei pro Feature verhindert, dass Spec und Design usananderlaufe. Für pur Logik-Features faut dä Schritt weg.

**Animation:** Split-Reveal — links erschint e «Raw Prompt»-Box, rechts faded e Design-Card rii (`scale(0.95) → 1` + opacity). Beidi Elemänt animierent sich gleichziitig rii.

---

### Schritt 3 — Tests schriibe (vor em Code)
**Titel:** Tests vor Code  
**Beschreibig:**  
Ich beschriibe d Aforderige — **Claude Code** generiert e kompletti Test-Suite, wo alli User Stories us `01-feature.md` abdeckt — inklusive Edge Cases (leeri Felder, Netzwerkfehler, Grenzwärt). Tests lande in `src/components/__tests__/` oder `src/__tests__/` und chönd Unit-, Component- oder E2E-Tests sii — je nach Komplexität vom Feature. Alli Tests schlagets fähl. Das isch korrekt.

**Warum:** Tests definierent «done». Ohni Tests passt d KI de Code a — nöd s Problem.

**Animation:** Zile-für-Zile Code-Reveal — d Testfunktione blendent nacheinander ii (staggered, ~80ms pro Zile). Alli Tests am End rot markiert mit Label `FAIL` — wil das korrekt isch.

---

### Schritt 4 — Code generiere (gege Tests)
**Titel:** Code-Generierig  
**Beschreibig:**  
**Cursor** (Agent Mode) implementiert d Lösig gege d bestehendi Test-Suite. Dr entscheidende Satz im Prompt: *«Ändere d Tests nöd, um sie z bestah.»* Iteration lauft, bis alli Tests grüen sind.

**Warum:** Dä eine Satz verhindert, dass d KI sich sälber betrügt.

**Animation:** Animierter Progress-Indikator — e schmali Linie lauft vo links nach rechts dure (symbolisiert d Generierig). Derzue es Terminal-Fenster wo Code schnell durchscrollt mit Blur-Effekt.

---

### Schritt 5 — Verifiziere
**Titel:** Abnahme via Slash Command  
**Beschreibig:**  
Nach grüene Tests führt **Claude Code** de Custom Slash Command `/verify` us:

```
/verify docs/specs/2026/06/01-feature.md
```

Dr Command isch definiert in `.claude/commands/verify.md` und prüeft automatisch: Sind alli User Stories us dr Spec abgedeckt? Sind d Projekt-Regeln us `CONSTITUTION.md` iigehaut (Accessibility, keni Inline-Styles, Error States)?

**Warum:** Grüeni Tests ≠ vollständigi Lösig. Dr `/verify`-Command schliesst d Lücke systematisch — ohni dass ich manuell nachdenke mues, was z prüefe isch.

**Animation:** Staggered Checkmarks — e Liste vo User Stories wo nacheinander mit emene grüene Häkli abghakt wärde (~150ms Verzögerig pro Punkt).

---

### Schritt 6 — Shippe
**Titel:** Commit & GitHub Push  
**Beschreibig:**  
Commit im Conventional-Commits-Format (`feat(feedback): add public feedback widget with rate limiting`), Push zu **GitHub**, CI/CD lauft automatisch dure — fertig. Dr gsamt Prozess isch in dr Spec-Datei dokumentiert — für mich und für jede, wo nach mir chunnt.

**Warum:** Nachvollziehbarkeit isch Professionalität.

**Animation:** Git-Branch-Visualisierig — e eifachi SVG-Animazion wo e Dot vo `main` übers Commit-Symbol bis zu `origin/main` lauft. Derzue es kurzes Konfetti-Burst wenn dr Push erfolgriich isch.

---

## Seiteninhalt — Kurze Einleitung (unter dem Header)

> «KI ist für mich kein Autopilot. Ich steuere den Prozess — die KI beschleunigt die Ausführung. Der Unterschied liegt in der Spec, den Tests und dem Verification-Schritt. Hier ist, wie das konkret aussieht.»

---

## Integration

| Was | Wert |
|-----|------|
| `id` | `ai-workflow` |
| Nav-Link | `/#ai-workflow` |
| Komponente | `AiWorkflow.astro` |
| Platzierung | nach `<Impact />`, vor `<Faq />` |
| Sektionslabel | `05 — KI-Workflow` *(oder anpassen)* |

---

## Zusätzliche Dateien

### `.claude/commands/verify.md`
Custom Slash Command, der bei `/verify docs/specs/YYYY/MM/01-feature.md` ausgelöst wird.  
Prüft:
- Alle User Stories aus der angegebenen Spec-Datei abgedeckt?
- Alle Regeln aus `CONSTITUTION.md` eingehalten?
- Gibt eine strukturierte Liste von offenen Punkten oder «All checks passed» zurück.

---

## Nicht-Ziele (v1)

- Kein Live-Demo-Widget
- Kein interaktiver Prompt-Generator
- Keine Code-Beispiele inline (zu viel visuelles Gewicht für v1)
- Keine englische Übersetzung

---

## Fertig wenn

- [x] Sektion mit `id="ai-workflow"` + `AiWorkflow.astro`
- [x] `AiWorkflow.astro` platziert nach `<Impact />` in `index.astro`
- [x] Nav-Link `/#ai-workflow` scrollt korrekt
- [x] Alle Schritte mit Titel + Beschreibung sichtbar
- [x] Schritt 2 trägt Badge «Optional»
- [~] Schritt 3 erwähnt Unit / Component / E2E Tests und `src/components/__tests__/` — finale Copy nennt nur „Unit / Component / E2E", ohne Pfadangabe
- [x] Schritt 5 zeigt `/verify`-Command mit Beispiel-Pfad
- [ ] `.claude/commands/verify.md` existiert und ist dokumentiert — Datei noch nicht angelegt
- [x] Mobile-Layout: 1 Spalte, lesbar
- [~] Einleitung über den Schritten vorhanden — separates Einleitungs-Zitat wurde im finalen Design in den einzigen Intro-Satz im Header konsolidiert
- [x] Sektionslabel + H2 + Intro-Satz korrekt
- [x] Claude Code und Cursor sind in dr Intro und de relevante Schritte erwähnt
- [x] Tool-Badges (Claude Code + Cursor Logo + Name) sind under em Intro-Satz sichtbar
- [x] Jeder Schritt het e eigeti Web-/Motion-Animation definiert und implementiert
- [~] Animatione laufe nur einmal biim Iiscrole (kei Loop) — Reveal läuft einmalig (IntersectionObserver + `data-played`); Step-4-Terminal-Roll läuft bewusst als kontinuierliche Ambient-Loop weiter
