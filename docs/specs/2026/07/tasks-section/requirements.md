# Aufgaben Section — Requirements

**Status:** Umgesetzt (v1)

## Ziel

Neui Sektion **«Aufgaben bei Alignment.io»**: zeigt **5 Aufgabenbereiche** — was ich konkret gemacht habe, nicht was ich erreicht habe (ersetzt `Impact`).

Zielgruppe: Recruiter und Arbeitgeber, die zuverlässige Ingenieure suchen.

Umsetzung: `Tasks.astro`, eingebunden in `Home.astro` an der Stelle von `<Impact />`.

---

## Sektions-Header

| Feld | Wert |
|------|------|
| **Label** | `04 — Aufgaben` |
| **H2** | «Was ich bei Alignment.io gemacht habe» |
| **Intro** | «Meine Aufgaben und Verantwortlichkeiten als Gründungsingenieur.» |

---

## Layout

- Sektions-Header: mono-Label + H2 + Intro-Satz (identisch zu Impact)
- **5 Karten im Grid:** Desktop `grid-cols-2`, Mobile 1 Spalte — letzte Karte auf Desktop zentriert (`sm:col-span-2 sm:mx-auto sm:max-w-sm`)
- Pro Karte:
  - **Icon** (Lucide Inline-SVG, 28 px, `stroke-width="1.5"`) oben links
  - **Titel** (fett) darunter
  - **Bullet-Liste** mit 3 Aufgaben
- Hintergrund: identische Aurora-Gradient-Animation wie Impact (`animate-aurora`, `before:`/`after:`, Brand `#026766`)
- `prefers-reduced-motion`: `motion-reduce:before:animate-none`
- Umsetzung: Tailwind-Utilities, kein scoped `<style>` in `Tasks.astro`

---

## Inhalt

### Karte 1 — Frontend-Entwicklung

- **Icon:** `Monitor` (Lucide)
- **Titel:** Frontend-Entwicklung
- Frontend-Komponenten entworfen und umgesetzt
- Custom WebSocket-Bibliothek für den Browser entwickelt
- UI-Design mit HTML, CSS und Tailwind umgesetzt

---

### Karte 2 — Backend-Entwicklung

- **Icon:** `Server` (Lucide)
- **Titel:** Backend-Entwicklung
- REST-API-Endpunkte implementiert
- Datenmigrations-Skripte geschrieben
- WebSocket-Server-Bibliothek entwickelt

---

### Karte 3 — Sicherheit

- **Icon:** `Shield` (Lucide)
- **Titel:** Sicherheit
- Middleware-Sicherheitsfunktionen für die API implementiert
- Authentifizierungs-Flows konzipiert und umgesetzt
- Sicherheitsrelevante Code-Reviews durchgeführt

---

### Karte 4 — Datenbank

- **Icon:** `Database` (Lucide)
- **Titel:** Datenbank
- SQL-Abfragen für Produkt-Features geschrieben
- Schema- und Tabellenänderungen mit dem CTO koordiniert
- Abfragen optimiert und Materialized Views eingeführt

---

### Karte 5 — Testing & Release

- **Icon:** `FlaskConical` (Lucide)
- **Titel:** Testing & Release
- Eng mit Manual-QA-Ingenieuren zusammengearbeitet
- CI/CD-Pipelines für die Releaseverwaltung ausgelöst
- Releases in einem agilen Umfeld koordiniert

---

## Integration

| Was | Wert |
|-----|------|
| `id` | `tasks` |
| Nav-Link | `/#tasks` |
| Komponente | `Tasks.astro` |
| Platzierung | ersetzt `<Impact />` — zwischen `<Work />` und `<Faq />` |
| Sektionslabel | `04 — Aufgaben` |
| FAQ-Label | `05 — FAQ` |

---

## Nicht-Ziele (v1)

- Kein Mehrsprachigkeits-Toggle
- Keine Hover-Erweiterung der Bullet-Liste
- Keine Verlinkung zu einzelnen Projekten pro Karte

---

## Fertig wenn

- [x] Sektion mit `id="tasks"` + `Tasks.astro`
- [x] Nav-Link `/#tasks` scrollt korrekt
- [x] Label `04 — Aufgaben`; FAQ bleibt `05`
- [x] 5 Karten: Icon + Titel + 3 Bullets, Grid 2-Spalten / Mobile 1 Spalte
- [x] Letzte Karte auf Desktop zentriert
- [x] Aurora-Gradient-Animation identisch zu Impact; `motion-reduce` respektiert
- [x] Lesbar auf Mobile, `max-w-3xl`
- [x] `<Impact />` in `Home.astro` durch `<Tasks />` ersetzt
- [x] `Impact.astro` gelöscht
