# Work Section — Requirements

**Status:** v2 — Animation-Redesign (kein Bild, inline Demo-Panel)

## Ziel

Neui Sektion **«Mini Arbeit bi Alignment.io»** uf de Startsite: zeigt, **welchi Features und Prozäss** Nick bi Alignment.io entwicklet het — d Firma sälber blibt i **02 — Erfahrung**.

Zielgruppe: Recruiter und Gründer vo Early-Stage-Startups.

`Experience.astro` verlinkt uf `#work` — die Sektion erfüllt die Erwartig.

Umsetzig: `Work.astro`, iigbunde in `index.astro` zwüsche Experience und FAQ.

---

## Was sich ändert (v1 → v2)

### 1. Onscroll-Effekt — genau wie `AiWorkflow.astro`

Jede Karte (`.work-card`) startet unsichtbar und rutscht bi Sichtbarkeit i:

```css
.work-card {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity .55s ease, transform .55s cubic-bezier(.2,.7,.3,1);
}
.work-card.is-in {
  opacity: 1;
  transform: none;
}
```

`IntersectionObserver` — gleichi Konfig wie AiWorkflow:

```js
const io = new IntersectionObserver((entries) => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    const card = e.target;
    card.classList.add('is-in');
    if (!card.dataset.played) { card.dataset.played = '1'; playDemo(card); }
    io.unobserve(card);
  }
}, { threshold: 0.2, rootMargin: '0px 0px -12% 0px' });

document.querySelectorAll('.work-card').forEach((c) => io.observe(c));
```

One-shot: Animation spielt nur einmal, wenn die Karte zum ersten Mal sichtbar wird.

### 2. Kein Bild (`<img>`) mehr — stattdessen inline Demo-Panel

Statt `<img src="..." />` kriegt jede Karte ein `<div aria-hidden="true" class="work-demo">` — ein animiertes HTML/SVG-Panel, das das jeweilige Feature visuell abstrahiert.

Das Panel wird mit `scale(0.95) → scale(1)` (plus `opacity 0 → 1`) als Teil der Karten-Entrance animiert.

```css
.work-demo {
  opacity: 0;
  transform: scale(0.95);
  transition: opacity .5s ease .1s, transform .5s cubic-bezier(.2,.7,.3,1) .1s;
}
.work-card.is-in .work-demo {
  opacity: 1;
  transform: scale(1);
}
```

---

## Inhalt + Animations-Design

**v1: nur Alignment.io — 5 Features + 1 Prozess**

### 1. Dashboard (Feature)

**Bild-Idee (Referenz):** `/assets/images/work/dashboard.png`

Das Bild zeigt eine Tabelle mit Teams (Exec, Product, Design, Marketing, Social Media, Cold Outreach), Spalten für SWOT-Scores, OKR-Fortschrittsbalken (40.4%, 62.4%, 65.4%, 30.8%, 100%) und Bar-Charts für "Top 6 weekly".

**Demo-Panel-Animation:**

```
┌─────────────────────────────────────────┐
│ Teams          OKR Score    Top 6       │
│ ──────────────────────────────────────  │
│ ▶ Exec    ██████░░░░  40%  ▁▃▅▇▆▄       │
│   Product ████████░░  62%  ▂▄▆█▅▃       │
│   Design  █████████░  65%  ▁▂▅▇█▆       │
│   Mktg    █████░░░░░  30%  ▃▄▃▅▄▂       │
└─────────────────────────────────────────┘
```

Animationsschritte (spielen bei `playDemo`):
1. **Zeilen** erscheinen gestaffelt (stagger 80 ms/Zeile) mit `opacity 0→1 + translateY(6px)→0`
2. **OKR-Balken** füllen sich von 0% auf ihren Zielwert (`width: 0 → X%`, `transition: width 1.2s cubic-bezier(.45,.05,.2,1)`, stagger 120 ms)
3. **Prozent-Zahlen** zählen von 0 auf den Zielwert hoch (requestAnimationFrame-Counter, ~600 ms)
4. **Mini-Bar-Charts** wachsen von Höhe 0 auf volle Höhe (stagger pro Balken 40 ms)

CSS-Klassen: `.wk-dash-row`, `.wk-dash-fill`, `.wk-dash-num`, `.wk-bar`

### 2. Authentifizierung (Feature)

**Bild-Idee (Referenz):** `/assets/images/work/authentication.png`

Das Bild zeigt ein Signup-Formular mit «Sign up with Google», «Sign up with Apple» und «or continue with SAML SSO».

**Demo-Panel-Animation:**

```
┌──────────────────────────────┐
│     🔷 ALIGNMENT              │
│                               │
│  [G] Sign in with Google      │
│  [🍎] Sign in with Apple     │
│  ─── or ───                   │
│  [→] Continue with SAML SSO  │
│                               │
│  ✓ Authenticated              │
└──────────────────────────────┘
```

