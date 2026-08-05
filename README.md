# RNCP35288 — Data Science & Intelligence Artificielle (Jedha)

Portfolio de projets de certification **RNCP niveau 6** — parcours Data Science / IA (Jedha).

**Auteur :** Thibaut Modrin  
**Repo :** [github.com/thibautmodrin/CDSD_Certification_Projets](https://github.com/thibautmodrin/CDSD_Certification_Projets)

---

## Cartographie des projets ↔ blocs RNCP

| # | Projet | Thème | Bloc RNCP | Stack clé |
|---|--------|-------|-----------|-----------|
| 1 | [Kayak](./Projet%201%20-%20Data%20Collection%20-%20Kayak) | Data collection & pipeline cloud | **Bloc 1** — Infrastructure de données | API, Scrapy, S3, RDS, Plotly |
| 2 | [Tinder / Speed Dating](./Projet%202%20-%20EDA%20Visualization%20-Tinder) | EDA & visualisation | **Bloc 2** — Analyse exploratoire | pandas, Plotly |
| 3 | [Steam](./Projet%203%20-%20Big%20Data%20-%20Steam) | Big Data / EDA | **Blocs 1–2** | Databricks, Spark |
| 4 | [Walmart](./Projet%204%20-%20Supervised%20ML%20-%20Walmart) | Régression (ventes) | **Bloc 3** — Prédictif structuré | scikit-learn, Ridge |
| 5 | [Conversion Rate](./Projet%205%20-%20Supervised%20ML%20-%20Conversion%20Rate%20Challenge) | Classification (F1) | **Bloc 3** | LogisticRegression, XGBoost |
| 6 | [Uber](./Projet%206%20-%20Unsupervised%20ML%20-%20Uber) | Clustering spatial | **Bloc 3** | KMeans, DBSCAN |
| 7 | [AT&T Spam](./Projet%207-Deep%20Learning%20AT%26T) | NLP / Deep Learning | **Bloc 4** — Non structuré | TensorFlow, BERT |
| 8 | [Getaround](./Projet%208%20-%20Deployment%20-%20Getaround) | MLOps / déploiement | **Bloc 5** — Industrialisation | FastAPI, Streamlit, Ridge |
| 9 | [HPP Prediction](./Projet%209%20-%20Final%20Project%20-%20HPP%20Prediction) | Projet final clinique | **Bloc 6** — Direction de projet | XGBoost, MLflow, Streamlit, Docker |

Repo source du projet final : [Jedha_Full_Stack_HPP_Prediction](https://github.com/thibautmodrin/Jedha_Full_Stack_HPP_Prediction)

### Démo HPP (Bloc 6) — Hugging Face & Docker Compose

| Mode | Comment faire |
|------|----------------|
| **En ligne** | https://thibautmodrin-hpp-prediction.hf.space → **Charger le dataset de démo** → **Prédire** |
| **Local (Compose)** | Prérequis : [Docker](https://docs.docker.com/get-docker/). Détails : [Projet 9 / README](./Projet%209%20-%20Final%20Project%20-%20HPP%20Prediction/README.md) |

```bash
cd "Projet 9 - Final Project - HPP Prediction/03_Streamlit/hpp_prediction_local"
docker compose up --build
```

→ http://localhost:8501

---

## Blocs de compétences

1. **Construction et alimentation** d’une infrastructure de gestion de données  
2. **Analyse exploratoire**, descriptive et inférentielle  
3. **Analyse prédictive** de données structurées (IA)  
4. **Analyse prédictive** de données non structurées (IA)  
5. **Industrialisation** d’un algorithme et automatisation des décisions  
6. **Direction de projets** de gestion de données  

---

## Points forts du portfolio

- Pipeline **bout-en-bout** (collecte → cloud → viz) sur Kayak  
- ML **supervisé & non supervisé** avec métriques claires (R², F1, clustering)  
- **Deep Learning NLP** (spam detector)  
- **Déploiement** API + dashboard (Getaround)  
- **Projet final HPP** : enjeu métier réel, MLOps (MLflow/Docker), POC Streamlit, RGPD  
- Culture **secrets / .env**, reproductibilité (`requirements.txt`)

---

## Oral de certification

| Deck | Fichier |
|------|---------|
| Vue d’ensemble | `Presentation_Orale_Certification_Jedha.pptx` |
| Bloc 1 — Kayak | `Presentation_Bloc1_Kayak.pptx` |
| Bloc 2 — Steam | `Presentation_Bloc2_Steam.pptx` |
| Bloc 3 — Conversion + Uber | `Presentation_Bloc3_Conversion.pptx` |
| Bloc 4 — AT&T Spam | `Presentation_Bloc4_ATT_Spam.pptx` |
| Bloc 5 — Getaround | `Presentation_Bloc5_Getaround.pptx` |
| Bloc 6 — HPP (projet final) | `Presentation_Bloc6_HPP.pptx` |

Sources générateurs (Blocs 1–5) : `oral/presentation_bloc*.js`

---

## Licence / usage

Projets pédagogiques réalisés dans le cadre de la formation Jedha.  
Les données et marques (Kayak, Booking, Uber, etc.) restent la propriété de leurs détenteurs.
