# Speed Dating with Tinder — EDA & visualisation

## Objectif
Comprendre **ce qui pousse deux personnes à accepter un second rendez-vous** (match), pour aider le marketing Tinder face à une baisse de matches.

Livrables mission Jedha (Bloc 2) :
- statistiques descriptives
- visualisations
- interprétations sur les leviers du second date

Brief : [`01-Speed_Dating.ipynb`](01-Speed_Dating.ipynb)  
Notebook : [`Project_Tinder.ipynb`](Project_Tinder.ipynb)

---

## Alignement avec la mission

| Exigence / question helper | Statut | Dans le notebook |
|---|---|---|
| Stats descriptives | OK | `describe`, groupby, moyennes |
| Visualisations + légendes | OK | Fig 1 → 11 (Plotly) |
| Interprétations second date | OK | markdown après chaque question |
| Attributs les moins désirables H/F | OK | Fig 1–3 |
| Attractiveness : déclaré vs réel | OK | Fig 4–5 |
| Intérêts partagés vs race | OK | Fig 6–7 |
| Auto-évaluation vs marché | OK | Fig 8 |
| Premier vs dernier date de la soirée | OK | Fig 9–11 |

**Verdict** : `Project_Tinder.ipynb` **couvre le brief** `01-Speed_Dating.ipynb` (EDA + viz + captions).  
Note méthode : exclusion des waves **6–9** (échelle de notation incompatible).

---

## Données
- Fichier : `Speed+Dating+Data.csv` (expériences speed dating 2002–2004)
- Une ligne = un speed date entre deux personnes (+ décisions / notes / questionnaires)

---

## Résultats clés

1. **Préférences déclarées**  
   Ambition et intérêts partagés sont les attributs les **moins** recherchés (H et F). Chez les hommes, la demande d’**attractiveness** est plus polarisée.

2. **Attractiveness**  
   Critère le plus mis en avant avant le date, et mieux noté quand la décision de revoir quelqu’un est positive → levier fort du match.

3. **Intérêts & race**  
   Corrélation d’intérêts et même origine ethnique **n’impactent pas clairement** le match (proportions similaires match / non-match).

4. **Auto-perception**  
   Les participants **s’over-estiment** d’environ **+1 point** vs la note donnée par le partenaire.

5. **Ordre dans la soirée**  
   Le taux de match ne dépend pas fortement de l’ordre ; en revanche, les signaux de “second date” tendent à monter pour les dates **plus tardifs** (avec biais possible selon la définition de `date_3`).

---

## Recommandations métier (Tinder)
- Mettre en avant dans l’UI / le matching les signaux liés à l’**attractiveness** et au **fun** (forts sur la décision).
- Ne pas surpondérer seuls “intérêts communs” ou “même background” dans l’algo de suggestion.
- Travailler la **calibration** des profils (écart perception de soi vs feedback réel).

---

## Stack
```bash
pip install pandas plotly nbformat ipykernel
```
- `pandas` · `plotly` (`express`, `graph_objects`, subplots)

Figures exportées : `Fig_1_*.png` … `Fig_9_*.png` (dans le dossier projet).
