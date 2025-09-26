# Conversion Rate Challenge — Executive Summary

## 🎯 Objectif
Prédire si un visiteur du site s’inscrit à la newsletter, afin d’identifier les leviers qui influencent le **taux de conversion**.  
Métrique d’évaluation : **F1-score** (équilibre entre précision et rappel).

---

## 📊 Résultats principaux

| Modèle                | F1-score | Seuil optimal |
|------------------------|----------|---------------|
| Logistic Regression ✅ | **0.777**| 0.96 |
| Gradient Boosting      | 0.773    | 0.44 |
| XGBoost                | 0.769    | 0.42 |
| Random Forest          | 0.725    | 0.85 |

- **Meilleur modèle** : Logistic Regression (simple, performant, interprétable)  
- **Classe “conversion” (1)** : Précision 0.85, Rappel 0.72  
- **Précision globale** : 0.99 (99 % des prédictions correctes)

---

## 🔍 Variables clés

- **Pages visitées (`total_pages_visited`)** → corrélées positivement avec la conversion  
- **Canal d’acquisition** → Direct & SEO plus performants que Ads  
- **Pays** → différences fortes (ex. Chine, Allemagne)  
- **Nouveaux utilisateurs (`new_user`)** → comportement distinct des anciens  
- **Âge** → influence modérée mais significative

---

## 💡 Recommandations business

1. **Stimuler la navigation** → encourager les visiteurs à consulter plus de pages (contenus liés, suggestions dynamiques).  
2. **Renforcer les canaux performants** → investir dans **SEO** et trafic direct ; optimiser les campagnes Ads.  
3. **Adapter la communication par pays** → messages marketing personnalisés selon les zones géographiques.  

---

## 🛠️ Recommandations techniques

1. **Équilibrage des classes**  
   - La classe “conversion” reste minoritaire. Tester SMOTE ou ajuster `class_weight` pour améliorer le rappel.  

2. **Feature engineering**  
   - Créer des variables dérivées : ratio pages vues / durée de session, interactions entre `age` et `source`, engagement moyen par pays.  

3. **Modèles plus avancés**  
   - Tester LightGBM, CatBoost ou un modèle de stacking (logreg + boosting) pour combiner interprétabilité et performance.  

4. **Optimisation du seuil**  
   - Le seuil actuel (0.96) maximise le F1 mais peut être ajusté selon les objectifs business (privilégier rappel ou précision).  

---

👉 Le modèle atteint un **F1 de 0.777**, solide pour un problème déséquilibré, et fournit des insights exploitables à la fois **métier** et **techniques** pour améliorer le taux de conversion.
