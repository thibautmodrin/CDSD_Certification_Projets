# Getaround — Bloc 5 (Deployment)

Projet Jedha **RNCP35288** — industrialisation d’un modèle de pricing + dashboard décisionnel sur les retards.

Hébergement : **[Render](https://render.com)** (gratuit) — alternatif à Hugging Face (Docker Spaces = PRO depuis 2025/2026).

| Livrable | URL (après 1er deploy) |
|----------|------------------------|
| **API FastAPI** | `https://getaround-api.onrender.com` (ou URL affichée par Render) → `/docs` |
| **Dashboard Streamlit** | `https://getaround-dashboard.onrender.com` |

> Ouvre les 2 URLs **avant** l’oral : le plan Free endort le service après inactivité (cold start ~30–60 s).

## Architecture

```
Projet 8 - Deployment - Getaround/
├── app/                         # API pricing
│   ├── main.py                  # /predict, /health, /docs, /model/feature_order
│   └── model/ … /artifacts/     # reg.pkl, feature_order.pkl (à committer)
├── dashboard/
│   ├── streamlit_app.py
│   └── data/                    # CSV + XLSX Jedha
├── render.yaml                  # Blueprint (si Root = ce dossier)
├── requirements.txt             # local (tout)
├── requirements-api.txt         # Render API
├── requirements-dashboard.txt   # Render dashboard
├── runtime.txt                  # Python 3.11.9
├── spaces/                      # optionnel HF (nécessite PRO pour Docker)
├── others/                      # notebooks d’exploration
└── readme.md
```

À la racine du monorepo : `render.yaml` avec `rootDir` pour Blueprint GitHub.

## Données Jedha

Dans `dashboard/data/` (sans renommer) :

- `get_around_pricing_project.csv`
- `get_around_delay_analysis.xlsx`

## Installation locale

```bash
python -m venv .venv
# Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

## Entraîner le modèle

```bash
python app/model/train.py
# → app/model/artifacts/reg.pkl + feature_order.pkl
```

## API locale

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

- Swagger : http://localhost:8000/docs  
- Santé : http://localhost:8000/health  
- Ordre des features : http://localhost:8000/model/feature_order  

```bash
curl -X POST "http://localhost:8000/predict" ^
  -H "Content-Type: application/json" ^
  -d "{\"input\":[[\"Citroën\",140411,100,\"diesel\",\"black\",\"convertible\",1,1,0,0,1,1,1]]}"
```

## Dashboard local

```bash
streamlit run dashboard/streamlit_app.py
```

## Déploiement Render (recommandé)

### Prérequis
1. Compte [render.com](https://dashboard.render.com) (GitHub connecté)
2. Ce projet poussé sur GitHub (artefacts `.pkl` + `dashboard/data/` inclus)

### Option A — Blueprint (rapide)
1. Push du monorepo (fichier `render.yaml` à la racine)
2. Render → **New** → **Blueprint** → sélectionner le repo
3. Valider les 2 services `getaround-api` et `getaround-dashboard`

### Option B — 2 Web Services manuels
Pour **chaque** service : **New → Web Service** → repo GitHub

| Champ | API | Dashboard |
|-------|-----|-----------|
| **Name** | `getaround-api` | `getaround-dashboard` |
| **Root Directory** | `Projet 8 - Deployment - Getaround` | idem |
| **Runtime** | Python 3 | Python 3 |
| **Build** | `pip install -r requirements-api.txt` | `pip install -r requirements-dashboard.txt` |
| **Start** | `uvicorn app.main:app --host 0.0.0.0 --port $PORT` | `streamlit run dashboard/streamlit_app.py --server.port $PORT --server.address 0.0.0.0 --server.headless true --browser.gatherUsageStats false` |
| **Plan** | Free | Free |
| **Env** | `PYTHON_VERSION=3.11.9` | idem |

### Après le deploy
1. Copier les URLs `*.onrender.com` dans ce README / notebooks / oral
2. Tester :
   - `https://<api>/docs`
   - `curl -X POST https://<api>/predict -H "Content-Type: application/json" -d "{\"input\":[[\"Citroën\",140411,100,\"diesel\",\"black\",\"convertible\",1,1,0,0,1,1,1]]}"`
   - ouvrir le dashboard Streamlit

## Tests locaux

```bash
python tests/test_api_local.py
```

## Notes

- Mission Jedha : HF recommandé **ou tout autre provider** → Render est valide.
- `others/app.py` est **obsolète**.
- Dossier `spaces/` + scripts HF : alternative si compte HF **PRO** (Docker).
