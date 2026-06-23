export const translations = {
  de: {
    meta: {
      title: 'Nick Nikolaev — KI-unterstützter Tech-Leiter',
      description:
        'KI-unterstützter Tech-Leiter für Early-Stage-Startups, die schnell ein starkes Produkt bauen und skalieren wollen.',
    },
    nav: {
      menu_open: 'Menü öffnen',
      intro: 'Intro',
      experience: 'Erfahrung',
      work: 'Arbeit',
      impact: 'Auswirkungen',
      ai_workflow: 'KI-Workflow',
      faq: 'FAQ',
    },
    hero: {
      label: '01 — INTRO',
      name_label: 'Name',
      location_label: 'Standort',
      location_value: 'Zürich, CH',
      role_label: 'Rolle',
      role_value: 'Gründungsingenieur',
      mode_label: 'Modus',
      mode_value: 'Festanstellung',
      status_label: 'Status',
      status_value: 'Sofort verfügbar',
      prefix: 'KI-unterstützter',
      sub: 'Erfahrung im Aufbau von <strong>Enterprise-SaaS-Plattformen</strong>, <strong>Echtzeit-Kollaborationssystemen</strong> und <strong>KI-gestützten Anwendungen</strong>.',
      cta_experience: 'Meine Erfahrung',
      cta_contact: 'Kontakt',
      scroll: 'Scrollen zum Entdecken',
    },
    social_proof: {
      heading: 'Entwickelte Software genutzt bei',
    },
    experience: {
      label: '02 — Erfahrung',
      heading: 'Mein Hintergrund',
      work_badge: 'Arbeit',
      education_badge: 'Ausbildung',
      alignment_role: 'Gründungsingenieur',
      alignment_description: 'KI-SaaS für Geschäftsstrategie.',
      alignment_location: 'Remote · StartX, Kalifornien, USA',
      alignment_link: 'Mehr zu meiner Arbeit →',
      naval_school: 'Naval Akademie Nikola Vaptsarov',
      naval_description: 'Fokus: sichere Systeme, Netzwerke, Kryptografie.',
      naval_location: 'Bulgarien',
      naval_link: 'Transcript ansehen ↗',
    },
    work: {
      label: '03 — Arbeit',
      heading: 'Meine Arbeit bei Alignment.io',
      subtitle:
        'Welche Features und Prozesse ich bei Alignment.io von Figma bis Produktion entwickelt habe — jede Karte mit einer kleinen Live-Demo.',
      process_badge: 'Prozess',
      feature_badge: 'Feature',
      features: [
        {
          title: 'Dashboard',
          text: 'Workspace-weiter Dashboard-Arbeitsbereich von Figma-Design bis zum fertigen Feature — für das vierteljährliche Alignment-Tracking der Teams.',
        },
        {
          title: 'Authentifizierung',
          text: 'Authentifizierungs-Flows umgesetzt: Google OAuth, Apple OAuth und SAML SSO für Enterprise-Kunden.',
        },
        {
          title: 'RBAC',
          text: 'Rollenbasierte Zugriffsteuerung — workspace-weit, team-weit und projekt-weit, plus teilbare externe Links.',
        },
        {
          title: 'Suche',
          text: 'Globale Suche powered by ElasticSearch — über alle Nachrichten, Items und Projekte, mit Match-Highlighting.',
        },
        {
          title: 'Release-Verwaltung',
          text: 'QA- und Release-Prozesse aufgebaut; ein 5-köpfiges Team in einem agilen Umfeld geleitet — von Todo über QA zu Done.',
        },
        {
          title: 'KI-Chat-System',
          text: 'Ein Echtzeit-KI-Chat-System entwickelt, das direkt auf den Dashboard-Daten arbeitet — strukturierte Antworten statt bloßem Chat.',
        },
      ],
    },
    impact: {
      label: '04 — Auswirkungen',
      heading: 'Was ich bei Alignment.io erreicht habe',
      subtitle: 'Vier messbare Kennzahlen aus meiner Zeit als Gründungsingenieur.',
      kpis: [
        { value: '1000+', label: 'Nachrichten zugestellt' },
        { value: '100+', label: 'Aktive Nutzer unterstützt' },
        { value: '99.9%', label: 'Plattform-Verfügbarkeit' },
        { value: '50+', label: 'Releases ausgeliefert' },
      ],
    },
    ai_workflow: {
      label: '05 — KI-Workflow',
      heading: 'Wie ich KI in der Entwicklung einsetze',
      subtitle:
        'Strukturierter Prozess — von der Spec bis zum Commit — mit Claude Code und Cursor.',
      optional_badge: 'Optional',
      why_label: 'Warum:',
      steps: [
        {
          title: 'Spec zuerst',
          description:
            'Cursor generiert die Spec-Datei 01-feature.md mit User Stories (Given/When/Then), Acceptance Criteria, Tech Stack und Constraints.',
          why: 'Eine KI ohne klare Spec löst das falsche Problem.',
        },
        {
          title: 'Design Handoff + Iteration',
          description:
            'Claude Design generiert eine Visualisierung basierend auf requirements.md. Nach abgeschlossener Iteration wird der Handoff-Ordner exportiert.',
          why: 'Eine einzige Quelldatei verhindert, dass Spec und Design auseinanderlaufen.',
        },
        {
          title: 'Tests vor Code',
          description:
            'Claude Code generiert eine komplette Test-Suite (Unit / Component / E2E) inklusive Edge Cases. Alle Tests schlagen fehl — das ist korrekt.',
          why: 'Tests definieren «done». Ohne Tests passt die KI den Code an — nicht das Problem.',
        },
        {
          title: 'Code-Generierung',
          description:
            'Claude Code (Agent Mode) implementiert die Lösung gegen die bestehende Test-Suite. Der Prompt enthält: «Ändere die Tests nicht, um sie zu bestehen.»',
          why: 'Dieser eine Satz verhindert, dass die KI sich selbst betrügt.',
        },
        {
          title: 'Abnahme via Slash Command',
          description:
            'Claude Code führt /verify docs/specs/YYYY/MM/01-feature.md aus — prüft, ob alle User Stories abgedeckt und die CONSTITUTION.md-Regeln eingehalten sind.',
          why: 'Grüne Tests ≠ vollständige Lösung.',
        },
        {
          title: 'Commit & GitHub Push',
          description:
            'Commit im Conventional-Commits-Format, Push zu GitHub, CI/CD läuft automatisch durch.',
          why: 'Nachvollziehbarkeit ist Professionalität.',
        },
      ],
    },
    faq: {
      label: '06 — FAQ',
      heading: 'Häufige Fragen',
      items: [
        { question: 'Wann kannst du anfangen?', answer: 'Sofort verfügbar.' },
        {
          question: 'Remote oder vor Ort?',
          answer: 'Vor Ort — deutschsprachige Schweiz. Umzug möglich.',
        },
        { question: 'Festanstellung oder Freelance?', answer: 'Nur Festanstellung.' },
        {
          question: 'Arbeitsberechtigung in der Schweiz?',
          answer: 'EU-Pass — vollständig arbeitsberechtigt in der Schweiz. Kein Sponsoring nötig.',
        },
      ],
    },
    mission: {
      label: '07 — Mission',
      subtitle: 'Warum habe ich dieses Portfolio aufgebaut.',
      statement:
        'Hilf Schweizer Startups dabei, meine Eignung als Softwareentwickler mithilfe eines KI-gestützten Portfolios einzuschätzen.',
      badge: 'Schweizer Startups',
    },
    footer: {
      role: 'Gründungsingenieur',
      location: 'Impact Hub Colab, Zürich',
      cv_de: 'Lebenslauf herunterladen - DE',
      cv_en: 'Lebenslauf herunterladen - EN',
      repository: 'Repository ansehen',
      built_with: 'Entwickelt mit',
    },
  },

  en: {
    meta: {
      title: 'Nick Nikolaev — AI-powered Tech Lead',
      description:
        'AI-powered tech lead for early-stage startups that want to build and scale a strong product fast.',
    },
    nav: {
      menu_open: 'Open menu',
      intro: 'Intro',
      experience: 'Experience',
      work: 'Work',
      impact: 'Impact',
      ai_workflow: 'AI Workflow',
      faq: 'FAQ',
    },
    hero: {
      label: '01 — INTRO',
      name_label: 'Name',
      location_label: 'Location',
      location_value: 'Zurich, CH',
      role_label: 'Role',
      role_value: 'Founding Engineer',
      mode_label: 'Mode',
      mode_value: 'Full-time',
      status_label: 'Status',
      status_value: 'Available now',
      prefix: 'AI-powered',
      sub: 'Experience building <strong>enterprise SaaS platforms</strong>, <strong>real-time collaboration systems</strong>, and <strong>AI-powered applications</strong>.',
      cta_experience: 'My Experience',
      cta_contact: 'Contact',
      scroll: 'Scroll to explore',
    },
    social_proof: {
      heading: 'Built software used at',
    },
    experience: {
      label: '02 — Experience',
      heading: 'My Background',
      work_badge: 'Work',
      education_badge: 'Education',
      alignment_role: 'Founding Engineer',
      alignment_description: 'AI SaaS for business strategy.',
      alignment_location: 'Remote · StartX, California, USA',
      alignment_link: 'More about my work →',
      naval_school: 'Nikola Vaptsarov Naval Academy',
      naval_description: 'Focus: secure systems, networks, cryptography.',
      naval_location: 'Bulgaria',
      naval_link: 'View transcript ↗',
    },
    work: {
      label: '03 — Work',
      heading: 'My Work at Alignment.io',
      subtitle:
        'Features and processes I built at Alignment.io from Figma to production — each card with a small live demo.',
      process_badge: 'Process',
      feature_badge: 'Feature',
      features: [
        {
          title: 'Dashboard',
          text: 'Workspace-wide dashboard from Figma design to shipped feature — for quarterly alignment tracking across teams.',
        },
        {
          title: 'Authentication',
          text: 'Authentication flows built: Google OAuth, Apple OAuth and SAML SSO for enterprise clients.',
        },
        {
          title: 'RBAC',
          text: 'Role-based access control — workspace-wide, team-wide and project-wide, plus shareable external links.',
        },
        {
          title: 'Search',
          text: 'Global search powered by ElasticSearch — across all messages, items and projects, with match highlighting.',
        },
        {
          title: 'Release Management',
          text: 'Built QA and release processes; led a team of 5 in an agile environment — from Todo through QA to Done.',
        },
        {
          title: 'AI Chat System',
          text: 'Built a real-time AI chat system working directly on dashboard data — structured answers instead of plain chat.',
        },
      ],
    },
    impact: {
      label: '04 — Impact',
      heading: 'What I achieved at Alignment.io',
      subtitle: 'Four measurable metrics from my time as a founding engineer.',
      kpis: [
        { value: '1000+', label: 'Messages delivered' },
        { value: '100+', label: 'Active users supported' },
        { value: '99.9%', label: 'Platform uptime' },
        { value: '50+', label: 'Releases shipped' },
      ],
    },
    ai_workflow: {
      label: '05 — AI Workflow',
      heading: 'How I use AI in development',
      subtitle:
        'Structured process — from spec to commit — with Claude Code and Cursor.',
      optional_badge: 'Optional',
      why_label: 'Why:',
      steps: [
        {
          title: 'Spec first',
          description:
            'Cursor generates the spec file 01-feature.md with user stories (Given/When/Then), acceptance criteria, tech stack and constraints.',
          why: 'An AI without a clear spec solves the wrong problem.',
        },
        {
          title: 'Design Handoff + Iteration',
          description:
            'Claude Design generates a visualization based on requirements.md. Once the iteration is complete, the handoff folder is exported.',
          why: 'A single source file keeps spec and design from drifting apart.',
        },
        {
          title: 'Tests before code',
          description:
            'Claude Code generates a complete test suite (unit / component / E2E) including edge cases. All tests fail — that is correct.',
          why: 'Tests define "done". Without tests the AI adapts the code — not the problem.',
        },
        {
          title: 'Code generation',
          description:
            'Claude Code (Agent Mode) implements the solution against the existing test suite. The prompt includes: "Do not change the tests to make them pass."',
          why: 'That single sentence stops the AI from cheating itself.',
        },
        {
          title: 'Acceptance via slash command',
          description:
            'Claude Code runs /verify docs/specs/YYYY/MM/01-feature.md — checking that all user stories are covered and the CONSTITUTION.md rules are followed.',
          why: 'Green tests ≠ complete solution.',
        },
        {
          title: 'Commit & GitHub push',
          description:
            'Commit in Conventional Commits format, push to GitHub, CI/CD runs automatically.',
          why: 'Traceability is professionalism.',
        },
      ],
    },
    faq: {
      label: '06 — FAQ',
      heading: 'Frequently Asked Questions',
      items: [
        { question: 'When can you start?', answer: 'Available immediately.' },
        {
          question: 'Remote or on-site?',
          answer: 'On-site — German-speaking Switzerland. Relocation possible.',
        },
        { question: 'Full-time employment or freelance?', answer: 'Full-time employment only.' },
        {
          question: 'Work authorization in Switzerland?',
          answer: 'EU passport — fully authorized to work in Switzerland. No sponsorship needed.',
        },
      ],
    },
    mission: {
      label: '07 — Mission',
      subtitle: 'Why I built this portfolio.',
      statement:
        'Help Swiss startups assess my fit as a software engineer through an AI-powered portfolio.',
      badge: 'Swiss Startups',
    },
    footer: {
      role: 'Founding Engineer',
      location: 'Impact Hub Colab, Zurich',
      cv_de: 'Download CV - DE',
      cv_en: 'Download CV - EN',
      repository: 'View repository',
      built_with: 'Built with',
    },
  },
} as const;

export type Lang = keyof typeof translations;
export type Translation = (typeof translations)[Lang];
