# Guida Generazione CLAUDE.md — Auto-Provision

Questa guida spiega come generare un `CLAUDE.md` completo e personalizzato per il progetto analizzato.

## Principi Fondamentali

1. **Conciso ma completo** — Massimo 200 righe. Ogni riga deve aggiungere valore.
2. **Specifico, mai generico** — Riferimenti a file, directory e pattern reali del progetto.
3. **Imperativo** — Istruzioni dirette, non suggerimenti. "Usa snake_case", non "Si consiglia di usare snake_case".
4. **Pratico** — Comandi copia-incolla, non spiegazioni teoriche.

---

## Struttura CLAUDE.md

Genera il CLAUDE.md seguendo esattamente questa struttura. Ometti sezioni non applicabili.

```markdown
# [Nome Progetto]

[Una frase che descrive il progetto, il suo scopo e il dominio.]

## Tech Stack

- **Linguaggio**: [linguaggio + versione se nota]
- **Framework**: [framework principale]
- **Runtime**: [Node.js/Bun/Deno/Python/etc. + versione se nota]
- **Database**: [se presente]
- **ORM**: [se presente]
- **Test**: [framework test]
- **Styling**: [se frontend: Tailwind/CSS Modules/etc.]

## Comandi Essenziali

```bash
# Avvio sviluppo
[comando]

# Build
[comando]

# Test
[comando per tutti i test]

# Test singolo file
[comando per test singolo]

# Lint
[comando lint]

# Format
[comando format]

# Type check
[comando type check se applicabile]
```

## Struttura Progetto

```
[albero directory semplificato, max 15-20 righe]
[solo directory principali con descrizione breve]
```

## Regole di Codifica

### Naming
- File: [convezione — es. kebab-case.ts]
- Variabili/funzioni: [convenzione — es. camelCase]
- Classi/tipi: [convenzione — es. PascalCase]
- Costanti: [convenzione — es. SCREAMING_SNAKE]
- Componenti: [se frontend — es. PascalCase]

### Import
- [regola import — es. "Usa path alias @/ per import da src/"]
- [regola ordinamento — es. "External first, then internal, then relative"]

### Pattern Architetturali
- [pattern 1 — es. "Ogni feature in src/features/ con struttura: components/, hooks/, api/, types/"]
- [pattern 2 — es. "Repository pattern per accesso dati"]
- [pattern 3 — es. "Error boundary a livello di route"]

### Gestione Errori
- [pattern — es. "Usa classi errore custom da src/errors/"]
- [pattern — es. "Mai swallare errori silenziosamente"]

### Test
- Posizione: [es. "Co-located, file.test.ts accanto a file.ts"]
- Pattern: [es. "Arrange-Act-Assert con describe/it"]
- Naming: [es. "describe('NomeModulo') > it('should verbo qualcosa')"]
- Mocking: [es. "Usa vi.mock() per moduli, vi.fn() per funzioni"]

## Regole Importanti

- [regola critica 1 — es. "Non modificare mai direttamente i file in generated/"]
- [regola critica 2 — es. "Le migrazioni database devono essere reversibili"]
- [regola critica 3 — es. "Ogni PR deve avere test"]
- [regola critica 4 — es. "Non commitare .env, secrets, o credenziali"]

## Dipendenze Chiave

| Pacchetto | Uso | Note |
|-----------|-----|------|
| [nome] | [scopo] | [note importanti se ci sono] |
| [nome] | [scopo] | |

## Note Aggiuntive

- [note specifiche del progetto]
- [informazioni su ambienti, deploy, etc.]
```

---

## Regole di Compilazione

### Sezione "Comandi Essenziali"
- Estrai comandi reali da `package.json` scripts, `Makefile`, `Cargo.toml`, etc.
- Se il progetto usa un task runner (make, just, task), mostra quei comandi
- Includi SOLO comandi che esistono realmente nel progetto
- Per test singolo: mostra il comando per eseguire un singolo file test

### Sezione "Struttura Progetto"
- Mostra solo directory di primo e secondo livello
- Aggiungi commento breve per ogni directory significativa
- Ometti `node_modules/`, `target/`, `dist/`, `build/`, `__pycache__/`, `.git/`
- Massimo 20 righe

### Sezione "Regole di Codifica"
- Basati ESCLUSIVAMENTE su ciò che hai osservato nel codice reale
- Non inventare regole — se non sei sicuro, ometti
- Se ci sono file di configurazione linter/formatter, riferiscili invece di ripetere le regole
- Es: "Vedi `.eslintrc.json` per regole lint complete"

### Sezione "Pattern Architetturali"
- Documenta solo pattern che hai effettivamente rilevato nel codice
- Sii specifico: indica directory e file esempio
- Se il progetto segue un pattern noto (Clean Architecture, DDD, etc.), nominalo

### Sezione "Regole Importanti"
- Regole che, se violate, causano problemi reali
- File/directory da non toccare
- Workflow che devono essere rispettati
- Vincoli di sicurezza

### Sezione "Dipendenze Chiave"
- Solo le dipendenze principali (max 8-10)
- Non elencare utility minori
- Aggiungi note solo quando c'è qualcosa di non ovvio

---

## Se CLAUDE.md Esiste Gia

Se il progetto ha già un `CLAUDE.md`:

1. **Leggi** il contenuto esistente completamente
2. **Non sovrascrivere** — fai merge intelligente
3. **Aggiungi** sezioni mancanti
4. **Non rimuovere** contenuto esistente scritto dall'utente
5. **Aggiorna** informazioni obsolete solo se hai certezza
6. **Segnala** all'utente cosa hai aggiunto/modificato

---

## Lingua del CLAUDE.md

Genera il CLAUDE.md nella lingua usata dal README del progetto, oppure nella lingua di comunicazione dell'utente. I comandi e il codice restano in inglese (sono tecnici).
