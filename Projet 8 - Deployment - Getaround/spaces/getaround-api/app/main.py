from __future__ import annotations
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from pathlib import Path
import joblib
import numpy as np
import pandas as pd  # important: on construit un DataFrame avec les bons noms

ART = Path(__file__).resolve().parent / "model" / "artifacts"
PIPE_PATH = ART / "reg.pkl"
FEAT_PATH = ART / "feature_order.pkl"

if not PIPE_PATH.exists() or not FEAT_PATH.exists():
    raise FileNotFoundError(
        "Modèle introuvable. Lance d'abord: python app/model/train.py"
    )

pipe = joblib.load(PIPE_PATH)
feature_order = joblib.load(FEAT_PATH)


class PredictIn(BaseModel):
    input: list[
        list[object]
    ]  # liste de lignes, chaque ligne = features dans l'ordre d'entraînement


app = FastAPI(
    title="Getaround Pricing API",
    description='Endpoint /predict acceptant {"input": [[...]]} et retournant {"prediction":[...]}',
    version="1.1.0",
)


@app.get("/")
def root():
    return {
        "service": "Getaround Pricing API",
        "docs": "/docs",
        "predict": "POST /predict",
        "health": "/health",
        "feature_order": "/model/feature_order",
        "author": "thibautmodrin",
    }


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/model/feature_order")
def model_feature_order():
    """Expose l'ordre des colonnes attendu par l'API (celui du CSV d'entraînement)."""
    return {"feature_order": feature_order}


@app.post("/predict")
def predict(payload: PredictIn):
    try:
        X = np.array(payload.input, dtype=object)
        if X.ndim != 2:
            raise HTTPException(
                status_code=400, detail="input doit être une liste de listes [[...]]"
            )

        if X.shape[1] != len(feature_order):
            raise HTTPException(
                status_code=400,
                detail=f"Nombre de features inattendu: {X.shape[1]} vs attendu {len(feature_order)}. "
                f"Récupère l'ordre via /model/feature_order.",
            )

        # CLÉ DU FIX: on crée un DataFrame avec les NOMS DE COLONNES attendus
        df = pd.DataFrame(X, columns=feature_order)
        yhat = pipe.predict(df).tolist()
        return {"prediction": yhat}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
