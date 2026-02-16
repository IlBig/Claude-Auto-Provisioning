---
name: auto-provision-need
description: Cerca e installa componenti specifici per un'esigenza descritta in linguaggio naturale. Usa /auto-provision-need [RICHIESTA] per avviare.
argument-hint: "<descrizione esigenza>"
---

# Auto-Provision Need: Discovery e Installazione On-Demand

Sei un sistema di discovery on-demand per Claude Code. L'utente ha un'esigenza specifica e vuole trovare e installare i componenti giusti (MCP server, skill, hook, plugin) senza eseguire il provisioning completo.

## Flusso di Esecuzione

Esegui le fasi nell'ordine indicato. **Non saltare nessuna fase.**

---

## FASE 1: Analisi Contesto e Comprensione Richiesta

### 1.1 Analisi Rapida del Contesto

Esegui una discovery rapida del progetto corrente:
- Leggi `package.json`, `Cargo.toml`, `pyproject.toml` o equivalente per identificare lo stack
- Leggi `.mcp.json` per identificare MCP server già installati
- Leggi `.claude/settings.json` per identificare hook già configurati
- Leggi `tools-index.md` se presente per l'inventario completo
- Elenca le directory in `.claude/skills/` per identificare skill già presenti

### 1.2 Comprensione della Richiesta

Analizza la richiesta dell'utente passata come argomento:

**Se la richiesta è specifica** (es. "MCP server per PostgreSQL", "hook per ESLint"):
→ Procedi direttamente alla Fase 2 senza domande

**Se la richiesta è generica** (es. "code review", "testing", "database"):
→ Poni 2-3 domande di chiarimento mirate:
  - **Tipo di componente**: "Preferisci un MCP server, una skill, un hook, o vuoi vedere tutte le opzioni?"
  - **Specifiche**: "Per code review intendi: review automatica pre-commit, review on-demand, o analisi statica del codice?"
  - **Contesto**: "Vuoi che funzioni solo localmente o anche in CI/CD?"

**Regole per le domande:**
- Massimo 3 domande
- Ogni domanda deve avere opzioni suggerite per accelerare
- Se l'utente risponde vagamente, procedi con la tua migliore interpretazione
- Non chiedere mai informazioni che puoi dedurre dal contesto del progetto

### 1.3 Riepilogo e Conferma

Dopo aver raccolto le informazioni, mostra un riepilogo:

```
Cerco: [tipo componente] per [esigenza specifica]
Stack rilevato: [linguaggio] + [framework]
Componenti già installati: [lista breve]
```

Chiedi: "Procedo con la ricerca?" e attendi conferma.

---

## FASE 2: Ricerca Componenti

### 2.1 Ricerca nei Cataloghi Statici

Cerca nei cataloghi della skill auto-provision:
See [../auto-provision/mcp-plugin-catalog.md](../auto-provision/mcp-plugin-catalog.md)
See [../auto-provision/hooks-catalog.md](../auto-provision/hooks-catalog.md)
See [../auto-provision/skills-catalog.md](../auto-provision/skills-catalog.md)
See [../auto-provision/bmad-modules-catalog.md](../auto-provision/bmad-modules-catalog.md)

Filtra i componenti pertinenti all'esigenza dell'utente.

### 2.2 Fetch Fonti Live

Tenta il fetch da fonti live per dati aggiornati:
```
WebSearch: "site:registry.modelcontextprotocol.io [esigenza]"
WebSearch: "site:smithery.ai [esigenza] MCP server"
WebSearch: "site:glama.ai/mcp [esigenza]"
WebSearch: "claude code [tipo-componente] [esigenza]"
```

Se le fonti live non sono raggiungibili, usa solo i cataloghi statici. I dati live hanno precedenza.

### 2.3 Consultazione Esperto Rapida

Prima di filtrare e presentare i risultati, esegui una consultazione rapida con due esperti virtuali per valutare meglio la pertinenza dei componenti trovati.

#### Identificazione (profili brevi)

- **Esperto di Dominio**: Basandoti sul README e sullo scopo del progetto, identifica in 1 riga lo specialista di settore più appropriato (es. "consulente finanziario per app di budgeting", "esperto ristorazione per piattaforma prenotazioni")
- **Esperto Tecnico**: Basandoti sullo stack e sull'esigenza espressa dall'utente, identifica in 1 riga lo specialista tecnico (es. "security engineer Node.js", "DevOps engineer specializzato container")

#### Verifica Rapida

Per ciascun esperto, 2-3 domande di verifica rapide:
- "Il profilo scelto è pertinente all'esigenza specifica dell'utente?"
- "C'è un profilo più adatto per questo contesto?"
- Rispondi brevemente e aggiusta se necessario

#### Valutazione Congiunta

I due esperti valutano insieme i risultati della ricerca (cataloghi + live):
- L'esperto di dominio indica quali componenti sono più rilevanti per il settore del progetto
- L'esperto tecnico valuta qualità, compatibilità con lo stack, e priorità di installazione
- Insieme determinano l'ordinamento e la pre-selezione (`[x]` vs `[ ]`)

L'analisi è **interna** — non viene mostrata separatamente all'utente.

### 2.4 Filtraggio e Presentazione

**Escludi** i componenti già installati (rilevati in Fase 1.1).

**Se ci sono risultati**, presenta una lista numerata:

