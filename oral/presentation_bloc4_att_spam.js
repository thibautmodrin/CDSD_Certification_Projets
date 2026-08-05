const pptxgen = require("pptxgenjs");

/**
 * Oral Certification CDSD — Bloc 4 (AT&T Spam Detector)
 * 8 slides · ~5 min présentation
 * Style aligné sur les decks Bloc 1–3
 */
async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title = "Bloc 4 — AT&T Spam | Analyse prédictive non structurée";
  pres.author = "Thibaut Modrin";
  pres.subject =
    "RNCP35288 — Bloc 4 Analyse prédictive de données non structurées par l'intelligence artificielle";

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
  };
  const H = "Arial";
  const B = "Calibri";
  const TOTAL = 8;

  const footer = (s, n) => {
    s.addShape(pres.shapes.RECTANGLE, {
      x: 0, y: 5.35, w: 10, h: 0.275, fill: { color: C.navy },
    });
    s.addText("Thibaut Modrin  ·  RNCP35288  ·  Bloc 4 — AT&T Spam", {
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
  s.addText("BLOC 4  ·  CERTIFICATION CDSD", {
    x: 0.7, y: 0.85, w: 8.5, h: 0.35, fontFace: B, fontSize: 13,
    color: C.gold, bold: true, charSpacing: 2, margin: 0,
  });
  s.addText("AT&T Spam\nDetector", {
    x: 0.7, y: 1.4, w: 8.5, h: 1.5, fontFace: H, fontSize: 40,
    color: C.wh, bold: true, margin: 0,
  });
  s.addText("Analyse prédictive de données non structurées — NLP / Deep Learning", {
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
  s.addText("Pain point", {
    x: 0.6, y: 1.25, w: 4, h: 0.35, fontFace: H, fontSize: 14, color: C.gold, bold: true, margin: 0,
  });
  s.addText("Exposition constante\naux SMS spam", {
    x: 0.6, y: 1.7, w: 4, h: 0.8, fontFace: B, fontSize: 18, color: C.wh, margin: 0,
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.1, y: 1.1, w: 4.4, h: 1.7, fill: { color: C.navy }, rectRadius: 0.08,
  });
  s.addText("Objectif", {
    x: 5.3, y: 1.25, w: 4, h: 0.35, fontFace: H, fontSize: 14, color: C.gold, bold: true, margin: 0,
  });
  s.addText("Flag automatique\nspam vs ham (texte seul)", {
    x: 5.3, y: 1.7, w: 4, h: 0.8, fontFace: B, fontSize: 18, color: C.wh, margin: 0,
  });

  s.addText("Données non structurées", {
    x: 0.5, y: 3.1, w: 9, h: 0.35, fontFace: H, fontSize: 16, color: C.teal, bold: true, margin: 0,
  });
  s.addText(
    "Dataset SMS (spam.csv) · classification binaire · texte brut → nettoyage → embeddings → modèle DL.\nPassage du tabulaire (Bloc 3) au langage naturel (NLP).",
    {
      x: 0.5, y: 3.5, w: 9, h: 0.85, fontFace: B, fontSize: 15, color: C.tx, margin: 0,
    }
  );
  s.addText("Compétence RNCP · Bloc 4 — Analyse prédictive de données non structurées (IA)", {
    x: 0.5, y: 4.55, w: 9, h: 0.3, fontFace: B, fontSize: 12, color: C.mu, italic: true, margin: 0,
  });
  footer(s, 2);

  // ════════════════════════════════════════
  // 3. PIPELINE NLP
  // ════════════════════════════════════════
  s = pres.addSlide();
  s.background = { color: C.off };
  sectionBar(s);
  s.addText("Parcours NLP / Deep Learning", {
    x: 0.4, y: 0.2, w: 9, h: 0.4, fontFace: H, fontSize: 22, color: C.navy, bold: true, margin: 0,
  });

  const steps = [
    { n: "1", t: "Clean", d: "SMS brut\n→ texte nettoyé" },
    { n: "2", t: "Token", d: "Tokenizer\nvocab 1000" },
    { n: "3", t: "Pad", d: "Séquences\nà longueur fixe" },
    { n: "4", t: "Embed", d: "Embedding\n+ pooling" },
    { n: "5", t: "Dense", d: "Classif.\nsigmoid" },
    { n: "6", t: "BERT", d: "Transfer\nlearning" },
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

  s.addText("Stack : TensorFlow / Keras · tensorflow-text · TF Hub (BERT) · Plotly", {
    x: 0.4, y: 3.65, w: 9.2, h: 0.3, fontFace: B, fontSize: 13, color: C.mu, margin: 0,
  });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 4.15, w: 9.2, h: 0.85, fill: { color: C.lt }, rectRadius: 0.06,
  });
  s.addText(
    "Deux approches comparées : modèle séquentiel léger (Embedding + Dense) vs BERT pré-entraîné\nMétriques : Binary Accuracy, Precision, Recall, F1-score",
    {
      x: 0.55, y: 4.3, w: 8.9, h: 0.6, fontFace: B, fontSize: 13, color: C.slate, margin: 0,
    }
  );
  footer(s, 3);

  // ════════════════════════════════════════
  // 4. DEUX ARCHITECTURES
  // ════════════════════════════════════════
  s = pres.addSlide();
  s.background = { color: C.off };
  sectionBar(s);
  s.addText("Deux architectures confrontées", {
    x: 0.5, y: 0.2, w: 9, h: 0.4, fontFace: H, fontSize: 22, color: C.navy, bold: true, margin: 0,
  });

  // Sequential
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.35, y: 0.8, w: 4.55, h: 4.15, fill: { color: C.navy }, rectRadius: 0.08,
  });
  s.addText("Modèle séquentiel", {
    x: 0.55, y: 1.0, w: 4.2, h: 0.35, fontFace: H, fontSize: 16, color: C.gold, bold: true, margin: 0,
  });
  s.addText("Léger & from scratch", {
    x: 0.55, y: 1.4, w: 4.2, h: 0.3, fontFace: B, fontSize: 13, color: C.wg, margin: 0,
  });
  const seq = [
    "Embedding (dim 8)",
    "GlobalMaxPooling1D",
    "Dense 16 (ReLU)",
    "Dense 1 (sigmoid)",
    "Adam + BinaryCrossentropy",
  ];
  seq.forEach((item, i) => {
    s.addText("▸  " + item, {
      x: 0.55, y: 1.95 + i * 0.45, w: 4.15, h: 0.4,
      fontFace: B, fontSize: 14, color: C.wh, margin: 0,
    });
  });

  // BERT
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.1, y: 0.8, w: 4.55, h: 4.15, fill: { color: C.wh },
    shadow: { type: "outer", color: "000000", blur: 4, opacity: 0.08, offset: 1 },
    rectRadius: 0.08,
  });
  s.addText("BERT transfer learning", {
    x: 5.3, y: 1.0, w: 4.2, h: 0.35, fontFace: H, fontSize: 16, color: C.navy, bold: true, margin: 0,
  });
  s.addText("Pré-entraîné TF Hub", {
    x: 5.3, y: 1.4, w: 4.2, h: 0.3, fontFace: B, fontSize: 13, color: C.mu, margin: 0,
  });
  const bert = [
    "Preprocessor BERT uncased",
    "Encoder → pooled_output",
    "Dropout 0.1",
    "Dense 1 (sigmoid)",
    "Fine-tuning 5 epochs",
  ];
  bert.forEach((item, i) => {
    s.addText("▸  " + item, {
      x: 5.3, y: 1.95 + i * 0.45, w: 4.15, h: 0.4,
      fontFace: B, fontSize: 14, color: C.tx, margin: 0,
    });
  });
  footer(s, 4);

  // ════════════════════════════════════════
  // 5. RÉSULTATS
  // ════════════════════════════════════════
  s = pres.addSlide();
  s.background = { color: C.off };
  sectionBar(s);
  s.addText("Résultats clés", {
    x: 0.5, y: 0.2, w: 9, h: 0.4, fontFace: H, fontSize: 22, color: C.navy, bold: true, margin: 0,
  });

  const metrics = [
    { v: "97.9 %", l: "Accuracy\nmodèle simple" },
    { v: "0.92", l: "F1-score\nmodèle simple" },
    { v: "87.8 %", l: "Accuracy\nBERT (val)" },
    { v: "0.18", l: "F1-score\nBERT (val)" },
  ];
  metrics.forEach((m, i) => {
    const x = 0.4 + i * 2.4;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x, y: 0.85, w: 2.2, h: 1.95, fill: { color: C.navy }, rectRadius: 0.08,
    });
    s.addText(m.v, {
      x: x + 0.1, y: 1.1, w: 2.0, h: 0.7, fontFace: H, fontSize: 28, color: C.gold, bold: true, align: "center", margin: 0,
    });
    s.addText(m.l, {
      x: x + 0.1, y: 1.9, w: 2.0, h: 0.65, fontFace: B, fontSize: 13, color: C.wh, align: "center", margin: 0,
    });
  });

  s.addText("Insight fort", {
    x: 0.5, y: 3.1, w: 9, h: 0.35, fontFace: H, fontSize: 16, color: C.teal, bold: true, margin: 0,
  });
  s.addText(
    "Le modèle léger bat BERT sur ce dataset (taille limitée, spam/ham assez séparable).\nComme au Bloc 3 : un modèle simple et adapté peut surpasser un modèle plus complexe mal calibré.",
    {
      x: 0.5, y: 3.5, w: 9, h: 0.9, fontFace: B, fontSize: 15, color: C.tx, margin: 0,
    }
  );
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
  s.addText("01_AT&T_spam_detector_final.ipynb", {
    x: 0.7, y: 1.4, w: 8.6, h: 0.45, fontFace: H, fontSize: 20, color: C.gold, bold: true, margin: 0,
  });
  s.addText("Prédiction live sur SMS neufs + tableau Sequential vs BERT", {
    x: 0.7, y: 2.0, w: 8.6, h: 0.4, fontFace: B, fontSize: 15, color: C.wh, margin: 0,
  });

  const demos = [
    { n: "01", t: "Montrer un SMS spam/ham", d: "Prédiction sigmoid du modèle" },
    { n: "02", t: "Courbes d'accuracy", d: "Train vs val (Plotly)" },
    { n: "03", t: "Tableau comparatif", d: "F1 0.92 vs 0.18" },
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
    "NLP sur texte non structuré (SMS)",
    "Preprocessing texte (clean, token, pad)",
    "Réseau de neurones (Embedding + Dense)",
    "Transfer learning (BERT / TF Hub)",
    "Comparaison de modèles & métriques",
    "Choix du modèle adapté à la donnée",
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
    { now: "BERT mal calibré (F1 bas)", next: "→ plus d'epochs / LR / seuil" },
    { now: "Dataset réduit (~5k SMS)", next: "→ volume + données récentes" },
    { now: "Anglais uniquement", next: "→ multi-langue / multilingual BERT" },
    { now: "Pas de déploiement", next: "→ API FastAPI (lien Bloc 5)" },
    { now: "README projet absent", next: "→ synthèse métriques + démo" },
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
  // 8. CONCLUSION
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
  s.addText("Un détecteur spam NLP\nsimple, rapide et efficace", {
    x: 0.7, y: 1.4, w: 8.5, h: 1.2, fontFace: H, fontSize: 28, color: C.wh, bold: true, margin: 0,
  });
  s.addText("Embedding + Dense · Acc. 97.9 % · F1 0.92 · BERT testé en benchmark", {
    x: 0.7, y: 2.8, w: 8.5, h: 0.4, fontFace: B, fontSize: 15, color: C.wg, margin: 0,
  });
  s.addText("Questions ?", {
    x: 0.7, y: 3.5, w: 8.5, h: 0.45, fontFace: H, fontSize: 22, color: C.gold, italic: true, margin: 0,
  });
  s.addText("Thibaut Modrin  ·  github.com/thibautmodrin/CDSD_Certification_Projets", {
    x: 0.7, y: 4.85, w: 8.5, h: 0.35, fontFace: B, fontSize: 13, color: C.gold, margin: 0,
  });

  const outPath =
    "/home/burgovida21/Bureau/CDSD_Certification_Projets/Presentation_Bloc4_ATT_Spam.pptx";
  await pres.writeFile({ fileName: outPath });
  console.log("Wrote", outPath);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
