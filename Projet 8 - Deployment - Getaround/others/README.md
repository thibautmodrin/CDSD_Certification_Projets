# Getaround — Livrable minimal (API + Dashboard)

Deux livrables propres et suffisants pour la certif :
1) **API FastAPI** avec `/predict` pour la tarification (modèle Ridge).
2) **Dashboard Streamlit** pour l’analyse des retards et de l'impact d’un seuil (threshold).

## Données attendues
Place les fichiers fournis par Jedha **sans les renommer** :
- `get_around_pricing_project.csv` (dans `dashboard/data/`)
- `get_around_delay_analysis.xlsx` (dans `dashboard/data/`)

## Installation locale
```bash
python -m venv .venv && source .venv/bin/activate  # sous Linux/macOS
pip install -r requirements.txt
```

## Entraînement modèle pricing
```bash
python app/model/train.py
# -> crée app/model/artifacts/reg.pkl et feature_order.pkl
```

## Lancer l’API
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000
# Docs: http://localhost:8000/docs
```

Exemple de requête:
```bash
curl -X POST -H "Content-Type: application/json"   -d '{"input":[[12000,110,"diesel","black","hatchback",1,1,0,0,1,1,0,150,2]]}'   http://localhost:8000/predict
```

> L’ordre des features est validé automatiquement côté API grâce à `feature_order.pkl`.
> Si une valeur catégorielle inconnue survient, elle est gérée (`handle_unknown="ignore"`).

## Lancer le dashboard
Place les deux fichiers de données dans `dashboard/data/`, puis :
```bash
streamlit run dashboard/streamlit_app.py
```

## Déploiement (optionnel)
- **API** : Espace FastAPI sur Hugging Face (ou tout PaaS), même dépôt, même commandes.
- **Dashboard** : Espace Streamlit séparé. Uploade uniquement `dashboard/*` et `requirements.txt`.

## Structure
```
getaround_simple/
  app/
    main.py
    model/
      train.py
      preprocess.py
      artifacts/   # créé après l'entraînement
  dashboard/
    streamlit_app.py
    data/         # mets ici les 2 fichiers fournis
  tests/
    test_api_local.py
  requirements.txt
  README.md
```
