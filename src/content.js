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

// Home page: compact teasers that link to the inner pages.
export const HOME = {
  glimpse: {
    eyebrow: "the problem",
    link: "See how vellamo solves it",
  },
  explore: {
    eyebrow: "dive deeper",
    title: "Explore vellamo",
    cards: [
      {
        key: "product",
        to: "/product",
        title: "Product",
        text: "Sensors on your structure, a physics-based digital twin behind them, and plain answers on top — as a subscription.",
      },
      {
        key: "team",
        to: "/team",
        title: "Team",
        text: "Structural engineers, marine researchers and experienced operators — the people behind the guardian.",
      },
      {
        key: "about",
        to: "/about",
        title: "About",
        text: "Why we're built in Finland, where the sea freezes — and named after the goddess of the sea.",
      },
      {
        key: "news",
        to: "/news",
        title: "News & knowledge",
        text: "Notes from our engineers on structural health monitoring, ice loads and marine infrastructure.",
      },
    ],
  },
  ctaBand: {
    title: "Talk to us about your first pilot.",
    text: "Tell us about your structure — we'll come back with a monitoring proposal in plain engineering terms.",
    button: "Request a pilot",
  },
};

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
    "Harbors, quays, offshore wind foundations and ship hulls all stand in cold salt water — and the water slowly destroys them, below the surface, where no one can see.",
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
  reality:
    "Today, owners check these structures by sending divers down every few years — expensive, infrequent, and between two inspections nobody knows anything. Sometimes the first “inspection” is the failure itself: a cracked quay, a closed berth, an emergency repair that costs millions.",
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
  answers: {
    title: "Three answers, updated constantly",
    items: [
      "What condition is my structure in right now?",
      "How many years of life does it have left?",
      "Which part needs attention — and when?",
    ],
  },
  quote: {
    text: "“Section B needs repair within 18 months — the rest is healthy.”",
    caption: "What you hear from Vellamo — plain answers, grounded in physics.",
  },
};

export const WHY_FINLAND = {
  id: "why-finland",
  title: "Built where the sea freezes",
  paragraphs: [
    "Finland is a maritime country: shipyards in Turku and Helsinki, port infrastructure along the whole coast, offshore wind growing in the Baltic — and research partners like VTT and Aalto next door.",
    "Most importantly, the Baltic freezes. Large incumbents build expensive, project-based monitoring systems for oil and gas; ice is a footnote in their load models, if it appears at all. Vellamo is different by design: a focused, affordable subscription built specifically for cold-water and ice-load conditions — the load case most competitors ignore.",
    "It is the hardest condition your structure faces every winter. It is the first thing our models were built for.",
    "Finland is both our first market and the credibility stamp for the wider region — Sweden, Estonia and Norway, and later Canada.",
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
    "Structural engineers, marine researchers and experienced operators — the science, the product and the commercial side under one roof.",
  why: "Farshad builds the physics models that make predictions real. Hamidreza pairs structural engineering with CEO experience to run the company. Elyas has sold technical industrial solutions to serious B2B buyers for 15 years — and ports and shipyards are exactly that kind of buyer. Farjad turns the science into software customers can use.",
  members: [
    {
      key: "hamidreza",
      name: "Hamidreza",
      role: "Co-founder & CEO",
      bio: "Structural engineer (M.Sc. Civil Engineering – Structures, Zanjan University) and experienced startup leader; previously co-founder and CEO of QUAKETANT. Leads Vellamo's execution, operations in Finland, fundraising and overall accountability — speaking the technical language of both team and customer.",
    },
    {
      key: "farshad",
      name: "Farshad",
      role: "Co-founder & Chief Scientist",
      bio: "Researcher in Coastal, Ports and Marine Structures Engineering (K.N. Toosi University of Technology), specializing in fluid–structure interaction. Designs and validates the load and fatigue models inside the digital twin — the ice-and-wave physics that is Vellamo's defensible IP.",
    },
    {
      key: "elyas",
      name: "Elyas",
      role: "Co-founder & CCO",
      bio: "15 years of senior B2B sales and business development in heavy industry, serving major international companies including Linde, Fronius and Voestalpine Böhler Welding across European and Middle Eastern markets. Owns revenue: pilots, pricing, partnerships and the commercial pipeline from the first Finnish customer to the wider Baltic market.",
    },
    {
      key: "farjad",
      name: "Farjad",
      role: "CTO",
      bio: "Technology entrepreneur with 22 years in software; built two programming companies, co-founded international ventures including HoFin, and founded North Road AI. Responsible for turning the science into a product: the sensor data pipeline, the digital-twin platform, the customer dashboard and the engineering team.",
    },
    {
      key: "mohsen",
      name: "Mohsen",
      role: "Advisor — Engineering & Projects",
      bio: "M.Sc. in Civil Engineering and COO of QUAKETANT, with experience as a structural designer and startup mentor. Provides independent senior review of structural analysis and pilot design, plus practical guidance on running a lean engineering startup.",
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
  pricing: {
    title: "Simple, honest pricing",
    note: "We don't manufacture hardware — we use proven, off-the-shelf sensors. The subscription is the product: monitoring, remaining-life estimates, alerts and reports.",
    items: [
      {
        key: "install",
        figure: "€20–60k",
        label: "one-time installation, per site",
        text: "Covers the sensor hardware and instrumentation of your structure.",
      },
      {
        key: "subscription",
        figure: "€1,500–4,000 / month",
        label: "subscription, per structure",
        text: "Continuous monitoring, early alerts, and engineering reports.",
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
  elevator:
    "Vellamo watches marine structures from underwater — sensors plus physics models tell ports and wind operators the true condition of their assets, before failures happen.",
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
