# Plan Your Trip with Kayak — Data Collection & Visualization

**Certification Jedha — RNCP35288 (Data Science & IA)**  
**Bloc 1** — Construction et alimentation d'une infrastructure de gestion de données

---

## Contexte business

Kayak est un moteur de recherche de voyages. D’après une étude interne fictive :

- **70 %** des utilisateurs veulent plus d’informations sur leur destination avant de réserver
- **~32 %** des utilisateurs abandonnent s’ils ne trouvent pas assez d’infos météo / hébergement

**Objectif** : construire un pipeline de données bout-en-bout pour recommander les **meilleures destinations** (météo + hôtels) et les visualiser sur une carte interactive.

---

## Pipeline (architecture)

```
Villes FR (35)
    │
    ▼
[1] Nominatim API  ──► GPS (lat, lon)
    │
    ▼
[2] OpenWeather API ──► prévisions 7 j ──► score météo (CCM)
    │
    ▼
[3] AWS S3  ──► stockage CSV nettoyé
    │
    ▼
[5] Scrapy (Booking.com) ──► top hôtels / ville (note, URL, GPS)
    │
    ▼
[6] AWS RDS (MySQL) ──► table relationnelle
    │
    ▼
[7] Plotly / Dash ──► carte interactive (météo + hôtels)
```

---

## Structure des notebooks

| Fichier | Rôle |
|---------|------|
| `0_Plan_your_trip_with_Kayak.ipynb` | Brief projet & objectifs |
| `1_Api_GPS.ipynb` | Géocodage Nominatim (35 villes) |
| `2_Api_meteo.ipynb` | Prévisions OpenWeather + score CCM |
| `3_S3_data_clean_stock.ipynb` | Upload S3 (`boto3`) |
| `4_Map.ipynb` | Carte météo Plotly |
| `5_Booking_Scrap.ipynb` | Orchestration scraping |
| `booking_scrap_final.py` | Spider Scrapy Booking.com |
| `6_S3_DB_RDS.ipynb` | Instance RDS MySQL + `to_sql` |
| `7_Viz_Map.ipynb` | Carte finale météo + hôtels |

---

## Stack technique

| Domaine | Outils |
|---------|--------|
| Langage | Python 3 |
| Collecte API | `requests`, Nominatim, OpenWeather |
| Scraping | Scrapy (autothrottle, cache HTTP) |
| Data | pandas, numpy |
| Cloud | AWS S3, AWS RDS (MySQL), `boto3`, SQLAlchemy |
| Secrets | `python-dotenv` (`.env` non versionné) |
| Viz | Plotly Express, Dash |

---

## Résultats clés

| Indicateur | Valeur |
|------------|--------|
| Villes géocodées | 34–35 |
| Destinations scorées (CCM) | 34 |
| Hôtels scrapés (échantillon) | ~300–800 selon run |
| Top destination (CCM) | Le Havre (~0.93) |
| Note hôtels moyenne | ~8.7 / 10 |
| Stockage | S3 (CSV) + RDS MySQL |
| Livrable final | Carte interactive (screenshot `screenshot_maps.png`) |

**Score météo (CCM)** : agrège les prévisions (température, couverture nuageuse, précipitations, etc.) pour classer les villes sur ~7 jours.

---

## Démarrage rapide

### 1. Environnement

```bash
cd "Projet 1 - Data Collection - Kayak"
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

### 2. Secrets (ne jamais committer)

```bash
cp .env.example .env
# renseigner OpenWeather + AWS + RDS
```

### 3. Enchaînement recommandé

1. `1_Api_GPS.ipynb` → `cities_lat_long.csv`
2. `2_Api_meteo.ipynb` → score CCM + ranking
3. `3_S3_data_clean_stock.ipynb` → upload S3
4. Scraping Booking :

```bash
python booking_scrap_final.py --cities "Paris" "Marseille" "Lyon"
# ou via 5_Booking_Scrap.ipynb
```

5. `6_S3_DB_RDS.ipynb` → RDS + insertion
6. `7_Viz_Map.ipynb` → visualisation

---

## Données produites

| Fichier | Description |
|---------|-------------|
| `cities_lat_long.csv` | Villes + GPS |
| `cities_lat_long_ccm.csv` | + score météo CCM |
| `hotels.json` / `hotels.csv` | Hôtels scrapés |
| `City_Meteo_Rank_Booking.csv` | Jointure météo + hôtels |
| `screenshot_maps.png` | Aperçu de la carte finale |

---

## Compétences démontrées (oral)

- Collecte multi-sources (API REST + scraping)
- Nettoyage / jointure de datasets hétérogènes
- Architecture cloud data (S3 lac de fichiers + RDS relationnel)
- Sécurisation des credentials (`.env`)
- Visualisation décisionnelle (ranking destinations + hôtels)

---

## Limites & pistes d’amélioration

| Limite | Amélioration possible |
|--------|------------------------|
| Scraping fragile (DOM Booking change) | Sélecteurs plus robustes / API officielle si dispo |
| Score CCM simplifié | Pondération métier + validation |
| Run notebooks manuels | Orchestration (Airflow / cron) |
| ACL S3 `public-read` | Accès privé + signed URLs |
| Pas de tests automatisés | Tests unitaires spider + schéma données |

---

## Auteur

**Thibaut Modrin** — Certification Data Scientist Jedha (RNCP35288)  
Repo : [CDSD_Certification_Projets](https://github.com/thibautmodrin/CDSD_Certification_Projets)
