# Uber Pickups — Hot-zones (Unsupervised ML)

## Objectif
Identifier les **zones de forte demande** (hot-zones) à New York pour recommander aux chauffeurs Uber où se positionner, selon le **jour de la semaine** et l’**heure**.

Livrables mission Jedha :
- cartes des hot-zones (Plotly)
- analyse **au moins par jour de la semaine**
- comparaison de **KMeans** et **DBSCAN**

---

## Notebook
Fichier principal : [`uber.ipynb`](uber.ipynb)

| Section | Contenu |
|---|---|
| 1–2 | Imports, chargement & nettoyage des données 2014 |
| 3 | EDA (volumes par jour / heure + carte) |
| 4 | Start small (ex. mercredi 18h) |
| 5 | KMeans (elbow + silhouette, `k=6`) |
| 6 | DBSCAN (densités + filtrage du bruit `-1`) |
| 7 | Hot-zones **par jour de la semaine** |
| 8 | Hot-zones **par heure** |
| 9–10 | Comparaison des algos + recommandations |

---

## Données
Source officielle Jedha : [Uber Trip Data](https://full-stack-bigdata-datasets.s3.eu-west-3.amazonaws.com/Machine+Learning+non+Supervis%C3%A9/Projects/uber-trip-data.zip)

À placer dans :
```text
Projet 6 - Unsupervised ML - Uber/source/uber-trip-data/
```
Fichiers utilisés : `uber-raw-data-apr14.csv` → `uber-raw-data-sep14.csv`.

Le dossier `source/` est ignoré par git (volume important).

---

## Installation
```bash
pip install -r requirements.txt
```

## Stack (scope Jedha)
- `pandas` / `numpy`
- `scikit-learn` (`KMeans`, `DBSCAN`, `StandardScaler`, silhouette)
- `plotly` (`scatter_mapbox`, animations)

---

## Résultats clés

Chiffres issus de l’exécution du notebook :
- **4 534 327** pickups bruts (avr.–sept. 2014) → **4 506 565** après nettoyage NYC
- Sample d’analyse : **120 000** points
- Start small (mercredi 18h) : **8 000** pickups
- DBSCAN (start small) : **8** hot-zones, **~9 %** de bruit (`-1`)

Interprétation :
- Les pickups se concentrent surtout à **Manhattan**, avec des extensions vers Brooklyn, Queens et les aéroports.
- Les hot-zones **varient selon le jour** (week-end vs jours ouvrés) et selon l’heure.
- **KMeans (`k=6`)** : segmentation stable des grands secteurs de la ville.
- **DBSCAN** : mieux adapté pour coller aux poches vraiment denses et ignorer le bruit.

---

## Recommandation
Utiliser **DBSCAN** pour guider les chauffeurs sur un créneau donné, et **KMeans** pour une vue macro des secteurs NYC.
