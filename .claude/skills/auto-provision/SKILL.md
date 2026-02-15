---
name: auto-provision
description: Analizza il progetto corrente e genera automaticamente CLAUDE.md, hook, skill e configurazione Claude Code personalizzata. Usa /auto-provision per avviare.
argument-hint: "[--force]"
---

# Auto-Provision: Configurazione Intelligente del Progetto

Sei un sistema di auto-provisioning per Claude Code. Il tuo compito è analizzare in profondità il progetto corrente — codice, documentazione, architettura, sicurezza, qualità, UX — e generare automaticamente tutta la configurazione necessaria per lavorare al meglio con Claude Code.

## Flusso di Esecuzione

Esegui le fasi nell'ordine indicato. **Non saltare nessuna fase.**

Se l'argomento contiene `--force`, salta la fase di conferma (Fase 3) e procedi direttamente alla generazione.

---

## FASE 1: Discovery e Analisi Profonda

Carica la guida di analisi dettagliata:
See [analysis-guide.md](analysis-guide.md)

Questa fase deve essere **esaustiva**. Non limitarti al tech stack — analizza OGNI aspetto del progetto che possa influenzare la scelta degli strumenti.

### 1.1 Rilevamento Tech Stack
Cerca file di configurazione nella root del progetto (usa Glob):
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

### 1.2 Rilevamento Tooling e Quality
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
- Usa Glob per mappare la struttura delle directory principali (profondità massima 2 livelli)
- Identifica pattern: monorepo, microservizi, MVC, componenti, moduli
- Cerca directory test: `test/`, `tests/`, `__tests__/`, `spec/`, `e2e/`
- Cerca directory source: `src/`, `lib/`, `app/`, `pkg/`, `internal/`
- Conta approssimativamente i file per tipo

### 1.5 Lettura COMPLETA della Documentazione del Progetto
**CRITICO**: Leggi TUTTI i documenti disponibili, non solo il README. Cerca e leggi:
- `README.md`, `README.*` — scopo e istruzioni generali
- `CONTRIBUTING.md` — linee guida per contribuire, workflow, code style
- `SECURITY.md`, `security.txt` — policy di sicurezza
- `docs/`, `documentation/`, `wiki/` — tutta la documentazione tecnica
- `ARCHITECTURE.md`, `DESIGN.md` — decisioni architetturali
- `CHANGELOG.md`, `HISTORY.md` — evoluzione del progetto
- `LICENSE` — tipo di licenza (influenza le raccomandazioni)
- `.github/PULL_REQUEST_TEMPLATE.md`, `.github/ISSUE_TEMPLATE/` — standard di PR/issue
- `CLAUDE.md` esistente (per non sovrascrivere)
- `.claude/settings.json` esistente (per merge)
- File di configurazione principale (package.json, Cargo.toml, etc.)
- File di configurazione linter/formatter

### 1.6 Analisi Sicurezza
Valuta la postura di sicurezza del progetto cercando:
- **Autenticazione**: JWT, OAuth, session, cookies, auth middleware
- **Gestione segreti**: `.env`, vault, secrets manager, variabili hardcoded
- **Dipendenze**: `npm audit`, `cargo audit`, `safety check`, `snyk`
- **CORS/CSP**: configurazioni header di sicurezza
- **Input validation**: sanitizzazione, schema validation (zod, joi, pydantic)
- **SQL injection**: query parametrizzate vs string concatenation
- **XSS**: sanitizzazione output, Content Security Policy
- **Rate limiting**: middleware, API gateway
- **Logging**: presenza di logging strutturato, audit trail
- Cerca file: `.snyk`, `.nsprc`, `audit-ci.json`, security-related workflow in CI

**Annota**: Lacune di sicurezza rilevate → raccomanda strumenti specifici (Snyk MCP, security plugins, audit hooks)

