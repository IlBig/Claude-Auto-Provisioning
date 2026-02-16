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
WebSearch: "claude code plugin [framework-rilevato]"
WebSearch: "site:github.com claude-code plugin [tech-stack]"
```

#### Marketplace wshobson/agents — Estrazione Plugin Individuali
Usa WebFetch per leggere il catalogo aggiornato e **estrarre i plugin individuali**:
```
WebFetch: "https://raw.githubusercontent.com/wshobson/agents/main/README.md"
```

**Procedura dopo il fetch:**
1. **Estrai** dal README la lista completa dei plugin con nome + descrizione breve per ciascuno
2. **Valuta** la rilevanza di ciascun plugin rispetto al profilo progetto (2.1): tech stack, architettura, lacune sicurezza/qualità/performance
3. **Filtra** solo i plugin pertinenti al progetto — scarta quelli non rilevanti
4. **Passa** i plugin filtrati alla consultazione esperti (2.3) e alla Fase 3 come **voci individuali** nella lista componenti

**IMPORTANTE**: Il marketplace NON è una voce nella lista componenti. È un prerequisito implicito: viene aggiunto automaticamente nello script `provision-install.sh` solo se almeno 1 plugin è selezionato dall'utente in Fase 3.

#### Skill Community
Usa WebSearch per trovare skill specifiche:
```
WebSearch: "claude code skill [framework] [esigenza-specifica]"
WebSearch: "site:github.com claude skills [linguaggio]"
```

#### Confronto con Cataloghi Statici
Dopo il fetch live, confronta con i cataloghi locali per completezza:
See [mcp-plugin-catalog.md](mcp-plugin-catalog.md)
See [bmad-modules-catalog.md](bmad-modules-catalog.md)

**Combina** i risultati live con i cataloghi statici. I dati live hanno precedenza — se un tool è stato aggiornato, deprecato o sostituito, usa le informazioni più recenti.

### 2.3 Consultazione Esperti Virtuali

Pattern: **Self-Reflection → Self-Verification → Dual Expert Role-Play → Component Evaluation**

Prima di presentare il piano all'utente, consulta due esperti virtuali per una valutazione più profonda dei componenti da proporre.

#### Step 1: Identificazione Esperti

**Esperto di Dominio**: Basandoti su README, descrizione e scopo del progetto, identifica lo specialista del settore/argomento. Deve essere un profilo specifico, non generico. Esempi:
- App gestione budget familiare → consulente finanziario specializzato in risparmio familiare
- Piattaforma prenotazioni ristorante → imprenditore nel settore ristorazione
- App fitness → personal trainer e nutrizionista sportivo
- Piattaforma e-commerce → esperto retail e supply chain manager

**Esperto Tecnico**: Basandoti sulle lacune rilevate nell'analisi (sicurezza, qualità codice, performance, UX, prodotto), identifica lo specialista tecnico più pertinente. Profilo specifico e contestualizzato allo stack del progetto. Esempi:
- Lacune sicurezza in app Node.js → security engineer specializzato in Node.js e OWASP
- Problemi performance in app React → frontend performance engineer esperto di React rendering
- Carenze DevOps → SRE/DevOps engineer specializzato nello stack rilevato

#### Step 2: Verifica della Scelta

Per **ciascun esperto**, esegui un ciclo di self-verification:
1. Genera 3-5 domande di verifica per confermare che il profilo scelto sia il più appropriato
2. Rispondi a ciascuna domanda separatamente
3. Rivedi la scelta: se le risposte rivelano un profilo più adatto, aggiorna la selezione

Esempi di domande di verifica:
- "Questo esperto ha le competenze per valutare le specificità del dominio/stack?"
- "C'è un profilo più specializzato per questo contesto?"
- "L'esperto copre le aree di lacuna principali rilevate?"

#### Step 3: Consultazione Congiunta

1. **L'esperto di dominio** analizza il progetto dalla prospettiva del settore:
   - Quali funzionalità/flussi sono critici nel dominio?
   - Quali standard di settore andrebbero rispettati?
   - Quali integrazioni esterne sono tipiche nel settore?
   - Quali sono le priorità dell'utente finale in questo dominio?

2. **L'esperto tecnico**, informato dalle esigenze di dominio emerse, valuta i cataloghi:
   - Riceve: profilo progetto completo + insight dell'esperto di dominio + tutti i risultati dei cataloghi (statici e live)
   - Valuta ogni componente candidato secondo: rilevanza per il progetto, priorità di installazione, sinergie con altri componenti, motivazione tecnica

3. **Insieme** producono la lista ordinata per priorità, decidendo:
   - Quali componenti sono fortemente raccomandati (`[x]`)
   - Quali sono opzionali (`[ ]`)
   - L'ordine di presentazione nella lista

#### Output della Consultazione

L'analisi degli esperti è **interna** (non viene mostrata come sezione separata all'utente). Il risultato influenza direttamente la selezione e l'ordinamento dei componenti nella Fase 3.

All'utente si mostra nel report della Fase 3, nella sezione piano, subito dopo l'ANALISI QUALITATIVA:
```
ESPERTI CONSULTATI:
  Dominio: [profilo specifico] → [1 riga insight chiave]
  Tecnico: [profilo specifico] → [1 riga focus valutazione]
