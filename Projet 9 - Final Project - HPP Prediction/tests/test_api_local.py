"""Smoke test local : API déjà lancée sur :8000."""
from pathlib import Path

import pandas as pd
import requests

ROOT = Path(__file__).resolve().parents[1]
DEMO = ROOT / "03_Streamlit" / "test_dataset_predictor.csv"

df = pd.read_csv(DEMO).head(2)
# Convertir en listes JSON-friendly
rows = []
for _, row in df.iterrows():
    rows.append([None if pd.isna(v) else v for v in row.tolist()])

r = requests.post(
    "http://localhost:8000/predict",
    json={"input": rows},
    timeout=30,
)
print(r.status_code, r.json())
