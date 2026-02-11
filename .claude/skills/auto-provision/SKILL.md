---
name: auto-provision
description: Analizza il progetto corrente e genera automaticamente CLAUDE.md, hook, skill e configurazione Claude Code personalizzata. Usa /auto-provision per avviare.
argument-hint: "[--force]"
---

# Auto-Provision: Configurazione Intelligente del Progetto

Sei un sistema di auto-provisioning per Claude Code. Il tuo compito è analizzare il progetto corrente e generare automaticamente tutta la configurazione necessaria per lavorare al meglio con Claude Code.

## Flusso di Esecuzione

Esegui le fasi nell'ordine indicato. **Non saltare nessuna fase.**

Se l'argomento contiene `--force`, salta la fase di conferma (Fase 3) e procedi direttamente alla generazione.

---

## FASE 1: Discovery e Analisi

Carica la guida di analisi dettagliata:
See [analysis-guide.md](analysis-guide.md)

Esegui le seguenti operazioni di discovery in parallelo:

### 1.1 Rilevamento File di Configurazione
Cerca questi file nella root del progetto (usa Glob):
- **Node.js/JS/TS**: `package.json`, `tsconfig.json`, `jsconfig.json`, `.nvmrc`, `bun.lockb`, `pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`, `deno.json`
- **Python**: `pyproject.toml`, `setup.py`, `setup.cfg`, `requirements.txt`, `Pipfile`, `poetry.lock`, `uv.lock`, `.python-version`
- **Rust**: `Cargo.toml`, `Cargo.lock`
- **Go**: `go.mod`, `go.sum`
- **Java/Kotlin**: `pom.xml`, `build.gradle`, `build.gradle.kts`, `settings.gradle`
- **Ruby**: `Gemfile`, `Gemfile.lock`, `.ruby-version`
- **PHP**: `composer.json`, `composer.lock`
- **C#/.NET**: `*.csproj`, `*.sln`, `Directory.Build.props`
- **Swift**: `Package.swift`, `*.xcodeproj`, `*.xcworkspace`
- **Elixir**: `mix.exs`

### 1.2 Rilevamento Tooling e Linting
Cerca (usa Glob):
- **Formatter**: `.prettierrc*`, `.editorconfig`, `biome.json`, `.clang-format`, `rustfmt.toml`, `.scalafmt.conf`
- **Linter**: `.eslintrc*`, `eslint.config.*`, `.pylintrc`, `.flake8`, `ruff.toml`, `.golangci.yml`, `.rubocop.yml`, `clippy.toml`
- **Type checker**: `tsconfig.json`, `mypy.ini`, `.mypy.ini`, `pyrightconfig.json`
- **Test config**: `jest.config.*`, `vitest.config.*`, `pytest.ini`, `conftest.py`, `.rspec`, `phpunit.xml`

### 1.3 Rilevamento CI/CD e Infrastruttura
Cerca:
- `.github/workflows/*.yml`, `.gitlab-ci.yml`, `Jenkinsfile`, `.circleci/config.yml`
- `Dockerfile`, `docker-compose.yml`, `docker-compose.yaml`
- `Makefile`, `Taskfile.yml`, `justfile`
- `terraform/`, `pulumi/`, `cdk.json`
- `.env.example`, `.env.template`

### 1.4 Rilevamento Struttura Progetto
- Usa Glob per mappare la struttura delle directory principali (profondita massima 2 livelli)
- Identifica pattern: monorepo, microservizi, MVC, componenti, moduli
- Cerca directory test: `test/`, `tests/`, `__tests__/`, `spec/`, `e2e/`
- Cerca directory source: `src/`, `lib/`, `app/`, `pkg/`, `internal/`
- Conta approssimativamente i file per tipo (usa Glob con pattern `**/*.ext`)