```

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

ESPERTI CONSULTATI:
  Dominio: [profilo specifico] → [1 riga insight chiave]
  Tecnico: [profilo specifico] → [1 riga focus valutazione]

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

### 4.4 Configurare MCP Server in .mcp.json
Carica il catalogo MCP e Plugin:
See [mcp-plugin-catalog.md](mcp-plugin-catalog.md)

Configura **solo** i server che possono essere scritti come file (azione diretta):
- **MCP Server stdio**: Genera/merge `.mcp.json` nella root del progetto
- **MCP con credenziali**: Genera in `.mcp.json` con variabili `${VAR}` e segnala nel report quali variabili d'ambiente configurare

**NON** eseguire comandi bash per installazione. I comandi esterni vanno nello script (sezione 4.5).

### 4.5 Generare provision-install.sh

Raccogli **TUTTI** i comandi che richiedono esecuzione bash esterna e generali in uno script unico.

#### Classificazione azioni

**Dirette (file write, già eseguite da Claude Code):**
- CLAUDE.md (4.1)
- .claude/settings.json con hook (4.2)
- .claude/skills/*/SKILL.md (4.3)
- .mcp.json per MCP stdio (4.4)
- .claude/settings.local.json (4.7)
- tools-index.md (4.8)

**Script bash (provision-install.sh):**
- `claude mcp add --transport http <nome> <url>` — MCP server HTTP
- `git clone` + `cp` per skill da repository esterni (obra/superpowers, vercel-labs/agent-browser, etc.)
- `npx bmad-method install` — moduli BMAD (se selezionati in Fase 3)
- Qualsiasi altro comando `npm`/`npx` necessario
- `/plugin marketplace add wshobson/agents` — prerequisito automatico se almeno 1 plugin è selezionato (tramite `claude /plugin marketplace add`)

**Post-riavvio (istruzioni stampate dallo script):**
- `/plugin install <nome>@claude-plugins-official` — plugin dal marketplace ufficiale
- `/plugin install <nome-plugin>@wshobson-agents` — per ogni plugin marketplace selezionato dall'utente

#### Struttura dello script

Se ci sono comandi esterni, genera `provision-install.sh` nella root del progetto:

```bash
#!/bin/bash
# provision-install.sh — generato da /auto-provision
set -e
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR"

echo "================================================"
echo "  Auto-Provision: Installazione componenti esterni"
echo "================================================"
echo ""

# --- MCP Server HTTP ---
echo "Installazione MCP Server HTTP..."
claude mcp add --transport http <nome> <url> && echo "  ✓ <nome>" || echo "  ✗ <nome>"

# --- Skill da Repository ---
echo ""
echo "Installazione Skill esterne..."
TMPDIR=$(mktemp -d)
git clone --depth 1 --filter=blob:none --sparse https://github.com/<repo>.git "$TMPDIR/<repo>"
cd "$TMPDIR/<repo>" && git sparse-checkout set skills/<nome>
cp -r skills/<nome> "$SCRIPT_DIR/.claude/skills/"
cd "$SCRIPT_DIR"
rm -rf "$TMPDIR"
echo "  ✓ <nome>"

# --- Marketplace wshobson/agents (prerequisito per plugin selezionati) ---
echo ""
echo "Aggiunta marketplace wshobson/agents..."
claude /plugin marketplace add wshobson/agents && echo "  ✓ marketplace wshobson/agents" || echo "  ✗ marketplace wshobson/agents"

# --- Moduli BMAD ---
echo ""
echo "Installazione moduli BMAD..."
npx bmad-method install && echo "  ✓ BMAD modules" || echo "  ✗ BMAD modules"

echo ""
echo "================================================"
echo "  Installazione completata!"
echo "================================================"

