import pandas as pd
import numpy as np
import streamlit as st
import plotly.express as px
from pathlib import Path

st.set_page_config(page_title="Getaround — Delay impact", layout="wide")

DATA_XLSX = Path(__file__).resolve().parent / "data" / "get_around_delay_analysis.xlsx"

st.title("Getaround — Impact d'un threshold entre deux locations")

if not DATA_XLSX.exists():
    st.error("Fichier manquant: get_around_delay_analysis.xlsx (place-le dans dashboard/data/)")
    st.stop()

df = pd.read_excel(DATA_XLSX)


def col_exists(name: str) -> bool:
    return name in df.columns


# --- Colonnes clés (avec fallback) ---
if col_exists("delay_at_checkout_in_minutes"):
    delay_col = "delay_at_checkout_in_minutes"
elif col_exists("delay_checkout"):
    delay_col = "delay_checkout"
else:
    candidates = [c for c in df.columns if "delay" in c.lower() and "checkout" in c.lower()]
    delay_col = candidates[0] if candidates else df.columns[0]

if col_exists("time_delta_with_previous_rental_in_minutes"):
    gap_col = "time_delta_with_previous_rental_in_minutes"
else:
    gaps = [c for c in df.columns if "time" in c.lower() and ("delta" in c.lower() or "gap" in c.lower())]
    gap_col = gaps[0] if gaps else df.columns[0]

df["_delay"] = pd.to_numeric(df[delay_col], errors="coerce")
df["_gap"] = pd.to_numeric(df[gap_col], errors="coerce")

# Scope Connect / All
if col_exists("checkin_type"):
    df["_is_connect"] = df["checkin_type"].astype(str).str.lower().eq("connect")
elif col_exists("is_connect"):
    df["_is_connect"] = df["is_connect"].astype(int).eq(1)
else:
    df["_is_connect"] = False

# Aligné sur l'analyse Jedha : locations terminées si la colonne existe
if col_exists("state"):
    base = df[df["state"].astype(str).str.lower().eq("ended")].copy()
else:
    base = df.copy()

threshold = st.sidebar.slider("Threshold (minutes)", min_value=0, max_value=120, value=60, step=5)
scope = st.sidebar.selectbox("Scope", ["All cars", "Connect only"])

scoped = base[base["_is_connect"]] if scope == "Connect only" else base
n = len(scoped)

# 1) Locations touchées par le threshold (= gap connu < seuil)
#    → ces enchaînements ne seraient plus autorisés
affected = scoped["_gap"].lt(threshold).fillna(False)
n_affected = int(affected.sum())
share_affected = n_affected / n if n else 0.0

# 2) Cas problématiques : retard checkout > gap planifié
#    (le conducteur suivant attend) — même définition que le notebook d'analyse
late_impact = (scoped["_delay"] > scoped["_gap"]).fillna(False)
n_late = int(late_impact.sum())
share_late = n_late / n if n else 0.0

# 3) Problèmes évités grâce au threshold :
#    parmi les late_impact, ceux dont le gap < threshold n'auraient pas eu lieu
avoided_mask = late_impact & scoped["_gap"].lt(threshold).fillna(False)
n_avoided = int(avoided_mask.sum())
share_avoided = n_avoided / n_late if n_late else 0.0

# Attente moyenne quand il y a impact
wait = (scoped.loc[late_impact, "_delay"] - scoped.loc[late_impact, "_gap"]).mean()

col1, col2, col3, col4 = st.columns(4)
col1.metric("Locations (scope)", f"{n:,}")
col2.metric("% touchées par threshold", f"{share_affected * 100:.1f}%", f"{n_affected:,} locs")
col3.metric("% impacts retard → suivant", f"{share_late * 100:.1f}%", f"{n_late:,} cas")
col4.metric("% problèmes évités", f"{share_avoided * 100:.1f}%", f"{n_avoided:,} / {n_late:,}")

if pd.notna(wait):
    st.caption(f"Attente moyenne du conducteur suivant (cas impactés) : **{wait:.0f} min**")

# --- Viz ---
left, right = st.columns(2)

with left:
    fig1 = px.histogram(
        scoped.dropna(subset=["_delay"]),
        x="_delay",
        nbins=40,
        title="Distribution des retards au checkout (min)",
    )
    fig1.add_vline(x=0, line_dash="dash", line_color="gray")
    st.plotly_chart(fig1, use_container_width=True)

with right:
    grid = np.arange(0, 121, 5)
    rows = []
    for t in grid:
        aff = scoped["_gap"].lt(t).fillna(False)
        late = (scoped["_delay"] > scoped["_gap"]).fillna(False)
        avoided = late & scoped["_gap"].lt(t).fillna(False)
        rows.append(
            {
                "threshold": t,
                "% locations touchées": 100 * aff.sum() / n if n else 0,
                "% problèmes évités (parmi impacts)": 100 * avoided.sum() / late.sum() if late.sum() else 0,
            }
        )
    curve = pd.DataFrame(rows)
    fig2 = px.line(
        curve,
        x="threshold",
        y=["% locations touchées", "% problèmes évités (parmi impacts)"],
        title="Trade-off du threshold",
        labels={"value": "%", "variable": "Indicateur"},
    )
    fig2.add_vline(x=threshold, line_dash="dot", line_color="#D4A843")
    st.plotly_chart(fig2, use_container_width=True)

st.subheader("Aperçu des cas problématiques (retard > gap)")
sample_cols = [c for c in [delay_col, gap_col, "checkin_type", "state"] if c in scoped.columns]
st.dataframe(scoped.loc[late_impact, sample_cols].head(20))

st.markdown(
    f"""
**Méthode** (alignée sur l'analyse Jedha)
- **Touchée par le threshold** : `{gap_col} < threshold` → l'enchaînement ne serait plus autorisé.
- **Impact sur le suivant** : `{delay_col} > {gap_col}` → le retard dépasse le tampon planifié.
- **Problème évité** : cas impacté **et** `gap < threshold` (cet enchaînement aurait été bloqué).
- Scope **Connect only** : `checkin_type == 'connect'`.

**Limites**
- Beaucoup de `gap` manquants (~91 %) : les % sont calculés sur toutes les locations *ended* du scope
  (comme dans le notebook), donc sous-estimés vs. le sous-ensemble avec gap renseigné.
- MVP sans estimation de CA perdu.
"""
)