### 1.5 Lettura File Chiave
Leggi (se esistono):
- `README.md` o `README.*` — per capire scopo e istruzioni del progetto
- Il file di configurazione principale del linguaggio (package.json, Cargo.toml, etc.)
- File di configurazione linter/formatter (per estrarre regole esistenti)
- `CLAUDE.md` esistente (per non sovrascrivere configurazione manuale)
- `.claude/settings.json` esistente (per merge, non sovrascrittura)

### 1.6 Analisi Codice (campionamento)
Leggi 3-5 file sorgente rappresentativi per rilevare:
- Stile di naming (camelCase, snake_case, PascalCase, kebab-case)
- Pattern di import/export
- Gestione errori
- Pattern di test
- Stile commenti e documentazione
- Uso di pattern architetturali (dependency injection, repository pattern, etc.)

---

## FASE 2: Compilazione Profilo Progetto

Basandoti sulla discovery, compila un **Profilo Progetto** strutturato:

```
PROFILO PROGETTO
================
Nome: [nome progetto da package.json/Cargo.toml/etc. o nome cartella]
Descrizione: [da README o dedotta]
Linguaggio principale: [linguaggio]
Linguaggi secondari: [se presenti]
Framework: [framework rilevati]
Runtime: [Node.js/Bun/Deno/Python/etc.]
Package Manager: [npm/yarn/pnpm/bun/pip/cargo/etc.]
Build Tool: [vite/webpack/esbuild/cargo/make/etc.]
Test Framework: [jest/vitest/pytest/cargo test/etc.]
Linter: [eslint/ruff/clippy/etc.]
Formatter: [prettier/black/rustfmt/etc.]
Type System: [TypeScript/mypy/etc.]
CI/CD: [GitHub Actions/GitLab CI/etc.]
Containerizzazione: [Docker/Podman/etc.]
Pattern Architetturale: [monorepo/microservizi/MVC/componenti/etc.]
Struttura Directory: [descrizione breve]
Convenzioni Naming: [camelCase/snake_case/etc.]
Stato Progetto: [nuovo/in sviluppo/maturo]
```

---

## FASE 3: Presentazione Piano e Conferma

Presenta all'utente un piano chiaro e dettagliato di ciò che verrà generato:

### Formato Presentazione:

```
============================================
  AUTO-PROVISION — Piano di Configurazione
============================================

PROGETTO: [nome]
STACK: [linguaggio] + [framework] + [tooling]

FILE CHE VERRANNO GENERATI:
---------------------------

1. CLAUDE.md
   - Panoramica progetto e architettura
   - Regole di codifica e convenzioni
   - Comandi principali (build, test, lint, deploy)
   - Struttura directory e navigazione
   - Pattern architetturali da rispettare
   - [sezioni aggiuntive specifiche]

2. .claude/settings.json
   Hook configurati:
   - [lista hook con descrizione]

3. .claude/skills/
   Skill generate:
   - [nome-skill]: [descrizione]
   - [nome-skill]: [descrizione]
   - ...

4. .mcp.json
   MCP Server configurati:
   - [nome]: [scopo]

5. Plugin e MCP raccomandati (comandi da eseguire):
   ESSENZIALI:
   - [nome]: [scopo] → [comando]
   CONSIGLIATI:
   - [nome]: [scopo] → [comando]
   OPZIONALI:
   - [nome]: [scopo] → [comando]

FILE ESISTENTI CHE VERRANNO PRESERVATI:
- [lista file che non verranno toccati]

NOTE:
- [eventuali avvertenze o suggerimenti]
```

**Chiedi conferma esplicita all'utente prima di procedere.**
Se l'utente chiede modifiche, adatta il piano di conseguenza.

---

## FASE 4: Generazione Artefatti

### 4.1 Generare CLAUDE.md
Carica la guida per la generazione:
See [claude-md-guide.md](claude-md-guide.md)

Genera il file `CLAUDE.md` nella root del progetto seguendo la guida. Se esiste già un CLAUDE.md, **integra** le informazioni senza perdere contenuto esistente.

