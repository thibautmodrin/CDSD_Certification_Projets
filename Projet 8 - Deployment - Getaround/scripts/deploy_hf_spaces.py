"""
Déploie les packs spaces/ vers Hugging Face (compte thibautmodrin).

Prérequis :
  1. Token HF avec droit write : https://huggingface.co/settings/tokens
  2. Variable d'environnement HF_TOKEN=hf_...
  3. python scripts/prepare_hf_spaces.py

Usage :
  python scripts/deploy_hf_spaces.py
"""
from __future__ import annotations

import os
import sys
from pathlib import Path

from huggingface_hub import HfApi, login

ROOT = Path(__file__).resolve().parents[1]
API_DIR = ROOT / "spaces" / "getaround-api"
DASH_DIR = ROOT / "spaces" / "getaround-dashboard"
OWNER = "thibautmodrin"


def _ensure_space(api: HfApi, name: str) -> str:
    repo_id = f"{OWNER}/{name}"
    try:
        api.create_repo(
            repo_id=repo_id,
            repo_type="space",
            space_sdk="docker",
            private=False,
            exist_ok=True,
        )
    except Exception as e:
        print(f"[warn] create_repo {repo_id}: {e}")
    return repo_id


def main() -> None:
    token = os.environ.get("HF_TOKEN") or os.environ.get("HUGGINGFACE_HUB_TOKEN")
    if not token:
        print(
            "HF_TOKEN manquant.\n"
            "1) Crée un token write : https://huggingface.co/settings/tokens\n"
            "2) PowerShell : $env:HF_TOKEN='hf_...'\n"
            "3) Relance : python scripts/deploy_hf_spaces.py"
        )
        sys.exit(1)

    if not (API_DIR / "Dockerfile").exists() or not (DASH_DIR / "Dockerfile").exists():
        print("Packs incomplets — lance d'abord: python scripts/prepare_hf_spaces.py")
        sys.exit(1)

    login(token=token)
    api = HfApi(token=token)

    for name, folder in (
        ("getaround-api", API_DIR),
        ("getaround-dashboard", DASH_DIR),
    ):
        repo_id = _ensure_space(api, name)
        print(f"[upload] {folder} → {repo_id}")
        api.upload_folder(
            folder_path=str(folder),
            repo_id=repo_id,
            repo_type="space",
        )
        print(f"[ok] https://huggingface.co/spaces/{repo_id}")

    print("\nURLs publiques (après build Docker, ~2–5 min) :")
    print(f"  API  : https://{OWNER}-getaround-api.hf.space/docs")
    print(f"  Dash : https://{OWNER}-getaround-dashboard.hf.space")


if __name__ == "__main__":
    main()
