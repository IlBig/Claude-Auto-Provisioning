# Catalogo Moduli BMAD — Auto-Provision

Questo catalogo descrive i moduli BMAD disponibili per l'installazione. Presenta questa selezione all'utente quando il sistema rileva che potrebbe beneficiare della metodologia BMAD, oppure quando l'utente lo richiede esplicitamente.

## Quando Proporre BMAD

Proponi l'installazione dei moduli BMAD quando:
- Il progetto è un progetto software in fase di sviluppo attivo
- L'utente chiede esplicitamente di installare BMAD
- Il progetto non ha ancora una metodologia definita (no Jira, Linear, etc.)
- Il progetto ha bisogno di struttura (requisiti, architettura, storie, testing)

## Moduli Disponibili

### 🟢 BMad Core Module (sempre installato)
**Stato**: Obbligatorio — non deselezionabile

Il motore fondamentale del framework. Fornisce l'orchestrazione degli agenti AI, il sistema di configurazione, la compilazione degli agenti e le policy di base. Tutti gli altri moduli si appoggiano su di esso.

**Include**:
- BMad Master Agent (orchestratore principale)
- Sistema di configurazione e manifest
- Workflow di base: brainstorming, party-mode, advanced-elicitation
- Task: editorial review, adversarial review, document sharding, indexing

---

### ◻️ BMad Method (BMM) — Agile-AI Driven Development
**Consigliato per**: Qualsiasi progetto software

Il modulo principale per lo sviluppo software agile guidato da AI. Copre l'intero ciclo di vita del software.

**Include**:
- ~12 agenti specializzati: Analyst (Mary), PM (John), Architect (Winston), Developer (Amelia), Scrum Master (Bob), QA (Quinn), UX Designer (Sally), Tech Writer (Paige), Quick-Flow Dev (Barry)
- 25+ workflow organizzati in 4 fasi:
  1. **Analisi**: domain research, market research, technical research, product brief
  2. **Pianificazione**: PRD creation/editing/validation, UX design
  3. **Solutioning**: architecture, epics & stories, implementation readiness check
  4. **Implementazione**: dev story, code review, sprint planning, retrospective, QA
- Quick-flow per sviluppo rapido (quick-spec, quick-dev)

---

### ◻️ BMad Builder (BMB)
**Consigliato per**: Chi vuole creare agenti e workflow personalizzati

Trasforma BMad da framework fisso a piattaforma estensibile. Permette di creare soluzioni specifiche per qualsiasi dominio.

**Include**:
- Strumenti per creare agenti custom
- Template per workflow personalizzati
- Sistema di packaging moduli
- Supporto per domini: legale, medico, finanziario, educativo, etc.

---

### ◻️ BMad Creative Intelligence Suite (CIS)
**Consigliato per**: Progetti in fase ideativa, brainstorming, strategia

Modulo per il pensiero creativo e strategico.

**Include**:
- 5 workflow interattivi: brainstorming, design thinking, problem solving, strategia d'innovazione, storytelling
- 150+ tecniche creative
- 5 agenti specializzati con stili di facilitazione unici
- Utile per: esplorare idee, pianificare presentazioni, sviluppare narrative

---

### ◻️ BMad Game Dev Studio
**Consigliato per**: Progetti di sviluppo videogiochi

Modulo opzionale specifico per game development.

**Include**:
- Agenti: Game Architect, Game Designer, Game Developer
- Workflow per Game Design Document (GDD)
- Workflow per meccaniche di gioco
- Template specifici per game dev

---

### ◻️ Test Architect (TEA)
**Consigliato per**: Progetti che necessitano testing avanzato

Modulo standalone per testing e quality assurance avanzati. Si integra con Playwright per test fixture-based.

**Include**:
- Agente Murat (Test Architect)
- 9 workflow: ATDD, test automation, CI/CD pipeline, framework init, NFR assessment, test design, test review, traceability, teaching
- Integrazione Playwright
- Approfondisce il testing oltre il QA agent base del BMM

---

## Formato Presentazione Selezione

Quando presenti la selezione dei moduli BMAD, usa AskUserQuestion con `multiSelect: true` nella categoria `"Plugin"` (o in una domanda dedicata `"Moduli BMAD"` se ci sono già altri plugin).

**Esempio opzioni AskUserQuestion:**
```
Categoria "Moduli BMAD":
  - label: "Core (Recommended)"
    description: "Orchestrazione agenti, configurazione, workflow base — obbligatorio"
  - label: "BMM — Agile-AI Development (Recommended)"
    description: "Ciclo vita completo del software (12 agenti, 25+ workflow)"
  - label: "BMB — Builder"
    description: "Crea agenti e workflow personalizzati — per utenti avanzati"
  - label: "CIS — Creative Intelligence"
    description: "Brainstorming, design thinking, 150+ tecniche creative"
```

Se i moduli sono più di 4, sdoppia in sotto-domande (`"Moduli BMAD (1/2)"`, `"Moduli BMAD (2/2)"`).

**Raccomandazione (Recommended)**:
- Core: SEMPRE raccomandato (obbligatorio)
- BMM: Raccomandato per progetti software
- TEA: Raccomandato se il progetto ha già test o framework di test
- CIS: Raccomandato se il progetto è in fase iniziale/ideativa
- Game Dev: Raccomandato SOLO se rilevati indicatori di game dev (Unity, Godot, Bevy, etc.)
- BMB: Mai raccomandato (per utenti avanzati)

## Installazione Moduli

L'installazione dei moduli BMAD avviene tramite il BMAD installer ufficiale. Dopo la selezione:

1. Verifica se BMAD è già installato nel progetto (cerca `_bmad/` directory)
2. Se BMAD è già presente, segnala quali moduli sono installati e quali mancano
3. Per installare nuovi moduli, usa il BMAD installer: `npx bmad-method install`
4. Se BMAD non è presente, proponi l'installazione completa

**Nota**: L'auto-provision non reinstalla BMAD se già presente — gestisce solo la selezione e l'invocazione dell'installer.