Animationsschritte:
1. Logo faded in (opacity 0→1, 200 ms)
2. OAuth-Buttons erscheinen gestaffelt (stagger 120 ms, translateY(6px)→0)
3. SAML-SSO-Link erscheint (delay 400 ms)
4. «✓ Authenticated»-Badge poppt rein (`scale(0.8)→1`, grüner Hintergrund, delay 700 ms)

CSS-Klassen: `.wk-auth-logo`, `.wk-auth-btn`, `.wk-auth-success`

### 3. RBAC (Feature)

**Bild-Idee (Referenz):** `/assets/images/work/rbac.png`

Das Bild zeigt eine «Add Project Members»-UI mit User-Zeilen (Nick Nikolaev — project owner, AI — Full project access) und einem «Shareable external link»-Toggle.

**Demo-Panel-Animation:**

```
┌──────────────────────────────────────────┐
│ Add Project Members          [Invite]    │
│ ─────────────────────────────────────── │
│ 👤 Nick Nikolaev   [project owner    ▾] │
│ 🤖 AI              [full project     ▾] │
│ 👤 Sara M.         [view only        ▾] │
│                                          │
│ 🔗 External link   [OFF ▸ ON]           │
└──────────────────────────────────────────┘
```

Animationsschritte:
1. Header-Zeile + Invite-Button erscheinen (opacity 0→1, 150 ms)
2. User-Zeilen erscheinen gestaffelt (stagger 110 ms, translateX(-6px)→0)
3. Rollen-Badges «locken» sich ein: kurzer Flicker (2× opacity-pulse) dann stabil (delay 400 ms)
4. Toggle «OFF→ON» flippt animiert (delay 800 ms)

CSS-Klassen: `.wk-rbac-row`, `.wk-rbac-badge`, `.wk-rbac-toggle`

### 4. Suche (Feature)

**Bild-Idee (Referenz):** `/assets/images/work/search.png`

Das Bild zeigt ein Suchfeld mit «test» als Query und ein Ergebnis «Exec | Q2 2026 OKR Apple» mit gehighlightetem «test»-Text.

**Demo-Panel-Animation:**

```
┌───────────────────────────────────────┐
│ 🔍 [e][x][e][c]█               ✕     │
│ ─────────────────────────────────     │
│ All  Projects  Messages  Items        │
│                                       │
│ N  Exec | Q2 2026 OKR Apple           │
│    Ist die Software stabil?           │
│    Nick Nikolaev • 13 days ago        │
└───────────────────────────────────────┘
```

Animationsschritte:
1. Suchfeld erscheint (scale 0.97→1, opacity 0→1, 200 ms)
2. Typewriter-Effekt: «exec» wird Zeichen für Zeichen getippt (14 ms/Zeichen, Caret blinkt)
3. Tabs erscheinen (stagger 60 ms, opacity 0→1)
4. Ergebnis-Zeile fährt rein (translateY(8px)→0, opacity 0→1, delay 480 ms)
5. Query-Match «exec» leuchtet auf (background-color transparent→brand/20, delay 600 ms)

CSS-Klassen: `.wk-search-input`, `.wk-search-type`, `.wk-search-result`, `.wk-search-highlight`

### 5. Release-Verwaltung (Prozess)

**Bild-Idee (Referenz):** `/assets/images/work/kanban.png`

Das Bild zeigt 3 Kanban-Spalten (Todo, In Progress, Done) als abstrakte Rechtecke — Todo weiss, In Progress hellblau, Done hellgrün.

**Demo-Panel-Animation:**

```
┌───────┐  ┌───────┐  ┌───────┐
│ TODO  │  │  QA   │  │  ✓    │
│ ───── │  │ ───── │  │ ───── │
│ 📋 #1 │  │ 📋 #2 │  │ 📋 #3 │
│ 📋 #4 │  │       │  │ 📋 #5 │
│       │  │       │  │ 📋 #6 │
└───────┘  └───────┘  └───────┘
```

Animationsschritte:
1. Spalten-Header erscheinen gestaffelt (stagger 100 ms, opacity 0→1)
2. Karten erscheinen in TODO und QA (stagger 80 ms, translateY(4px)→0)
3. Eine Karte «wandert» von QA → Done: `translateX(0→col-width)`, dann in Done-Spalte eingeblendet (delay 600 ms)
4. Done-Spalte bekommt grünen Hintergrund-Flush (`background-color` kurz aufleuchten, delay 900 ms)

CSS-Klassen: `.wk-kb-col`, `.wk-kb-card`, `.wk-kb-moving`

### 6. KI-Chat-System (Feature)

**Bild-Idee (Referenz):** `/assets/images/work/chat.png`

