// ---------------------------------------------------------------------------
// All site copy lives here. Edit text freely without touching layout code.
// ---------------------------------------------------------------------------

export const NAV = {
  links: [
    { label: "Product", to: "/product" },
    { label: "Team", to: "/team" },
    { label: "About", to: "/about" },
    { label: "News", to: "/news" },
    { label: "Contact", to: "/contact" },
  ],
  cta: "Request a pilot",
};

// Anchor links shown on the home page hero area only.
export const HOME_ANCHORS = [
  { label: "Problem", href: "#problem" },
  { label: "Solution", href: "#solution" },
  { label: "Why Finland", href: "#why-finland" },
];

export const HERO = {
  headline: "Guardian beneath the surface.",
  subheadline:
    "Structural health monitoring for marine and port infrastructure — built for ice and cold water.",
  supporting:
    "Continuous sensors and physics-based models keep watch on your quays, foundations and hulls — instead of a diver every few years.",
  primaryCta: "Request a pilot",
  secondaryCta: "See how it works",
};

export const PROBLEM = {
  id: "problem",
  title: "Damage you cannot see",
  intro:
    "Marine structures degrade quietly, below the waterline, between inspections.",
  columns: [
    {
      key: "fatigue",
      title: "Fatigue",
      text: "Repeated wave and ice loads create micro-cracks that grow silently for years.",
    },
    {
      key: "corrosion",
      title: "Corrosion",
      text: "Salt water eats steel below the waterline, unseen.",
    },
    {
      key: "ice",
      title: "Ice loads",
      text: "Baltic winter ice pushes and grinds against structures every year.",
    },
  ],
  stats: [
    {
      figure: "every 3–5 years",
      text: "Typical diver inspection interval. Between inspections, owners are blind.",
    },
    {
      figure: "€ millions",
      text: "The cost of one unplanned failure or closure.",
    },
  ],
};

export const SOLUTION = {
  id: "solution",
  title: "Continuous monitoring, powered by real physics",
  intro:
    "A permanent, quiet watch on your structure — from sensor to decision.",
  steps: [
    {
      key: "sense",
      title: "Sense",
      text: "Off-the-shelf sensors on the structure, streaming 24/7 — strain, vibration, tilt.",
    },
    {
      key: "model",
      title: "Model",
      text: "A digital twin built on fluid–structure interaction and fatigue models — the core IP.",
    },
    {
      key: "act",
      title: "Act",
      text: "Live condition, remaining-life estimate, and early alerts — as a subscription.",
    },
  ],
  quote: {
    text: "“Section B needs repair within 18 months — the rest is healthy.”",
    caption: "What you hear from Vellamo — plain answers, grounded in physics.",
  },
};

export const WHY_FINLAND = {
  id: "why-finland",
  title: "Built where the sea freezes",
  paragraphs: [
    "Large incumbents build expensive, project-based monitoring systems for oil and gas. Ice is a footnote in their load models — if it appears at all.",
    "Vellamo is different by design: a focused, affordable subscription built specifically for cold-water and ice-load conditions. Ice–structure interaction in Baltic and Nordic waters is our specialty — the load case most competitors ignore.",
    "It is the hardest condition your structure faces every winter. It is the first thing our models were built for.",
  ],
};

export const WHO_FOR = {
  id: "who-for",
  title: "Who it's for",
  cards: [
    {
      key: "ports",
      title: "Port authorities",
      text: "Know the true condition of every quay and berth — and plan maintenance on evidence, not intervals.",
    },
    {
      key: "wind",
      title: "Offshore wind operators",
      text: "Track foundation fatigue continuously and extend asset life with confidence.",
    },
    {
      key: "shipyards",
      title: "Shipyards & ship owners",
      text: "Monitor hull condition in ice-going service and document it for every stakeholder.",
    },
    {
      key: "insurers",
      title: "Insurers & classification societies",
      text: "Verified, continuous condition data to support classification and underwriting decisions.",
    },
  ],
};

