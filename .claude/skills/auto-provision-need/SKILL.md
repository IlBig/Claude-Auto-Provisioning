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

### 2.3 Filtraggio e Presentazione

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

Installa ogni componente selezionato seguendo:
- **ADR-5**: Sequential-Isolated-Continue — ogni componente isolato
- **ADR-7**: Error handling a 3 livelli — retry (fino a 3) → self-heal → log & continue

Per ogni componente mostra il progresso:
```
Installazione 1/3: [nome]... ✓
Installazione 2/3: [nome]... ✓
Installazione 3/3: [nome]... ✗ [motivo breve]
```

### 3.3 Post-Installazione

Dopo l'installazione:

1. **Aggiorna tools-index.md**: Aggiungi i nuovi componenti (merge, non sovrascrivere)
2. **Merge CLAUDE.md**: Se il componente richiede configurazione in CLAUDE.md, aggiungi le sezioni necessarie (ADR-3 section-based merge)
3. **Merge settings.json**: Se il componente include hook, aggiungi senza rimuovere (ADR-3 deep merge)

### 3.4 Mini-Report

```
AUTO-PROVISION-NEED — Completato!
===================================

INSTALLATI:
  ✓ [nome] — [tipo] — installato
  ✗ [nome] — [tipo] — [motivo errore]

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
- **Installazione automatica** — dopo la conferma, esegui tutto senza chiedere altro
- **Conciso** — non ripetere informazioni già note all'utente
