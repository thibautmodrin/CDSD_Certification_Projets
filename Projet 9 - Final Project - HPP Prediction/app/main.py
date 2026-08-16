from __future__ import annotations

from pathlib import Path

import joblib
import numpy as np
import pandas as pd
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel, Field

ART = Path(__file__).resolve().parent / "model" / "artifacts"
MODEL_PATH = ART / "model.joblib"
FEAT_PATH = ART / "feature_order.pkl"

if not MODEL_PATH.exists() or not FEAT_PATH.exists():
    raise FileNotFoundError(
        f"Artefacts manquants dans {ART}. "
        "Copie model.joblib + feature_order.pkl (voir README)."
    )

pipe = joblib.load(MODEL_PATH)
feature_order: list[str] = joblib.load(FEAT_PATH)


class PredictIn(BaseModel):
    input: list[list[object]] = Field(
        ...,
        description="Lignes de features dans l'ordre de /model/feature_order",
    )


app = FastAPI(
    title="HPP Prediction API",
    description=(
        "API d'inférence pour le risque d'HPP sévère. "
        'POST /predict avec {"input": [[...]]} → '
        '{"prediction": [...], "probability": [...]}'
    ),
    version="1.0.0",
)


@app.get("/")
def root():
    return {
        "service": "HPP Prediction API",
        "docs": "/docs",
        "predict": "POST /predict",
        "health": "/health",
        "feature_order": "/model/feature_order",
        "author": "thibautmodrin",
    }


@app.get("/health")
def health():
    return {"status": "ok", "n_features": len(feature_order)}


@app.get("/model/feature_order")
def model_feature_order():
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
                detail=(
                    f"Nombre de features inattendu: {X.shape[1]} vs "
                    f"attendu {len(feature_order)}. "
                    "Voir GET /model/feature_order."
                ),
            )
        df = pd.DataFrame(X, columns=feature_order)
        # AMP souvent string dans le CSV démo
        yhat = pipe.predict(df).tolist()
        proba = pipe.predict_proba(df)[:, 1].tolist()
        return {"prediction": yhat, "probability": proba}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
