const pptxgen = require("pptxgenjs");

/**
 * Oral Certification CDSD — Bloc 2 (Steam)
 * 8 slides · ~5 min présentation
 * Style aligné sur presentation_bloc1_kayak.js
 */
async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title = "Bloc 2 — Steam | Analyse exploratoire";
  pres.author = "Thibaut Modrin";
  pres.subject =
    "RNCP35288 — Bloc 2 Analyse exploratoire, descriptive et inférentielle de données";

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
    s.addText("Thibaut Modrin  ·  RNCP35288  ·  Bloc 2 — Steam", {
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
  s.addText("BLOC 2  ·  CERTIFICATION CDSD", {
    x: 0.7, y: 0.85, w: 8.5, h: 0.35, fontFace: B, fontSize: 13,
    color: C.gold, bold: true, charSpacing: 2, margin: 0,
  });
  s.addText("Steam Games\nEDA at Scale", {
    x: 0.7, y: 1.4, w: 8.5, h: 1.5, fontFace: H, fontSize: 40,
    color: C.wh, bold: true, margin: 0,
  });
  s.addText("Analyse exploratoire, descriptive et storytelling data (PySpark / Databricks)", {
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
  s.addText("Contexte & problématique", {
    x: 0.5, y: 0.25, w: 9, h: 0.45, fontFace: H, fontSize: 24, color: C.navy, bold: true, margin: 0,
  });
  s.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.75, w: 1.5, h: 0.04, fill: { color: C.gold },
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 1.1, w: 4.4, h: 1.7, fill: { color: C.navy }, rectRadius: 0.08,
  });
  s.addText("JSON imbriqué", {
    x: 0.6, y: 1.3, w: 4, h: 0.55, fontFace: H, fontSize: 26, color: C.gold, bold: true, margin: 0,
  });
  s.addText("Catalogue Steam brut sur S3\nschema complexe, multi-niveaux", {
    x: 0.6, y: 2.0, w: 4, h: 0.55, fontFace: B, fontSize: 13, color: C.wh, margin: 0,
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.1, y: 1.1, w: 4.4, h: 1.7, fill: { color: C.navy }, rectRadius: 0.08,
  });
  s.addText("Volume cloud", {
    x: 5.3, y: 1.3, w: 4, h: 0.55, fontFace: H, fontSize: 26, color: C.gold, bold: true, margin: 0,
  });
  s.addText("Traitement distribué Spark\nau-delà d'un notebook local", {
    x: 5.3, y: 2.0, w: 4, h: 0.55, fontFace: B, fontSize: 13, color: C.wh, margin: 0,
  });

  s.addText("Objectif data", {
    x: 0.5, y: 3.1, w: 9, h: 0.35, fontFace: H, fontSize: 16, color: C.teal, bold: true, margin: 0,
  });
  s.addText(
    "Tidyiser le catalogue Steam, puis répondre à des questions métier : éditeurs, ratings,\nsorties (Covid), prix / remises, langues, âges, genres et qualité des avis.",
    {
      x: 0.5, y: 3.5, w: 9, h: 0.85, fontFace: B, fontSize: 15, color: C.tx, margin: 0,
    }
  );
  s.addText("Compétence RNCP · Bloc 2 — Analyse exploratoire, descriptive et inférentielle", {
    x: 0.5, y: 4.55, w: 9, h: 0.3, fontFace: B, fontSize: 12, color: C.mu, italic: true, margin: 0,
  });
  footer(s, 2);

  // ════════════════════════════════════════
  // 3. ARCHITECTURE / PIPELINE
  // ════════════════════════════════════════
  s = pres.addSlide();
  s.background = { color: C.off };
  sectionBar(s);
  s.addText("Parcours d'analyse", {
    x: 0.4, y: 0.2, w: 9, h: 0.4, fontFace: H, fontSize: 22, color: C.navy, bold: true, margin: 0,
  });

  const steps = [
    { n: "1", t: "S3", d: "JSON Steam\nbrut" },
    { n: "2", t: "Schema", d: "walkSchema\nnested fields" },
    { n: "3", t: "Tidying", d: "Flatten +\ncast colonnes" },
    { n: "4", t: "EDA", d: "7 questions\nmétier" },
    { n: "5", t: "Score", d: "ratings_score\nratio × volume" },
    { n: "6", t: "Insights", d: "Viz Databricks\n+ storytelling" },
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

  s.addText("Stack : Databricks · PySpark · S3 · pandas · display / viz cloud", {
    x: 0.4, y: 3.65, w: 9.2, h: 0.3, fontFace: B, fontSize: 13, color: C.mu, margin: 0,
  });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 4.15, w: 9.2, h: 0.85, fill: { color: C.lt }, rectRadius: 0.06,
  });
  s.addText(
    "Source : s3://…/Project_Steam/steam_game_output.json\nEnvironnement : notebook Databricks (Spark) — passage du local au Big Data",
    {
      x: 0.55, y: 4.3, w: 8.9, h: 0.6, fontFace: B, fontSize: 13, color: C.slate, margin: 0,
    }
  );
  footer(s, 3);

  // ════════════════════════════════════════
  // 4. TIDYING & PREPROCESSING
  // ════════════════════════════════════════
  s = pres.addSlide();
  s.background = { color: C.off };
  sectionBar(s);
  s.addText("Tidying & preprocessing", {
    x: 0.5, y: 0.2, w: 9, h: 0.4, fontFace: H, fontSize: 22, color: C.navy, bold: true, margin: 0,
  });

  const sources = [
    {
      t: "Schema nested",
      items: [
        "printSchema + walkSchema",
        "Exploration récursive des champs",
        "Exclusion ciblée de data.tags",
      ],
    },
    {
      t: "Flatten / cast",
      items: [
        "Colonnes extraites du JSON",
        "Drop appid redondant",
        "Prix / centimes → float",
      ],
    },
    {
      t: "Qualité data",
      items: [
        "Comptage des nulls (toPandas)",
        "Nettoyage langues / âges",
        "Explode genres & languages",
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
  // 5. QUESTIONS MÉTIER / EDA
  // ════════════════════════════════════════
  s = pres.addSlide();
  s.background = { color: C.off };
  sectionBar(s);
  s.addText("7 questions métier explorées", {
    x: 0.5, y: 0.2, w: 9, h: 0.4, fontFace: H, fontSize: 22, color: C.navy, bold: true, margin: 0,
  });

  const questions = [
    { n: "01", t: "Éditeurs", d: "Qui publie le plus de jeux ?" },
    { n: "02", t: "Ratings", d: "Meilleurs jeux (score pondéré)" },
    { n: "03", t: "Années", d: "Pics de sorties / effet Covid" },
    { n: "04", t: "Prix", d: "Distribution & remises" },
    { n: "05", t: "Langues", d: "Langues les plus supportées" },
    { n: "06", t: "Âges", d: "Jeux interdits −16 / −18" },
    { n: "07", t: "Genres", d: "Volume + ratio avis positifs" },
  ];
  questions.forEach((q, i) => {
    const col = i % 4;
    const row = Math.floor(i / 4);
    const x = 0.35 + col * 2.4;
    const y = 0.8 + row * 2.05;
    // last row has 3 items — center-ish by keeping left align
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x, y: y, w: 2.25, h: 1.85, fill: { color: C.navy }, rectRadius: 0.08,
    });
    s.addText(q.n, {
      x: x + 0.15, y: y + 0.2, w: 1.95, h: 0.3, fontFace: H, fontSize: 14, color: C.gold, bold: true, margin: 0,
    });
    s.addText(q.t, {
      x: x + 0.15, y: y + 0.55, w: 1.95, h: 0.4, fontFace: H, fontSize: 16, color: C.wh, bold: true, margin: 0,
    });
    s.addText(q.d, {
      x: x + 0.15, y: y + 1.1, w: 1.95, h: 0.5, fontFace: B, fontSize: 12, color: C.wg, margin: 0,
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
  s.addText("Notebook Databricks · Project Steam", {
    x: 0.7, y: 1.4, w: 8.6, h: 0.45, fontFace: H, fontSize: 22, color: C.gold, bold: true, margin: 0,
  });
  s.addText("Tidying JSON → displays interactifs (publishers, ratings, années, genres)", {
    x: 0.7, y: 2.0, w: 8.6, h: 0.4, fontFace: B, fontSize: 15, color: C.wh, margin: 0,
  });

  const demos = [
    { n: "01", t: "Ouvrir le notebook cloud", d: "Lien Databricks dans le repo" },
    { n: "02", t: "Montrer un display clé", d: "Éditeurs / ratings_score / genres" },
    { n: "03", t: "Expliquer le score", d: "ratio avis × volume (rank)" },
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

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.35, y: 0.8, w: 4.55, h: 4.15, fill: { color: C.navy }, rectRadius: 0.08,
  });
  s.addText("Compétences couvertes", {
    x: 0.55, y: 1.0, w: 4.2, h: 0.35, fontFace: H, fontSize: 15, color: C.gold, bold: true, margin: 0,
  });
  const comps = [
    "EDA descriptive sur données volumineuses",
    "Tidying de schéma JSON imbriqué (Spark)",
    "Stats & agrégations (groupBy, Window)",
    "Indicateur composite (ratings_score)",
    "Storytelling via questions métier",
    "Passage local → environnement Big Data",
  ];
  comps.forEach((c, i) => {
    s.addText("▸  " + c, {
      x: 0.55, y: 1.55 + i * 0.48, w: 4.15, h: 0.45,
      fontFace: B, fontSize: 13, color: C.wh, margin: 0,
    });
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.1, y: 0.8, w: 4.55, h: 4.15, fill: { color: C.wh },
    shadow: { type: "outer", color: "000000", blur: 4, opacity: 0.08, offset: 1 },
    rectRadius: 0.08,
  });
  s.addText("Limites & améliorations", {
    x: 5.3, y: 1.0, w: 4.2, h: 0.35, fontFace: H, fontSize: 15, color: C.red, bold: true, margin: 0,
  });
  const lims = [
    { now: "Outputs absents du .ipynb local", next: "→ screenshots Databricks / export" },
    { now: "Cast prix / discount à revoir", next: "→ colonnes source distinctes" },
    { now: "Peu de tests d'hypothèse", next: "→ χ² / corrélations formelles" },
    { now: "README projet vide", next: "→ doc insights + lien cloud" },
    { now: "Viz Databricks seulement", next: "→ export Plotly / PDF" },
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
  s.addText("Une EDA Big Data\ndu JSON brut aux insights métier", {
    x: 0.7, y: 1.4, w: 8.5, h: 1.2, fontFace: H, fontSize: 28, color: C.wh, bold: true, margin: 0,
  });
  s.addText("S3 JSON → Spark tidying → 7 questions → storytelling Databricks", {
    x: 0.7, y: 2.8, w: 8.5, h: 0.4, fontFace: B, fontSize: 15, color: C.wg, margin: 0,
  });
  s.addText("Questions ?", {
    x: 0.7, y: 3.5, w: 8.5, h: 0.45, fontFace: H, fontSize: 22, color: C.gold, italic: true, margin: 0,
  });
  s.addText("Thibaut Modrin  ·  github.com/thibautmodrin/CDSD_Certification_Projets", {
    x: 0.7, y: 4.85, w: 8.5, h: 0.35, fontFace: B, fontSize: 13, color: C.gold, margin: 0,
  });

  const path = require("path");
  const outPath = path.join(__dirname, "Presentation_Bloc2_Steam.pptx");
  await pres.writeFile({ fileName: outPath });
  console.log("Wrote", outPath);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
