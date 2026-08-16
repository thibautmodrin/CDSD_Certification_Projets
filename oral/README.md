# Oral certification CDSD — decks par bloc

Chaque dossier contient le **générateur** (`presentation.js`) et le **PPTX** à présenter.

| Dossier | Bloc | PPTX |
|---------|------|------|
| `01_kayak/` | 1 — Kayak | `Presentation_Bloc1_Kayak.pptx` |
| `02_steam/` | 2 — Steam | `Presentation_Bloc2_Steam.pptx` |
| `03_conversion_uber/` | 3 — Conversion + Uber | `Presentation_Bloc3_Conversion.pptx` |
| `04_att_spam/` | 4 — AT&T Spam | `Presentation_Bloc4_ATT_Spam.pptx` |
| `05_getaround/` | 5 — Getaround | `Presentation_Bloc5_Getaround.pptx` |
| `06_hpp/` | 6 — HPP (projet final) | `Presentation_Bloc6_HPP.pptx` (+ deck Jedha détaillé) |
| `overview/` | Vue d’ensemble | `Presentation_Orale_Certification_Jedha.pptx` |

## Régénérer un deck (Blocs 1–5 + overview)

Depuis ce dossier `oral/` (nécessite Node + `npm install`) :

```bash
node 05_getaround/presentation.js
```

Ou tous d’un coup :

```bash
node build-all.js
```

Le PPTX est toujours écrit **dans le même dossier** que le script (`__dirname`).

## Bloc 6 HPP

Pas de générateur JS ici : decks PowerPoint issus du projet final.  
Source unique : `oral/06_hpp/` (ne plus chercher à la racine du repo ni ailleurs).
