# Données brutes / traitées (hors git — RGPD & volume)

## Source publique (Drive)

Dossier partagé Jedha / maternité Bourgogne :

https://drive.google.com/drive/folders/1DToPXrJ8znq9WH0SLrvFEvX7N-LTY-Eg?usp=sharing

Fichiers à télécharger dans `raw/` :

| Fichier Drive | Destination locale |
|---------------|--------------------|
| `Bourgogne20132023.xls` | `00_Data/raw/Bourgogne20132023.xls` |
| `Dictionnaire variables.xlsx` | `00_Data/raw/Dictionnaire variables.xlsx` |

## Pipeline rejouable

```text
raw/ (.xls)  →  00_Prepare_Data.ipynb  →  processed/hpp_prepartum.csv
                                              ↓
                                    01_EDA → 02 → 03 (+ MLflow)
```

1. Placer les fichiers Drive dans `raw/`
2. Lancer `01_Notebooks/00_Prepare_Data.ipynb`
3. Enchaîner `01_EDA` → `02_Preprocessing` → `03_Model_Comparison`

Sans `processed/` ni `raw/`, les notebooks utilisent l’**extrait portfolio** (`extract_database.csv`) — mode démo uniquement.

## Ne pas committer

- `raw/` (~58 Mo .xls)
- `processed/` (CSV ~60k lignes)
- Anciens chemins : `Bourgogne20132023.csv` / `.xls` à la racine de `00_Data/`

Repo source historique : https://github.com/thibautmodrin/Jedha_Full_Stack_HPP_Prediction
