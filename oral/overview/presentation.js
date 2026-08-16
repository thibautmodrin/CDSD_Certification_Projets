const pptxgen = require("pptxgenjs");

async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title = "Oral Certification Jedha — Data Science & IA";
  pres.author = "Thibaut Modrin";
  pres.subject = "RNCP35288 — Présentation des mini-projets";

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

  const footer = (s, n, total = 14) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 5.35, w: 10, h: 0.275, fill: { color: C.navy },
    });
    s.addText("Thibaut Modrin  ·  RNCP35288  ·  Jedha", {
      x: 0.4, y: 5.38, w: 6.5, h: 0.22, fontFace: B, fontSize: 10, color: C.wg, margin: 0,
    });
    s.addText(`${n} / ${total}`, {
      x: 8.2, y: 5.38, w: 1.4, h: 0.22, fontFace: B, fontSize: 10, color: C.gold, align: "right", margin: 0,
    });
  };

  const sectionBar = (s) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 0, w: 10, h: 0.06, fill: { color: C.gold },
    });
  };

  // ── 1. TITLE ──
  let s = pres.addSlide();
  s.background = { color: C.dk };
  sectionBar(s);
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 4.55, w: 10, h: 1.075, fill: { color: C.navy },
  });
  s.addText("ORAL DE CERTIFICATION", {
    x: 0.7, y: 0.9, w: 8.5, h: 0.35, fontFace: B, fontSize: 13,
    color: C.gold, bold: true, charSpacing: 3, margin: 0,
  });
  s.addText("Data Science &\nIntelligence Artificielle", {
    x: 0.7, y: 1.4, w: 8.5, h: 1.6, fontFace: H, fontSize: 36,
    color: C.wh, bold: true, margin: 0,
  });
  s.addText("Présentation des mini-projets — RNCP35288 (Niveau 6)", {
    x: 0.7, y: 3.25, w: 8.5, h: 0.4, fontFace: B, fontSize: 16,
    color: C.wg, italic: true, margin: 0,
  });
  s.addText("Thibaut Modrin  ·  Jedha Bootcamp  ·  2025–2026", {
    x: 0.7, y: 4.85, w: 8.5, h: 0.35, fontFace: B, fontSize: 14, color: C.gold, margin: 0,
  });

  // ── 2. AGENDA ──
  s = pres.addSlide();
  s.background = { color: C.off };
  sectionBar(s);
  s.addText("Agenda de l'oral", {
    x: 0.5, y: 0.25, w: 9, h: 0.5, fontFace: H, fontSize: 26, color: C.navy, bold: true, margin: 0,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.8, w: 1.5, h: 0.04, fill: { color: C.gold },
  });

  const agenda = [
    { n: "01", t: "Parcours & objectifs de certification" },
    { n: "02", t: "Cartographie des 8 mini-projets ↔ blocs RNCP" },
    { n: "03", t: "Focus Projet 1 — Kayak (pipeline data)" },
    { n: "04", t: "Tour d'horizon — EDA, ML, DL, déploiement" },
    { n: "05", t: "Compétences, limites & perspectives" },
  ];
  agenda.forEach((a, i) => {
    const y = 1.15 + i * 0.72;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.5, y: y, w: 9, h: 0.6,
      fill: { color: i % 2 === 0 ? C.card : C.wh },
      rectRadius: 0.06,
    });
    s.addText(a.n, {
      x: 0.7, y: y + 0.1, w: 0.9, h: 0.4, fontFace: H, fontSize: 20, color: C.gold, bold: true, margin: 0,
    });
    s.addText(a.t, {
      x: 1.8, y: y + 0.12, w: 7.4, h: 0.4, fontFace: B, fontSize: 16, color: C.tx, margin: 0,
    });
  });
  footer(s, 2);

  // ── 3. OBJECTIFS ──
  s = pres.addSlide();
  s.background = { color: C.off };
  sectionBar(s);
  s.addText("Objectifs de la certification", {
    x: 0.5, y: 0.25, w: 9, h: 0.45, fontFace: H, fontSize: 24, color: C.navy, bold: true, margin: 0,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.75, w: 1.5, h: 0.04, fill: { color: C.gold },
  });

  const goals = [
    { t: "Collecter & industrialiser", d: "APIs, scraping, cloud (S3/RDS), pipelines reproductibles" },
    { t: "Explorer & visualiser", d: "EDA, stats descriptives, storytelling data" },
    { t: "Prédire (structuré)", d: "Régression, classification, clustering, métriques métier" },
    { t: "Prédire (non structuré)", d: "NLP, deep learning, transfer learning (BERT)" },
    { t: "Déployer & décider", d: "API FastAPI, dashboard, industrialisation ML" },
    { t: "Piloter un projet data", d: "Problème business → livrable → recommandations" },
  ];
  goals.forEach((g, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.4 + col * 3.15;
    const y = 1.1 + row * 1.85;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x, y: y, w: 3.0, h: 1.6,
      fill: { color: C.wh },
      shadow: { type: "outer", color: "000000", blur: 4, opacity: 0.08, offset: 1 },
      rectRadius: 0.08,
    });
    s.addShape(pres.shapes.RECTANGLE, {
      x: x, y: y, w: 0.1, h: 1.6, fill: { color: C.teal },
    });
    s.addText(g.t, {
      x: x + 0.25, y: y + 0.25, w: 2.55, h: 0.45, fontFace: H, fontSize: 14, color: C.navy, bold: true, margin: 0,
    });
    s.addText(g.d, {
      x: x + 0.25, y: y + 0.75, w: 2.55, h: 0.65, fontFace: B, fontSize: 12, color: C.mu, margin: 0,
    });
  });
  footer(s, 3);

  // ── 4. CARTOGRAPHIE ──
  s = pres.addSlide();
  s.background = { color: C.off };
  sectionBar(s);
  s.addText("8 mini-projets · 6 blocs RNCP", {
    x: 0.4, y: 0.2, w: 9, h: 0.4, fontFace: H, fontSize: 22, color: C.navy, bold: true, margin: 0,
  });

  const projects = [
    { n: "P1", name: "Kayak", bloc: "B1", tag: "Data pipeline" },
    { n: "P2", name: "Tinder EDA", bloc: "B2", tag: "Visualisation" },
    { n: "P3", name: "Steam", bloc: "B1–2", tag: "Big Data" },
    { n: "P4", name: "Walmart", bloc: "B3", tag: "Régression" },
    { n: "P5", name: "Conversion", bloc: "B3", tag: "Classification" },
    { n: "P6", name: "Uber", bloc: "B3", tag: "Clustering" },
    { n: "P7", name: "AT&T Spam", bloc: "B4", tag: "Deep Learning" },
    { n: "P8", name: "Getaround", bloc: "B5–6", tag: "Déploiement" },
  ];
  projects.forEach((p, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const x = 0.35 + col * 2.4;
    const y = 0.85 + row * 2.05;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x, y: y, w: 2.25, h: 1.85,
      fill: { color: C.navy },
      rectRadius: 0.08,
    });
    s.addText(p.n, {
      x: x + 0.15, y: y + 0.2, w: 1.9, h: 0.3, fontFace: H, fontSize: 12, color: C.gold, bold: true, margin: 0,
    });
    s.addText(p.name, {
      x: x + 0.15, y: y + 0.55, w: 1.9, h: 0.4, fontFace: H, fontSize: 16, color: C.wh, bold: true, margin: 0,
    });
    s.addText(p.tag, {
      x: x + 0.15, y: y + 1.05, w: 1.9, h: 0.3, fontFace: B, fontSize: 12, color: C.wg, margin: 0,
    });
    s.addText("Bloc " + p.bloc, {
      x: x + 0.15, y: y + 1.4, w: 1.9, h: 0.25, fontFace: B, fontSize: 11, color: C.teal, margin: 0,
    });
  });
  footer(s, 4);

  // ── 5. KAYAK PROBLEM ──
  s = pres.addSlide();
  s.background = { color: C.off };
  sectionBar(s);
  s.addText("Focus P1 — Kayak : le problème", {
    x: 0.5, y: 0.25, w: 9, h: 0.45, fontFace: H, fontSize: 24, color: C.navy, bold: true, margin: 0,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.75, w: 1.5, h: 0.04, fill: { color: C.gold },
  });

  // two big stats
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

  s.addText("Mission data", {
    x: 0.5, y: 3.1, w: 9, h: 0.35, fontFace: H, fontSize: 16, color: C.teal, bold: true, margin: 0,
  });
  s.addText(
    "Construire un pipeline complet : collecter GPS + météo + hôtels pour 35 villes françaises,\nscorer les destinations, stocker en cloud (S3 + RDS) et visualiser sur une carte interactive.",
    {
      x: 0.5, y: 3.5, w: 9, h: 0.9, fontFace: B, fontSize: 15, color: C.tx, margin: 0,
    }
  );
  s.addText("Compétence RNCP · Bloc 1 — Infrastructure de gestion de données", {
    x: 0.5, y: 4.6, w: 9, h: 0.35, fontFace: B, fontSize: 12, color: C.mu, italic: true, margin: 0,
  });
  footer(s, 5);

  // ── 6. ARCHITECTURE ──
  s = pres.addSlide();
  s.background = { color: C.off };
  sectionBar(s);
  s.addText("Architecture du pipeline Kayak", {
    x: 0.4, y: 0.2, w: 9, h: 0.4, fontFace: H, fontSize: 22, color: C.navy, bold: true, margin: 0,
  });

  const steps = [
    { n: "1", t: "GPS", d: "Nominatim\nAPI" },
    { n: "2", t: "Météo", d: "OpenWeather\n+ score CCM" },
    { n: "3", t: "S3", d: "Stockage\nCSV cloud" },
    { n: "4", t: "Scraping", d: "Scrapy\nBooking.com" },
    { n: "5", t: "RDS", d: "MySQL\nrelationnel" },
    { n: "6", t: "Viz", d: "Plotly /\nDash" },
  ];
  steps.forEach((st, i) => {
    const x = 0.3 + i * 1.6;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x, y: 1.1, w: 1.45, h: 2.4, fill: { color: C.navy }, rectRadius: 0.08,
    });
    s.addShape(pres.shapes.OVAL, {
      x: x + 0.45, y: 1.3, w: 0.55, h: 0.55, fill: { color: C.gold },
    });
    s.addText(st.n, {
      x: x + 0.45, y: 1.38, w: 0.55, h: 0.4, fontFace: H, fontSize: 16, color: C.dk, bold: true, align: "center", margin: 0,
    });
    s.addText(st.t, {
      x: x + 0.08, y: 2.05, w: 1.3, h: 0.4, fontFace: H, fontSize: 14, color: C.wh, bold: true, align: "center", margin: 0,
    });
    s.addText(st.d, {
      x: x + 0.08, y: 2.55, w: 1.3, h: 0.7, fontFace: B, fontSize: 11, color: C.wg, align: "center", margin: 0,
    });
    if (i < steps.length - 1) {
      s.addText("→", {
        x: x + 1.35, y: 2.0, w: 0.3, h: 0.4, fontFace: H, fontSize: 18, color: C.gold, margin: 0,
      });
    }
  });

  s.addText("Outils : Python · requests · Scrapy · boto3 · SQLAlchemy · pandas · Plotly · dotenv", {
    x: 0.4, y: 3.8, w: 9.2, h: 0.35, fontFace: B, fontSize: 13, color: C.mu, margin: 0,
  });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 4.3, w: 9.2, h: 0.7, fill: { color: C.lt }, rectRadius: 0.06,
  });
  s.addText("Secrets externalisés (.env) · rate limiting Scrapy · Free Tier AWS (S3 + db.t4g.micro)", {
    x: 0.6, y: 4.45, w: 8.8, h: 0.4, fontFace: B, fontSize: 13, color: C.slate, margin: 0,
  });
  footer(s, 6);

  // ── 7. RESULTATS KAYAK ──
  s = pres.addSlide();
  s.background = { color: C.off };
  sectionBar(s);
  s.addText("Résultats Kayak — chiffres clés", {
    x: 0.5, y: 0.25, w: 9, h: 0.4, fontFace: H, fontSize: 22, color: C.navy, bold: true, margin: 0,
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
      x: x, y: 0.9, w: 2.2, h: 1.9, fill: { color: C.navy }, rectRadius: 0.08,
    });
    s.addText(m.v, {
      x: x + 0.1, y: 1.15, w: 2.0, h: 0.7, fontFace: H, fontSize: 32, color: C.gold, bold: true, align: "center", margin: 0,
    });
    s.addText(m.l, {
      x: x + 0.1, y: 1.95, w: 2.0, h: 0.6, fontFace: B, fontSize: 13, color: C.wh, align: "center", margin: 0,
    });
  });

  s.addText("Livrables", {
    x: 0.5, y: 3.1, w: 9, h: 0.35, fontFace: H, fontSize: 16, color: C.teal, bold: true, margin: 0,
  });
  const livrables = [
    "CSV ranking météo (CCM) + jointure hôtels",
    "Bucket S3 + base MySQL RDS (table dbkayak)",
    "Carte interactive destinations + liens Booking",
    "Code Scrapy CLI (booking_scrap_final.py)",
  ];
  livrables.forEach((l, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    s.addText("▸  " + l, {
      x: 0.5 + col * 4.7, y: 3.55 + row * 0.45, w: 4.5, h: 0.4,
      fontFace: B, fontSize: 13, color: C.tx, margin: 0,
    });
  });
  footer(s, 7);

  // ── 8. EDA / BIG DATA ──
  s = pres.addSlide();
  s.background = { color: C.off };
  sectionBar(s);
  s.addText("P2–P3 — Explorer les données", {
    x: 0.5, y: 0.25, w: 9, h: 0.4, fontFace: H, fontSize: 22, color: C.navy, bold: true, margin: 0,
  });

  // P2 card
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 0.9, w: 4.5, h: 3.9, fill: { color: C.wh },
    shadow: { type: "outer", color: "000000", blur: 5, opacity: 0.08, offset: 1 },
    rectRadius: 0.08,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.4, y: 0.9, w: 4.5, h: 0.55, fill: { color: C.navy },
  });
  s.addText("P2 · Tinder / Speed Dating", {
    x: 0.55, y: 1.0, w: 4.2, h: 0.35, fontFace: H, fontSize: 14, color: C.wh, bold: true, margin: 0,
  });
  s.addText("Bloc 2 — EDA & visualisation", {
    x: 0.6, y: 1.6, w: 4.1, h: 0.3, fontFace: B, fontSize: 12, color: C.teal, bold: true, margin: 0,
  });
  s.addText([
    { text: "Dataset speed dating (préférences, matchs)", options: { breakLine: true } },
    { text: "Nettoyage waves 6–9 (échelle incompatible)", options: { breakLine: true } },
    { text: "9 visualisations (genre, race, ordre des dates…)", options: { breakLine: true } },
    { text: "Insights : attributs désirables H/F, biais de match", options: { breakLine: true } },
  ], {
    x: 0.6, y: 2.1, w: 4.1, h: 2.2, fontFace: B, fontSize: 13, color: C.tx, margin: 0, paraSpacing: 8,
  });

  // P3 card
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.1, y: 0.9, w: 4.5, h: 3.9, fill: { color: C.wh },
    shadow: { type: "outer", color: "000000", blur: 5, opacity: 0.08, offset: 1 },
    rectRadius: 0.08,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 5.1, y: 0.9, w: 4.5, h: 0.55, fill: { color: C.navy },
  });
  s.addText("P3 · Steam (Big Data)", {
    x: 5.25, y: 1.0, w: 4.2, h: 0.35, fontFace: H, fontSize: 14, color: C.wh, bold: true, margin: 0,
  });
  s.addText("Blocs 1–2 — volume & EDA", {
    x: 5.3, y: 1.6, w: 4.1, h: 0.3, fontFace: B, fontSize: 12, color: C.teal, bold: true, margin: 0,
  });
  s.addText([
    { text: "Notebook Databricks (Spark)", options: { breakLine: true } },
    { text: "Nettoyage / tidying de données jeux", options: { breakLine: true } },
    { text: "Analyse exploratoire à l'échelle cloud", options: { breakLine: true } },
    { text: "Passage d'un volume local à un environnement Big Data", options: { breakLine: true } },
  ], {
    x: 5.3, y: 2.1, w: 4.1, h: 2.2, fontFace: B, fontSize: 13, color: C.tx, margin: 0, paraSpacing: 8,
  });
  footer(s, 8);

  // ── 9. ML SUPERVISE ──
  s = pres.addSlide();
  s.background = { color: C.off };
  sectionBar(s);
  s.addText("P4–P5 — Machine Learning supervisé", {
    x: 0.5, y: 0.2, w: 9, h: 0.4, fontFace: H, fontSize: 22, color: C.navy, bold: true, margin: 0,
  });

  // Walmart
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.35, y: 0.8, w: 4.55, h: 4.1, fill: { color: C.navy }, rectRadius: 0.08,
  });
  s.addText("P4 · WALMART", {
    x: 0.55, y: 1.0, w: 4.2, h: 0.3, fontFace: H, fontSize: 12, color: C.gold, bold: true, margin: 0,
  });
  s.addText("Prédiction des ventes\nhebdomadaires", {
    x: 0.55, y: 1.4, w: 4.2, h: 0.7, fontFace: H, fontSize: 18, color: C.wh, bold: true, margin: 0,
  });
  s.addText("R² test", {
    x: 0.55, y: 2.3, w: 4.2, h: 0.25, fontFace: B, fontSize: 12, color: C.wg, margin: 0,
  });
  s.addText("0.93", {
    x: 0.55, y: 2.55, w: 4.2, h: 0.55, fontFace: H, fontSize: 36, color: C.gold, bold: true, margin: 0,
  });
  s.addText("Ridge (α optimisé) · features store / holiday / fuel\nRégression linéaire + régularisation", {
    x: 0.55, y: 3.3, w: 4.15, h: 0.9, fontFace: B, fontSize: 13, color: C.wg, margin: 0,
  });
  s.addText("Métrique : R²  ·  Bloc 3", {
    x: 0.55, y: 4.4, w: 4.15, h: 0.3, fontFace: B, fontSize: 12, color: C.teal, margin: 0,
  });

  // Conversion
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.1, y: 0.8, w: 4.55, h: 4.1, fill: { color: C.navy }, rectRadius: 0.08,
  });
  s.addText("P5 · CONVERSION RATE", {
    x: 5.3, y: 1.0, w: 4.2, h: 0.3, fontFace: H, fontSize: 12, color: C.gold, bold: true, margin: 0,
  });
  s.addText("Prédire l'inscription\nnewsletter", {
    x: 5.3, y: 1.4, w: 4.2, h: 0.7, fontFace: H, fontSize: 18, color: C.wh, bold: true, margin: 0,
  });
  s.addText("F1-score", {
    x: 5.3, y: 2.3, w: 4.2, h: 0.25, fontFace: B, fontSize: 12, color: C.wg, margin: 0,
  });
  s.addText("0.777", {
    x: 5.3, y: 2.55, w: 4.2, h: 0.55, fontFace: H, fontSize: 36, color: C.gold, bold: true, margin: 0,
  });
  s.addText("Logistic Regression > XGB / RF\nSeuil optimisé 0.96 · classe déséquilibrée", {
    x: 5.3, y: 3.3, w: 4.15, h: 0.9, fontFace: B, fontSize: 13, color: C.wg, margin: 0,
  });
  s.addText("Levier : pages visitées, source, pays  ·  Bloc 3", {
    x: 5.3, y: 4.4, w: 4.15, h: 0.3, fontFace: B, fontSize: 12, color: C.teal, margin: 0,
  });
  footer(s, 9);

  // ── 10. UNSUP + DL ──
  s = pres.addSlide();
  s.background = { color: C.off };
  sectionBar(s);
  s.addText("P6–P7 — Clustering & Deep Learning", {
    x: 0.5, y: 0.2, w: 9, h: 0.4, fontFace: H, fontSize: 22, color: C.navy, bold: true, margin: 0,
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.35, y: 0.8, w: 4.55, h: 4.1, fill: { color: C.wh },
    shadow: { type: "outer", color: "000000", blur: 5, opacity: 0.08, offset: 1 },
    rectRadius: 0.08,
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.35, y: 0.8, w: 0.12, h: 4.1, fill: { color: C.teal } });
  s.addText("P6 · UBER NYC", {
    x: 0.7, y: 1.0, w: 4, h: 0.3, fontFace: H, fontSize: 13, color: C.gold, bold: true, margin: 0,
  });
  s.addText("Zones de forte demande", {
    x: 0.7, y: 1.4, w: 4, h: 0.4, fontFace: H, fontSize: 18, color: C.navy, bold: true, margin: 0,
  });
  s.addText([
    { text: "Clustering spatial lat/lon (+ heure)", options: { breakLine: true } },
    { text: "KMeans (k=6, elbow + silhouette)", options: { breakLine: true } },
    { text: "DBSCAN (densité, outliers)", options: { breakLine: true } },
    { text: "Cartes animées Plotly Mapbox", options: { breakLine: true } },
    { text: "Aide au positionnement des chauffeurs", options: { breakLine: true } },
  ], {
    x: 0.7, y: 2.0, w: 3.9, h: 2.4, fontFace: B, fontSize: 14, color: C.tx, margin: 0, paraSpacing: 6,
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.1, y: 0.8, w: 4.55, h: 4.1, fill: { color: C.wh },
    shadow: { type: "outer", color: "000000", blur: 5, opacity: 0.08, offset: 1 },
    rectRadius: 0.08,
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.1, y: 0.8, w: 0.12, h: 4.1, fill: { color: C.gold } });
  s.addText("P7 · AT&T SPAM", {
    x: 5.45, y: 1.0, w: 4, h: 0.3, fontFace: H, fontSize: 13, color: C.gold, bold: true, margin: 0,
  });
  s.addText("Détecteur SMS spam", {
    x: 5.45, y: 1.4, w: 4, h: 0.4, fontFace: H, fontSize: 18, color: C.navy, bold: true, margin: 0,
  });
  s.addText([
    { text: "NLP · classification binaire spam/ham", options: { breakLine: true } },
    { text: "Modèle séquentiel simple → Acc. 97.9 %", options: { breakLine: true } },
    { text: "F1-score : 0.92 (modèle simple)", options: { breakLine: true } },
    { text: "BERT transfer learning testé", options: { breakLine: true } },
    { text: "Bloc 4 — données non structurées", options: { breakLine: true } },
  ], {
    x: 5.45, y: 2.0, w: 3.9, h: 2.4, fontFace: B, fontSize: 14, color: C.tx, margin: 0, paraSpacing: 6,
  });
  footer(s, 10);

  // ── 11. GETAROUND ──
  s = pres.addSlide();
  s.background = { color: C.off };
  sectionBar(s);
  s.addText("P8 — Getaround : industrialiser", {
    x: 0.5, y: 0.25, w: 9, h: 0.4, fontFace: H, fontSize: 22, color: C.navy, bold: true, margin: 0,
  });
  s.addText("Blocs 5 & 6 — Déploiement, automatisation, pilotage projet", {
    x: 0.5, y: 0.7, w: 9, h: 0.3, fontFace: B, fontSize: 13, color: C.teal, margin: 0,
  });

  const ga = [
    { t: "Analyse retards", d: "Impact d'un seuil (threshold) sur les check-in / check-out entre locations" },
    { t: "Modèle pricing", d: "Régression Ridge pour estimer le prix de location d'un véhicule" },
    { t: "API FastAPI", d: "Endpoint /predict — inférence en production avec artefacts joblib" },
    { t: "Dashboard", d: "Streamlit pour explorer retards, pricing et scénarios métier" },
  ];
  ga.forEach((g, i) => {
    const y = 1.2 + i * 0.9;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: 0.4, y: y, w: 9.2, h: 0.75, fill: { color: i % 2 ? C.card : C.wh }, rectRadius: 0.06,
    });
    s.addShape(pres.shapes.OVAL, {
      x: 0.6, y: y + 0.18, w: 0.4, h: 0.4, fill: { color: C.navy },
    });
    s.addText(String(i + 1), {
      x: 0.6, y: y + 0.24, w: 0.4, h: 0.3, fontFace: H, fontSize: 14, color: C.gold, bold: true, align: "center", margin: 0,
    });
    s.addText(g.t, {
      x: 1.25, y: y + 0.1, w: 3, h: 0.3, fontFace: H, fontSize: 15, color: C.navy, bold: true, margin: 0,
    });
    s.addText(g.d, {
      x: 4.3, y: y + 0.15, w: 5.1, h: 0.45, fontFace: B, fontSize: 13, color: C.tx, margin: 0,
    });
  });
  footer(s, 11);

  // ── 12. COMPETENCES ──
  s = pres.addSlide();
  s.background = { color: C.off };
  sectionBar(s);
  s.addText("Compétences démontrées", {
    x: 0.5, y: 0.25, w: 9, h: 0.4, fontFace: H, fontSize: 22, color: C.navy, bold: true, margin: 0,
  });

  const comps = [
    { b: "B1", items: "API · Scraping · S3 · RDS · ETL" },
    { b: "B2", items: "EDA · Stats · Storytelling viz" },
    { b: "B3", items: "Régression · Classif. · Clustering" },
    { b: "B4", items: "NLP · TensorFlow · Transfer learning" },
    { b: "B5", items: "FastAPI · Streamlit · Artefacts ML" },
    { b: "B6", items: "Cadrage · Livrables · Recos métier" },
  ];
  comps.forEach((c, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.4 + col * 3.15;
    const y = 0.95 + row * 1.9;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x, y: y, w: 3.0, h: 1.65, fill: { color: C.navy }, rectRadius: 0.08,
    });
    s.addText(c.b, {
      x: x + 0.2, y: y + 0.3, w: 2.6, h: 0.4, fontFace: H, fontSize: 22, color: C.gold, bold: true, margin: 0,
    });
    s.addText(c.items, {
      x: x + 0.2, y: y + 0.85, w: 2.6, h: 0.55, fontFace: B, fontSize: 13, color: C.wh, margin: 0,
    });
  });
  footer(s, 12);

  // ── 13. LIMITES ──
  s = pres.addSlide();
  s.background = { color: C.off };
  sectionBar(s);
  s.addText("Limites & pistes d'amélioration", {
    x: 0.5, y: 0.25, w: 9, h: 0.4, fontFace: H, fontSize: 22, color: C.navy, bold: true, margin: 0,
  });

  // two columns
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.35, y: 0.9, w: 4.55, h: 3.9, fill: { color: C.wh },
    shadow: { type: "outer", color: "000000", blur: 4, opacity: 0.08, offset: 1 },
    rectRadius: 0.08,
  });
  s.addText("Aujourd'hui", {
    x: 0.55, y: 1.1, w: 4.2, h: 0.4, fontFace: H, fontSize: 16, color: C.red, bold: true, margin: 0,
  });
  s.addText([
    { text: "Scraping fragile (DOM Booking)", options: { breakLine: true } },
    { text: "Pipelines manuels (notebooks)", options: { breakLine: true } },
    { text: "Peu de tests automatisés", options: { breakLine: true } },
    { text: "S3 parfois en public-read", options: { breakLine: true } },
    { text: "Métriques DL à mieux calibrer (BERT)", options: { breakLine: true } },
  ], {
    x: 0.55, y: 1.7, w: 4.15, h: 2.7, fontFace: B, fontSize: 14, color: C.tx, margin: 0, paraSpacing: 8,
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.1, y: 0.9, w: 4.55, h: 3.9, fill: { color: C.wh },
    shadow: { type: "outer", color: "000000", blur: 4, opacity: 0.08, offset: 1 },
    rectRadius: 0.08,
  });
  s.addText("Demain", {
    x: 5.3, y: 1.1, w: 4.2, h: 0.4, fontFace: H, fontSize: 16, color: C.grn, bold: true, margin: 0,
  });
  s.addText([
    { text: "Orchestration (Airflow / Prefect)", options: { breakLine: true } },
    { text: "CI/CD + tests unitaires data", options: { breakLine: true } },
    { text: "Monitoring modèle en prod", options: { breakLine: true } },
    { text: "Feature store & versioning (DVC/MLflow)", options: { breakLine: true } },
    { text: "Accès cloud privé (IAM, signed URLs)", options: { breakLine: true } },
  ], {
    x: 5.3, y: 1.7, w: 4.15, h: 2.7, fontFace: B, fontSize: 14, color: C.tx, margin: 0, paraSpacing: 8,
  });
  footer(s, 13);

  // ── 14. CLOSING ──
  s = pres.addSlide();
  s.background = { color: C.dk };
  sectionBar(s);
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 4.55, w: 10, h: 1.075, fill: { color: C.navy },
  });
  s.addText("Merci", {
    x: 0.7, y: 1.3, w: 8.5, h: 0.8, fontFace: H, fontSize: 48, color: C.wh, bold: true, margin: 0,
  });
  s.addText("Questions & échanges", {
    x: 0.7, y: 2.2, w: 8.5, h: 0.5, fontFace: B, fontSize: 22, color: C.gold, italic: true, margin: 0,
  });
  s.addText("GitHub  ·  thibautmodrin/CDSD_Certification_Projets", {
    x: 0.7, y: 3.1, w: 8.5, h: 0.4, fontFace: B, fontSize: 14, color: C.wg, margin: 0,
  });
  s.addText("Thibaut Modrin  ·  Data Scientist — RNCP35288  ·  Jedha", {
    x: 0.7, y: 4.85, w: 8.5, h: 0.35, fontFace: B, fontSize: 14, color: C.gold, margin: 0,
  });

  const path = require("path");
  const outPath = path.join(__dirname, "Presentation_Orale_Certification_Jedha.pptx");
  await pres.writeFile({ fileName: outPath });
  console.log("Wrote", outPath);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
