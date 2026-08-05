const pptxgen = require("pptxgenjs");

/**
 * Oral Certification CDSD — Bloc 5 (Getaround)
 * 8 slides · ~5 min présentation
 * RNCP BC05 — Industrialisation + automatisation des décisions
 */
async function main() {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_16x9";
  pres.title = "Bloc 5 — Getaround | Industrialisation ML";
  pres.author = "Thibaut Modrin";
  pres.subject =
    "RNCP35288 — Bloc 5 Industrialisation d'un algorithme d'apprentissage automatique";

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
    s.addText("Thibaut Modrin  ·  RNCP35288  ·  Bloc 5 — Getaround", {
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
  s.addText("BLOC 5  ·  CERTIFICATION CDSD", {
    x: 0.7, y: 0.85, w: 8.5, h: 0.35, fontFace: B, fontSize: 13,
    color: C.gold, bold: true, charSpacing: 2, margin: 0,
  });
  s.addText("Getaround\nML in Production", {
    x: 0.7, y: 1.4, w: 8.5, h: 1.5, fontFace: H, fontSize: 40,
    color: C.wh, bold: true, margin: 0,
  });
  s.addText("Industrialisation d'un algorithme & automatisation des décisions", {
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
  s.addText("Pricing", {
    x: 0.6, y: 1.25, w: 4, h: 0.35, fontFace: H, fontSize: 14, color: C.gold, bold: true, margin: 0,
  });
  s.addText("Prédire le prix de\nlocation d'un véhicule", {
    x: 0.6, y: 1.7, w: 4, h: 0.8, fontFace: B, fontSize: 18, color: C.wh, margin: 0,
  });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.1, y: 1.1, w: 4.4, h: 1.7, fill: { color: C.navy }, rectRadius: 0.08,
  });
  s.addText("Opérations", {
    x: 5.3, y: 1.25, w: 4, h: 0.35, fontFace: H, fontSize: 14, color: C.gold, bold: true, margin: 0,
  });
  s.addText("Mesurer l'impact d'un\nseuil sur les retards", {
    x: 5.3, y: 1.7, w: 4, h: 0.8, fontFace: B, fontSize: 18, color: C.wh, margin: 0,
  });

  s.addText("Objectif industrialisation", {
    x: 0.5, y: 3.1, w: 9, h: 0.35, fontFace: H, fontSize: 16, color: C.teal, bold: true, margin: 0,
  });
  s.addText(
    "Passer du notebook à une app utilisable métier : API de prédiction + dashboard décisionnel.\nThème RNCP BC05 : construction et mise en production d'une application web d'IA.",
    {
      x: 0.5, y: 3.5, w: 9, h: 0.85, fontFace: B, fontSize: 15, color: C.tx, margin: 0,
    }
  );
  s.addText("Compétence RNCP · Bloc 5 — Industrialisation & automatisation des décisions", {
    x: 0.5, y: 4.55, w: 9, h: 0.3, fontFace: B, fontSize: 12, color: C.mu, italic: true, margin: 0,
  });
  footer(s, 2);

  // ════════════════════════════════════════
  // 3. ARCHITECTURE
  // ════════════════════════════════════════
  s = pres.addSlide();
  s.background = { color: C.off };
  sectionBar(s);
  s.addText("Architecture de déploiement", {
    x: 0.4, y: 0.2, w: 9, h: 0.4, fontFace: H, fontSize: 22, color: C.navy, bold: true, margin: 0,
  });

  const steps = [
    { n: "1", t: "EDA", d: "Retards &\npricing" },
    { n: "2", t: "Train", d: "Ridge +\nPipeline" },
    { n: "3", t: "Artefacts", d: "reg.pkl +\nfeature_order" },
    { n: "4", t: "API", d: "FastAPI\n/predict" },
    { n: "5", t: "Dash", d: "Streamlit\nthreshold" },
    { n: "6", t: "Tests", d: "test_api\nlocal" },
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

  s.addText("Stack : FastAPI · uvicorn · joblib · scikit-learn · Streamlit · Plotly · pytest", {
    x: 0.4, y: 3.65, w: 9.2, h: 0.3, fontFace: B, fontSize: 13, color: C.mu, margin: 0,
  });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.4, y: 4.15, w: 9.2, h: 0.85, fill: { color: C.lt }, rectRadius: 0.06,
  });
  s.addText(
    "Deux livrables distincts : API pricing (inférence) + dashboard retards (décision métier)\nCible déploiement : Hugging Face Spaces / PaaS (API + Streamlit séparés)",
    {
      x: 0.55, y: 4.3, w: 8.9, h: 0.6, fontFace: B, fontSize: 13, color: C.slate, margin: 0,
    }
  );
  footer(s, 3);

  // ════════════════════════════════════════
  // 4. API + DASHBOARD
  // ════════════════════════════════════════
  s = pres.addSlide();
  s.background = { color: C.off };
  sectionBar(s);
  s.addText("API FastAPI & Dashboard Streamlit", {
    x: 0.5, y: 0.2, w: 9, h: 0.4, fontFace: H, fontSize: 22, color: C.navy, bold: true, margin: 0,
  });

  const cards = [
    {
      t: "API pricing (C5.2)",
      items: [
        "POST /predict → prix estimé",
        "GET /health + /model/feature_order",
        "Pipeline Ridge + artefacts joblib",
        "Validation schéma & nb features",
      ],
    },
    {
      t: "Dashboard (C5.3)",
      items: [
        "Slider threshold (0–120 min)",
        "% conflits / % résolus",
        "Histo retards + courbe efficacité",
        "Scope All cars / Connect",
      ],
    },
    {
      t: "Industrialisation",
      items: [
        "train.py reproductible",
        "requirements.txt + README",
        "tests/test_api_local.py",
        "Structure app/ dashboard/",
      ],
    },
  ];
  cards.forEach((src, i) => {
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
      x: x + 0.1, y: 0.95, w: 2.8, h: 0.35, fontFace: H, fontSize: 13, color: C.wh, bold: true, margin: 0,
    });
    src.items.forEach((item, j) => {
      s.addText("▸  " + item, {
        x: x + 0.15, y: 1.65 + j * 0.55, w: 2.7, h: 0.5,
        fontFace: B, fontSize: 13, color: C.tx, margin: 0,
      });
    });
  });
  footer(s, 4);

  // ════════════════════════════════════════
  // 5. LIVRABLES / RÉSULTATS
  // ════════════════════════════════════════
  s = pres.addSlide();
  s.background = { color: C.off };
  sectionBar(s);
  s.addText("Livrables clés", {
    x: 0.5, y: 0.2, w: 9, h: 0.4, fontFace: H, fontSize: 22, color: C.navy, bold: true, margin: 0,
  });

  const metrics = [
    { v: "Ridge", l: "Modèle pricing\n(Pipeline sklearn)" },
    { v: "/predict", l: "Endpoint API\ninférence prod" },
    { v: "Threshold", l: "Levier métier\nretards checkout" },
    { v: "2 apps", l: "API + Streamlit\nséparables" },
  ];
  metrics.forEach((m, i) => {
    const x = 0.4 + i * 2.4;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x, y: 0.85, w: 2.2, h: 1.95, fill: { color: C.navy }, rectRadius: 0.08,
    });
    s.addText(m.v, {
      x: x + 0.1, y: 1.1, w: 2.0, h: 0.7, fontFace: H, fontSize: 22, color: C.gold, bold: true, align: "center", margin: 0,
    });
    s.addText(m.l, {
      x: x + 0.1, y: 1.9, w: 2.0, h: 0.65, fontFace: B, fontSize: 13, color: C.wh, align: "center", margin: 0,
    });
  });

  s.addText("Ce que le métier peut faire", {
    x: 0.5, y: 3.1, w: 9, h: 0.35, fontFace: H, fontSize: 16, color: C.teal, bold: true, margin: 0,
  });
  const livrables = [
    "Estimer un prix via curl / Swagger (/docs)",
    "Simuler un seuil de buffer entre locations",
    "Comparer All cars vs Connect only",
    "Réentraîner : python app/model/train.py",
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
  s.addText("API /docs + Streamlit threshold", {
    x: 0.7, y: 1.4, w: 8.6, h: 0.45, fontFace: H, fontSize: 22, color: C.gold, bold: true, margin: 0,
  });
  s.addText("Inférence pricing en live · simulation d'impact opérationnel des retards", {
    x: 0.7, y: 2.0, w: 8.6, h: 0.4, fontFace: B, fontSize: 15, color: C.wh, margin: 0,
  });

  const demos = [
    { n: "01", t: "uvicorn app.main:app", d: "Swagger → POST /predict" },
    { n: "02", t: "streamlit run …", d: "Slider threshold + KPIs" },
    { n: "03", t: "Option : URL HF Spaces", d: "Si déjà déployé en ligne" },
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
    "C5.2 API de prédiction (FastAPI)",
    "C5.3 App web métier (Streamlit)",
    "Artefacts modèle versionnés (joblib)",
    "Automatisation décision (threshold)",
    "Env. reproductible (requirements)",
    "C5.1 MLflow → projet HPP (renfort)",
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
    { now: "Docker / MLflow absents ici", next: "→ citer HPP (MLflow Space)" },
    { now: "Déploiement cloud à confirmer", next: "→ HF Spaces API + dash" },
    { now: "Artefacts non commités", next: "→ train avant démo" },
    { now: "Pas de CI/CD", next: "→ GitHub Actions" },
    { now: "Monitoring / drift absent", next: "→ logs + alertes" },
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
  s.addText("Du modèle au produit :\nAPI + dashboard métier", {
    x: 0.7, y: 1.4, w: 8.5, h: 1.2, fontFace: H, fontSize: 28, color: C.wh, bold: true, margin: 0,
  });
  s.addText("Ridge → joblib → FastAPI /predict → Streamlit threshold", {
    x: 0.7, y: 2.8, w: 8.5, h: 0.4, fontFace: B, fontSize: 15, color: C.wg, margin: 0,
  });
  s.addText("Questions ?", {
    x: 0.7, y: 3.5, w: 8.5, h: 0.45, fontFace: H, fontSize: 22, color: C.gold, italic: true, margin: 0,
  });
  s.addText("Thibaut Modrin  ·  github.com/thibautmodrin/CDSD_Certification_Projets", {
    x: 0.7, y: 4.85, w: 8.5, h: 0.35, fontFace: B, fontSize: 13, color: C.gold, margin: 0,
  });

  const outPath =
    "/home/burgovida21/Bureau/CDSD_Certification_Projets/Presentation_Bloc5_Getaround.pptx";
  await pres.writeFile({ fileName: outPath });
  console.log("Wrote", outPath);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