### 4.2 Generare .claude/settings.json con Hook
Carica il catalogo hook:
See [hooks-catalog.md](hooks-catalog.md)

Seleziona gli hook appropriati dal catalogo in base al profilo progetto rilevato. Se `.claude/settings.json` esiste già, **fai merge** delle configurazioni.

Regole per il merge:
- Non sovrascrivere hook esistenti
- Aggiungi nuovi hook in append
- Preserva qualsiasi configurazione custom esistente

### 4.3 Generare Skill Specifiche
Carica il catalogo skill:
See [skills-catalog.md](skills-catalog.md)

Seleziona e genera le skill appropriate dal catalogo. Crea ogni skill come:
`.claude/skills/[nome-skill]/SKILL.md`

Se la directory `.claude/skills/` contiene già skill, **non sovrascriverle**.

### 4.4 Raccomandare e Configurare MCP Server e Plugin
Carica il catalogo MCP e Plugin:
See [mcp-plugin-catalog.md](mcp-plugin-catalog.md)

Basandoti sul profilo progetto, seleziona MCP server e plugin dal catalogo seguendo le regole di selezione. Organizza le raccomandazioni in tre livelli:

1. **ESSENZIALI**: LSP per il linguaggio, GitHub plugin, database MCP (se presente)
2. **CONSIGLIATI**: Fortemente utili per il tipo specifico di progetto
3. **OPZIONALI**: Utili se il team usa determinati servizi

Presenta le raccomandazioni all'utente con i comandi di installazione. Se l'utente conferma:

- Genera il file `.mcp.json` nella root del progetto per i server MCP di tipo stdio
- Fornisci i comandi `claude mcp add` per server HTTP (richiedono autenticazione)
- Fornisci i comandi `/plugin install` per i plugin raccomandati
- **Non installare nulla automaticamente** — fornisci i comandi pronti per copia-incolla

### 4.5 Generare Configurazione Aggiuntiva
Basandoti sull'analisi, valuta se generare:
- `.claude/settings.local.json` per configurazioni locali (aggiungere a .gitignore se presente)
- Note su configurazioni team-level vs personali

---

## FASE 5: Report Finale

Presenta un riepilogo di tutto ciò che è stato generato:

```
============================================
  AUTO-PROVISION — Completato!
============================================

FILE GENERATI:
- CLAUDE.md (XX righe)
- .claude/settings.json (XX hook configurati)
- .claude/skills/[nome]/SKILL.md (per ogni skill)
- .mcp.json (XX server MCP configurati)

HOOK ATTIVI:
- [evento]: [descrizione]

SKILL DISPONIBILI:
- /[nome-skill]: [descrizione]

MCP SERVER CONFIGURATI (.mcp.json):
- [nome]: [scopo]

COMANDI DA ESEGUIRE (copia-incolla):
Plugin da installare:
  /plugin install [nome]@claude-plugins-official
  /plugin install [nome]@claude-plugins-official

MCP Server remoti (richiedono autenticazione):
  claude mcp add --transport http [nome] [url]

PROSSIMI PASSI CONSIGLIATI:
1. Rivedi CLAUDE.md e personalizza le sezioni
2. Testa gli hook con una modifica di prova
3. Prova le skill generate con /[nome-skill]
4. Installa i plugin raccomandati con i comandi sopra
5. Configura i MCP server che richiedono credenziali
6. [suggerimenti specifici per il progetto]
```

---

## Regole Generali

- **Mai sovrascrivere** file esistenti senza conferma esplicita
- **Sempre fare merge** quando possibile
- **Preferire convenzioni del progetto** a default generici
- **Minimizzare** il numero di hook — solo quelli veramente utili
- **Skill pragmatiche** — solo skill che risolvono problemi reali del progetto
- Il CLAUDE.md deve essere **conciso ma completo** — sotto le 200 righe se possibile
- Usare il linguaggio dell'utente per i commenti nel CLAUDE.md
- Hook e skill devono essere **immediatamente funzionanti** senza configurazione aggiuntiva
