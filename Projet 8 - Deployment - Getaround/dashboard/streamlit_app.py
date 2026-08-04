import pandas as pd
import numpy as np
import streamlit as st
import plotly.express as px
from pathlib import Path

st.set_page_config(page_title="Getaround — Delay impact", layout="wide")

DATA_XLSX = Path(__file__).resolve().parent / "data" / "get_around_delay_analysis.xlsx"

st.title("Getaround — Analyse de l'impact d'un threshold sur les retards")

# Chargement données
if not DATA_XLSX.exists():
    st.error("Fichier manquant: get_around_delay_analysis.xlsx (place-le dans dashboard/data/)")
    st.stop()

df = pd.read_excel(DATA_XLSX)

# Normalisation colonnes clés avec fallback
def col_exists(name): return name in df.columns

# Retard au checkout
if col_exists("delay_at_checkout_in_minutes"):
    delay_col = "delay_at_checkout_in_minutes"
elif col_exists("delay_checkout"):
    delay_col = "delay_checkout"
else:
    # essaie de détecter une colonne similaire
    candidates = [c for c in df.columns if "delay" in c and "checkout" in c]
    delay_col = candidates[0] if candidates else df.columns[0]

# Delta avec la loc précédente
if col_exists("time_delta_with_previous_rental_in_minutes"):
    gap_col = "time_delta_with_previous_rental_in_minutes"
else:
    gaps = [c for c in df.columns if "time" in c and ("delta" in c or "gap" in c)]
    gap_col = gaps[0] if gaps else df.columns[0]

# Scope "Connect"
if col_exists("checkin_type"):
    is_connect = (df["checkin_type"].astype(str).str.lower() == "connect").astype(int)
elif col_exists("is_connect"):
    is_connect = df["is_connect"].astype(int)
else:
    is_connect = pd.Series(np.zeros(len(df), dtype=int), index=df.index)

df["_delay"] = pd.to_numeric(df[delay_col], errors="coerce").fillna(0)
df["_gap_prev"] = pd.to_numeric(df[gap_col], errors="coerce").fillna(0)
df["_is_connect"] = is_connect

# Conflit si gap < 0 (chevauchement). Résolu si gap + threshold >= 0
threshold = st.sidebar.slider("Threshold (minutes)", min_value=0, max_value=120, value=30, step=5)
scope = st.sidebar.selectbox("Scope", ["All cars", "Connect only"])

scope_mask = df["_is_connect"].eq(1) if scope == "Connect only" else pd.Series(True, index=df.index)

total = scope_mask.sum()
conflicts = (df["_gap_prev"] < 0) & scope_mask
resolved = ((df["_gap_prev"] + threshold) >= 0) & conflicts

share_conflicts = conflicts.sum() / total if total else 0.0
share_resolved = resolved.sum() / conflicts.sum() if conflicts.sum() else 0.0

# KPIs
col1, col2, col3 = st.columns(3)
col1.metric("Locations dans le scope", f"{total}")
col2.metric("% locations en conflit", f"{share_conflicts*100:.1f}%")
col3.metric("% conflits résolus (avec threshold)", f"{share_resolved*100:.1f}%")

# Histogramme des retards
fig1 = px.histogram(df[scope_mask], x="_delay", nbins=40, title="Distribution des retards au checkout (min)")
st.plotly_chart(fig1, use_container_width=True)

# Courbe threshold vs % conflits résolus
grid = np.arange(0, 121, 5)
resolved_curve = [(((df["_gap_prev"] + t) >= 0) & conflicts).sum() / conflicts.sum() if conflicts.sum() else 0.0 for t in grid]
fig2 = px.line(x=grid, y=resolved_curve, labels={"x":"threshold (min)", "y":"% conflits résolus"},
               title="Efficacité du threshold")
st.plotly_chart(fig2, use_container_width=True)

# Tableau d'exemple
st.subheader("Aperçu des cas en conflit")
sample_cols = [c for c in [delay_col, gap_col, "checkin_type"] if c in df.columns]
sample = df.loc[conflicts, sample_cols].head(20)
st.dataframe(sample)

st.markdown(
    f"""
**Méthode**
- Conflit si *{gap_col}* < 0 (chevauchement avec la location suivante).
- Un **threshold** ajoute un tampon avant le check-in suivant; conflit résolu si *{gap_col} + threshold ≥ 0*.
- Le scope “Connect only” filtre les lignes où `checkin_type == 'connect'` (ou `is_connect==1`).

**Limites**
- Approximation simple; pas d’estimation directe du CA dans ce MVP.
- Les noms de colonnes sont autodétectés pour tolérer de légères variations de schéma.
"""
)
