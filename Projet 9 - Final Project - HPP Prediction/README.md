# Prédiction d’HPP sévère (Projet final · Bloc 6)

Projet Data Science / MLOps avec une maternité (Bourgogne) — **Thibaut Modrin**  
Repo source : [Jedha_Full_Stack_HPP_Prediction](https://github.com/thibautmodrin/Jedha_Full_Stack_HPP_Prediction)

## Objectif

Prédire le risque d’**hémorragie du post-partum sévère** (~2 % des cas) dès l’admission, avant l’accouchement, pour anticiper les soins.  
Priorité métier : un bon **rappel (recall)** plutôt qu’une précision parfaite (coût d’un faux négatif élevé).

## Architecture (industrialisée)

```
Notebooks → joblib → MLflow (tracking)
                  ↘ FastAPI /predict  → Streamlit (UI)
```

| Couche | Rôle |
|--------|------|
| `01_Notebooks/` | EDA pro + exploration + modèles |
| `app/` | **API FastAPI** (pattern Jedha Deployment) |
| `02_MLflow/` | Tracking expériences (HF Space) |
| `03_Streamlit/` | POC clinique (HF Space ; option API via `HPP_API_URL`) |

## Résultats principaux

| Modèle | Rappel (Recall) | Précision (Precision) | Points forts | Limites |
|--------|-----------------|------------------------|--------------|---------|
| Régression logistique + SMOTE | 69 % | ~8 % | Simple & interprétable | Très faible précision |
| Random Forest | 65 % | ~9 % | Non-linéaire & robuste | Compromis rappel ↔ précision difficile |
| XGBoost | 66 % | ~9 % | Optimisation avancée | Résultats similaires |

Techniques de rééquilibrage testées : SMOTE, SMOTEENN, RandomUnderSampler, surpondération.

## Démos

| Ressource | Lien |
|-----------|------|
| App Streamlit | https://thibautmodrin-hpp-prediction.hf.space |
| MLflow | https://thibautmodrin-mlflow.hf.space/ |
| API FastAPI | `https://hpp-api-xxxx.onrender.com` (après deploy Render) → `/docs` |
| Oral | [`oral/06_hpp/`](../oral/06_hpp/) |

## API locale

```bash
pip install -r requirements-api.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

- Docs : http://localhost:8000/docs  
- Features : http://localhost:8000/model/feature_order  

PowerShell :

```powershell
# 1 ligne du CSV démo (ordre = feature_order)
$body = Get-Content .\03_Streamlit\test_dataset_predictor.csv -TotalCount 2 | ConvertFrom-Csv | ConvertTo-Json
# plus simple : utiliser /docs Try it out
```

Test smoke (API déjà lancée) :

```bash
python tests/test_api_local.py
```

### Deploy Render

Créer un Web Service (branche `cursor/cdsd-certification-portfolio`) :

| Champ | Valeur |
|-------|--------|
| Name | `hpp-api` |
| Root Directory | `Projet 9 - Final Project - HPP Prediction` |
| Build | `pip install -r requirements-api.txt` |
| Start | `uvicorn app.main:app --host 0.0.0.0 --port $PORT` |
| Env | `PYTHON_VERSION=3.11.9` |

Ou Blueprint : `render.yaml` à la racine du monorepo (service `hpp-api`).

## Streamlit

### En ligne (Hugging Face)

1. Ouvrir https://thibautmodrin-hpp-prediction.hf.space  
2. **Charger le dataset de démo** → **Prédire**

### Local Docker

```bash
cd 03_Streamlit
docker compose up --build
```

### Brancher l’API (optionnel)

```bash
# Windows
$env:HPP_API_URL = "https://hpp-api-xxxx.onrender.com"
streamlit run 03_Streamlit/app.py
```

Sans `HPP_API_URL`, l’app utilise le joblib local (comportement HF actuel).

## Notebooks

| Fichier | Rôle |
|---------|------|
| `01_EDA.ipynb` | EDA **synthèse** (pro) |
| `01_EDA_exploration.ipynb` | Archive exploration détaillée |
| `02` → `05` | Imputation + LogReg / RF / XGB |

## Structure

```
00_Data/
01_Notebooks/
02_MLflow/
03_Streamlit/
app/                 # FastAPI
tests/
requirements-api.txt
runtime.txt
README.md
```

## Confidentialité

Données anonymisées — usage pédagogique, conforme RGPD.

## Contact

thibaut.modrin@gmail.com · [LinkedIn](https://www.linkedin.com/in/thibautmodrin)
