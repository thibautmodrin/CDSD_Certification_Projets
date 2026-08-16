from __future__ import annotations

import os
from pathlib import Path

import joblib
import pandas as pd
import requests
import streamlit as st

DEMO_CSV = Path(__file__).resolve().parent / "test_dataset_predictor.csv"
LOCAL_MODEL = Path(__file__).resolve().parent / "best_model_logreg_f1_Sans_resampling.joblib"
API_URL = os.environ.get("HPP_API_URL", "").rstrip("/")


@st.cache_resource
def load_model():
    return joblib.load(LOCAL_MODEL)


def get_expected_columns(model) -> list[str] | None:
    if hasattr(model, "feature_names_in_"):
        return list(model.feature_names_in_)
    if hasattr(model, "named_steps"):
        for step in model.named_steps.values():
            if hasattr(step, "feature_names_in_"):
                return list(step.feature_names_in_)
    # fallback demo schema
    if DEMO_CSV.exists():
        return list(pd.read_csv(DEMO_CSV, nrows=0).columns)
    return None


def predict_via_api(X: pd.DataFrame) -> tuple[list, list]:
    rows = []
    for _, row in X.iterrows():
        rows.append([None if pd.isna(v) else v for v in row.tolist()])
    r = requests.post(
        f"{API_URL}/predict",
        json={"input": rows},
        timeout=60,
    )
    r.raise_for_status()
    body = r.json()
    return body["prediction"], body.get("probability", [])


def predict_local(model, X: pd.DataFrame) -> tuple[list, list]:
    preds = model.predict(X).tolist()
    proba = model.predict_proba(X)[:, 1].tolist()
    return preds, proba


st.set_page_config(page_title="Prédiction HPP", layout="wide")
st.title("Prédiction d'HPP sévère")
st.caption(
    "POC clinique — risque d'hémorragie du post-partum sévère avant l'accouchement. "
    "Priorité métier : rappel (recall)."
)

mode = "API" if API_URL else "local (joblib)"
st.info(f"Mode d'inférence : **{mode}**" + (f" → `{API_URL}`" if API_URL else ""))

model = None
if not API_URL:
    try:
        model = load_model()
        st.success("Modèle local chargé")
    except Exception as e:
        st.error(f"Erreur chargement modèle local : {e}")
        st.stop()
else:
    try:
        h = requests.get(f"{API_URL}/health", timeout=10)
        if h.ok:
            st.success("API joignable")
        else:
            st.warning("API répond mais health non OK — fallback local si possible")
            model = load_model()
    except Exception:
        st.warning("API injoignable — fallback modèle local")
        try:
            model = load_model()
        except Exception as e:
            st.error(f"Ni API ni modèle local : {e}")
            st.stop()

expected = get_expected_columns(model) if model is not None else None
if expected is None and API_URL:
    try:
        fo = requests.get(f"{API_URL}/model/feature_order", timeout=10).json()
        expected = fo.get("feature_order")
    except Exception:
        expected = list(pd.read_csv(DEMO_CSV, nrows=0).columns) if DEMO_CSV.exists() else None

if expected:
    with st.expander("Colonnes attendues par le modèle"):
        st.code(", ".join(expected))

st.subheader("Données d'entrée")
st.caption(
    "Chargez le jeu de démo, ou importez un CSV "
    "(mêmes colonnes que `test_dataset_predictor.csv`)."
)

col_demo, col_upload = st.columns([1, 2])
with col_demo:
    load_demo = st.button("Charger le dataset de démo", use_container_width=True)
with col_upload:
    uploaded_file = st.file_uploader(
        "Importer un CSV", type="csv"
    )

if "data" not in st.session_state:
    st.session_state.data = None
    st.session_state.data_label = None
    st.session_state.upload_key = None

if load_demo:
    if not DEMO_CSV.exists():
        st.error(f"Fichier de démo introuvable : `{DEMO_CSV.name}`")
        st.stop()
    st.session_state.data = pd.read_csv(DEMO_CSV)
    st.session_state.data_label = f"{DEMO_CSV.name} (démo)"
    st.session_state.upload_key = None

if uploaded_file is not None:
    upload_key = (uploaded_file.name, uploaded_file.size)
    if st.session_state.upload_key != upload_key:
        st.session_state.data = pd.read_csv(uploaded_file)
        st.session_state.data_label = uploaded_file.name
        st.session_state.upload_key = upload_key

data = st.session_state.data

if data is not None:
    st.write(f"Jeu chargé : **{st.session_state.data_label}**")
    st.success(f"{data.shape[0]} lignes × {data.shape[1]} colonnes")
    st.write("### Aperçu")
    st.code(data.head(10).to_string(index=False))

    if expected:
        missing = [c for c in expected if c not in data.columns]
        extra = [c for c in data.columns if c not in expected]
        if missing:
            st.error(f"Colonnes manquantes : {missing}")
        if extra:
            st.warning(f"Colonnes ignorées : {extra}")

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

                used_api = False
                if API_URL and model is None:
                    predictions, probs = predict_via_api(X)
                    used_api = True
                elif API_URL:
                    try:
                        predictions, probs = predict_via_api(X)
                        used_api = True
                    except Exception as api_err:
                        st.warning(f"API en échec ({api_err}) — fallback local")
                        predictions, probs = predict_local(model, X)
                else:
                    predictions, probs = predict_local(model, X)

                results = X.copy()
                results["Prédiction"] = predictions
                if probs:
                    results["Probabilité_HPP (%)"] = (pd.Series(probs) * 100).round(2).values
                    results = results.sort_values("Probabilité_HPP (%)", ascending=False)

                st.write("### Résultats", f"(via {'API' if used_api else 'joblib local'})")
                st.code(results.to_string(index=False))
                n_pos = int(sum(int(p) == 1 for p in predictions))
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