### 1.7 Analisi Qualità del Codice
Valuta la qualità complessiva:
- **Copertura test**: percentuale stimata, tipi di test presenti (unit, integration, e2e)
- **Type safety**: TypeScript strict mode? mypy strict? tipi mancanti?
- **Error handling**: pattern consistente? try/catch ovunque? errori custom?
- **Code smell**: file troppo grandi? funzioni troppo lunghe? duplicazione evidente?
- **Documentazione codice**: JSDoc/docstring presenti? commenti utili?
- **Dead code**: export non usati? file orfani?
- **Complessità**: nesting eccessivo? funzioni con troppi parametri?

**Annota**: Problemi di qualità → raccomanda linter specifici, skill di code review, plugin quality

### 1.8 Analisi Prestazioni
Cerca indicatori di performance:
- **Caching**: Redis, Memcached, in-memory cache, HTTP cache headers
- **Lazy loading**: dynamic import, code splitting, lazy components
- **Database**: indici definiti? query N+1 potenziali? connection pooling?
- **Bundle size**: analisi webpack bundle, tree shaking
- **CDN**: configurazione CDN, asset optimization
- **Monitoring**: APM (Datadog, New Relic, Sentry performance)
- **SSR/SSG**: strategia di rendering (CSR, SSR, SSG, ISR)

**Annota**: Opportunità di performance → raccomanda strumenti di monitoring, caching MCP

### 1.9 Analisi User Experience
Cerca indicatori UX (solo per progetti con UI):
- **Accessibilità**: aria attributes, semantic HTML, a11y testing (axe, pa11y)
- **Responsive design**: media queries, container queries, breakpoint system
- **Component library**: design system proprio? UI kit (Shadcn, MUI, Chakra)?
- **Internazionalizzazione**: i18n framework (i18next, vue-i18n, etc.)
- **Loading states**: skeleton, spinner, optimistic updates
- **Error states**: error boundaries, fallback UI, user-friendly errors
- **Design system**: Figma, Storybook, design tokens

**Annota**: Lacune UX → raccomanda Figma MCP, Storybook plugin, a11y tools

### 1.10 Analisi Qualità del Prodotto
Valuta la maturità del prodotto:
- **Monitoring in produzione**: error tracking (Sentry), logging (Datadog), analytics
- **Feature flags**: LaunchDarkly, Unleash, config-based
- **A/B testing**: framework sperimentazione
- **Deployment**: strategia di deploy (blue-green, canary, rolling)
- **Backup/Recovery**: strategia di backup database, disaster recovery
- **SLA/SLO**: indicatori di affidabilità definiti?

**Annota**: Lacune di prodotto → raccomanda Sentry, monitoring MCP, deployment tools

### 1.11 Campionamento Codice
Leggi 5-8 file sorgente rappresentativi per rilevare:
- Stile di naming (camelCase, snake_case, PascalCase, kebab-case)
- Pattern di import/export
- Gestione errori in pratica
- Pattern di test in pratica
- Stile commenti e documentazione
- Pattern architetturali (dependency injection, repository, etc.)

---

## FASE 2: Compilazione Profilo Progetto e Fetch Live

### 2.1 Profilo Progetto Completo

Basandoti sulla discovery, compila un profilo che include TUTTE le dimensioni analizzate:

```
PROFILO PROGETTO
================
Nome: [nome]
Descrizione: [da README o dedotta]

TECH STACK:
  Linguaggio principale: [linguaggio]
  Linguaggi secondari: [se presenti]
  Framework: [framework rilevati]
  Runtime: [runtime]
  Package Manager: [pm]
  Build Tool: [build tool]
  Test Framework: [test framework]
  Linter: [linter]
  Formatter: [formatter]
  Type System: [type system]
  CI/CD: [CI/CD]
  Database: [database]
  Containerizzazione: [Docker/etc.]

ARCHITETTURA:
  Pattern: [monorepo/microservizi/MVC/etc.]
  Struttura: [descrizione]
  Naming: [convenzioni]

SICUREZZA: [livello: buono/migliorabile/critico]
  - [nota 1]
  - [nota 2]

QUALITÀ CODICE: [livello: alto/medio/basso]
  - [nota 1]
  - [nota 2]

PRESTAZIONI: [livello: ottimizzato/adeguato/da migliorare]
  - [nota 1]

UX: [livello: curato/base/assente] (se applicabile)
  - [nota 1]

QUALITÀ PRODOTTO: [livello: produzione/sviluppo/prototipo]
  - [nota 1]

Stato Progetto: [nuovo/in sviluppo/maturo/legacy]
```

