# Nav — Language Toggle — Requirements

**Status:** Implemented v1 — Erstellt: 17. Juni 2026 — Umgsetzt: 17. Juni 2026

## Ziel

D bestehendi Language-Toggle-UI (`DE | EN`) in `Nav.astro` funktionell mache: Sprache wechsle changierd d URL (`/de` ↔ `/en`), d aktivi Sprache isch immer links im Toggle, und es git en visueller Swap-Effekt. DE isch d Default-Sprach — d Homepage ladet uf `/de`.

Zielgruppe: Recruiter und Gründer, die entweder Deutsch oder Englisch als Sprach wönd.

---

## URL-Architektur

| Route | Sprach | Verhalte |
|-------|--------|---------|
| `/` | — | Sofort-Redirect zu `/de` |
| `/de` | Deutsch | D eigentlichi Homepage uf Deutsch |
| `/en` | Englisch | D eigentlichi Homepage uf Englisch |

**Astro-Umsetzung:**

```
src/pages/
  de/
    index.astro        → deutschi Homepage
  en/
    index.astro        → englischi Homepage
```

D Redirect-Logik läuft über `astro.config.mjs` (nöd über en separati `index.astro`):

```js
// astro.config.mjs
export default defineConfig({
  redirects: { '/': '/de' },
  ...
});
```

> Grund: `redirects`-Config isch dr zuverlässigi Weg für static Astro-Builds — generiert en Meta-Refresh + canonical-Tag.

---

## Toggle-Verhalten

### Visuell: Aktivi Sprach immer links

D Reihefolg vo de Buttons im `#lang-toggle`-Element wechslet dynamisch per JS.

| Zustand | Toggle-Anzeig | Aktiver Button |
|---------|--------------|----------------|
| DE aktiv | `DE \| EN` | DE (links) |
| EN aktiv | `EN \| DE` | EN (links) |

### Swap-Effekt

Wenn d Sprach gwechslet wird:

1. Dr aktive Button faded/slides raus (`opacity: 0`, `transform: translateX(6px)`, ~100ms)
2. Navigation zur neie URL (`/de` oder `/en`) — DOM-Rebuild passiert beim neue Seitenlade

### CSS-Klasse für aktive Sprach

Dr aktive Button het `data-active` — Tailwind reglet d Farb:
```
data-[active]:bg-brand data-[active]:text-white
```

### JS-Handling (ausschliesslich in `Nav.astro`)

```
<script>
  // Determine active language from the current URL
  const current_lang = location.pathname.startsWith('/en') ? 'en' : 'de';

  // Rebuild toggle DOM so the active language is always on the left
  const lang_toggle = document.getElementById('lang-toggle');
  const btn_de = lang_toggle.querySelector('[data-lang="de"]');
  const btn_en = lang_toggle.querySelector('[data-lang="en"]');
  if (current_lang === 'en') {
    lang_toggle.appendChild(btn_de); // DE was first in HTML — move it to the end
  }
  btn_de.removeAttribute('data-active');
  btn_en.removeAttribute('data-active');
  (current_lang === 'de' ? btn_de : btn_en).setAttribute('data-active', '');

  // Click handler — ignore clicks on the already-active language
  lang_toggle.addEventListener('click', (e) => {
    const btn = e.target.closest('.js-lang');
    if (!btn || btn.dataset.lang === current_lang) return;
    swap_and_navigate(btn.dataset.lang);
  });

  function swap_and_navigate(target_lang) {
    // Slide out the currently active button, then navigate
    if (reduce_motion) { location.href = `/${target_lang}`; return; }
    const active_btn = lang_toggle.querySelector('[data-active]');
    active_btn.style.transition = 'opacity 100ms ease, transform 100ms ease';
    active_btn.style.opacity = '0';
    active_btn.style.transform = 'translateX(6px)';
    setTimeout(() => { location.href = `/${target_lang}`; }, 120);
  }
</script>
```

---

## Übersetzungs-Inhalt

### Speicherort

Einzigi Source of Truth: `src/i18n/translations.ts`

```ts
export const translations = {
  de: { /* ... */ },
  en: { /* ... */ },
} as const;

export type Lang = keyof typeof translations;
export type Translation = (typeof translations)[Lang];
```

### Schlüssel-Struktur (snake_case)

Alli Keys sind snake_case. Überblick alli Sekzione:

| Sektion | Keys |
|---------|------|
| `meta` | `title`, `description` |
| `nav` | `menu_open`, `intro`, `experience`, `work`, `impact`, `ai_workflow`, `faq` |
| `hero` | `label`, `name_label`, `location_label`, `location_value`, `role_label`, `role_value`, `mode_label`, `mode_value`, `status_label`, `status_value`, `prefix`, `sub`, `cta_experience`, `cta_contact`, `scroll` |
| `social_proof` | `heading` |
| `experience` | `label`, `heading`, `work_badge`, `education_badge`, `alignment_role`, `alignment_description`, `alignment_location`, `alignment_link`, `naval_school`, `naval_description`, `naval_location`, `naval_link` |
| `impact` | `label`, `heading`, `subtitle`, `kpis[]` |
| `ai_workflow` | `label`, `heading`, `subtitle`, `optional_badge`, `why_label`, `steps[]` |
| `faq` | `label`, `heading`, `items[]` |
| `mission` | `label`, `subtitle`, `statement`, `badge` |
| `footer` | `role`, `location`, `cv_de`, `cv_en`, `repository`, `built_with` |

