// ---------------------------------------------------------------------------
// Suomenkielinen sisältö. Sama rakenne kuin src/content/en.js — älä muuta
// avainten nimiä, käännä vain arvot.
// ---------------------------------------------------------------------------

export default {
  SITE: {
    title: "vellamo — Vartija pinnan alla",
    description:
      "Vellamo on suomalainen rakenteiden kunnonvalvontayhtiö meri- ja satamainfrastruktuurille — suunniteltu jäälle ja kylmälle vedelle.",
  },

  UI: {
    heroEyebrow: "rakenteiden kunnonvalvonta · suomi",
    problemEyebrow: "ongelma",
    solutionEyebrow: "ratkaisu",
    whyFinlandEyebrow: "miksi suomi · miksi jää",
    whoForEyebrow: "kenelle tämä on",
    teamEyebrow: "tiimi",
    contactEyebrow: "aloita tästä",
    deliveryEyebrow: "näin saat sen käyttöösi",
    pricingEyebrow: "hinnoittelu",
    liveConditionBadge: "reaaliaikainen kunto",
    contactSuccess: "Kiitos — viestisi on lähetetty. Olemme sinuun yhteydessä.",
    contactError:
      "Jotain meni pieleen. Yritä uudelleen tai lähetä meille sähköpostia suoraan.",
    contactAriaLabel: "Yhteydenottolomake",
    readMore: "Lue lisää",
    loading: "Ladataan…",
    postNotFoundTitle: "Ei löytynyt",
    postNotFoundText: "Tätä artikkelia ei ole olemassa, tai sitä ei ole vielä julkaistu.",
    backToNews: "Takaisin uutisiin",
    mainNavLabel: "Päävalikko",
    homeAriaLabel: "vellamo — etusivu",
    openMenu: "Avaa valikko",
    closeMenu: "Sulje valikko",
    footerNavLabel: "Alatunnisteen valikko",
    languageLabel: "Kieli",
  },

  NOT_FOUND: {
    eyebrow: "404",
    title: "Kadonnut pinnan alle.",
    text: "Tätä sivua ei ole olemassa — se on saatettu siirtää, tai linkki oli väärin kirjoitettu. Palataan takaisin kiinteälle pohjalle.",
    home: "Takaisin etusivulle",
    contact: "Ota yhteyttä",
  },

  NAV: {
    links: [
      { label: "Tuote", to: "/product" },
      { label: "Tiimi", to: "/team" },
      { label: "Meistä", to: "/about" },
      { label: "Uutiset", to: "/news" },
      { label: "Yhteystiedot", to: "/contact" },
    ],
    cta: "Pyydä pilotti",
  },

  HOME: {
    glimpse: {
      eyebrow: "ongelma",
      link: "Katso, miten vellamo ratkaisee sen",
    },
    explore: {
      eyebrow: "sukella syvemmälle",
      title: "Tutustu vellamoon",
      cards: [
        {
          key: "product",
          to: "/product",
          title: "Tuote",
          text: "Anturit rakenteessasi, fysiikkaan perustuva digitaalinen kaksonen niiden takana ja selkeät vastaukset päällä — kuukausitilauksena.",
        },
        {
          key: "team",
          to: "/team",
          title: "Tiimi",
          text: "Rakennesuunnittelijoita, meritutkijoita ja kokeneita operaattoreita — ihmiset vartijan takana.",
        },
        {
          key: "about",
          to: "/about",
          title: "Meistä",
          text: "Miksi rakennamme yrityksen Suomessa, missä meri jäätyy — ja miksi nimemme tulee meren jumalattaresta.",
        },
        {
          key: "news",
          to: "/news",
          title: "Uutiset ja tietopankki",
          text: "Insinöörien muistiinpanoja rakenteiden kunnonvalvonnasta, jääkuormista ja meri-infrastruktuurista.",
        },
      ],
    },
    ctaBand: {
      title: "Kerro meille ensimmäisestä pilotistasi.",
      text: "Kerro rakenteestasi — palaamme asiaan valvontaehdotuksella selkeällä insinöörikielellä.",
      button: "Pyydä pilotti",
    },
  },

  HERO: {
    headline: "Vartija pinnan alla.",
    subheadline:
      "Rakenteiden kunnonvalvontaa meri- ja satamainfrastruktuurille — suunniteltu jäälle ja kylmälle vedelle.",
    supporting:
      "Jatkuvat anturit ja fysiikkaan perustuvat mallit vartioivat laitureitasi, perustuksiasi ja runkojasi — sukeltajan sijaan muutaman vuoden välein.",
    primaryCta: "Pyydä pilotti",
    secondaryCta: "Katso, miten se toimii",
  },

  PROBLEM: {
    id: "problem",
    title: "Vaurioita, joita et näe",
    intro:
      "Satamat, laiturit, merituulivoiman perustukset ja alusten rungot seisovat kaikki kylmässä suolavedessä — ja vesi tuhoaa niitä hitaasti pinnan alla, missä kukaan ei näe.",
    columns: [
      {
        key: "fatigue",
        title: "Väsyminen",
        text: "Toistuvat aalto- ja jääkuormat synnyttävät mikrohalkeamia, jotka kasvavat huomaamatta vuosien ajan.",
      },
      {
        key: "corrosion",
        title: "Korroosio",
        text: "Suolavesi syö terästä vesirajan alla, näkymättömissä.",
      },
      {
        key: "ice",
        title: "Jääkuormat",
        text: "Itämeren talvijää työntää ja hankaa rakenteita vasten joka vuosi.",
      },
    ],
    stats: [
      {
        figure: "3–5 vuoden välein",
        text: "Tyypillinen sukellustarkastusväli. Tarkastusten välillä omistajat eivät näe mitään.",
      },
      {
        figure: "miljoonia euroja",
        text: "Yhden suunnittelemattoman vaurion tai sulkemisen hinta.",
      },
    ],
    reality:
      "Nykyään omistajat tarkastavat nämä rakenteet lähettämällä sukeltajia muutaman vuoden välein — kallista, harvoin toistuvaa, ja kahden tarkastuksen välillä kukaan ei tiedä mitään. Joskus ensimmäinen ”tarkastus” on itse vaurio: haljennut laituri, suljettu laituripaikka, hätäkorjaus, joka maksaa miljoonia.",
  },

  SOLUTION: {
    id: "solution",
    title: "Jatkuvaa valvontaa, todellisen fysiikan voimalla",
    intro:
      "Pysyvä, hiljainen vahti rakenteesi yllä — anturista päätökseen.",
    steps: [
      {
        key: "sense",
        title: "Aisti",
        text: "Valmiit anturit rakenteessa, jotka lähettävät dataa ympäri vuorokauden — venymä, tärinä, kallistuma.",
      },
      {
        key: "model",
        title: "Mallinna",
        text: "Digitaalinen kaksonen, joka perustuu virtaus–rakenne-vuorovaikutukseen ja väsymismalleihin — ydinosaamisemme.",
      },
      {
        key: "act",
        title: "Toimi",
        text: "Reaaliaikainen kunto, jäljellä olevan käyttöiän arvio ja varhaiset hälytykset — kuukausitilauksena.",
      },
    ],
    answers: {
      title: "Kolme vastausta, jatkuvasti päivittyen",
      items: [
        "Missä kunnossa rakenteeni on juuri nyt?",
        "Kuinka monta vuotta käyttöikää sillä on jäljellä?",
        "Mikä osa tarvitsee huomiota — ja milloin?",
      ],
    },
    quote: {
      text: "”Lohko B tarvitsee korjauksen 18 kuukauden sisällä — muu osa on kunnossa.”",
      caption: "Näin Vellamo kertoo asiat — selkeitä vastauksia, fysiikkaan perustuen.",
    },
  },

  WHY_FINLAND: {
    id: "why-finland",
    title: "Rakennettu siellä, missä meri jäätyy",
    paragraphs: [
      "Suomi on merenkulkuvaltio: telakat Turussa ja Helsingissä, satamainfrastruktuuria koko rannikolla, kasvava merituulivoima Itämerellä — ja tutkimuskumppaneita, kuten VTT ja Aalto-yliopisto, aivan naapurissa.",
      "Tärkeintä on, että Itämeri jäätyy. Suuret alan toimijat rakentavat kalliita, projektikohtaisia valvontajärjestelmiä öljy- ja kaasuteollisuudelle; jää on niiden kuormamalleissa vain alaviite, jos sitäkään. Vellamo on suunniteltu erilaiseksi: kohdennettu, edullinen tilauspalvelu, joka on rakennettu nimenomaan kylmän veden ja jääkuormien olosuhteisiin — kuormitustapaus, jonka useimmat kilpailijat jättävät huomiotta.",
      "Se on vaikein olosuhde, jonka rakenteesi kohtaa joka talvi. Se on ensimmäinen asia, jolle mallimme on rakennettu.",
      "Suomi on sekä ensimmäinen markkinamme että uskottavuusleima laajemmalle alueelle — Ruotsille, Virolle ja Norjalle, myöhemmin myös Kanadalle.",
    ],
  },

  WHO_FOR: {
    id: "who-for",
    title: "Kenelle tämä on",
    cards: [
      {
        key: "ports",
        title: "Satamaviranomaiset",
        text: "Tiedä jokaisen laiturin ja laituripaikan todellinen kunto — ja suunnittele kunnossapito näytön, ei aikataulun, perusteella.",
      },
      {
        key: "wind",
        title: "Merituulivoimaoperaattorit",
        text: "Seuraa perustusten väsymistä jatkuvasti ja pidennä käyttöikää luottavaisin mielin.",
      },
      {
        key: "shipyards",
        title: "Telakat ja laivanvarustajat",
        text: "Seuraa runkojen kuntoa jääolosuhteissa ja dokumentoi se kaikille sidosryhmille.",
      },
      {
        key: "insurers",
        title: "Vakuuttajat ja luokituslaitokset",
        text: "Varmennettua, jatkuvaa kuntodataa luokitus- ja vakuutuspäätösten tueksi.",
      },
    ],
  },

  TEAM: {
    id: "team",
    title: "Tiimi",
    intro:
      "Suomeen muuttava perustajatiimi rakenne- ja rakennusinsinöörejä — ohjelmistojohtajuudella, joka muuttaa tieteen palveluksi.",
    why: "Hamidreza yhdistää rakennesuunnittelun ja toimitusjohtajakokemuksen yhtiön johtamiseen. Mohsen tuo tutkimussyvyyttä maanjäristystekniikasta ja suorituskykyyn perustuvasta suunnittelusta T&K-työhön. Bahareh on pitänyt EPC-suurhankkeet aikataulussa ja tekee samaa tuotteellemme ja piloteillemme. Farjad, Torontossa toimiva teknologiajohtajamme, muuttaa tieteen ohjelmistoksi, jota asiakkaat voivat käyttää. Meri- ja jääfysiikan syvällinen osaaminen varmistetaan suunnitellulla VTT/Aalto-tutkimuskumppanuudella ja erikoisasiantuntijan rekrytoinnilla — ensimmäinen tekninen prioriteetti yhtiön perustamisen jälkeen.",
    members: [
      {
        key: "hamidreza",
        name: "Hamidreza Salmanmohajer",
        role: "Perustajaosakas & toimitusjohtaja",
        bio: "DI, rakennetekniikka. Rakennesuunnittelija ja rakennuttajapäällikkö toteutetuissa hankkeissa; aiemmin kriisinhallinta-startup Quaketantin perustaja ja toimitusjohtaja. Vastaa Vellamon toiminnasta, Suomen operaatioista, rahoituksesta ja kokonaisvastuusta.",
        photo_url: "/team/hamidreza.jpg",
      },
      {
        key: "mohsen",
        name: "Mohsen Kavian",
        role: "Perustajaosakas, operatiivinen johtaja & T&K-insinööri",
        bio: "DI, maanjäristystekniikka (IUST). Rakennesuunnittelija ja suorituskykyyn perustuvan suunnittelun erikoisosaaja (FEMA-sertifioitu webinaarisarja); julkaistu tutkija; aiemmin Quaketantin operatiivinen johtaja. Vastaa operaatioista ja digitaalisen kaksosen taustalla olevasta rakennetekniikan T&K-työstä.",
        photo_url: "/team/mohsen.jpg",
      },
      {
        key: "bahareh",
        name: "Bahareh Khamouddoust",
        role: "Perustajaosakas, tuote- ja projektipäällikkö",
        bio: "PMP · DI, rakennushallinto. Projektinohjauspäällikkö EPC-suurhankkeissa — padot, jalostamot ja petrokemian laitokset — Primavera P6:lla pääkonttorin ja työmaiden tiimeissä. Vastaa tuotteen toimituksesta ja pitää pilotit aikataulussa.",
        photo_url: "/team/bahareh.jpg",
      },
      {
        key: "farjad",
        name: "Farjad",
        role: "Teknologiajohtaja (CTO)",
        bio: "Torontossa toimiva teknologiayrittäjä, 22 vuoden kokemus ohjelmistoalalta; perustanut kaksi ohjelmistoyritystä ja North Road AI:n. Vastaa alustan ja hallintapaneelin kehityksestä: anturidataputkesta, digitaalisen kaksosen alustasta ja asiakashallintapaneelista.",
      },
    ],
  },

  CONTACT: {
    id: "contact",
    title: "Kerro meille ensimmäisestä pilotistasi.",
    intro:
      "Kerro rakenteestasi, niin palaamme asiaan valvontaehdotuksella — rauhallisesti ja selkeällä insinöörikielellä.",
    email: "hello@vellamo.fi",
    form: {
      name: "Nimi",
      email: "Sähköposti",
      organization: "Organisaatio",
      message: "Viesti",
      submit: "Lähetä viesti",
    },
  },

  PRODUCT_PAGE: {
    title: "Tuote",
    intro:
      "Yksi rauhallinen tilaus: anturit rakenteessasi, fysiikkaan perustuva digitaalinen kaksonen niiden takana ja selkeät vastaukset päällä.",
    delivery: {
      title: "Toimitetaan tilauspalveluna",
      items: [
        {
          key: "install",
          title: "Instrumentointi",
          text: "Asennamme valmiit venymä-, tärinä- ja kallistusanturit rakenteeseesi — ei eksoottista laitteistoa ylläpidettäväksi.",
        },
        {
          key: "twin",
          title: "Digitaalinen kaksosesi",
          text: "Juuri sinun rakenteesi malli, joka perustuu virtaus–rakenne-vuorovaikutukseen ja väsymisfysiikkaan, kalibroitu reaaliaikaisella datalla.",
        },
        {
          key: "reporting",
          title: "Kunto ja hälytykset",
          text: "Reaaliaikainen kunto, jäljellä olevan käyttöiän arviot ja varhaiset hälytykset — käydään läpi insinöörienne kanssa, selkeästi.",
        },
      ],
    },
    pricing: {
      title: "Yksinkertainen, rehellinen hinnoittelu",
      note: "Emme valmista laitteistoa — käytämme todistetusti toimivia, valmiita antureita. Tilaus on tuote: valvonta, jäljellä olevan käyttöiän arviot, hälytykset ja raportit.",
      items: [
        {
          key: "install",
          figure: "20 000–60 000 €",
          label: "kertaluonteinen asennus, kohteittain",
          text: "Kattaa anturilaitteiston ja rakenteesi instrumentoinnin.",
        },
        {
          key: "subscription",
          figure: "1 500–4 000 € / kk",
          label: "tilaus, rakenteittain",
          text: "Jatkuva valvonta, varhaiset hälytykset ja insinööriraportit.",
        },
      ],
    },
  },

  ABOUT_PAGE: {
    title: "Tietoa vellamosta",
    paragraphs: [
      "Vellamo on suomalainen rakenteiden kunnonvalvontayhtiö meri- ja satamainfrastruktuurille. Yhdistämme IoT-anturit virtaus–rakenne-vuorovaikutuksen ja väsymisfysiikan malleihin antaaksemme satamille, merituulivoimaoperaattoreille ja telakoille jatkuvan, ennakoivan näkymän rakenteidensa kuntoon — sen sijaan, että luotettaisiin määräaikaisiin sukellustarkastuksiin.",
      "Erikoisosaamisemme on jään ja rakenteen vuorovaikutus kylmissä Itämeren ja Pohjolan vesissä — kuormitustapaus, jonka useimmat kilpailijat jättävät huomiotta.",
      "Vellamo on nimetty suomalaisen meren ja vesien jumalattaren mukaan — pinnan alla olevan vartijan mukaan. Se on rooli, jonka otamme rakenteillesi: rauhallinen, jatkuva vahti.",
    ],
    elevator:
      "Vellamo vartioi merirakenteita veden alta — anturit ja fysiikkamallit kertovat satamille ja tuulivoimaoperaattoreille omaisuutensa todellisen kunnon, ennen kuin vaurioita tapahtuu.",
  },

  NEWS_PAGE: {
    title: "Uutiset ja tietopankki",
    intro:
      "Insinöörien muistiinpanoja rakenteiden kunnonvalvonnasta, jääkuormista ja meri-infrastruktuurista. Myös yritysuutiset julkaistaan täällä.",
    posts: [
      {
        key: "post-1",
        tag: "Tietopankki",
        title: "Mitä on rakenteiden kunnonvalvonta?",
        excerpt:
          "Selkeäkielinen johdatus kunnonvalvontaan: mitä anturit mittaavat, mitä mallit tuovat lisää, ja miksi jatkuva voittaa määräaikaisen.",
        date: "Tulossa",
      },
      {
        key: "post-2",
        tag: "Tietopankki",
        title: "Miksi jääkuormat ansaitsevat omat mallinsa",
        excerpt:
          "Itämeren talvijää työntää ja hankaa rakenteita vasten joka vuosi — eikä käyttäydy lainkaan kuten aallot.",
        date: "Tulossa",
      },
      {
        key: "post-3",
        tag: "Tietopankki",
        title: "Väsyminen vesirajan alla",
        excerpt:
          "Miten toistuva kuormitus synnyttää mikrohalkeamia, jotka kasvavat huomaamatta vuosien ajan — ja miten valvonta havaitsee ne ajoissa.",
        date: "Tulossa",
      },
      {
        key: "post-4",
        tag: "Uutiset",
        title: "Yrityspäivitykset",
        excerpt:
          "Tiedotteet piloteista, kumppaneista ja tiimistä julkaistaan täällä.",
        date: "Tulossa",
      },
    ],
  },

  FOOTER: {
    boilerplate:
      "Vellamo on suomalainen rakenteiden kunnonvalvontayhtiö meri- ja satamainfrastruktuurille. Vellamo on nimetty suomalaisen meren jumalattaren mukaan — pinnan alla olevan vartijan mukaan.",
    copyright: `© ${new Date().getFullYear()} Vellamo. Kaikki oikeudet pidätetään.`,
  },
};
