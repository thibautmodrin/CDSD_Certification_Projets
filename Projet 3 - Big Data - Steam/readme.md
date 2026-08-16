# Steam — EDA Big Data (PySpark / Databricks)

## Objectif
Analyser le catalogue Steam pour Ubisoft : comprendre l’écosystème jeux vidéo et les **facteurs de popularité / tendances** (éditeurs, notes, sorties, prix, langues, âges, genres).

Brief : [`Steam's videogames platform 👾.pdf`](./Steam's%20videogames%20platform%20👾.pdf)  
Notebook : [`EDA_Steam.ipynb`](EDA_Steam.ipynb) *(version avec outputs Databricks)*

---

## Alignement avec la mission

| Question / livrable | Statut | Dans `EDA_Steam.ipynb` |
|---|---|---|
| PySpark + viz Databricks (`display`) | OK | Tidying JSON → analyses |
| Lien notebook accessible jury | Partiel | Lien éditeur Databricks — idéalement **Publish** public |
| Publisher avec le plus de jeux | OK | ranking publishers |
| Jeux les mieux notés | OK | `ratings_score` (ratio × volume) |
| Sorties par année / Covid | OK | `year` + flag Covid 2020–2021 |
| Distribution des prix / remises | OK | prix & `hasDiscount` |
| Langues les plus représentées | OK | `explode` languages |
| Jeux interdits −16 / −18 | OK | `required_age` nettoyé |
| Genres les plus représentés | OK | `explode` genres |
| Genres avec meilleur ratio avis +/− | OK | moyenne `ratings_score` par genre |
| Publishers → genres favoris | Manquant | non traité |
| Genres les plus lucratifs | Manquant | non traité |
| Plateformes Windows / Mac / Linux | Manquant | champs présents dans le schéma, non analysés |
| Genres × plateformes | Manquant | non traité |

**Verdict** : **macro + genres** bien couverts et chiffrés. Manquent plateformes / genres lucratifs / publisher×genre.

---

## Données & stack
- Source : `s3://full-stack-bigdata-datasets/Big_Data/Project_Steam/steam_game_output.json`
- Environnement : **Databricks + PySpark** (JSON nested → tidy via `walkSchema` / `explode`)
- Viz : `display` Databricks

Lien notebook Databricks :  
https://dbc-b0984f6a-a4b8.cloud.databricks.com/editor/notebooks/1072870576869292?o=560273488971544

> Consigne Jedha : utiliser **Publish** pour une URL publique (le lien éditeur peut nécessiter un compte).

---

## Pipeline du notebook
1. **Tidying** — aplatir le schéma nested JSON  
2. **Preprocessing** — cast prix, drop `appid` redondant, contrôle NA  
3. **Analyses métier** — groupBy / agrégats / displays  

---

## Résultats clés (outputs Databricks)

### Éditeurs (volume de jeux)
| Publisher | # jeux |
|---|---|
| **Big Fish Games** | **422** |
| 8floor | 202 |
| SEGA | 165 |
| Strategy First | 151 |
| Square Enix | 141 |
| Ubisoft | 127 |

### Jeux les mieux notés (`ratings_score`)
Top observé : **Portal 2**, People Playground, Vampire Survivors, Hades, Portal, Half-Life: Alyx, Stardew Valley, RimWorld, ULTRAKILL…  
(score ~0.98+, très fort ratio positif × volume d’avis)

### Langues les plus représentées
| Langue | Occurrences (après explode) |
|---|---|
| **English** | **55 123** |
| Chinese | 19 090 |
| Spanish | 14 969 |
| German | 14 023 |
| French | 13 427 |
| Russian | 12 922 |

### Genres — volume
| Genre | Count |
|---|---|
| **Indie** | **39 681** |
| Action | 23 759 |
| Casual | 22 086 |
| Adventure | 21 431 |
| Strategy | 10 895 |
| Simulation | 10 836 |
| RPG | 9 534 |

### Genres — qualité moyenne des avis (`mean ratings_score`)
| Genre | Score moyen |
|---|---|
| **Free to Play** | **0.51** |
| RPG | 0.42 |
| Massively Multiplayer | 0.42 |
| Adventure | 0.40 |
| Action / Indie | ~0.38 |
| Early Access | 0.33 |
| Education / Accounting | plus bas (~0.23–0.26) |

### Âge requis
Majorité des jeux en **âge 0 / « inf 16 »** → peu de titres réellement restreints −16/−18 dans le catalogue traité.

### Prix & remises
Displays de distribution des prix et flag `hasDiscount` / `hasNotDiscount` présents dans le notebook (agrégat % non figé en table texte).

### Sorties / Covid
Colonne `year` + flag `Covid` (2020–2021) vs `No Covid` — visualisations Databricks dans le notebook.

---

## Recommandations (Ubisoft / marché)
- Le catalogue est dominé par l’**Indie** et l’**Action** : forte concurrence volume.  
- La qualité perçue (avis) est meilleure sur certains niches (**Free to Play**, **RPG**, MMO) que sur Early Access / outils.  
- L’anglais domine largement ; FR/DE/ES restent des langues secondaires importantes.  
- Pour un lancement : viser un positionnement qualité (ratings) plutôt que le volume “casual/indie” saturé.

---

## Points d’attention
1. Preprocessing prix : vérifier que `initialprice` / `discount` utilisent bien les champs bruts du JSON.  
2. Lien Databricks = éditeur (login) → préférer **Publish** pour le jury.  
3. Compléments possibles : **platforms**, **owners/CCU** (lucrativité), **publisher × genre**.

---

## Stack
```bash
pip install -r requirements.txt
```
L’exécution complète nécessite un cluster **Databricks / Spark** avec accès S3 Jedha.
