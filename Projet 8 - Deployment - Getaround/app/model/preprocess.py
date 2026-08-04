from __future__ import annotations
import numpy as np
import pandas as pd
from typing import Tuple, List
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder, StandardScaler

EXCLUDE_COLS = {
    "rental_id", "car_id", "id", "created_at", "updated_at",
    "model_key_x", "model_key_y"  # exemples fréquents
}

TARGET_CANDIDATES = ["rental_price_per_day", "price_per_day", "price"]

def split_features_target(df: pd.DataFrame) -> Tuple[pd.DataFrame, np.ndarray, str]:
    target_col = None
    for c in TARGET_CANDIDATES:
        if c in df.columns:
            target_col = c
            break
    if not target_col:
        raise ValueError(f"Colonne cible introuvable parmi {TARGET_CANDIDATES}")

    y = df[target_col].values
    X = df.drop(columns=[target_col])
    return X, y, target_col

def build_preprocessor(X: pd.DataFrame) -> Tuple[ColumnTransformer, List[str], List[str]]:
    # Détecte colonnes num/qualitatives de façon robuste
    num_cols = X.select_dtypes(include=[np.number]).columns.tolist()
    cat_cols = X.select_dtypes(exclude=[np.number]).columns.tolist()

    # Retire colonnes connues inutiles si elles sont là
    num_cols = [c for c in num_cols if c not in EXCLUDE_COLS]
    cat_cols = [c for c in cat_cols if c not in EXCLUDE_COLS]

    preproc = ColumnTransformer(
        transformers=[
            ("num", StandardScaler(), num_cols),
            ("cat", OneHotEncoder(handle_unknown="ignore", sparse_output=False), cat_cols),
        ],
        remainder="drop",
    )
    return preproc, num_cols, cat_cols