### Wie d Übersetzige applied werde

D Komponente kriege `translation` als Astro-Prop. In de Routes:

```astro
---
// src/pages/de/index.astro
import { translations } from '../../i18n/translations';
const translation = translations['de'];
---
<Base lang="de" translation={translation}>
  <Home translation={translation} />
</Base>
```

`Home.astro` distribuiert `translation` an alli Sektions-Komponente.

Kein client-seitiger Text-Swap — alli `data-i18n`-Attribute wurden durch Astro-Props ersetzt.

---

## Ausnahmen — kein Übersetzig bruucht

| Element | Datei | Grund |
|---------|-------|-------|
| Typing-Effekt (`ROLES`-Array: `'Founding Eng'`, `'Software Eng'`, ...) | `Hero.astro` | Englischi Job-Titel sin international standard |
| `Work.astro` Sektion komplett | `Work.astro` | Kein Übersetzigs-Scope |
| Visuelle Demo-Elemente (Typewriter-Text, Terminal-Output, Dateinam `"01-feature.md"`, `checkItems`) | `AiWorkflow.astro` | Technischi/dekorative Inhalte |
| `"Nick Nikolaev"` + `"© 2026 Nick Nikolaev"` | `Footer.astro` | Eigenname + rechtlicher Standard |

---

## `<html lang="">` Attribut

`Base.astro` kriegt `lang` als Prop und setzt s Attribut korrekt:

| Route | `<html lang="">` |
|-------|-----------------|
| `/de` | `lang="de"` |
| `/en` | `lang="en"` |

---

## `<title>` und `<meta name="description">` pro Sprach

| | DE | EN |
|-|----|----|
| `<title>` | `Nick Nikolaev — KI-unterstützter Tech-Leiter` | `Nick Nikolaev — AI-powered Tech Lead` |
| `<meta description>` | `KI-unterstützter Tech-Leiter für Early-Stage-Startups, die schnell ein starkes Produkt bauen und skalieren wollen.` | `AI-powered tech lead for early-stage startups that want to build and scale a strong product fast.` |

---

## Dateistruktur (umgsetzt)

```
src/
  i18n/
    translations.ts          ← einzigi Source of Truth für alle Strings
  pages/
    de/
      index.astro            ← deutschi Homepage
    en/
      index.astro            ← englischi Homepage
  components/
    Home.astro               ← distribuiert translation-Prop an alli Sektione
    Nav.astro                ← JS-Handling für Toggle + Swap-Effekt; akzeptiert lang + translation
    Base.astro               ← akzeptiert lang + translation; setzt html lang, title, meta
    Hero.astro               ← akzeptiert translation-Prop
    SocialProof.astro        ← akzeptiert translation-Prop
    Experience.astro         ← akzeptiert translation-Prop
    Impact.astro             ← akzeptiert translation-Prop
    AiWorkflow.astro         ← akzeptiert translation-Prop (Text); Demo-Panels unverändert
    Faq.astro                ← akzeptiert translation-Prop
    Mission.astro            ← akzeptiert translation-Prop
    Footer.astro             ← akzeptiert lang + translation
    Work.astro               ← kein Prop (Ausnahme)
astro.config.mjs             ← redirects: { '/': '/de' }
```

---

## Fertig wenn

- [x] `/` redirected zu `/de` via `astro.config.mjs`
- [x] `src/pages/de/index.astro` existiert und rendert d deutschi Homepage
- [x] `src/pages/en/index.astro` existiert und rendert d englischi Homepage
- [x] `src/i18n/translations.ts` enthält alli Keys (snake_case, zwei Sprache)
- [x] `Base.astro` akzeptiert `lang`-Prop, setzt `<html lang="">` korrekt
- [x] `Base.astro` setzt `<title>` und `<meta description>` pro Sprach
- [x] `Nav.astro` JS bestimmt aktuelle Sprach us dr URL und baut Toggle korrekt uf (aktivi Sprach links)
- [x] Click uf inaktivi Sprach löst Swap-Animation aus (opacity + translateX, 120ms) und navigiert zur neue URL
- [x] Alli `data-i18n`-Attribute sin durch Astro-Props ersetzt — kein client-seitiger Text-Swap
- [x] Typing-Effekt in `Hero.astro` bliibt unverändert (englischi Rollen-Titel)
- [x] `Work.astro` het kein Übersetzungs-Scope
- [x] Visuelle Demo-Elemente in `AiWorkflow.astro` sin unverändert
- [x] "Nick Nikolaev" und "© 2026 Nick Nikolaev" in `Footer.astro` sin unverändert
- [x] `prefers-reduced-motion`: Swap-Animation deaktiviert, direkte Navigation
