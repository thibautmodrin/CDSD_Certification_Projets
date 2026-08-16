from pathlib import Path

import joblib
import pandas as pd
import streamlit as st

DEMO_CSV = Path(__file__).resolve().parent / "test_dataset_predictor.csv"


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

st.write("### Données d'entrée")
st.caption(
    "Chargez le jeu de démo fourni, ou importez votre propre CSV "
    "(même colonnes que `test_dataset_predictor.csv`)."
)

col_demo, col_upload = st.columns([1, 2])
with col_demo:
    load_demo = st.button("Charger le dataset de démo", use_container_width=True)
with col_upload:
    uploaded_file = st.file_uploader(
        "Importer votre fichier CSV avec les variables nécessaires", type="csv"
    )

if "data" not in st.session_state:
    st.session_state.data = None
    st.session_state.data_label = None
    st.session_state.upload_key = None

if load_demo:
    if not DEMO_CSV.exists():
        st.error(f"Fichier de démo introuvable : `{DEMO_CSV.name}`")
        st.stop()
    try:
        st.session_state.data = pd.read_csv(DEMO_CSV)
        st.session_state.data_label = f"{DEMO_CSV.name} (démo)"
        st.session_state.upload_key = None
    except Exception as e:
        st.error(f"Erreur lors du chargement du dataset de démo : {e}")
        st.stop()

if uploaded_file is not None:
    upload_key = (uploaded_file.name, uploaded_file.size)
    if st.session_state.upload_key != upload_key:
        try:
            st.session_state.data = pd.read_csv(uploaded_file)
            st.session_state.data_label = uploaded_file.name
            st.session_state.upload_key = upload_key
        except Exception as e:
            st.error(f"Erreur lors de la lecture du CSV : {e}")
            st.stop()

data = st.session_state.data

if data is not None:
    st.write(f"Jeu chargé : **{st.session_state.data_label}**")
    st.success(f"CSV lu avec succès — {data.shape[0]} lignes × {data.shape[1]} colonnes")
    st.write("### Aperçu des données")
    # Évite st.dataframe / st.table (freeze fréquent sur Spaces)
    st.code(data.head(10).to_string(index=False))

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
else:
    st.info("Chargez le dataset de démo ou importez un CSV pour lancer une prédiction.")