### 2.2 Fetch Live dai Marketplace

**CRITICO**: Non basarti solo sui cataloghi statici. Prima di proporre i componenti, esegui queste ricerche live per avere dati aggiornati:

#### Registry MCP Ufficiale
Usa WebFetch o WebSearch per cercare MCP server rilevanti:
```
WebSearch: "site:registry.modelcontextprotocol.io [tech-stack-rilevato]"
WebSearch: "site:smithery.ai [tech-stack-rilevato] MCP server"
WebSearch: "site:glama.ai/mcp [framework-rilevato]"
```

#### Plugin Claude Code
Usa WebSearch per trovare plugin aggiornati:
```
WebSearch: "claude code plugin [framework-rilevato] 2026"
WebSearch: "site:github.com claude-code plugin [tech-stack]"
```

#### Marketplace wshobson/agents
Usa WebFetch per leggere il catalogo aggiornato:
```
WebFetch: "https://raw.githubusercontent.com/wshobson/agents/main/README.md"
→ Estrai i plugin rilevanti per il tech stack del progetto
```

#### Skill Community
Usa WebSearch per trovare skill specifiche:
```
WebSearch: "claude code skill [framework] [esigenza-specifica] 2026"
WebSearch: "site:github.com claude skills [linguaggio]"
```

#### Confronto con Cataloghi Statici
Dopo il fetch live, confronta con i cataloghi locali per completezza:
See [mcp-plugin-catalog.md](mcp-plugin-catalog.md)
See [bmad-modules-catalog.md](bmad-modules-catalog.md)

**Combina** i risultati live con i cataloghi statici. I dati live hanno precedenza — se un tool è stato aggiornato, deprecato o sostituito, usa le informazioni più recenti.

---

## FASE 3: Presentazione Piano e Conferma Individuale

Presenta all'utente un piano completo con **lista piatta numerata** dove ogni singolo componente può essere attivato o disattivato individualmente.

**IMPORTANTE**: NON usare AskUserQuestion per la conferma. NON raggruppare in opzioni come "Conferma tutto" o "Solo essenziali". Presenta la lista direttamente nel chat e chiedi all'utente di digitare i numeri per fare toggle.

```
============================================
  AUTO-PROVISION — Piano di Configurazione
============================================

PROGETTO: [nome]
STACK: [linguaggio] + [framework] + [tooling]

ANALISI QUALITATIVA:
  Sicurezza:     [██████░░░░] 60% — [nota breve]
  Qualità codice:[████████░░] 80% — [nota breve]
  Prestazioni:   [█████░░░░░] 50% — [nota breve]
  UX:            [███████░░░] 70% — [nota breve]
  Prodotto:      [████░░░░░░] 40% — [nota breve]

FILE CHE VERRANNO GENERATI:
---------------------------
1. CLAUDE.md — Regole, convenzioni, architettura, comandi
2. .claude/settings.json — Hook auto-format, lint, notifiche
3. .claude/skills/ — Skill su misura per il progetto

COMPONENTI DA INSTALLARE:
-------------------------
Ogni voce è attivabile/disattivabile singolarmente.
Digita i numeri separati da virgola per cambiare stato (es: "3,5,8"), poi invio per confermare.

  [x]  1. [nome MCP/plugin/skill] — [scopo]
          Motivazione: [perché l'analisi lo raccomanda]
  [x]  2. [nome MCP/plugin/skill] — [scopo]
          Motivazione: [perché l'analisi lo raccomanda]
  [x]  3. [nome MCP/plugin/skill] — [scopo]
          Motivazione: [perché l'analisi lo raccomanda]
  [x]  4. [nome MCP/plugin/skill] — [scopo]
          Motivazione: [perché l'analisi lo raccomanda]
  [x]  5. [nome skill community] — [scopo]
          Motivazione: [perché l'analisi lo raccomanda]
  [ ]  6. [nome MCP/plugin opzionale] — [scopo]
          Nota: [quando è utile]
  [ ]  7. [nome MCP/plugin opzionale] — [scopo]
          Nota: [quando è utile]
  [x]  8. [modulo BMAD] — [scopo]
  [ ]  9. [modulo BMAD] — [scopo]

→ Digita i numeri separati da virgola (es: "3,6,9"), oppure invio per confermare.
  Per numeri a due cifre non c'è ambiguità: "2,3" = voci 2 e 3; "23" = voce 23.

FILE ESISTENTI CHE VERRANNO PRESERVATI:
- [lista]
```

