# Impact Section — Requirements

**Status:** Umgesetzt (v1)

## Ziel

Neui Sektion **«Auswirkungen bi Alignment.io»**: zeigt **4 messbari KPIs** — Resultat, nöd Features (das isch **03 — Arbeit**).

Zielgruppe: Recruiter und Gründer vo Early-Stage-Startups.

Umsetzig: `Impact.astro`, iigbunde in `index.astro` zwüsche Work und FAQ.

## Sektions-Header

- **Label:** `04 — Auswirkungen`
- **H2:** «Was ich bei Alignment.io erreicht habe»
- **Intro:** «Vier messbare Kennzahlen aus meiner Zeit als Gründungsingenieur.»

## Layout

- Sektions-Header: mono-Label + H2 + Intro-Satz
- **4 Karten im Grid:** Desktop 2×2 (`sm:grid-cols-2`), Mobile 1 Spalte
- Pro Karte: **Zahl** (gross) + **Subtitel** — kei Beschribig
- Hintergrund: animierte Aurora-Gradient pro Karte (Brand `#026766`), **konstanti Bewegung** (`animate-aurora` in `global.css`)
- Umsetzig: Tailwind-Utilities (`before:`/`after:`), kei scoped `<style>` in `Impact.astro`
- `prefers-reduced-motion`: `motion-reduce:before:animate-none`

## Inhalt

### 1
- **Zahl:** 1000+
- **Subtitel:** Nachrichte zugestellt

### 2
- **Zahl:** 100+
- **Subtitel:** Aktivi Nutzer unterstützt

### 3
- **Zahl:** 99.9%
- **Subtitel:** Plattform-Verfügbarkeit

### 4
- **Zahl:** 50+
- **Subtitel:** Releases usgliefert

## Integration

| Was | Wert |
|-----|------|
| `id` | `impact` |
| Nav-Link | `/#impact` |
| Komponente | `Impact.astro` |
| Platzierung | zwüsche `<Work />` und `<Faq />` |
| Sektionslabel | `04 — Auswirkungen` |
| FAQ-Label | `05 — FAQ` |

## Nicht-Ziele (v1)

- Kei Beschribig pro Karte
- Kei Charts, kei EN-Übersetzig

## Fertig wenn

- [x] Sektion mit `id="impact"` + `Impact.astro`
- [x] Nav-Link `/#impact` scrollt korrekt
- [x] Label `04 — Auswirkungen`; FAQ wird `05`
- [x] 4 Karten: Zahl + Subtitel (Züridütsch), Grid 2×2 / Mobile 1 Spalte
- [x] Aurora-Gradient-Animation; `motion-reduce` respektiert
- [x] Läsebar uf Mobile, `max-w-3xl`