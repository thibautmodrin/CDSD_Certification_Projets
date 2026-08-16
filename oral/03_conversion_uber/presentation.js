const pptxgen = require("pptxgenjs");

/**
 * Oral Certification CDSD — Bloc 3 (Conversion Rate + Uber)
 * 10 slides · ~6–7 min présentation
 * Couvre les 3 études de cas RNCP BC03 (supervisé / déséquilibré / non-supervisé géo)
 * Style aligné sur presentation_bloc1_kayak.js / bloc2_steam.js
 */
async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title = "Bloc 3 — Conversion + Uber | Analyse prédictive structurée";
  pres.author = "Thibaut Modrin";
  pres.subject =
    "RNCP35288 — Bloc 3 Analyse prédictive de données structurées par l'intelligence artificielle";

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
  const TOTAL = 10;

  const footer = (s, n) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 5.35, w: 10, h: 0.275, fill: { color: C.navy },
    });
    s.addText("Thibaut Modrin  ·  RNCP35288  ·  Bloc 3 — Conversion + Uber", {
      x: 0.4, y: 5.38, w: 7.5, h: 0.22, fontFace: B, fontSize: 10, color: C.wg, margin: 0,
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
  s.addText("BLOC 3  ·  CERTIFICATION CDSD", {
    x: 0.7, y: 0.85, w: 8.5, h: 0.35, fontFace: B, fontSize: 13,
    color: C.gold, bold: true, charSpacing: 2, margin: 0,
  });
  s.addText("Conversion Rate\n+ Uber NYC", {
    x: 0.7, y: 1.4, w: 8.5, h: 1.5, fontFace: H, fontSize: 40,
    color: C.wh, bold: true, margin: 0,
  });
  s.addText("Supervisé (F1) + non supervisé (clustering spatial) — données structurées", {
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
  s.addText("Objectif", {
    x: 0.6, y: 1.25, w: 4, h: 0.35, fontFace: H, fontSize: 14, color: C.gold, bold: true, margin: 0,
  });
  s.addText("Prédire si un visiteur\ns’inscrit à la newsletter", {
    x: 0.6, y: 1.7, w: 4, h: 0.8, fontFace: B, fontSize: 18, color: C.wh, margin: 0,
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.1, y: 1.1, w: 4.4, h: 1.7, fill: { color: C.navy }, rectRadius: 0.08,
  });
  s.addText("Métrique", {
    x: 5.3, y: 1.25, w: 4, h: 0.35, fontFace: H, fontSize: 14, color: C.gold, bold: true, margin: 0,
  });
  s.addText("F1-score\n(précision × rappel)", {
    x: 5.3, y: 1.7, w: 4, h: 0.8, fontFace: B, fontSize: 18, color: C.wh, margin: 0,
  });

  s.addText("Pourquoi le F1 ?", {
    x: 0.5, y: 3.1, w: 9, h: 0.35, fontFace: H, fontSize: 16, color: C.teal, bold: true, margin: 0,
  });
  s.addText(
    "Classe « conversion » minoritaire → l’accuracy (~99 %) est trompeuse.\nLe F1 mesure la capacité réelle à détecter les inscriptions sans exploser les faux positifs.",
    {
      x: 0.5, y: 3.5, w: 9, h: 0.85, fontFace: B, fontSize: 15, color: C.tx, margin: 0,
    }
  );
  s.addText("Compétence RNCP · Bloc 3 — Analyse prédictive de données structurées (IA)", {
    x: 0.5, y: 4.55, w: 9, h: 0.3, fontFace: B, fontSize: 12, color: C.mu, italic: true, margin: 0,
  });
  footer(s, 2);

  // ════════════════════════════════════════
  // 3. PIPELINE ML
  // ════════════════════════════════════════
  s = pres.addSlide();
  s.background = { color: C.off };
  sectionBar(s);
  s.addText("Parcours de modélisation", {
    x: 0.4, y: 0.2, w: 9, h: 0.4, fontFace: H, fontSize: 22, color: C.navy, bold: true, margin: 0,
  });

  const steps = [
    { n: "1", t: "EDA", d: "Distrib. &\ncorrélations" },
    { n: "2", t: "Prep", d: "Encode +\nStandardScaler" },
    { n: "3", t: "Baseline", d: "1 feature\npages visitées" },
    { n: "4", t: "Modèles", d: "LogReg / RF\nGB / XGB" },
    { n: "5", t: "Seuil", d: "PR curve\n→ F1 max" },
    { n: "6", t: "Submit", d: "CSV test\n+ insights" },
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

  s.addText("Stack : scikit-learn · XGBoost · pandas · Plotly · Pipeline + Grid/RandomizedSearch", {
    x: 0.4, y: 3.65, w: 9.2, h: 0.3, fontFace: B, fontSize: 13, color: C.mu, margin: 0,
  });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 4.15, w: 9.2, h: 0.85, fill: { color: C.lt }, rectRadius: 0.06,
  });
  s.addText(
    "Features : country, age, new_user, source, total_pages_visited\nclass_weight='balanced' · seuil de décision calibré sur la courbe précision-rappel",
    {
      x: 0.55, y: 4.3, w: 8.9, h: 0.6, fontFace: B, fontSize: 13, color: C.slate, margin: 0,
    }
  );
  footer(s, 3);

  // ════════════════════════════════════════
  // 4. EDA & LEVIERS
  // ════════════════════════════════════════
  s = pres.addSlide();
  s.background = { color: C.off };
  sectionBar(s);
  s.addText("EDA — leviers de conversion", {
    x: 0.5, y: 0.2, w: 9, h: 0.4, fontFace: H, fontSize: 22, color: C.navy, bold: true, margin: 0,
  });

  const levers = [
    {
      t: "Pages visitées",
      items: [
        "Plus forte corrélation numérique",
        "Convertis naviguent davantage",
        "Levier UX n°1",
      ],
    },
    {
      t: "Acquisition & pays",
      items: [
        "Direct & SEO > Ads",
        "Écarts forts par pays",
        "Chine / Allemagne distincts",
      ],
    },
    {
      t: "Profil utilisateur",
      items: [
        "new_user convertit moins",
        "Âge : effet modéré",
        "Outliers âge > 70 filtrés",
      ],
    },
  ];
  levers.forEach((src, i) => {
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
    { v: "0.777", l: "F1 LogReg\n(meilleur)" },
    { v: "0.96", l: "Seuil optimal\n(PR curve)" },
    { v: "0.85", l: "Précision\nclasse 1" },
    { v: "0.72", l: "Rappel\nclasse 1" },
  ];
  metrics.forEach((m, i) => {
    const x = 0.4 + i * 2.4;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x, y: 0.8, w: 2.2, h: 1.85, fill: { color: C.navy }, rectRadius: 0.08,
    });
    s.addText(m.v, {
      x: x + 0.1, y: 1.0, w: 2.0, h: 0.65, fontFace: H, fontSize: 28, color: C.gold, bold: true, align: "center", margin: 0,
    });
    s.addText(m.l, {
      x: x + 0.1, y: 1.75, w: 2.0, h: 0.65, fontFace: B, fontSize: 13, color: C.wh, align: "center", margin: 0,
    });
  });

  s.addText("Comparaison des modèles (F1 optimisé)", {
    x: 0.5, y: 2.9, w: 9, h: 0.35, fontFace: H, fontSize: 16, color: C.teal, bold: true, margin: 0,
  });

  const models = [
    { name: "Logistic Regression ✅", f1: "0.777" },
    { name: "Gradient Boosting", f1: "0.773" },
    { name: "XGBoost", f1: "0.769" },
    { name: "Random Forest", f1: "0.725" },
  ];
  models.forEach((m, i) => {
    const y = 3.35 + i * 0.4;
    s.addText(m.name, {
      x: 0.6, y: y, w: 5.5, h: 0.35, fontFace: B, fontSize: 14, color: C.tx, margin: 0,
    });
    s.addText(m.f1, {
      x: 7.5, y: y, w: 1.5, h: 0.35, fontFace: H, fontSize: 14, color: C.navy, bold: true, align: "right", margin: 0,
    });
  });
  footer(s, 5);

  // ════════════════════════════════════════
  // 6. DÉMO + RECOS
  // ════════════════════════════════════════
  s = pres.addSlide();
  s.background = { color: C.off };
  sectionBar(s);
  s.addText("Démo & recommandations", {
    x: 0.5, y: 0.2, w: 9, h: 0.4, fontFace: H, fontSize: 22, color: C.navy, bold: true, margin: 0,
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.35, y: 0.8, w: 4.55, h: 4.15, fill: { color: C.navy }, rectRadius: 0.08,
  });
  s.addText("Démonstration live", {
    x: 0.55, y: 1.0, w: 4.2, h: 0.35, fontFace: H, fontSize: 15, color: C.gold, bold: true, margin: 0,
  });
  const demos = [
    { n: "01", t: "Ouvrir EDA_Model / 02_Modeling", d: "Pipeline + comparaison" },
    { n: "02", t: "Montrer le tableau F1", d: "LogReg > boosting" },
    { n: "03", t: "submission.csv", d: "Prédictions sur le test" },
  ];
  demos.forEach((d, i) => {
    s.addText(d.n, {
      x: 0.55, y: 1.55 + i * 0.95, w: 4.15, h: 0.3, fontFace: H, fontSize: 16, color: C.gold, bold: true, margin: 0,
    });
    s.addText(d.t, {
      x: 0.55, y: 1.85 + i * 0.95, w: 4.15, h: 0.3, fontFace: H, fontSize: 14, color: C.wh, bold: true, margin: 0,
    });
    s.addText(d.d, {
      x: 0.55, y: 2.15 + i * 0.95, w: 4.15, h: 0.25, fontFace: B, fontSize: 12, color: C.wg, margin: 0,
    });
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.1, y: 0.8, w: 4.55, h: 4.15, fill: { color: C.wh },
    shadow: { type: "outer", color: "000000", blur: 4, opacity: 0.08, offset: 1 },
    rectRadius: 0.08,
  });
  s.addText("Reco métier", {
    x: 5.3, y: 1.0, w: 4.2, h: 0.35, fontFace: H, fontSize: 15, color: C.teal, bold: true, margin: 0,
  });
  const recos = [
    "Stimuler la navigation (pages / session)",
    "Renforcer SEO & trafic direct",
    "Adapter les messages par pays",
    "Ajuster le seuil selon le coût métier",
  ];
  recos.forEach((r, i) => {
    s.addText("▸  " + r, {
      x: 5.3, y: 1.6 + i * 0.7, w: 4.15, h: 0.55,
      fontFace: B, fontSize: 14, color: C.tx, margin: 0,
    });
  });
  footer(s, 6);

  // ════════════════════════════════════════
  // 7. UBER — CONTEXTE (C3.3 / étude de cas géo)
  // ════════════════════════════════════════
  s = pres.addSlide();
  s.background = { color: C.off };
  sectionBar(s);
  s.addText("Uber NYC — clustering spatial", {
    x: 0.5, y: 0.2, w: 9, h: 0.4, fontFace: H, fontSize: 22, color: C.navy, bold: true, margin: 0,
  });
  s.addText("Étude de cas RNCP · Localisation de zones de densité géographique (non supervisé)", {
    x: 0.5, y: 0.6, w: 9, h: 0.3, fontFace: B, fontSize: 13, color: C.teal, italic: true, margin: 0,
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 1.1, w: 4.4, h: 1.7, fill: { color: C.navy }, rectRadius: 0.08,
  });
  s.addText("Objectif métier", {
    x: 0.6, y: 1.25, w: 4, h: 0.35, fontFace: H, fontSize: 14, color: C.gold, bold: true, margin: 0,
  });
  s.addText("Identifier les zones de\nforte demande pour positionner\nles chauffeurs", {
    x: 0.6, y: 1.7, w: 4, h: 0.85, fontFace: B, fontSize: 16, color: C.wh, margin: 0,
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.1, y: 1.1, w: 4.4, h: 1.7, fill: { color: C.navy }, rectRadius: 0.08,
  });
  s.addText("Données", {
    x: 5.3, y: 1.25, w: 4, h: 0.35, fontFace: H, fontSize: 14, color: C.gold, bold: true, margin: 0,
  });
  s.addText("Courses Uber NYC 2014\nLat / Lon / DateTime\n(+ heure, jour)", {
    x: 5.3, y: 1.7, w: 4, h: 0.85, fontFace: B, fontSize: 16, color: C.wh, margin: 0,
  });

  s.addText("Compétence C3.3", {
    x: 0.5, y: 3.1, w: 9, h: 0.35, fontFace: H, fontSize: 16, color: C.teal, bold: true, margin: 0,
  });
  s.addText(
    "Élaborer un algorithme non supervisé pour segmenter la base en groupes homogènes\net visualiser les densités géographiques (segmentation + viz cartographique).",
    {
      x: 0.5, y: 3.5, w: 9, h: 0.85, fontFace: B, fontSize: 15, color: C.tx, margin: 0,
    }
  );
  footer(s, 7);

  // ════════════════════════════════════════
  // 8. UBER — MÉTHODE & RÉSULTATS
  // ════════════════════════════════════════
  s = pres.addSlide();
  s.background = { color: C.off };
  sectionBar(s);
  s.addText("Uber — KMeans & DBSCAN", {
    x: 0.5, y: 0.2, w: 9, h: 0.4, fontFace: H, fontSize: 22, color: C.navy, bold: true, margin: 0,
  });

  // KMeans card
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.35, y: 0.8, w: 4.55, h: 4.15, fill: { color: C.navy }, rectRadius: 0.08,
  });
  s.addText("KMeans", {
    x: 0.55, y: 1.0, w: 4.2, h: 0.35, fontFace: H, fontSize: 16, color: C.gold, bold: true, margin: 0,
  });
  s.addText("k = 6 (elbow + silhouette)", {
    x: 0.55, y: 1.4, w: 4.2, h: 0.3, fontFace: B, fontSize: 13, color: C.wg, margin: 0,
  });
  const kmeansItems = [
    "StandardScaler sur Lat / Lon",
    "Choix de k via WCSS + silhouette",
    "6 clusters de zones urbaines",
    "Carte Mapbox animée / heure",
    "Vue macro des bassins de demande",
  ];
  kmeansItems.forEach((item, i) => {
    s.addText("▸  " + item, {
      x: 0.55, y: 1.95 + i * 0.45, w: 4.15, h: 0.4,
      fontFace: B, fontSize: 14, color: C.wh, margin: 0,
    });
  });

  // DBSCAN card
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.1, y: 0.8, w: 4.55, h: 4.15, fill: { color: C.wh },
    shadow: { type: "outer", color: "000000", blur: 4, opacity: 0.08, offset: 1 },
    rectRadius: 0.08,
  });
  s.addText("DBSCAN", {
    x: 5.3, y: 1.0, w: 4.2, h: 0.35, fontFace: H, fontSize: 16, color: C.navy, bold: true, margin: 0,
  });
  s.addText("Densité + outliers (eps, min_samples)", {
    x: 5.3, y: 1.4, w: 4.2, h: 0.3, fontFace: B, fontSize: 13, color: C.mu, margin: 0,
  });
  const dbscanItems = [
    "Clustering par densité locale",
    "Découpe par heure (sous-datasets)",
    "Détection des hotspots fins",
    "Outliers = courses isolées (−1)",
    "Complément idéal à KMeans",
  ];
  dbscanItems.forEach((item, i) => {
    s.addText("▸  " + item, {
      x: 5.3, y: 1.95 + i * 0.45, w: 4.15, h: 0.4,
      fontFace: B, fontSize: 14, color: C.tx, margin: 0,
    });
  });
  footer(s, 8);

  // ════════════════════════════════════════
  // 9. COMPÉTENCES RNCP + LIMITES
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
  s.addText("3 études de cas BC03", {
    x: 0.55, y: 1.0, w: 4.2, h: 0.35, fontFace: H, fontSize: 15, color: C.gold, bold: true, margin: 0,
  });
  const comps = [
    "C3.1 Pipeline Scikit-Learn (Conversion)",
    "C3.2 Supervisé déséquilibré (F1)",
    "C3.2 + Walmart (régression R²)",
    "C3.3 Non supervisé géo — Uber",
    "C3.4 Éval. / influence variables",
    "Viz décisionnelle (seuils + cartes)",
  ];
  comps.forEach((c, i) => {
    s.addText("▸  " + c, {
      x: 0.55, y: 1.55 + i * 0.48, w: 4.15, h: 0.45,
      fontFace: B, fontSize: 12, color: C.wh, margin: 0,
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
    { now: "Déséquilibre (Conversion)", next: "→ SMOTE / class_weight" },
    { now: "Seuil F1-only", next: "→ coût FP/FN métier" },
    { now: "Uber : peu d’outputs locaux", next: "→ rejouer cartes Mapbox" },
    { now: "DBSCAN sensible à eps", next: "→ grille de params" },
    { now: "Pas de suivi en prod", next: "→ monitoring drift" },
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
  footer(s, 9);

  // ════════════════════════════════════════
  // 10. CONCLUSION / QUESTIONS
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
  s.addText("Supervisé + non supervisé\nsur données structurées", {
    x: 0.7, y: 1.4, w: 8.5, h: 1.2, fontFace: H, fontSize: 28, color: C.wh, bold: true, margin: 0,
  });
  s.addText("Conversion · F1 0.777   ·   Uber · KMeans k=6 + DBSCAN (zones NYC)", {
    x: 0.7, y: 2.8, w: 8.5, h: 0.4, fontFace: B, fontSize: 15, color: C.wg, margin: 0,
  });
  s.addText("Questions ?", {
    x: 0.7, y: 3.5, w: 8.5, h: 0.45, fontFace: H, fontSize: 22, color: C.gold, italic: true, margin: 0,
  });
  s.addText("Thibaut Modrin  ·  github.com/thibautmodrin/CDSD_Certification_Projets", {
    x: 0.7, y: 4.85, w: 8.5, h: 0.35, fontFace: B, fontSize: 13, color: C.gold, margin: 0,
  });

  const path = require("path");
  const outPath = path.join(__dirname, "Presentation_Bloc3_Conversion.pptx");
  await pres.writeFile({ fileName: outPath });
  console.log("Wrote", outPath);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
