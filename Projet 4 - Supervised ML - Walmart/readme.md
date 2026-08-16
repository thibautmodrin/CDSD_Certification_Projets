# Walmart — Prédiction des ventes hebdomadaires

## Objectif
Estimer les **ventes hebdomadaires** (`Weekly_Sales`) des magasins Walmart à partir d’indicateurs économiques (CPI, chômage, carburant, température, etc.), pour mieux comprendre les leviers et planifier le marketing.

Livrables mission Jedha :
- visualisations EDA
- régression linéaire (baseline)
- métrique de régression (R²) + interprétation des coefficients
- régularisation **Ridge** et/ou **Lasso** (+ GridSearchCV)

---

## Notebook
Fichier principal : [`ML_Walmart.ipynb`](ML_Walmart.ipynb)  
Brief mission : [`01-Walmart_sales.ipynb`](01-Walmart_sales.ipynb)

| Partie | Contenu |
|---|---|
| 1 | EDA, dates, outliers ±3σ, pipeline sklearn |
| 2 | `LinearRegression` + coefficients |
| 3 | `Ridge` / `Lasso` + `GridSearchCV` |

---

## Données
Fichier : `Walmart_Store_sales.csv` (dataset custom Jedha / JULIE).

Preprocessing clé :
- drop des lignes sans `Weekly_Sales`
- features `year`, `month`, `day`, `day_of_week`
- outliers hors \([\bar{X}-3\sigma,\ \bar{X}+3\sigma]\) sur `Temperature`, `Fuel_Price`, `CPI`, `Unemployment`
- cat : `Store`, `Holiday_Flag` · num : le reste

---

## Résultats (après outliers ±3σ)

Dataset : **150 → 145** lignes (−5 outliers).

| Modèle | Train R² | Test R² | Notes |
|---|---|---|---|
| LinearRegression | **0.977** | **0.891** | baseline, léger overfit |
| Ridge + GridSearch | **0.976** | **0.895** | best `alpha ≈ 0.10` |
| Lasso (Store, CPI, month) | CV **0.935** | **0.892** | best `alpha = 10` |

Variables les plus influentes : **Store**, **month**, **CPI**.

---

## Stack
```bash
pip install -r requirements.txt
```
- `pandas` / `numpy` / `plotly`
- `scikit-learn` (`Pipeline`, `ColumnTransformer`, `LinearRegression`, `Ridge`, `Lasso`, `GridSearchCV`)

---

## Recommandation
Utiliser un modèle **régularisé** (Ridge/Lasso) pour des prédictions plus stables ; cibler les campagnes selon le magasin et la saisonnalité, en surveillant le CPI.