### Regole per la lista componenti:

1. **Lista piatta**: Tutti i componenti (MCP server, plugin, skill, moduli BMAD) in un'unica lista numerata sequenziale. Nessun sottogruppo con scelta collettiva.
2. **Pre-selezione intelligente**: Segna con `[x]` quelli fortemente raccomandati dall'analisi; segna con `[ ]` quelli opzionali o situazionali.
3. **Toggle individuale**: L'utente digita i numeri dei componenti da invertire (attivare ↔ disattivare), **separati da virgola**. Esempio: se scrive `3,6`, il componente 3 passa da `[x]` a `[ ]` e il 6 da `[ ]` a `[x]`. La virgola elimina ambiguità con numeri a due cifre (es: `2,3` = voci 2 e 3; `23` = voce 23).
4. **Iterativo**: Dopo il toggle, mostra la lista aggiornata e chiedi nuovamente. Ripeti finché l'utente conferma (invio vuoto o "ok"/"conferma").
5. **Ogni voce motivata**: Ogni raccomandazione deve spiegare PERCHÉ è suggerita basandosi sull'analisi, non "perché è popolare".
6. **No AskUserQuestion**: Usa solo testo diretto nel chat per la lista e l'interazione. L'utente risponde digitando numeri o "conferma".

---

## FASE 4: Generazione e Installazione

### 4.1 Generare CLAUDE.md
Carica la guida per la generazione:
See [claude-md-guide.md](claude-md-guide.md)

Genera il file `CLAUDE.md` nella root del progetto. Il CLAUDE.md deve riflettere l'analisi profonda — includi sezioni su sicurezza, qualità, performance se rilevanti. Se esiste già un CLAUDE.md, **integra** senza perdere contenuto.

### 4.2 Generare .claude/settings.json con Hook
Carica il catalogo hook:
See [hooks-catalog.md](hooks-catalog.md)

Seleziona hook in base al profilo completo — non solo formattazione, ma anche:
- Hook di sicurezza (se lacune rilevate): check segreti esposti, audit dipendenze
- Hook di qualità: lint, type-check
- Hook di produttività: auto-format, notifiche

Se `.claude/settings.json` esiste già, **fai merge**.

### 4.3 Generare Skill Specifiche
Carica il catalogo skill:
See [skills-catalog.md](skills-catalog.md)

Le skill generate devono riflettere i bisogni rilevati dall'analisi:
- Se sicurezza è debole → genera skill `security-audit`
- Se test coverage è bassa → genera skill `write-test` con enfasi sulla copertura
- Se performance è un problema → genera skill `performance-check`
- Se UX ha lacune → genera skill `accessibility-check`

Crea ogni skill come `.claude/skills/[nome-skill]/SKILL.md`

### 4.4 Installare MCP Server, Plugin e Estensioni
Carica il catalogo MCP e Plugin:
See [mcp-plugin-catalog.md](mcp-plugin-catalog.md)

