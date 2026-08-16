# Getaround — Bloc 5 (Deployment)

Projet Jedha **RNCP35288** — industrialisation d’un modèle de pricing + dashboard décisionnel sur les retards.

Hébergement : **[Render](https://render.com)** (plan Free).

| Livrable | URL |
|----------|-----|
| **API FastAPI** | https://getaround-api-sit1.onrender.com → [/docs](https://getaround-api-sit1.onrender.com/docs) |
| **Dashboard Streamlit** | https://getaround-dashboard-yims.onrender.com |

> Ouvre les 2 URLs **avant** l’oral : le plan Free endort le service après inactivité (cold start ~30–60 s).

## Architecture

```
Projet 8 - Deployment - Getaround/
├── app/                         # API pricing
│   ├── main.py                  # /predict, /health, /docs, /model/feature_order
│   └── model/ … /artifacts/     # reg.pkl, feature_order.pkl
├── dashboard/
│   ├── streamlit_app.py
│   └── data/                    # CSV + XLSX Jedha
├── others/                      # notebooks EDA / ML
├── tests/
├── 01-Getaround_analysis.ipynb  # brief mission Jedha
├── render.yaml
├── requirements.txt             # local (tout)
├── requirements-api.txt         # Render API
├── requirements-dashboard.txt   # Render dashboard
├── runtime.txt                  # Python 3.11.9
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

### Test en ligne (PowerShell)

```powershell
$body = '{"input":[["Citroen",140411,100,"diesel","black","convertible",1,1,0,0,1,1,1]]}'
Invoke-RestMethod -Method Post -Uri "https://getaround-api-sit1.onrender.com/predict" -ContentType "application/json; charset=utf-8" -Body $body
```

Réponse attendue : `prediction` ≈ prix/jour (ex. ~128 €).

## Dashboard local

```bash
streamlit run dashboard/streamlit_app.py
```

## Déploiement Render

Branche GitHub : `cursor/cdsd-certification-portfolio`  
Root Directory : `Projet 8 - Deployment - Getaround`

| Service | Build | Start |
|---------|-------|-------|
| API | `pip install -r requirements-api.txt` | `uvicorn app.main:app --host 0.0.0.0 --port $PORT` |
| Dashboard | `pip install -r requirements-dashboard.txt` | `streamlit run dashboard/streamlit_app.py --server.port $PORT --server.address 0.0.0.0 --server.headless true --browser.gatherUsageStats false` |

Env : `PYTHON_VERSION=3.11.9`

## Tests locaux

```bash
python tests/test_api_local.py
```

## Notes

- Mission Jedha : HF recommandé **ou tout autre provider** → Render est valide.
- Notebooks d’exploration dans `others/`.
