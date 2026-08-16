# AT&T Spam Detector — Deep Learning (Bloc 4)

## Objectif
Construire un détecteur de **SMS spam vs ham** à partir du texte seul (mission Jedha Deep Learning).

Livrables :
- preprocessing + entraînement de modèles deep learning
- performances clairement énoncées (Accuracy, F1)

---

## Notebooks

| Fichier | Rôle |
|---|---|
| [`02_AT_T_spam_detector.ipynb`](02_AT_T_spam_detector.ipynb) | **Livrable principal** — benchmark Dense / BiLSTM / CNN + BERT TF Hub |
| [`01_AT&T_spam_detector_final.ipynb`](01_AT%26T_spam_detector_final.ipynb) | Brief + solution cours (Embedding Dense + BERT TF Hub) |

---

## Alignement mission

| Exigence | Statut |
|---|---|
| Preprocessing SMS | OK (tokenize / pad) |
| ≥ 1 modèle DL | OK (Dense, BiLSTM, CNN + embeddings) |
| Transfer learning (scope Jedha) | OK (BERT via **TensorFlow Hub**) |
| Performances clairement énoncées | OK (tableau Accuracy / F1 / AUC) |

---

## Résultats clés (`02_AT_T_spam_detector.ipynb`)

Dernier run (embeddings **GloVe + random**) :

| Modèle | Accuracy | F1 | AUC |
|---|---:|---:|---:|
| **lstm + glove** (meilleur) | **0.991** | **0.966** | **0.991** |
| cnn + glove | 0.990 | 0.962 | 0.996 |
| cnn + random | 0.990 | 0.962 | 0.994 |
| fully_connected + random | 0.988 | 0.955 | 0.994 |
| lstm + random | 0.988 | 0.955 | 0.989 |
| fully_connected + glove | 0.987 | 0.949 | 0.992 |
| BERT TF Hub (réf. notebook cours) | 0.878 | 0.179 | — |

Sur ce dataset SMS, le modèle **lstm+glove** (F1 **0.966**) reste plus efficace qu’un BERT peu fine-tuné (constat pédagogique Jedha).

---

## Stack (cours Jedha)

### Windows (recommandé si erreur Long Paths / `tensorflow.python`)
Un venv court est déjà utilisable :
```text
C:\tfatt
```
Kernel Jupyter : **Python (tfatt)**

```powershell
# Si besoin de recréer :
python -m venv C:\tfatt
C:\tfatt\Scripts\python.exe -m pip install -U pip
C:\tfatt\Scripts\python.exe -m pip install -r requirements.txt ipykernel
C:\tfatt\Scripts\python.exe -m ipykernel install --user --name tfatt --display-name "Python (tfatt)"
```

Puis dans Cursor : sélectionne le kernel **Python (tfatt)** → Restart Kernel → Run All.

### Install classique
```bash
pip install -r requirements.txt
# optionnel BERT :
pip install tensorflow-text
```

- Python **3.11–3.13** · TensorFlow **≥ 2.20**
- TensorFlow Hub (+ `tensorflow-text` pour BERT si installable)
- GloVe embeddings (téléchargement Python dans le notebook)

> Sur Python 3.13 Store, `pip install tensorflow` échoue souvent (**chemins trop longs**). Utilise `C:\tfatt` ou active les Long Paths Windows.

---

## Recommandation
Pour un déploiement AT&T : **lstm + glove** (F1 **0.966**). BERT reste une piste d’amélioration avec plus d’epochs / fine-tuning / data.
