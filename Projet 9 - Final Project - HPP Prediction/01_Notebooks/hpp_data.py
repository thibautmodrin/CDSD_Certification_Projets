"""Chemins et chargement HPP — partagé par les notebooks 00→03."""

from __future__ import annotations

from pathlib import Path

import pandas as pd

# Racine projet = parent de 01_Notebooks/
PROJECT_ROOT = Path(__file__).resolve().parent.parent
DATA = PROJECT_ROOT / "00_Data"
RAW_DIR = DATA / "raw"
PROCESSED_DIR = DATA / "processed"

RAW_XLS = RAW_DIR / "Bourgogne20132023.xls"
RAW_DICO = RAW_DIR / "Dictionnaire variables.xlsx"
PROCESSED_CSV = PROCESSED_DIR / "hpp_prepartum.csv"
EXTRACT_CSV = DATA / "extract_database.csv"
DICO_CSV = DATA / "dico_var.csv"

DRIVE_URL = (
    "https://drive.google.com/drive/folders/1DToPXrJ8znq9WH0SLrvFEvX7N-LTY-Eg?usp=sharing"
)

TARGET = "hpp_trans"

# Ordre aligné sur API / Streamlit (feature_order.pkl)
FEATURE_ORDER = [
    "bmi",
    "terme",
    "dsm_g",
    "taille_mere",
    "age_m",
    "parite",
    "nbilan",
    "hosp_m_g",
    "nsej18",
    "AMP",
    "g_type",
    "diabete",
    "preecl",
    "hta_tot",
    "tabac",
    "cortico",
    "ut_cica",
    "creta",
    "hellp",
    "cholestase",
    "pma",
    "bilan",
]

QUANT = [
    "age_m",
    "taille_mere",
    "bmi",
    "parite",
    "hosp_m_g",
    "dsm_g",
    "nbilan",
    "nsej18",
    "terme",
]
BINARY = [
    "tabac",
    "hta_tot",
    "cholestase",
    "hellp",
    "creta",
    "ut_cica",
    "cortico",
    "pma",
    "bilan",
]
NOMINAL = ["diabete", "AMP"]
ORDINAL = ["preecl", "g_type"]

# Colonnes lues dans le brut avant sélection finale
_PREPARTUM_CANDIDATES = [
    "age_m",
    "poids_mere",
    "taille_mere",
    "bmi",
    "tabac",
    "parite",
    "parite_cor",
    "diabete",
    "hta_chro",
    "hta_gest",
    "hta_tot",
    "cholestase",
    "preecl",
    "hellp",
    "type_grossesse",
    "g_type",
    "creta",
    "ut_cica",
    "Dosecortico",
    "cortico",
    "Aide_procreation",
    "AMP",
    "pma",
    "hosp_m_g",
    "dsm_g",
    "bilan",
    "nbilan",
    "sej18",
    "nsej18",
    "terme",
    "bas_risque",
    TARGET,
]

_DROP_AFTER_EDA = [
    "type_grossesse",
    "parite_cor",
    "bas_risque",
    "Aide_procreation",
    "Dosecortico",
    "sej18",
    "hta_gest",
    "hta_chro",
    "poids_mere",
]


def load_hpp(prefer_processed: bool = True) -> tuple[pd.DataFrame, str]:
    """Charge processed > extract. Retourne (df, source)."""
    if prefer_processed and PROCESSED_CSV.exists():
        df = pd.read_csv(PROCESSED_CSV, low_memory=False)
        return df, "processed"
    if EXTRACT_CSV.exists():
        df = pd.read_csv(EXTRACT_CSV, low_memory=False)
        return df, "extract"
    raise FileNotFoundError(
        f"Aucune donnée trouvée. Placez le .xls Drive dans {RAW_DIR} "
        f"puis lancez 00_Prepare_Data.ipynb — ou gardez {EXTRACT_CSV}.\n"
        f"Drive : {DRIVE_URL}"
    )


def feature_lists_present(df: pd.DataFrame) -> dict[str, list[str]]:
    return {
        "quant": [c for c in QUANT if c in df.columns],
        "binary": [c for c in BINARY if c in df.columns],
        "nominal": [c for c in NOMINAL if c in df.columns],
        "ordinal": [c for c in ORDINAL if c in df.columns],
    }


def prepare_from_raw(
    xls_path: Path | None = None,
    out_csv: Path | None = None,
) -> pd.DataFrame:
    """Rejoue le cleaning EDA → CSV pré-accouchement (features prod)."""
    xls_path = xls_path or RAW_XLS
    out_csv = out_csv or PROCESSED_CSV
    if not xls_path.exists():
        raise FileNotFoundError(
            f"Fichier brut manquant : {xls_path}\n"
            f"Téléchargez Bourgogne20132023.xls depuis {DRIVE_URL} vers {RAW_DIR}"
        )

    try:
        data = pd.read_excel(xls_path, engine="xlrd")
    except Exception:
        data = pd.read_excel(xls_path, engine="openpyxl")

    cols = [c for c in _PREPARTUM_CANDIDATES if c in data.columns]
    missing = [c for c in _PREPARTUM_CANDIDATES if c not in data.columns]
    if TARGET not in cols:
        raise ValueError(f"Colonne cible {TARGET} absente du fichier brut")
    if missing:
        print("Colonnes absentes du brut (ignorées) :", missing)

    df = data[cols].copy()
    if "AMP" in df.columns:
        df["AMP"] = df["AMP"].fillna("Aucune")

    for col in _DROP_AFTER_EDA:
        if col in df.columns:
            df = df.drop(columns=[col])

    if "age_m" in df.columns:
        df = df.dropna(subset=["age_m"])

    if "dsm_g" in df.columns:
        # Hors [0, 270) → NA (même logique que l'EDA historique)
        ok = (df["dsm_g"] >= 0) & (df["dsm_g"] < 270)
        df.loc[~ok, "dsm_g"] = pd.NA

    # Ne garder que features prod + cible
    keep = [c for c in FEATURE_ORDER if c in df.columns] + [TARGET]
    df = df[keep]

    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)
    df.to_csv(out_csv, index=False)
    print(f"Écrit {out_csv} — {df.shape[0]} lignes × {df.shape[1]} colonnes")
    if TARGET in df.columns:
        print(df[TARGET].value_counts(normalize=True).rename("part").round(4))
    return df