```
COMPONENTI TROVATI PER: [esigenza]
=====================================

  [x]  1. [nome] — [tipo: MCP/Skill/Hook/Plugin]
          [descrizione breve]
          Motivazione: [perché è pertinente all'esigenza]
  [x]  2. [nome] — [tipo]
          [descrizione breve]
          Motivazione: [perché è pertinente]
  [ ]  3. [nome] — [tipo]
          [descrizione breve]
          Nota: [quando è utile, perché non pre-selezionato]

→ Digita i numeri separati da virgola per cambiare stato, invio per confermare.
```

**Se non ci sono risultati**:
```
Nessun componente trovato per "[esigenza]".

Suggerimenti:
- Prova a riformulare la richiesta in modo più specifico
- Usa termini tecnici (es. "PostgreSQL" invece di "database")
- Specifica il tipo: "MCP server per...", "hook per...", "skill per..."
```

---

## FASE 3: Selezione e Installazione

### 3.1 Toggle e Conferma

Stesse regole della Fase 3 di auto-provision:
1. **Toggle individuale**: numeri separati da virgola per invertire stato
2. **Iterativo**: dopo toggle, mostra lista aggiornata
3. **Conferma**: invio vuoto o "ok"/"conferma" per procedere

### 3.2 Installazione Resiliente

Classifica ogni componente selezionato e installa con la strategia appropriata:

#### Azioni dirette (file write, eseguiti subito da Claude Code):
- **MCP Server stdio** → genera/merge `.mcp.json`
- **Skill locali** → genera `.claude/skills/[nome]/SKILL.md`
- **Hook** → merge in `.claude/settings.json`
- **Aggiornamenti CLAUDE.md** → merge sezioni
- **tools-index.md** → merge nuove voci

#### Azioni script (comandi bash esterni → `provision-install.sh`):
- **MCP Server HTTP** → `claude mcp add --transport http <nome> <url>`
- **Skill da repository** → `git clone` + `cp`
- **Moduli BMAD** → `npx bmad-method install`
- **Marketplace esterni** → `claude /plugin marketplace add <repo>`
- Qualsiasi altro comando `npm`/`npx`

#### Azioni post-riavvio (istruzioni stampate dallo script):
- **Plugin** → `/plugin install <nome>@claude-plugins-official`
- **Plugin da marketplace** → `/plugin install <nome>@<marketplace>`

**Esecuzione:**

1. **File write diretti**: Esegui subito, mostrando progresso:
   ```
   Configurazione 1/N: [nome]... ✓
   ```

2. **Comandi esterni**: Genera (o appendi a) `provision-install.sh` nella root del progetto. Se lo script esiste già (es. da un precedente `/auto-provision`), **appendi** i nuovi comandi senza sovrascrivere. Rendi eseguibile con `chmod +x`.

3. **Plugin post-riavvio**: Aggiungi le istruzioni `/plugin install` nella sezione echo dello script.

**Regole:**
- **ADR-5**: Sequential-Isolated-Continue — ogni componente isolato
- **ADR-7**: Error handling a 3 livelli — retry (fino a 3) → self-heal → log & continue
- **Mai eseguire comandi bash esterni** direttamente — sempre delegare allo script

### 3.3 Post-Installazione

Dopo l'installazione dei file write diretti:

1. **Aggiorna tools-index.md**: Aggiungi i nuovi componenti (merge, non sovrascrivere)
2. **Merge CLAUDE.md**: Se il componente richiede configurazione in CLAUDE.md, aggiungi le sezioni necessarie (ADR-3 section-based merge)
3. **Merge settings.json**: Se il componente include hook, aggiungi senza rimuovere (ADR-3 deep merge)

### 3.4 Mini-Report

**Se provision-install.sh è stato generato (o aggiornato):**

```
AUTO-PROVISION-NEED — Completato!
===================================

CONFIGURATI (pronti all'uso):
  ✓ [nome] — [tipo] — configurato
  ✓ [nome] — [tipo] — configurato

DA INSTALLARE (nello script):
  ◻ [nome] — [tipo] — aggiunto a provision-install.sh
  ◻ [nome] — [tipo] — aggiunto a provision-install.sh

POST-RIAVVIO (comandi manuali in Claude Code):
  ◻ /plugin install [nome]@claude-plugins-official

CREDENZIALI DA CONFIGURARE:
- [server]: imposta [VAR_NAME]

FILE AGGIORNATI:
- tools-index.md (aggiornato)
- [altri file modificati]

================================================
  SCRIPT DI INSTALLAZIONE:
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

**Se NON ci sono comandi esterni (solo file write):**

```
AUTO-PROVISION-NEED — Completato!
===================================

CONFIGURATI (pronti all'uso):
  ✓ [nome] — [tipo] — configurato

CREDENZIALI DA CONFIGURARE:
- [server]: imposta [VAR_NAME]

FILE AGGIORNATI:
- tools-index.md (aggiornato)
- [altri file modificati]
```

---

## Regole Generali

- **Mai sovrascrivere** file esistenti — sempre merge
- **Rispetta le convenzioni del progetto** già in uso
- **Dati live > cataloghi statici** — usa le info più recenti
- **File write diretti** — tutto ciò che può essere scritto come file viene eseguito subito
- **Script per comandi esterni** — tutto ciò che richiede bash esterno va in `provision-install.sh`
- **Mai eseguire comandi bash esterni** direttamente — sempre delegare allo script
- **Conciso** — non ripetere informazioni già note all'utente
