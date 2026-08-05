# Prédiction d’HPP sévère (Projet final · Bloc 6)

Projet Data Science / MLOps avec une maternité (Bourgogne) — **Thibaut Modrin**  
Repo source : [Jedha_Full_Stack_HPP_Prediction](https://github.com/thibautmodrin/Jedha_Full_Stack_HPP_Prediction)

## Objectif

Prédire le risque d’**hémorragie du post-partum sévère** (~2 % des cas) dès l’admission, avant l’accouchement, pour anticiper les soins.  
Priorité métier : un bon **rappel (recall)** plutôt qu’une précision parfaite (coût d’un faux négatif élevé).

## Stack

| Domaine | Outils |
|---------|--------|
| Modélisation | scikit-learn, XGBoost (+ SMOTE / resampling) |
| Tracking | MLflow (Docker + Hugging Face) |
| POC | Streamlit |
| Déploiement | Hugging Face Spaces |

## Démos

| Ressource | Lien |
|-----------|------|
| App Streamlit | https://thibautmodrin-hpp-prediction.hf.space |
| MLflow | https://thibautmodrin-mlflow.hf.space/ |
| Oral | `04_Presentation/Presentation_Bloc6_HPP.pptx` |

## Lancer l’app Streamlit

Dossier : `03_Streamlit/hpp_prediction_local/`  
Fichiers utiles : `app.py`, `best_model_logreg_f1_Sans_resampling.joblib`, `test_dataset_predictor.csv`

### En ligne (Hugging Face)

1. Ouvrir https://thibautmodrin-hpp-prediction.hf.space  
2. Importer `test_dataset_predictor.csv`  
3. Cliquer **Prédire**

### En local (Docker uniquement)

Prérequis : [Docker](https://docs.docker.com/get-docker/) installé.

```bash
cd 03_Streamlit/hpp_prediction_local
docker build -t hpp-prediction .
docker run --rm -p 8501:80 hpp-prediction
```

→ http://localhost:8501

Alternative (image déjà publiée) :

```bash
cd 03_Streamlit/hpp_prediction_local
docker run --rm -p 8501:80 thibautmodrin/hpp-predict
```

## Structure du projet

```
00_Data/          # extrait / dico (données brutes hors repo si volumineuses)
01_Notebooks/     # EDA + modélisation
02_MLflow/        # Docker MLflow
03_Streamlit/     # POC Streamlit
04_Presentation/  # deck oral Bloc 6
```

## Confidentialité

Données anonymisées, pas d’identifiants personnels — usage conforme RGPD (projet pédagogique).

## Contact

thibaut.modrin@gmail.com · [LinkedIn](https://www.linkedin.com/in/thibautmodrin)
