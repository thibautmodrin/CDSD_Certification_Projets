const pptxgen = require("pptxgenjs");

/**
 * Oral Certification CDSD — Bloc 1 (Kayak)
 * 8 slides · ~5 min présentation
 * Style aligné sur presentation.js
 */
async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title = "Bloc 1 — Kayak | Infrastructure de données";
  pres.author = "Thibaut Modrin";
  pres.subject = "RNCP35288 — Bloc 1 Construction et alimentation d'une infrastructure de gestion de données";

  const C = {
    navy: "1B2A4A",
    dk: "0F1B33",
    slate: "2D3E50",
    teal: "0E7C86",
    gold: "D4A843",
    off: "FAFAF7",
    wg: "E8E4DD",
    tx: "2C2C2C",
    mu: "6B7280",
    wh: "FFFFFF",
    lt: "E6F4F5",
    red: "B03A2E",
    grn: "1D7A4E",
    card: "F3F1EC",
  };
  const H = "Arial";
  const B = "Calibri";
  const TOTAL = 8;

  const footer = (s, n) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 5.35, w: 10, h: 0.275, fill: { color: C.navy },
    });
    s.addText("Thibaut Modrin  ·  RNCP35288  ·  Bloc 1 — Kayak", {
      x: 0.4, y: 5.38, w: 7, h: 0.22, fontFace: B, fontSize: 10, color: C.wg, margin: 0,
    });
    s.addText(`${n} / ${TOTAL}`, {
      x: 8.2, y: 5.38, w: 1.4, h: 0.22, fontFace: B, fontSize: 10, color: C.gold, align: "right", margin: 0,
    });
  };

  const sectionBar = (s) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.gold },
    });
  };

  // ════════════════════════════════════════
  // 1. TITLE
  // ════════════════════════════════════════
  let s = pres.addSlide();
  s.background = { color: C.dk };
  sectionBar(s);
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 4.55, w: 10, h: 1.075, fill: { color: C.navy },
  });
  s.addText("BLOC 1  ·  CERTIFICATION CDSD", {
    x: 0.7, y: 0.85, w: 8.5, h: 0.35, fontFace: B, fontSize: 13,
    color: C.gold, bold: true, charSpacing: 2, margin: 0,
  });
  s.addText("Plan Your Trip\nwith Kayak", {
    x: 0.7, y: 1.4, w: 8.5, h: 1.5, fontFace: H, fontSize: 40,
    color: C.wh, bold: true, margin: 0,
  });
  s.addText("Construction et alimentation d'une infrastructure de gestion de données", {
    x: 0.7, y: 3.15, w: 8.5, h: 0.4, fontFace: B, fontSize: 15,
    color: C.wg, italic: true, margin: 0,
  });
  s.addText("Thibaut Modrin  ·  Jedha  ·  RNCP35288", {
    x: 0.7, y: 4.85, w: 8.5, h: 0.35, fontFace: B, fontSize: 14, color: C.gold, margin: 0,
  });

  // ════════════════════════════════════════
  // 2. CONTEXTE BUSINESS
  // ════════════════════════════════════════
  s = pres.addSlide();
  s.background = { color: C.off };
  sectionBar(s);
  s.addText("Contexte business", {
    x: 0.5, y: 0.25, w: 9, h: 0.45, fontFace: H, fontSize: 24, color: C.navy, bold: true, margin: 0,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.75, w: 1.5, h: 0.04, fill: { color: C.gold },
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 1.1, w: 4.4, h: 1.7, fill: { color: C.navy }, rectRadius: 0.08,
  });
  s.addText("70 %", {
    x: 0.6, y: 1.3, w: 4, h: 0.7, fontFace: H, fontSize: 42, color: C.gold, bold: true, margin: 0,
  });
  s.addText("des voyageurs veulent plus d'infos\nsur la destination avant de réserver", {
    x: 0.6, y: 2.1, w: 4, h: 0.5, fontFace: B, fontSize: 13, color: C.wh, margin: 0,
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.1, y: 1.1, w: 4.4, h: 1.7, fill: { color: C.navy }, rectRadius: 0.08,
  });
  s.addText("~32 %", {
    x: 5.3, y: 1.3, w: 4, h: 0.7, fontFace: H, fontSize: 42, color: C.gold, bold: true, margin: 0,
  });
  s.addText("abandonnent si météo / hôtels\nsont insuffisamment renseignés", {
    x: 5.3, y: 2.1, w: 4, h: 0.5, fontFace: B, fontSize: 13, color: C.wh, margin: 0,
  });

  s.addText("Objectif data", {
    x: 0.5, y: 3.1, w: 9, h: 0.35, fontFace: H, fontSize: 16, color: C.teal, bold: true, margin: 0,
  });
  s.addText(
    "Construire un pipeline bout-en-bout : collecter GPS + météo + hôtels pour 35 villes FR,\nscorer les destinations, stocker en cloud (S3 + RDS) et visualiser sur une carte interactive.",
    {
      x: 0.5, y: 3.5, w: 9, h: 0.85, fontFace: B, fontSize: 15, color: C.tx, margin: 0,
    }
  );
  s.addText("Compétence RNCP · Bloc 1 — Infrastructure de gestion de données", {
    x: 0.5, y: 4.55, w: 9, h: 0.3, fontFace: B, fontSize: 12, color: C.mu, italic: true, margin: 0,
  });
  footer(s, 2);

  // ════════════════════════════════════════
  // 3. ARCHITECTURE PIPELINE
  // ════════════════════════════════════════
  s = pres.addSlide();
  s.background = { color: C.off };
  sectionBar(s);
  s.addText("Architecture du pipeline", {
    x: 0.4, y: 0.2, w: 9, h: 0.4, fontFace: H, fontSize: 22, color: C.navy, bold: true, margin: 0,
  });

  const steps = [
    { n: "1", t: "GPS", d: "Nominatim\nAPI" },
    { n: "2", t: "Météo", d: "OpenWeather\n+ score CCM" },
    { n: "3", t: "S3", d: "Data Lake\nCSV cloud" },
    { n: "4", t: "Scraping", d: "Scrapy\nBooking.com" },
    { n: "5", t: "RDS", d: "MySQL\nentrepôt" },
    { n: "6", t: "Viz", d: "Plotly /\nDash" },
  ];
  steps.forEach((st, i) => {
    const x = 0.3 + i * 1.6;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x, y: 0.85, w: 1.45, h: 2.55, fill: { color: C.navy }, rectRadius: 0.08,
    });
    s.addShape(pres.shapes.OVAL, {
      x: x + 0.45, y: 1.05, w: 0.55, h: 0.55, fill: { color: C.gold },
    });
    s.addText(st.n, {
      x: x + 0.45, y: 1.13, w: 0.55, h: 0.4, fontFace: H, fontSize: 16, color: C.dk, bold: true, align: "center", margin: 0,
    });
    s.addText(st.t, {
      x: x + 0.08, y: 1.8, w: 1.3, h: 0.4, fontFace: H, fontSize: 14, color: C.wh, bold: true, align: "center", margin: 0,
    });
    s.addText(st.d, {
      x: x + 0.08, y: 2.3, w: 1.3, h: 0.8, fontFace: B, fontSize: 11, color: C.wg, align: "center", margin: 0,
    });
    if (i < steps.length - 1) {
      s.addText("→", {
        x: x + 1.35, y: 1.85, w: 0.3, h: 0.4, fontFace: H, fontSize: 18, color: C.gold, margin: 0,
      });
    }
  });

  s.addText("Stack : Python · requests · Scrapy · boto3 · SQLAlchemy · pandas · Plotly · dotenv", {
    x: 0.4, y: 3.65, w: 9.2, h: 0.3, fontFace: B, fontSize: 13, color: C.mu, margin: 0,
  });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 4.15, w: 9.2, h: 0.85, fill: { color: C.lt }, rectRadius: 0.06,
  });
  s.addText("S3 = Data Lake (fichiers bruts / nettoyés)   ·   RDS = Data Warehouse (table relationnelle)\nSecrets externalisés (.env)  ·  Free Tier AWS (S3 + db.t4g.micro)  ·  rate limiting Scrapy", {
    x: 0.55, y: 4.3, w: 8.9, h: 0.6, fontFace: B, fontSize: 13, color: C.slate, margin: 0,
  });
  footer(s, 3);

  // ════════════════════════════════════════
  // 4. COLLECTE & ETL
  // ════════════════════════════════════════
  s = pres.addSlide();
  s.background = { color: C.off };
  sectionBar(s);
  s.addText("Collecte multi-sources & ETL", {
    x: 0.5, y: 0.2, w: 9, h: 0.4, fontFace: H, fontSize: 22, color: C.navy, bold: true, margin: 0,
  });

  const sources = [
    {
      t: "APIs REST",
      items: [
        "Nominatim → lat / lon (35 villes)",
        "OpenWeather → prévisions 7 jours",
        "Score CCM (temp., nuages, pluie…)",
      ],
    },
    {
      t: "Scraping web",
      items: [
        "Spider Scrapy (Booking.com)",
        "Autothrottle + cache HTTP",
        "Note, URL, GPS des hôtels",
      ],
    },
    {
      t: "ETL & stockage",
      items: [
        "Nettoyage / jointure pandas",
        "Upload S3 (boto3)",
        "Chargement RDS (to_sql)",
      ],
    },
  ];
  sources.forEach((src, i) => {
    const x = 0.35 + i * 3.2;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x, y: 0.85, w: 3.0, h: 3.5,
      fill: { color: C.wh },
      shadow: { type: "outer", color: "000000", blur: 4, opacity: 0.08, offset: 1 },
      rectRadius: 0.08,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: 0.85, w: 3.0, h: 0.55, fill: { color: C.navy },
    });
    s.addText(src.t, {
      x: x + 0.15, y: 0.95, w: 2.7, h: 0.35, fontFace: H, fontSize: 15, color: C.wh, bold: true, margin: 0,
    });
    src.items.forEach((item, j) => {
      s.addText("▸  " + item, {
        x: x + 0.2, y: 1.7 + j * 0.7, w: 2.6, h: 0.55,
        fontFace: B, fontSize: 13, color: C.tx, margin: 0,
      });
    });
  });
  footer(s, 4);

  // ════════════════════════════════════════
  // 5. RÉSULTATS CLÉS
  // ════════════════════════════════════════
  s = pres.addSlide();
  s.background = { color: C.off };
  sectionBar(s);
  s.addText("Résultats clés", {
    x: 0.5, y: 0.2, w: 9, h: 0.4, fontFace: H, fontSize: 22, color: C.navy, bold: true, margin: 0,
  });

  const metrics = [
    { v: "35", l: "Villes FR\ngéocodées" },
    { v: "~310", l: "Hôtels scrapés\n(échantillon)" },
    { v: "8.7", l: "Note moyenne\nhôtels / 10" },
    { v: "0.93", l: "Top CCM\n(Le Havre)" },
  ];
  metrics.forEach((m, i) => {
    const x = 0.4 + i * 2.4;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x, y: 0.85, w: 2.2, h: 1.95, fill: { color: C.navy }, rectRadius: 0.08,
    });
    s.addText(m.v, {
      x: x + 0.1, y: 1.1, w: 2.0, h: 0.7, fontFace: H, fontSize: 32, color: C.gold, bold: true, align: "center", margin: 0,
    });
    s.addText(m.l, {
      x: x + 0.1, y: 1.9, w: 2.0, h: 0.65, fontFace: B, fontSize: 13, color: C.wh, align: "center", margin: 0,
    });
  });

  s.addText("Livrables produits", {
    x: 0.5, y: 3.1, w: 9, h: 0.35, fontFace: H, fontSize: 16, color: C.teal, bold: true, margin: 0,
  });
  const livrables = [
    "CSV ranking météo (CCM) + jointure hôtels",
    "Bucket S3 + base MySQL RDS (table dbkayak)",
    "Carte interactive destinations + liens Booking",
    "Spider Scrapy CLI (booking_scrap_final.py)",
  ];
  livrables.forEach((l, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    s.addText("▸  " + l, {
      x: 0.5 + col * 4.7, y: 3.55 + row * 0.45, w: 4.5, h: 0.4,
      fontFace: B, fontSize: 13, color: C.tx, margin: 0,
    });
  });
  footer(s, 5);

  // ════════════════════════════════════════
  // 6. DÉMO LIVE
  // ════════════════════════════════════════
  s = pres.addSlide();
  s.background = { color: C.off };
  sectionBar(s);
  s.addText("Démonstration live", {
    x: 0.5, y: 0.25, w: 9, h: 0.4, fontFace: H, fontSize: 22, color: C.navy, bold: true, margin: 0,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.75, w: 1.5, h: 0.04, fill: { color: C.gold },
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 1.15, w: 9.2, h: 1.5, fill: { color: C.navy }, rectRadius: 0.08,
  });
  s.addText("Carte interactive Plotly", {
    x: 0.7, y: 1.4, w: 8.6, h: 0.45, fontFace: H, fontSize: 22, color: C.gold, bold: true, margin: 0,
  });
  s.addText("Destinations scorées (CCM) + marqueurs hôtels · filtres par ville / note", {
    x: 0.7, y: 2.0, w: 8.6, h: 0.4, fontFace: B, fontSize: 15, color: C.wh, margin: 0,
  });

  const demos = [
    { n: "01", t: "Ouvrir 7_Viz_Map.ipynb", d: "Carte météo + hôtels" },
    { n: "02", t: "Montrer un hôtel scrapé", d: "Note, GPS, URL Booking" },
    { n: "03", t: "Optionnel : requête RDS", d: "SELECT top destinations" },
  ];
  demos.forEach((d, i) => {
    const x = 0.4 + i * 3.15;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x, y: 2.95, w: 3.0, h: 1.85, fill: { color: C.wh },
      shadow: { type: "outer", color: "000000", blur: 4, opacity: 0.08, offset: 1 },
      rectRadius: 0.08,
    });
    s.addText(d.n, {
      x: x + 0.2, y: 3.15, w: 2.6, h: 0.35, fontFace: H, fontSize: 18, color: C.gold, bold: true, margin: 0,
    });
    s.addText(d.t, {
      x: x + 0.2, y: 3.6, w: 2.6, h: 0.55, fontFace: H, fontSize: 14, color: C.navy, bold: true, margin: 0,
    });
    s.addText(d.d, {
      x: x + 0.2, y: 4.25, w: 2.6, h: 0.35, fontFace: B, fontSize: 12, color: C.mu, margin: 0,
    });
  });
  footer(s, 6);

  // ════════════════════════════════════════
  // 7. COMPÉTENCES RNCP + LIMITES
  // ════════════════════════════════════════
  s = pres.addSlide();
  s.background = { color: C.off };
  sectionBar(s);
  s.addText("Compétences RNCP & limites", {
    x: 0.5, y: 0.2, w: 9, h: 0.4, fontFace: H, fontSize: 22, color: C.navy, bold: true, margin: 0,
  });

  // Left: compétences
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.35, y: 0.8, w: 4.55, h: 4.15, fill: { color: C.navy }, rectRadius: 0.08,
  });
  s.addText("Compétences couvertes", {
    x: 0.55, y: 1.0, w: 4.2, h: 0.35, fontFace: H, fontSize: 15, color: C.gold, bold: true, margin: 0,
  });
  const comps = [
    "Architecture Data Lake (S3) + Warehouse (RDS)",
    "Collecte multi-sources (API + scraping)",
    "ETL : nettoyage, jointure, chargement",
    "Sécurisation des credentials (.env)",
    "Viz décisionnelle (carte Plotly)",
    "Respect bonnes pratiques (rate limit, RGPD)",
  ];
  comps.forEach((c, i) => {
    s.addText("▸  " + c, {
      x: 0.55, y: 1.55 + i * 0.48, w: 4.15, h: 0.45,
      fontFace: B, fontSize: 13, color: C.wh, margin: 0,
    });
  });

  // Right: limites
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.1, y: 0.8, w: 4.55, h: 4.15, fill: { color: C.wh },
    shadow: { type: "outer", color: "000000", blur: 4, opacity: 0.08, offset: 1 },
    rectRadius: 0.08,
  });
  s.addText("Limites & améliorations", {
    x: 5.3, y: 1.0, w: 4.2, h: 0.35, fontFace: H, fontSize: 15, color: C.red, bold: true, margin: 0,
  });
  const lims = [
    { now: "Scraping fragile (DOM)", next: "→ sélecteurs / API officielle" },
    { now: "Notebooks manuels", next: "→ Airflow / Prefect" },
    { now: "ACL S3 parfois public", next: "→ IAM + signed URLs" },
    { now: "Score CCM simplifié", next: "→ pondération métier" },
    { now: "Peu de tests auto", next: "→ tests spider + schéma" },
  ];
  lims.forEach((l, i) => {
    s.addText(l.now, {
      x: 5.3, y: 1.55 + i * 0.55, w: 4.15, h: 0.25,
      fontFace: B, fontSize: 13, color: C.tx, margin: 0,
    });
    s.addText(l.next, {
      x: 5.3, y: 1.78 + i * 0.55, w: 4.15, h: 0.25,
      fontFace: B, fontSize: 12, color: C.grn, margin: 0,
    });
  });
  footer(s, 7);

  // ════════════════════════════════════════
  // 8. CONCLUSION / QUESTIONS
  // ════════════════════════════════════════
  s = pres.addSlide();
  s.background = { color: C.dk };
  sectionBar(s);
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 4.55, w: 10, h: 1.075, fill: { color: C.navy },
  });
  s.addText("En résumé", {
    x: 0.7, y: 0.9, w: 8.5, h: 0.4, fontFace: B, fontSize: 14, color: C.gold, bold: true, margin: 0,
  });
  s.addText("Un pipeline data complet\nde la collecte au décisionnel", {
    x: 0.7, y: 1.4, w: 8.5, h: 1.2, fontFace: H, fontSize: 28, color: C.wh, bold: true, margin: 0,
  });
  s.addText("API + Scrapy → S3 (Lake) → RDS (Warehouse) → carte Plotly", {
    x: 0.7, y: 2.8, w: 8.5, h: 0.4, fontFace: B, fontSize: 15, color: C.wg, margin: 0,
  });
  s.addText("Questions ?", {
    x: 0.7, y: 3.5, w: 8.5, h: 0.45, fontFace: H, fontSize: 22, color: C.gold, italic: true, margin: 0,
  });
  s.addText("Thibaut Modrin  ·  github.com/thibautmodrin/CDSD_Certification_Projets", {
    x: 0.7, y: 4.85, w: 8.5, h: 0.35, fontFace: B, fontSize: 13, color: C.gold, margin: 0,
  });

  const path = require("path");
  const outPath = path.join(__dirname, "Presentation_Bloc1_Kayak.pptx");
  await pres.writeFile({ fileName: outPath });
  console.log("Wrote", outPath);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