# Post-install: comandi da eseguire dentro Claude Code al riavvio
echo ""
echo "DOPO IL RIAVVIO, esegui in Claude Code:"
echo "  /plugin install <nome>@claude-plugins-official"
# Per ogni plugin marketplace selezionato dall'utente:
echo "  /plugin install <nome-plugin>@wshobson-agents"

# Self-cleanup + riavvio Claude Code
rm -- "$0"
exec claude
```

#### Regole per la generazione

1. **Includi solo le sezioni pertinenti**: Se non ci sono MCP HTTP, ometti quella sezione. Se non ci sono skill esterne, ometti quella sezione. Etc.
2. **Se non ci sono comandi esterni** (solo file write diretti), **NON generare lo script**
3. **Rendi lo script eseguibile**: Dopo la generazione, esegui `chmod +x provision-install.sh`
4. **Self-cleanup**: Lo script si auto-elimina con `rm -- "$0"` e riavvia Claude Code con `exec claude`
5. **Istruzioni post-riavvio**: Stampa i comandi `/plugin install` che l'utente dovrà eseguire dentro Claude Code dopo il riavvio

### 4.6 Proporre e Installare Moduli BMAD (se selezionati)
Carica il catalogo moduli:
See [bmad-modules-catalog.md](bmad-modules-catalog.md)

Se l'utente ha selezionato moduli BMAD nella Fase 3:
- **Non eseguire** `npx bmad-method install` direttamente
- **Aggiungi** il comando `npx bmad-method install` alla sezione BMAD dello script `provision-install.sh` (generato in 4.5)

### 4.7 Generare Configurazione Aggiuntiva
- `.claude/settings.local.json` per configurazioni locali (aggiungere a .gitignore)
- Note su configurazioni team-level vs personali

### 4.8 Generare tools-index.md

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

Il report finale deve distinguere tra componenti già pronti e quelli che richiedono lo script.

**Se provision-install.sh è stato generato:**

```
============================================
  AUTO-PROVISION — Completato!
============================================

FILE GENERATI:
- CLAUDE.md (XX righe)
- .claude/settings.json (XX hook configurati)
- .claude/skills/[nome]/SKILL.md (per ogni skill)
- .mcp.json (XX server MCP configurati)
- provision-install.sh (script di installazione)

HOOK ATTIVI:
- [evento]: [descrizione]

SKILL DISPONIBILI:
- /[nome-skill]: [descrizione]

CONFIGURATI (pronti all'uso):
  MCP Server (stdio):
  ✓ [nome] — configurato in .mcp.json
  Skill locali:
  ✓ [nome] — generata

DA INSTALLARE (nello script):
  MCP Server (HTTP):
  ◻ [nome] — claude mcp add
  Skill esterne:
  ◻ [nome] — git clone da [repo]
  Marketplace:
  ◻ [nome] — plugin marketplace add
  Moduli BMAD:
  ◻ npx bmad-method install

POST-RIAVVIO (comandi manuali in Claude Code):
  ◻ /plugin install [nome]@claude-plugins-official
  ◻ /plugin install [nome]@[marketplace]

CREDENZIALI DA CONFIGURARE:
- [server]: imposta [VAR_NAME]

AREE DI MIGLIORAMENTO RILEVATE:
- Sicurezza: [raccomandazione specifica]
- Qualità: [raccomandazione specifica]
- Performance: [raccomandazione specifica]

================================================
  SCRIPT DI INSTALLAZIONE GENERATO:
    provision-install.sh

  Per completare l'installazione:
    1. Esci da Claude Code (Ctrl+C o /exit)
    2. Esegui: bash provision-install.sh
    3. Lo script installerà i componenti,
       si auto-eliminerà e riavvierà Claude Code
    4. Dopo il riavvio, esegui i comandi /plugin
       elencati sopra in POST-RIAVVIO
================================================
```

**Se provision-install.sh NON è stato generato** (solo file write diretti):

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

CONFIGURATI (pronti all'uso):
  MCP Server (stdio):
  ✓ [nome] — configurato in .mcp.json
  Skill locali:
  ✓ [nome] — generata

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
- **File write diretti** — tutto ciò che può essere scritto come file (CLAUDE.md, .mcp.json, settings.json, skill, tools-index) viene eseguito subito
- **Script per comandi esterni** — tutto ciò che richiede bash esterno (claude mcp add HTTP, git clone, npx) va in `provision-install.sh`
- **Mai eseguire comandi bash esterni** direttamente — sempre delegare allo script
