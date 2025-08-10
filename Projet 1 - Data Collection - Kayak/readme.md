# 🌍 Plan Your Trip with Kayak – Data Pipeline & Visualization

## 📌 Contexte et Objectif

Ce projet a été réalisé dans le cadre du notebook **0\_Plan\_your\_trip\_with\_Kayak.ipynb**, dont l’objectif est de construire un pipeline complet permettant de :

1. **Collecter des données** depuis différentes sources (API GPS, API météo, scraping Booking)
2. **Nettoyer et stocker** ces données (S3, RDS)
3. **Analyser et visualiser** les informations sur une carte interactive
4. **Proposer un outil d’aide à la planification de voyages** avec intégration météo et hébergements

---

## 📂 Structure du projet

| Notebook                                   | Description                                                                                                          |
| ------------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| **0\_Plan\_your\_trip\_with\_Kayak.ipynb** | Cahier de planification du projet : définition des objectifs, des sources de données et de l’architecture globale.   |
| **1\_Api\_GPS.ipynb**                      | Récupération de coordonnées GPS via API à partir de noms de villes / lieux.                                          |
| **2\_Api\_meteo.ipynb**                    | Connexion à une API météo (OpenWeather ou autre) pour récupérer les prévisions associées aux coordonnées GPS.        |
| **3\_S3\_data\_clean\_stock.ipynb**        | Nettoyage des données brutes et stockage sur AWS S3 (fichiers CSV/Parquet).                                          |
| **4\_Map.ipynb**                           | Création d’une carte de base avec Plotly ou Folium, affichant les points GPS récupérés.                              |
| **5\_Booking\_Scrap.ipynb**                | Scraping d’annonces d’hôtels sur Booking (prix, notes, URL, coordonnées).                                            |
| **6\_S3\_DB\_RDS.ipynb**                   | Insertion des données nettoyées dans une base AWS RDS (PostgreSQL/MySQL).                                            |
| **7\_Viz\_Map.ipynb**                      | Visualisation interactive finale : carte des destinations avec météo et hébergements, intégration des liens Booking. |

---