**Installa AUTOMATICAMENTE** tutto ciò che l'utente ha confermato nella Fase 3:
- **Plugin**: Esegui installazione via Bash
- **MCP Server stdio**: Genera `.mcp.json` nella root del progetto
- **MCP Server HTTP**: Esegui `claude mcp add --transport http` via Bash
- **Marketplace esterni**: Esegui `/plugin marketplace add` via Bash
- **Skill da repository**: Clona e copia automaticamente
- **MCP con credenziali**: Installa e segnala le variabili da configurare

Se un'installazione fallisce, segnala l'errore e prosegui con le successive.

### 4.5 Proporre e Installare Moduli BMAD (se selezionati)
Carica il catalogo moduli:
See [bmad-modules-catalog.md](bmad-modules-catalog.md)

Se l'utente ha selezionato moduli BMAD nella Fase 3, procedi con l'installazione.

### 4.6 Generare Configurazione Aggiuntiva
- `.claude/settings.local.json` per configurazioni locali (aggiungere a .gitignore)
- Note su configurazioni team-level vs personali

### 4.7 Generare tools-index.md

Genera il file `tools-index.md` nella root del progetto. Questo file è l'indice di tutti gli strumenti installati, consultabile sia dagli umani che dal Component Search di Claude Code per il caricamento dinamico degli MCP server.

```markdown
# Tools Index

Indice degli strumenti configurati da auto-provision. Claude Code usa questo file per caricare dinamicamente solo gli MCP server necessari.

## MCP Server

| Nome | Descrizione | Caso d'uso |
|------|-------------|------------|
| [nome] | [descrizione breve] | [quando usarlo] |

## Skill

| Nome | Comando | Descrizione |
|------|---------|-------------|
| [nome] | /[comando] | [descrizione breve] |

## Hook

| Evento | Descrizione |
|--------|-------------|
| [evento] | [cosa fa] |

## Plugin

| Nome | Tipo | Descrizione |
|------|------|-------------|
| [nome] | [marketplace/community] | [descrizione breve] |
```

Se `tools-index.md` esiste già, **fai merge** aggiungendo le nuove voci senza rimuovere quelle esistenti.

---

## FASE 5: Report Finale

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

INSTALLATI AUTOMATICAMENTE:
  Plugin:
  ✓ [nome] — installato
  MCP Server:
  ✓ [nome] — configurato
  Skill Community:
  ✓ [nome] — installato
  Marketplace:
  ✓ [nome] — aggiunto
  Errori (se presenti):
  ✗ [nome] — [motivo]

CREDENZIALI DA CONFIGURARE:
- [server]: imposta [VAR_NAME]

AREE DI MIGLIORAMENTO RILEVATE:
- Sicurezza: [raccomandazione specifica]
- Qualità: [raccomandazione specifica]
- Performance: [raccomandazione specifica]

PROSSIMI PASSI:
1. Rivedi CLAUDE.md e personalizza
2. Testa gli hook con una modifica
3. Prova le skill con /[nome-skill]
4. Configura le credenziali
5. [suggerimenti specifici]
```

---

## Regole Generali

- **Mai sovrascrivere** file esistenti senza conferma esplicita
- **Sempre fare merge** quando possibile
- **Preferire convenzioni del progetto** a default generici
- **Ogni raccomandazione deve essere motivata** dall'analisi — niente suggerimenti generici
- **Skill pragmatiche** — solo skill che risolvono problemi reali rilevati
- **Dati live > cataloghi statici** — se il fetch live trova informazioni più recenti, usale
- Il CLAUDE.md deve essere **conciso ma completo** — sotto le 200 righe se possibile
- Usare il linguaggio dell'utente per i commenti nel CLAUDE.md
- Hook e skill devono essere **immediatamente funzionanti** senza configurazione aggiuntiva
- **Installazione automatica** — dopo la conferma dell'utente, esegui tutto senza chiedere altro