export const TEAM = {
  id: "team",
  title: "Team",
  intro:
    "Engineers and researchers from Finland's marine and structural engineering community.",
  members: [
    {
      key: "member-1",
      name: "Founder & CEO",
      role: "Structural engineering",
      bio: "Placeholder — background in marine structures and fatigue analysis.",
    },
    {
      key: "member-2",
      name: "Co-founder & CTO",
      role: "FSI modelling",
      bio: "Placeholder — fluid–structure interaction and digital twin research.",
    },
    {
      key: "member-3",
      name: "Lead Engineer",
      role: "Sensors & data",
      bio: "Placeholder — IoT instrumentation for harsh marine environments.",
    },
    {
      key: "member-4",
      name: "Advisor",
      role: "Ice mechanics",
      bio: "Placeholder — ice–structure interaction in Baltic conditions.",
    },
  ],
};

export const CONTACT = {
  id: "contact",
  title: "Talk to us about your first pilot.",
  intro:
    "Tell us about your structure and we'll come back with a monitoring proposal — calmly, and in plain engineering terms.",
  email: "hello@vellamo.fi",
  form: {
    name: "Name",
    email: "Email",
    organization: "Organization",
    message: "Message",
    submit: "Send message",
  },
};

export const PRODUCT_PAGE = {
  title: "The product",
  intro:
    "One quiet subscription: sensors on your structure, a physics-based digital twin behind them, and plain answers on top.",
  delivery: {
    title: "Delivered as a subscription",
    items: [
      {
        key: "install",
        title: "Instrumentation",
        text: "We install off-the-shelf strain, vibration and tilt sensors on your structure — no exotic hardware to maintain.",
      },
      {
        key: "twin",
        title: "Your digital twin",
        text: "A model of your specific structure, built on fluid–structure interaction and fatigue physics, calibrated with the live data.",
      },
      {
        key: "reporting",
        title: "Condition & alerts",
        text: "Live condition, remaining-life estimates and early alerts — reviewed with your engineers, in plain terms.",
      },
    ],
  },
};

export const ABOUT_PAGE = {
  title: "About vellamo",
  paragraphs: [
    "Vellamo is a Finland-based structural health monitoring company for marine and port infrastructure. We combine IoT sensors with fluid–structure interaction and fatigue physics models to give ports, offshore wind operators and shipyards a continuous, predictive view of the condition of their structures — instead of relying on periodic diver inspections.",
    "Our specialty is ice–structure interaction in cold Baltic and Nordic waters — the load case most competitors ignore.",
    "Vellamo is named after the Finnish goddess of the sea and waters — the guardian of what lies beneath the surface. That is the role we take on for your structures: a calm, constant watch.",
  ],
};

export const NEWS_PAGE = {
  title: "News & knowledge base",
  intro:
    "Notes from our engineers on structural health monitoring, ice loads and marine infrastructure. Company news will appear here as well.",
  // PLACEHOLDER: replace with real articles when available.
  posts: [
    {
      key: "post-1",
      tag: "Knowledge base",
      title: "What is structural health monitoring?",
      excerpt:
        "A plain-language introduction to SHM: what sensors measure, what models add, and why continuous beats periodic.",
      date: "Coming soon",
    },
    {
      key: "post-2",
      tag: "Knowledge base",
      title: "Why ice loads deserve their own models",
      excerpt:
        "Baltic winter ice pushes and grinds against structures every year — and behaves nothing like waves.",
      date: "Coming soon",
    },
    {
      key: "post-3",
      tag: "Knowledge base",
      title: "Fatigue below the waterline",
      excerpt:
        "How repeated loading creates micro-cracks that grow silently for years — and how monitoring catches them early.",
      date: "Coming soon",
    },
    {
      key: "post-4",
      tag: "News",
      title: "Company updates",
      excerpt:
        "Announcements about pilots, partners and the team will be published here.",
      date: "Coming soon",
    },
  ],
};

export const FOOTER = {
  boilerplate:
    "Vellamo is a Finland-based structural health monitoring company for marine and port infrastructure. Vellamo is named after the Finnish goddess of the sea — the guardian of what lies beneath the surface.",
  copyright: `© ${new Date().getFullYear()} Vellamo. All rights reserved.`,
};
