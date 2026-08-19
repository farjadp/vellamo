// ---------------------------------------------------------------------------
// Svenskt innehåll. Samma struktur som src/content/en.js — ändra inte
// nyckelnamnen, översätt endast värdena.
// ---------------------------------------------------------------------------

export default {
  SITE: {
    title: "vellamo — Väktaren under ytan",
    description:
      "Vellamo är ett finländskt företag för tillståndsövervakning av marin- och hamninfrastruktur — byggt för is och kallt vatten.",
  },

  UI: {
    heroEyebrow: "tillståndsövervakning · finland",
    problemEyebrow: "problemet",
    solutionEyebrow: "lösningen",
    whyFinlandEyebrow: "varför finland · varför is",
    whoForEyebrow: "vem är det till för",
    teamEyebrow: "teamet",
    contactEyebrow: "börja här",
    deliveryEyebrow: "så här får du det",
    pricingEyebrow: "prissättning",
    liveConditionBadge: "tillstånd i realtid",
    contactSuccess: "Tack — ditt meddelande har skickats. Vi hör av oss.",
    contactError:
      "Något gick fel. Försök igen eller skicka oss ett e-postmeddelande direkt.",
    contactAriaLabel: "Kontaktformulär",
    readMore: "Läs mer",
    loading: "Laddar…",
    postNotFoundTitle: "Hittades inte",
    postNotFoundText: "Den artikeln finns inte, eller är inte publicerad än.",
    backToNews: "Tillbaka till nyheter",
    mainNavLabel: "Huvudmeny",
    homeAriaLabel: "vellamo — startsida",
    openMenu: "Öppna meny",
    closeMenu: "Stäng meny",
    footerNavLabel: "Sidfotens meny",
    languageLabel: "Språk",
  },

  NOT_FOUND: {
    eyebrow: "404",
    title: "Försvunnen under ytan.",
    text: "Den här sidan finns inte — den kan ha flyttats, eller så var länken felskriven. Låt oss ta dig tillbaka till fast mark.",
    home: "Tillbaka till startsidan",
    contact: "Kontakta oss",
  },

  NAV: {
    links: [
      { label: "Produkt", to: "/product" },
      { label: "Team", to: "/team" },
      { label: "Om oss", to: "/about" },
      { label: "Nyheter", to: "/news" },
      { label: "Kontakt", to: "/contact" },
    ],
    cta: "Begär en pilot",
  },

  HOME: {
    glimpse: {
      eyebrow: "problemet",
      link: "Se hur vellamo löser det",
    },
    explore: {
      eyebrow: "dyk djupare",
      title: "Utforska vellamo",
      cards: [
        {
          key: "product",
          to: "/product",
          title: "Produkt",
          text: "Sensorer på din konstruktion, en fysikbaserad digital tvilling bakom dem, och tydliga svar ovanpå — som en prenumeration.",
        },
        {
          key: "team",
          to: "/team",
          title: "Team",
          text: "Konstruktörer, marinforskare och erfarna operatörer — människorna bakom väktaren.",
        },
        {
          key: "about",
          to: "/about",
          title: "Om oss",
          text: "Varför vi byggs i Finland, där havet fryser — och uppkallade efter havets gudinna.",
        },
        {
          key: "news",
          to: "/news",
          title: "Nyheter och kunskap",
          text: "Anteckningar från våra ingenjörer om tillståndsövervakning, islaster och marin infrastruktur.",
        },
      ],
    },
    ctaBand: {
      title: "Prata med oss om din första pilot.",
      text: "Berätta om din konstruktion — vi återkommer med ett övervakningsförslag på ett enkelt ingenjörsspråk.",
      button: "Begär en pilot",
    },
  },

  HERO: {
    headline: "Väktaren under ytan.",
    subheadline:
      "Tillståndsövervakning för marin- och hamninfrastruktur — byggt för is och kallt vatten.",
    supporting:
      "Kontinuerliga sensorer och fysikbaserade modeller vakar över dina kajer, fundament och skrov — istället för en dykare vart tredje till femte år.",
    primaryCta: "Begär en pilot",
    secondaryCta: "Se hur det fungerar",
  },

  PROBLEM: {
    id: "problem",
    title: "Skador du inte kan se",
    intro:
      "Hamnar, kajer, fundament för havsbaserad vindkraft och fartygsskrov står alla i kallt saltvatten — och vattnet förstör dem sakta, under ytan, där ingen kan se det.",
    columns: [
      {
        key: "fatigue",
        title: "Utmattning",
        text: "Upprepade våg- och islaster skapar mikrosprickor som växer tyst under många år.",
      },
      {
        key: "corrosion",
        title: "Korrosion",
        text: "Saltvatten fräter på stål under vattenlinjen, osynligt.",
      },
      {
        key: "ice",
        title: "Islaster",
        text: "Östersjöns vinteris trycker och river mot konstruktioner varje år.",
      },
    ],
    stats: [
      {
        figure: "vart 3–5:e år",
        text: "Typiskt intervall för dykarinspektion. Mellan inspektionerna vet ägarna ingenting.",
      },
      {
        figure: "miljontals euro",
        text: "Kostnaden för ett enda oplanerat haveri eller en stängning.",
      },
    ],
    reality:
      "Idag kontrollerar ägare dessa konstruktioner genom att skicka ner dykare vart några år — dyrt, sällan, och mellan två inspektioner vet ingen någonting. Ibland är den första ”inspektionen” själva haveriet: en sprucken kaj, en stängd kajplats, en akutreparation som kostar miljoner.",
  },

  SOLUTION: {
    id: "solution",
    title: "Kontinuerlig övervakning, driven av verklig fysik",
    intro:
      "En permanent, tyst vakt över din konstruktion — från sensor till beslut.",
    steps: [
      {
        key: "sense",
        title: "Känn av",
        text: "Färdiga sensorer på konstruktionen som strömmar data dygnet runt — töjning, vibration, lutning.",
      },
      {
        key: "model",
        title: "Modellera",
        text: "En digital tvilling byggd på vätske–strukturinteraktion och utmattningsmodeller — kärnan i vår teknik.",
      },
      {
        key: "act",
        title: "Agera",
        text: "Tillstånd i realtid, uppskattning av återstående livslängd och tidiga varningar — som en prenumeration.",
      },
    ],
    answers: {
      title: "Tre svar, uppdaterade kontinuerligt",
      items: [
        "Vilket skick är min konstruktion i just nu?",
        "Hur många års livslängd har den kvar?",
        "Vilken del behöver uppmärksamhet — och när?",
      ],
    },
    quote: {
      text: "”Sektion B behöver repareras inom 18 månader — resten är i gott skick.”",
      caption: "Det här är vad du hör från Vellamo — tydliga svar, grundade i fysik.",
    },
  },

  WHY_FINLAND: {
    id: "why-finland",
    title: "Byggt där havet fryser",
    paragraphs: [
      "Finland är en sjöfartsnation: varv i Åbo och Helsingfors, hamninfrastruktur längs hela kusten, växande havsbaserad vindkraft i Östersjön — och forskningspartner som VTT och Aalto-universitetet runt hörnet.",
      "Viktigast av allt: Östersjön fryser. Stora etablerade aktörer bygger dyra, projektbaserade övervakningssystem för olja och gas; is är en fotnot i deras lastmodeller, om den ens nämns. Vellamo är annorlunda från grunden: en fokuserad, prisvärd prenumeration byggd specifikt för förhållanden med kallt vatten och islaster — den lastsituation som de flesta konkurrenter ignorerar.",
      "Det är det tuffaste förhållandet din konstruktion möter varje vinter. Det är det första våra modeller byggdes för.",
      "Finland är både vår första marknad och trovärdighetsstämpeln för den bredare regionen — Sverige, Estland och Norge, och senare Kanada.",
    ],
  },

  WHO_FOR: {
    id: "who-for",
    title: "Vem det är till för",
    cards: [
      {
        key: "ports",
        title: "Hamnmyndigheter",
        text: "Känn till det verkliga skicket på varje kaj och kajplats — och planera underhåll utifrån bevis, inte intervall.",
      },
      {
        key: "wind",
        title: "Operatörer av havsbaserad vindkraft",
        text: "Följ fundamentens utmattning kontinuerligt och förläng tillgångarnas livslängd med förtroende.",
      },
      {
        key: "shipyards",
        title: "Varv och fartygsägare",
        text: "Övervaka skrovets skick vid isgång och dokumentera det för alla intressenter.",
      },
      {
        key: "insurers",
        title: "Försäkringsbolag och klassificeringssällskap",
        text: "Verifierad, kontinuerlig tillståndsdata till stöd för klassificerings- och försäkringsbeslut.",
      },
    ],
  },

  TEAM: {
    id: "team",
    title: "Team",
    intro:
      "Ett grundarteam av konstruktörer och byggingenjörer som flyttar till Finland — med mjukvaruledarskap som omvandlar vetenskapen till en tjänst.",
    why: "Hamidreza kombinerar konstruktionsteknik med erfarenhet som vd för att driva bolaget. Mohsen bidrar med forskningsdjup inom jordbävningsteknik och prestandabaserad design till FoU. Bahareh har hållit EPC-storprojekt på tidsplan och gör samma sak för vår produkt och våra piloter. Farjad, vår Toronto-baserade teknikchef, omvandlar vetenskapen till mjukvara som kunder kan använda. Djup kunskap om marin- och isfysik säkras genom det planerade forskningssamarbetet med VTT/Aalto och en specialistrekrytering — den första tekniska prioriteringen efter bolagsbildningen.",
    members: [
      {
        key: "hamidreza",
        name: "Hamidreza Salmanmohajer",
        role: "Medgrundare & vd",
        bio: "Civilingenjör, konstruktionsteknik. Konstruktör och byggledare i genomförda projekt; tidigare medgrundare och vd för Quaketant, ett krishanteringsföretag. Leder Vellamos verksamhet, Finlandsverksamheten, finansiering och det övergripande ansvaret.",
        photo_url: "/team/hamidreza.jpg",
      },
      {
        key: "mohsen",
        name: "Mohsen Kavian",
        role: "Medgrundare, COO & FoU-ingenjör",
        bio: "Civilingenjör, jordbävningsteknik (IUST). Konstruktör och specialist på prestandabaserad design (FEMA-certifierad webbinarieserie); publicerad forskare; tidigare COO på Quaketant. Ansvarar för verksamheten och det konstruktionstekniska FoU-arbetet bakom den digitala tvillingen.",
        photo_url: "/team/mohsen.jpg",
      },
      {
        key: "bahareh",
        name: "Bahareh Khamouddoust",
        role: "Medgrundare, produkt- & projektledare",
        bio: "PMP · civilingenjör, byggledning. Projektstyrningschef på EPC-storprojekt — dammar, raffinaderier och petrokemiska anläggningar — med Primavera P6 i team på både huvudkontor och byggarbetsplatser. Ansvarar för produktleverans och håller piloterna på tidsplan.",
        photo_url: "/team/bahareh.jpg",
      },
      {
        key: "farjad",
        name: "Farjad",
        role: "Teknikchef (CTO)",
        bio: "Toronto-baserad techentreprenör med 22 års erfarenhet av mjukvara; har byggt två mjukvaruföretag och grundat North Road AI. Ansvarar för plattforms- och dashboardutveckling: sensordatapipelinen, den digitala tvillingens plattform och kunddashboarden.",
      },
    ],
  },

  CONTACT: {
    id: "contact",
    title: "Prata med oss om din första pilot.",
    intro:
      "Berätta om din konstruktion så återkommer vi med ett övervakningsförslag — lugnt och på ett enkelt ingenjörsspråk.",
    email: "hello@vellamo.fi",
    form: {
      name: "Namn",
      email: "E-post",
      organization: "Organisation",
      message: "Meddelande",
      submit: "Skicka meddelande",
    },
  },

  PRODUCT_PAGE: {
    title: "Produkten",
    intro:
      "En lugn prenumeration: sensorer på din konstruktion, en fysikbaserad digital tvilling bakom dem, och tydliga svar ovanpå.",
    delivery: {
      title: "Levereras som en prenumeration",
      items: [
        {
          key: "install",
          title: "Instrumentering",
          text: "Vi installerar färdiga sensorer för töjning, vibration och lutning på din konstruktion — ingen exotisk hårdvara att underhålla.",
        },
        {
          key: "twin",
          title: "Din digitala tvilling",
          text: "En modell av just din konstruktion, byggd på vätske–strukturinteraktion och utmattningsfysik, kalibrerad med realtidsdata.",
        },
        {
          key: "reporting",
          title: "Tillstånd och varningar",
          text: "Tillstånd i realtid, uppskattningar av återstående livslängd och tidiga varningar — genomgångna med dina ingenjörer, på ett enkelt sätt.",
        },
      ],
    },
    pricing: {
      title: "Enkel, ärlig prissättning",
      note: "Vi tillverkar inte hårdvara — vi använder beprövade, färdiga sensorer. Prenumerationen är produkten: övervakning, uppskattningar av återstående livslängd, varningar och rapporter.",
      items: [
        {
          key: "install",
          figure: "20 000–60 000 €",
          label: "engångsinstallation, per anläggning",
          text: "Täcker sensorhårdvaran och instrumenteringen av din konstruktion.",
        },
        {
          key: "subscription",
          figure: "1 500–4 000 € / månad",
          label: "prenumeration, per konstruktion",
          text: "Kontinuerlig övervakning, tidiga varningar och ingenjörsrapporter.",
        },
      ],
    },
  },

  ABOUT_PAGE: {
    title: "Om vellamo",
    paragraphs: [
      "Vellamo är ett finländskt företag för tillståndsövervakning av marin- och hamninfrastruktur. Vi kombinerar IoT-sensorer med modeller för vätske–strukturinteraktion och utmattningsfysik för att ge hamnar, operatörer av havsbaserad vindkraft och varv en kontinuerlig, förutseende bild av sina konstruktioners skick — istället för att förlita sig på periodiska dykarinspektioner.",
      "Vår specialitet är is–struktur-interaktion i kalla Östersjö- och nordiska vatten — den lastsituation som de flesta konkurrenter ignorerar.",
      "Vellamo är uppkallat efter den finska havs- och vattengudinnan — väktaren av det som finns under ytan. Det är den roll vi tar på oss för dina konstruktioner: en lugn, ständig vakt.",
    ],
    elevator:
      "Vellamo vakar över marina konstruktioner underifrån — sensorer och fysikmodeller berättar för hamnar och vindkraftsoperatörer den verkliga statusen på deras tillgångar, innan haverier inträffar.",
  },

  NEWS_PAGE: {
    title: "Nyheter och kunskapsbank",
    intro:
      "Anteckningar från våra ingenjörer om tillståndsövervakning, islaster och marin infrastruktur. Företagsnyheter kommer också att publiceras här.",
    posts: [
      {
        key: "post-1",
        tag: "Kunskapsbank",
        title: "Vad är tillståndsövervakning av konstruktioner?",
        excerpt:
          "En enkel introduktion till SHM: vad sensorer mäter, vad modeller tillför, och varför kontinuerlig övervakning slår periodisk.",
        date: "Kommer snart",
      },
      {
        key: "post-2",
        tag: "Kunskapsbank",
        title: "Varför islaster förtjänar egna modeller",
        excerpt:
          "Östersjöns vinteris trycker och river mot konstruktioner varje år — och beter sig inte alls som vågor.",
        date: "Kommer snart",
      },
      {
        key: "post-3",
        tag: "Kunskapsbank",
        title: "Utmattning under vattenlinjen",
        excerpt:
          "Hur upprepad belastning skapar mikrosprickor som växer tyst under många år — och hur övervakning fångar dem tidigt.",
        date: "Kommer snart",
      },
      {
        key: "post-4",
        tag: "Nyheter",
        title: "Företagsuppdateringar",
        excerpt:
          "Tillkännagivanden om piloter, partner och teamet kommer att publiceras här.",
        date: "Kommer snart",
      },
    ],
  },

  FOOTER: {
    boilerplate:
      "Vellamo är ett finländskt företag för tillståndsövervakning av marin- och hamninfrastruktur. Vellamo är uppkallat efter den finska havsgudinnan — väktaren av det som finns under ytan.",
    copyright: `© ${new Date().getFullYear()} Vellamo. Alla rättigheter förbehållna.`,
  },
};
