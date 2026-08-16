# Prédiction d’HPP sévère (Projet final · Bloc 6)

Projet Data Science / MLOps avec une maternité (Bourgogne) — **Thibaut Modrin**  
Repo source : [Jedha_Full_Stack_HPP_Prediction](https://github.com/thibautmodrin/Jedha_Full_Stack_HPP_Prediction)

## Objectif

Prédire le risque d’**hémorragie du post-partum sévère** (~2 % des cas) dès l’admission, avant l’accouchement, pour anticiper les soins.  
Priorité métier : un bon **rappel (recall)** plutôt qu’une précision parfaite (coût d’un faux négatif élevé).

## Architecture (industrialisée)

```
Notebooks ──► MLflow (tracking HF)     ← expériences / métriques (pas de serving)
         └─► joblib (artefact versionné)
                └─► FastAPI /predict (Render)
                       └─► Streamlit (HF)  ← appelle l'API par défaut
                              └─ fallback joblib si API down / HPP_USE_LOCAL=1
```

| Couche | Rôle |
|--------|------|
| `01_Notebooks/` | `00` prepare → EDA → preprocessing → modèles (+ MLflow) |
| `app/` | **API FastAPI** (serving via `model.joblib`) |
| `02_MLflow/` | Tracking expériences uniquement (pas branché à l’API) |
| `03_Streamlit/` | POC clinique → API Render par défaut (`HPP_API_URL`) |

## Résultats principaux

| Modèle | Rappel (Recall) | Précision (Precision) | Points forts | Limites |
|--------|-----------------|------------------------|--------------|---------|
| Régression logistique + SMOTE | 69 % | ~8 % | Simple & interprétable | Très faible précision |
| Random Forest | 65 % | ~9 % | Non-linéaire & robuste | Compromis rappel ↔ précision difficile |
| XGBoost | 66 % | ~9 % | Optimisation avancée | Résultats similaires |

Techniques de rééquilibrage testées : SMOTE, SMOTEENN, RandomUnderSampler, surpondération.

> Après une re-run complète (`00`→`03` sur la base Drive), mettre à jour ce tableau avec les métriques du notebook `03` / MLflow.

## Rejouer le pipeline (base complète)

1. Télécharger depuis le [Drive public](https://drive.google.com/drive/folders/1DToPXrJ8znq9WH0SLrvFEvX7N-LTY-Eg?usp=sharing) :
   - `Bourgogne20132023.xls` → `00_Data/raw/`
2. Lancer dans l’ordre :
   - `01_Notebooks/00_Prepare_Data.ipynb`
   - `01_EDA.ipynb` → `02_Preprocessing.ipynb` → `03_Model_Comparison.ipynb`
3. Vérifier les runs sur https://thibautmodrin-mlflow.hf.space/ (expérience `HPP_Model_Comparison_Certification`)
4. (Option) exporter le modèle prod :

```powershell
$env:HPP_EXPORT_ARTIFACTS = "1"
# puis ré-exécuter la cellule export du notebook 03
```

Sans `raw/` / `processed/`, les notebooks tournent sur l’extrait portfolio (mode démo). Détails : [`00_Data/DATA_LOCATION.md`](./00_Data/DATA_LOCATION.md).

## Démos

| Ressource | Lien |
|-----------|------|
| App Streamlit | https://thibautmodrin-hpp-prediction.hf.space |
| MLflow | https://thibautmodrin-mlflow.hf.space/ |
| API FastAPI | https://hpp-api.onrender.com → [/docs](https://hpp-api.onrender.com/docs) |
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

### Inférence Streamlit

Par défaut, Streamlit appelle **https://hpp-api.onrender.com** (même modèle que le joblib local).

| Variable | Effet |
|----------|--------|
| *(aucune)* | API Render |
| `HPP_API_URL=https://…` | API personnalisée |
| `HPP_API_URL=` ou `HPP_USE_LOCAL=1` | joblib local uniquement |

```bash
# Forcer le local (ex. Docker Compose)
$env:HPP_USE_LOCAL = "1"
streamlit run 03_Streamlit/app.py
```

## Notebooks

| Fichier | Rôle |
|---------|------|
| `00_Prepare_Data.ipynb` | Drive `.xls` → `processed/hpp_prepartum.csv` |
| `01_EDA.ipynb` | EDA synthèse |
| `02_Preprocessing.ipynb` | dropna + `ColumnTransformer` |
| `03_Model_Comparison.ipynb` | LogReg / RF / XGB + **MLflow** |
| `hpp_data.py` | Chemins / features / `load_hpp()` partagés |

Détail historique : `01_Notebooks/_archive/`.

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