Das Bild zeigt das Alignment-Dashboard mit einem AI-Chat-Sidebar rechts: eine Frage «Who are the top 12 US consulting firms?» und eine strukturierte AI-Antwort.

**Demo-Panel-Animation:**

```
┌──────────────────┐ ┌────────────────┐
│ OKR Dashboard    │ │ AI  12:54 PM   │
│                  │ │ ─────────────  │
│ ████ 79%         │ │ 💬 Who are...? │
│ ████ 82%         │ │                │
│ ████ 85%         │ │ The Big 3:     │
│                  │ │ • McKinsey     │
│                  │ │ • BCG          │
│                  │ │ • Bain & Co.   │
└──────────────────┘ └────────────────┘
```

Animationsschritte:
1. Linkes Panel (Dashboard-Vorschau) faded in (opacity 0→1, scale 0.97→1, 300 ms)
2. Chat-Sidebar fährt von rechts rein (translateX(12px)→0, opacity 0→1, delay 200 ms)
3. User-Nachricht erscheint (opacity 0→1, delay 400 ms)
4. Typing-Indicator erscheint (3 Punkte animiert: bouncing dots, delay 600 ms)
5. AI-Antwort-Zeilen erscheinen gestaffelt (stagger 80 ms, delay 900 ms)
6. Typing-Indicator verschwindet sobald erste Antwortzeile erscheint

CSS-Klassen: `.wk-chat-sidebar`, `.wk-chat-msg`, `.wk-chat-typing`, `.wk-chat-reply`

---

## Layout-Änderungen (v1 → v2)

| Aspekt | v1 | v2 |
|--------|----|----|
| Bild | `<img>` 160×240 px seitlich | kein Bild |
| Demo-Panel | — | `<div aria-hidden="true">` mit inline HTML-Animation, Höhe ~140–160 px, oben in der Karte |
| Karten-Layout | `sm:flex-row` (Bild links, Text rechts) | `flex-col` (Demo oben, Text unten) |
| Scroll-Reveal | keins | wie AiWorkflow: `opacity/translateY` per IntersectionObserver |
| Entrance | — | `scale(0.95)→1` fürs Demo-Panel (leicht verzögert zur Karte) |

---

## Tech Stack

Logos under `/assets/logos/tech/` (Simple Icons; AWS vo Devicon).

| Technologie | Logo |
|-------------|------|
| Node.js | `/assets/logos/tech/nodejs.svg` |
| MySQL | `/assets/logos/tech/mysql.svg` |
| AWS | `/assets/logos/tech/aws.svg` |
| Git | `/assets/logos/tech/git.svg` |
| Docker | `/assets/logos/tech/docker.svg` |
| JavaScript | `/assets/logos/tech/javascript.svg` |
| HTML | `/assets/logos/tech/html.svg` |
| CSS | `/assets/logos/tech/css.svg` |
| Tailwind | `/assets/logos/tech/tailwind.svg` |

*Nicht i v1/v2:* Postgres, MSSQL, Snowflake, SQL — bewusst weggloh.

---

## Fertig wenn

- [x] Sektion uf `index.astro` mit `id="work"` + `Work.astro`-Komponente
- [x] Überschrift «Mini Arbeit bi Alignment.io»; Untertitel Features + Prozäss
- [x] Sektionslabel: `03 — ARBEIT`; FAQ wird `04`
- [x] Nav-Link zu `/#work` in `Nav.astro`
- [x] Link «Mehr zu meiner Arbeit →» scrollt korrekt
- [ ] Kein `<img>` mehr — jede Karte het e animiertes Demo-Panel (`aria-hidden`)
- [ ] Scroll-Reveal genau wie `AiWorkflow.astro` (IntersectionObserver, `.is-in`, one-shot)
- [ ] Scale-Entrance fürs Demo-Panel (`scale(0.95)→1`)
- [ ] Dashboard: Zeilen-Stagger + Balken-Fill + Zahl-Counter + Mini-Bar-Charts
- [ ] Authentifizierung: OAuth-Buttons gestaffelt + SAML + Success-Badge
- [ ] RBAC: User-Zeilen gestaffelt + Rollen-Lock + Toggle-Flip
- [ ] Suche: Typewriter-Query + Tabs + Ergebnis + Highlight
- [ ] Release-Verwaltung: Kanban-Spalten + Karte wandert → Done
- [ ] KI-Chat-System: Split-Panel + Chat-Messages + Typing-Indicator
- [x] Jede Tech-Stack-Eintrag het sis Logo
- [x] Release-Verwaltig als «Prozess» markiert, Rest als «Feature»
- [x] Läsebar uf Mobile, Ton wie Rest vom Portfolio
- [ ] `prefers-reduced-motion`: alli Animationen deaktiviert, Endstate direkt gsetzt
