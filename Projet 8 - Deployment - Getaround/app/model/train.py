from __future__ import annotations
from pathlib import Path
import joblib
import numpy as np
import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.linear_model import Ridge
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error

from preprocess import split_features_target, build_preprocessor

ROOT = Path(__file__).resolve().parents[2]
DATA = ROOT / "dashboard" / "data" / "get_around_pricing_project.csv"
ART = Path(__file__).resolve().parent / "artifacts"
ART.mkdir(parents=True, exist_ok=True)


def main() -> None:
    if not DATA.exists():
        raise FileNotFoundError(f"Fichier introuvable: {DATA}")

    df = pd.read_csv(DATA)
    # Drop lignes sans cible
    X, y, target = split_features_target(df.dropna(subset=df.columns))

    preproc, num_cols, cat_cols = build_preprocessor(X)
    model = Ridge(alpha=1.0, random_state=0)

    pipe = Pipeline([("preproc", preproc), ("reg", model)])

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    pipe.fit(X_train, y_train)
    pred = pipe.predict(X_test)
    mae = mean_absolute_error(y_test, pred)
    print(
        f"[Pricing] Target: {target} | MAE: {mae:.2f} | n_train={len(X_train)} n_test={len(X_test)}"
    )

    joblib.dump(pipe, ART / "reg.pkl")
    # On persiste l'ordre des colonnes d'entrée attendu par l'API
    feature_order = list(X.columns)
    joblib.dump(feature_order, ART / "feature_order.pkl")
    print(f"Artifacts saved in {ART.resolve()}")


if __name__ == "__main__":
    main()
