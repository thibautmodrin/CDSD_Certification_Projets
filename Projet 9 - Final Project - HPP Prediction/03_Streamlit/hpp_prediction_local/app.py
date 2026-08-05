import streamlit as st
import pandas as pd
import joblib


@st.cache_resource
def load_model():
    return joblib.load("best_model_logreg_f1_Sans_resampling.joblib")


st.set_page_config(page_title="Prédiction HPP", layout="wide")
st.title("🩺 Application de Prédiction d'HPP sévère")

try:
    model = load_model()
    st.success("Modèle chargé avec succès")
except Exception as e:
    st.error(f"Erreur lors du chargement du modèle : {e}")
    st.stop()

expected = None
if hasattr(model, "feature_names_in_"):
    expected = list(model.feature_names_in_)
elif hasattr(model, "named_steps"):
    for step in model.named_steps.values():
        if hasattr(step, "feature_names_in_"):
            expected = list(step.feature_names_in_)
            break

if expected:
    with st.expander("Colonnes attendues par le modèle"):
        st.code(", ".join(expected))

st.caption("Fichier d'exemple fourni : `test_dataset_predictor.csv`")

uploaded_file = st.file_uploader(
    "Importer votre fichier CSV avec les variables nécessaires", type="csv"
)

if uploaded_file is not None:
    st.write(f"Fichier uploadé : **{uploaded_file.name}** ({uploaded_file.size} octets)")
    try:
        data = pd.read_csv(uploaded_file)
        st.success(f"CSV lu avec succès — {data.shape[0]} lignes × {data.shape[1]} colonnes")
        st.write("### Aperçu des données")
        # Évite st.dataframe / st.table (freeze fréquent sur Spaces)
        st.code(data.head(10).to_string(index=False))
    except Exception as e:
        st.error(f"Erreur lors de la lecture du CSV : {e}")
        st.stop()

    if expected:
        missing = [c for c in expected if c not in data.columns]
        extra = [c for c in data.columns if c not in expected]
        if missing:
            st.error(f"Colonnes manquantes : {missing}")
        if extra:
            st.warning(f"Colonnes ignorées / en trop : {extra}")

    if st.button("Prédire", type="primary"):
        with st.spinner("Prédictions en cours..."):
            try:
                X = data.copy()
                if X.isna().any().any():
                    before = len(X)
                    X = X.dropna()
                    st.warning(f"{before - len(X)} ligne(s) avec NA supprimée(s).")

                if expected:
                    X = X[expected]

                predictions = model.predict(X)
                probs = model.predict_proba(X)[:, 1]
                results = X.copy()
                results["Prédiction"] = predictions
                results["Probabilité_HPP (%)"] = (probs * 100).round(2)
                results = results.sort_values("Probabilité_HPP (%)", ascending=False)

                st.write("### Résultats")
                st.code(results.to_string(index=False))

                n_pos = int((predictions == 1).sum())
                st.info(f"Cas prédits à risque HPP : **{n_pos}** / {len(predictions)}")

                st.download_button(
                    label="Télécharger les résultats en CSV",
                    data=results.to_csv(index=False).encode("utf-8"),
                    file_name="resultats_predictions.csv",
                    mime="text/csv",
                )
            except Exception as e:
                st.error(f"Erreur lors de la prédiction : {e}")
