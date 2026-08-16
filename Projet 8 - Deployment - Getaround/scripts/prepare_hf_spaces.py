"""
Copie le code / données / artefacts dans spaces/ pour upload Hugging Face.
À lancer depuis la racine du projet Getaround.
"""
from __future__ import annotations

import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SPACES = ROOT / "spaces"


def _wipe(dst: Path) -> None:
    if dst.exists():
        shutil.rmtree(dst)
    dst.mkdir(parents=True, exist_ok=True)


def _copytree(src: Path, dst: Path) -> None:
    if not src.exists():
        raise FileNotFoundError(src)

    def _ignore(_dir: str, names: list[str]) -> set[str]:
        return {n for n in names if n == "__pycache__" or n.endswith(".pyc")}

    shutil.copytree(src, dst, dirs_exist_ok=True, ignore=_ignore)


def prepare_api() -> None:
    dst = SPACES / "getaround-api"
    # garder Dockerfile + README Space s'ils existent déjà dans le template
    dockerfile = dst / "Dockerfile"
    readme = dst / "README.md"
    dockerignore = dst / ".dockerignore"
    saved = {}
    for p in (dockerfile, readme, dockerignore):
        if p.exists():
            saved[p.name] = p.read_bytes()

    _wipe(dst)
    for name, data in saved.items():
        (dst / name).write_bytes(data)

    _copytree(ROOT / "app", dst / "app")
    shutil.copy2(ROOT / "requirements.txt", dst / "requirements.txt")

    # artefacts obligatoires pour démarrer sans ré-entraîner
    art = ROOT / "app" / "model" / "artifacts"
    if not (art / "reg.pkl").exists():
        raise FileNotFoundError("Lance d'abord: python app/model/train.py")

    print(f"[ok] API pack → {dst}")


def prepare_dashboard() -> None:
    dst = SPACES / "getaround-dashboard"
    dockerfile = dst / "Dockerfile"
    readme = dst / "README.md"
    dockerignore = dst / ".dockerignore"
    saved = {}
    for p in (dockerfile, readme, dockerignore):
        if p.exists():
            saved[p.name] = p.read_bytes()

    _wipe(dst)
    for name, data in saved.items():
        (dst / name).write_bytes(data)

    _copytree(ROOT / "dashboard", dst / "dashboard")
    # deps minimales dashboard
    (dst / "requirements.txt").write_text(
        "\n".join(
            [
                "pandas",
                "numpy",
                "streamlit",
                "plotly",
                "openpyxl",
                "",
            ]
        ),
        encoding="utf-8",
    )

    xlsx = dst / "dashboard" / "data" / "get_around_delay_analysis.xlsx"
    if not xlsx.exists():
        raise FileNotFoundError(f"Manquant: {xlsx}")

    print(f"[ok] Dashboard pack → {dst}")


def main() -> None:
    SPACES.mkdir(parents=True, exist_ok=True)
    prepare_api()
    prepare_dashboard()
    print("Prêt pour: huggingface-cli upload ...")


if __name__ == "__main__":
    main()
