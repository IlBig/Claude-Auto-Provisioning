# Catalogo MCP Server e Plugin — Auto-Provision

Questo catalogo mappa tech stack → MCP server e plugin raccomandati. Seleziona SOLO ciò che è rilevante per il progetto analizzato.

## Come Installare

### MCP Server
```bash
# HTTP (server remoti)
claude mcp add --transport http <nome> <url>

# Stdio (server locali via npx)
claude mcp add --transport stdio <nome> -- npx -y <pacchetto>

# Con variabili d'ambiente
claude mcp add --transport stdio --env KEY=value <nome> -- npx -y <pacchetto>
```

### Plugin (dal marketplace ufficiale)
```bash
/plugin install <nome>@claude-plugins-official
```

### Configurazione in .mcp.json (progetto)
```json
{
  "mcpServers": {
    "nome-server": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@pacchetto/mcp-server"],
      "env": { "API_KEY": "${API_KEY}" }
    }
  }
}
```

---

## Marketplace e Registry di Riferimento

| Nome | URL | Tipo |
|------|-----|------|
| MCP Registry (Ufficiale) | registry.modelcontextprotocol.io | Metadata registry |
| Smithery AI | smithery.ai | Marketplace dedicato |
| Glama.ai | glama.ai/mcp/servers | Registry + SaaS |
| Claude Plugins Official | Pre-installato in Claude Code | Plugin marketplace |
| claude-plugins.dev | claude-plugins.dev | Community registry |

---

## MCP Server e Plugin per Tech Stack

### DATABASE

Raccomanda in base al database rilevato:

| Database Rilevato | MCP Server | Installazione |
|-------------------|------------|---------------|
| **PostgreSQL** | DBHub (multi-DB) | `claude mcp add --transport stdio db -- npx -y @bytebase/dbhub --dsn "postgresql://user:pass@host/db"` |
| **MySQL/MariaDB** | DBHub (multi-DB) | `claude mcp add --transport stdio db -- npx -y @bytebase/dbhub --dsn "mysql://user:pass@host/db"` |
| **SQLite** | DBHub (multi-DB) | `claude mcp add --transport stdio db -- npx -y @bytebase/dbhub --dsn "sqlite:///path/to/db.sqlite"` |
| **MongoDB** | MongoDB MCP | `claude mcp add --transport stdio mongodb -- npx -y mongodb-mcp-server` |
| **Redis** | Redis MCP | `claude mcp add --transport stdio redis -- npx -y redis-mcp-server` |
| **Supabase** | Supabase Plugin | `/plugin install supabase@claude-plugins-official` |
| **Prisma** | Nessun MCP specifico | DBHub funziona con qualsiasi DB supportato da Prisma |
| **Drizzle** | Nessun MCP specifico | DBHub per il DB sottostante |

**Regola**: Se il progetto ha un database, raccomanda SEMPRE DBHub o il server specifico.

---

### VERSION CONTROL e PROJECT MANAGEMENT

Raccomanda in base a `.git/`, CI/CD config, o dipendenze rilevate:

| Indicatore | Plugin/MCP | Installazione |
|------------|------------|---------------|
| **Qualsiasi repo Git** | GitHub Plugin | `/plugin install github@claude-plugins-official` |
| **GitLab CI (.gitlab-ci.yml)** | GitLab Plugin | `/plugin install gitlab@claude-plugins-official` |
| **Jira/Confluence** | Atlassian Plugin | `/plugin install atlassian@claude-plugins-official` |
| **Linear** | Linear Plugin | `/plugin install linear@claude-plugins-official` |
| **Notion** | Notion Plugin | `/plugin install notion@claude-plugins-official` |
| **Asana** | Asana MCP | `claude mcp add --transport http asana https://mcp.asana.com/sse` |

**Regola**: GitHub plugin è quasi sempre utile. Aggiungi project management solo se ci sono indicatori espliciti.

---

### FRONTEND WEB

Raccomanda se il progetto è un'app frontend:

| Framework Rilevato | MCP/Plugin | Scopo | Installazione |
|--------------------|------------|-------|---------------|
| **Qualsiasi frontend** | Playwright MCP | Test E2E, browser automation | `claude mcp add --transport stdio playwright -- npx -y @anthropic-ai/mcp-server-playwright` |
| **Qualsiasi frontend** | Figma MCP | Design → codice | `claude mcp add --transport http figma https://mcp.figma.com/mcp` |
| **Next.js / Vercel** | Vercel Plugin | Deploy & preview | `/plugin install vercel@claude-plugins-official` |
| **Firebase hosting** | Firebase Plugin | Backend & hosting | `/plugin install firebase@claude-plugins-official` |

**Regola**: Playwright è sempre utile per frontend. Figma solo se il team usa Figma.

---

### BACKEND API

Raccomanda se il progetto ha endpoint API:

| Indicatore | MCP/Plugin | Scopo | Installazione |
|------------|------------|-------|---------------|
| **Qualsiasi API** | Postman MCP | Test API, collections | `claude mcp add --transport http postman https://mcp.postman.com/mcp` |
| **Pagamenti (Stripe)** | Stripe MCP | Gestione pagamenti | `claude mcp add --transport http stripe https://mcp.stripe.com/mcp` |
| **Error tracking** | Sentry Plugin | Monitoring errori | `/plugin install sentry@claude-plugins-official` |
| **Auth0** | Auth0 MCP | Autenticazione | Verifica su smithery.ai per l'ultima versione |
| **Supabase** | Supabase Plugin | Auth + DB + Storage | `/plugin install supabase@claude-plugins-official` |

---

### MOBILE

Raccomanda se il progetto è un'app mobile:

| Framework | MCP/Plugin | Scopo |
|-----------|------------|-------|
| **React Native / Expo** | Firebase Plugin | Backend mobile |
| **React Native / Expo** | Sentry Plugin | Crash reporting |
| **Flutter** | Firebase Plugin | Backend mobile |
| **Qualsiasi mobile** | Figma MCP | Design → codice |

---

### DEVOPS e INFRASTRUTTURA

Raccomanda in base a file di configurazione infrastruttura:

| Indicatore | MCP/Plugin | Scopo | Installazione |
|------------|------------|-------|---------------|
| **Dockerfile** | Docker MCP | Container management | `claude mcp add --transport stdio docker -- npx -y docker-mcp-server` |
| **Kubernetes (k8s)** | Kubernetes MCP | Cluster management | `claude mcp add --transport stdio k8s -- npx -y @containers/kubernetes-mcp-server` |
| **AWS (CDK, SAM, etc.)** | AWS API MCP | Servizi AWS | Verifica su registry.modelcontextprotocol.io |
| **Terraform** | Nessun MCP specifico | Suggerisci skill custom |
| **Datadog config** | Datadog MCP | Monitoring | `claude mcp add --transport stdio datadog -- npx -y @shelfio/datadog-mcp` |

---

### AI / ML

Raccomanda se il progetto usa AI/ML:

| Indicatore | MCP/Plugin | Scopo |
|------------|------------|-------|
| **torch, tensorflow, transformers** | Hugging Face MCP | Modelli & datasets |
| **langchain, llama-index** | Sequential Thinking | Ragionamento strutturato |
| **Qualsiasi progetto AI** | Memory MCP | Memoria persistente per agenti |

---

### LANGUAGE SERVER (LSP)

Raccomanda SEMPRE il Language Server appropriato:

| Linguaggio | Plugin LSP |
|------------|-----------|
| **TypeScript/JavaScript** | `/plugin install typescript-lsp@claude-plugins-official` |
| **Python** | `/plugin install pyright@claude-plugins-official` |
| **Rust** | `/plugin install rust-analyzer@claude-plugins-official` |
| **Go** | `/plugin install gopls@claude-plugins-official` |
| **Java** | `/plugin install jdtls@claude-plugins-official` |
| **C/C++** | `/plugin install clangd@claude-plugins-official` |
| **Swift** | `/plugin install swift-lsp@claude-plugins-official` |
| **PHP** | `/plugin install php-lsp@claude-plugins-official` |
| **Kotlin** | `/plugin install kotlin-lsp@claude-plugins-official` |
| **C#** | `/plugin install csharp-ls@claude-plugins-official` |

**Regola**: Raccomanda SEMPRE il LSP per il linguaggio principale del progetto.

---

### COMUNICAZIONE TEAM

Raccomanda solo se ci sono indicatori espliciti di uso team:

| Indicatore | Plugin | Installazione |
|------------|--------|---------------|
| **Slack webhook/config** | Slack Plugin | `/plugin install slack@claude-plugins-official` |
| **CONTRIBUTING.md, team docs** | Commit Commands | `/plugin install commit-commands@claude-plugins-official` |
| **PR templates** | PR Review Toolkit | `/plugin install pr-review-toolkit@claude-plugins-official` |

---

## Regole di Selezione

### Sempre Raccomandare
1. **LSP** per il linguaggio principale — intelligenza di codice fondamentale
2. **GitHub plugin** — quasi tutti i progetti usano Git
3. **Commit Commands** — workflow Git migliori per tutti

### Raccomandare se Rilevato
4. **Database MCP** — se qualsiasi database è nel progetto
5. **Playwright** — se frontend web
6. **Sentry** — se presente nelle dipendenze o se il progetto è in produzione
7. **Docker MCP** — se Dockerfile presente

### Raccomandare con Nota
8. **Figma** — "Se il team usa Figma per il design"
9. **Slack** — "Se il team usa Slack per la comunicazione"
10. **Postman** — "Se il team usa Postman per testare le API"

### Mai Raccomandare Senza Indicatori
- Non suggerire MCP per servizi non presenti nel progetto
- Meglio pochi e utili che troppi e confusionari

---

## Marketplace e Skill Esterni

### wshobson/agents — Marketplace Community (plugin individuali)

**Condizione**: NON raccomandare come voce unica. Estrarre i plugin individuali e valutarli singolarmente.

#### Flusso di selezione

1. **Fetch catalogo**: Usa WebFetch per leggere il README del marketplace:
   ```
   WebFetch: "https://raw.githubusercontent.com/wshobson/agents/main/README.md"
   ```
2. **Estrai lista plugin**: Dal README, estrai ogni plugin con nome e descrizione breve
3. **Valuta rilevanza**: Per ciascun plugin, valuta la pertinenza rispetto al profilo progetto (tech stack, architettura, lacune rilevate)
4. **Filtra**: Passa alla Fase 3 solo i plugin pertinenti, come voci individuali nella lista componenti
5. **Prerequisito automatico**: Il marketplace (`/plugin marketplace add wshobson/agents`) viene aggiunto automaticamente nello script `provision-install.sh` **solo se almeno 1 plugin è selezionato** dall'utente. Non è una voce nella lista.

#### Mapping tipo-progetto → plugin suggeriti

| Indicatore nel progetto | Plugin | Scopo |
|--------------------------|--------|-------|
| **Python (pyproject.toml, requirements.txt)** | `python-development` | Sviluppo Python con linting, testing, packaging |
| **Kubernetes (k8s manifests, helm)** | `kubernetes-operations` | Orchestrazione cluster K8s |
| **Full-stack (frontend + backend)** | `full-stack-orchestration` | Orchestrazione full-stack |
| **Assenza code review CI/CD** | `agent-teams` | Code review multi-agente |
| **Lacune sicurezza rilevate** | `security-hardening` | Security audit automatico |
| **DevOps (CI/CD, Docker)** | `devops-automation` | Automazione DevOps |
| **Data/ML (pandas, numpy, torch)** | `data-science` | Pipeline dati e ML |
| **API development** | `api-development` | Sviluppo e test API |
| **Debugging complesso** | `advanced-debugging` | Debug avanzato multi-layer |
| **Documentazione carente** | `documentation-generator` | Generazione docs automatica |

**Nota**: La tabella sopra è un mapping indicativo. Il fetch live dal README potrebbe rivelare plugin aggiuntivi non in tabella — valutarli comunque contro il profilo progetto.

#### Formato nella lista componenti (Fase 3)

Ogni plugin rilevante appare come voce individuale:
```
  [x]  N. Plugin: agent-teams (wshobson/agents) — Code review multi-agente
         Motivazione: Nessun CI/CD code review. Plugin fornisce review strutturata.
  [x]  N. Plugin: security-hardening (wshobson/agents) — Security audit automatico
         Motivazione: Lacune sicurezza rilevate (CORS, rate limiting assenti).
  [ ]  N. Plugin: full-stack-orchestration (wshobson/agents) — Orchestrazione full-stack
         Nota: Utile se il progetto cresce verso architettura multi-layer.
```

#### Installazione (in provision-install.sh)

Se almeno 1 plugin è selezionato, lo script include:
```bash
# --- Marketplace wshobson/agents (prerequisito per plugin selezionati) ---
claude /plugin marketplace add wshobson/agents && echo "  ✓ marketplace wshobson/agents" || echo "  ✗ marketplace wshobson/agents"
```

E nella sezione post-riavvio:
```bash
echo "  /plugin install agent-teams@wshobson-agents"
echo "  /plugin install security-hardening@wshobson-agents"
```

---

### obra/superpowers — Skill di Sviluppo Avanzate
**Condizione**: Raccomandare SEMPRE per progetti software.

#### systematic-debugging
Metodologia strutturata per il debugging: root cause analysis obbligatoria prima di qualsiasi fix. Quattro fasi: investigazione, analisi pattern, ipotesi e test, implementazione.

**Installazione**: Copiare la skill dal repository
```bash
# Clona e copia la skill
git clone --depth 1 --filter=blob:none --sparse https://github.com/obra/superpowers.git /tmp/superpowers
cd /tmp/superpowers && git sparse-checkout set skills/systematic-debugging
cp -r skills/systematic-debugging .claude/skills/
rm -rf /tmp/superpowers
```

#### using-git-worktrees
Crea workspace git isolati per sviluppo concorrente su branch multipli. Gestisce directory, verifica safety, setup automatico per tipo progetto (Node, Rust, Python, Go).

**Installazione**: Come sopra ma con `skills/using-git-worktrees`
```bash
git clone --depth 1 --filter=blob:none --sparse https://github.com/obra/superpowers.git /tmp/superpowers
cd /tmp/superpowers && git sparse-checkout set skills/using-git-worktrees
cp -r skills/using-git-worktrees .claude/skills/
rm -rf /tmp/superpowers
```

---

### vercel-labs/agent-browser — Automazione Browser per AI
**Condizione**: Raccomandare per progetti web (frontend o full-stack).

Skill CLI per automazione browser: navigazione, compilazione form, click, estrazione dati, screenshot, testing web. Supporta multi-sessione, persistenza stato, mobile testing.

**Installazione**:
```bash
git clone --depth 1 --filter=blob:none --sparse https://github.com/vercel-labs/agent-browser.git /tmp/agent-browser
cd /tmp/agent-browser && git sparse-checkout set skills/agent-browser
cp -r skills/agent-browser .claude/skills/
rm -rf /tmp/agent-browser
```

---

## Regole di Selezione Skill Esterni

Nella lista interattiva, presenta le skill esterne e i plugin marketplace come voci individuali nella lista piatta (non come categorie separate). Ogni voce indica la fonte tra parentesi.

```
SKILL E PLUGIN COMMUNITY:
  [x] N. systematic-debugging (obra/superpowers) — Debug con root cause analysis
  [x] N. git-worktrees (obra/superpowers) — Workspace git isolati per sviluppo parallelo
  [ ] N. agent-browser (vercel-labs) — Automazione browser per web testing

PLUGIN MARKETPLACE (wshobson/agents):
  [x] N. Plugin: python-development (wshobson/agents) — Sviluppo Python con linting, testing, packaging
  [x] N. Plugin: agent-teams (wshobson/agents) — Code review multi-agente
  [ ] N. Plugin: kubernetes-operations (wshobson/agents) — Orchestrazione cluster K8s
```

**Pre-selezione**:
- `systematic-debugging`: SEMPRE pre-selezionato (utile per qualsiasi progetto)
- `git-worktrees`: Pre-selezionato se il progetto usa Git
- `agent-browser`: Pre-selezionato SOLO se progetto web
- **Plugin wshobson/agents**: Pre-selezione basata sull'analisi del profilo progetto — solo quelli pertinenti al tech stack e alle lacune rilevate

**Nota marketplace**: Il marketplace `wshobson/agents` NON è una voce selezionabile nella lista. È un prerequisito automatico: se l'utente seleziona almeno 1 plugin da wshobson/agents, il marketplace viene aggiunto automaticamente nello script `provision-install.sh` prima dei singoli plugin.

---

## Formato Output per il Piano

Quando presenti le raccomandazioni MCP/Plugin all'utente, usa questo formato:

```
MCP SERVER, PLUGIN E ESTENSIONI:
---------------------------------
Seleziona quelli che vuoi installare. Rimuovi i numeri che non ti servono.

ESSENZIALI (pre-selezionati):
  [x] 1. [LSP] [linguaggio] — Intelligenza di codice
  [x] 2. [GitHub] — Version control
  [x] 3. [Database] [tipo DB] — Database management

CONSIGLIATI (pre-selezionati):
  [x] 4. [nome] — [scopo]
  [x] 5. [nome] — [scopo]

OPZIONALI (non selezionati):
  [ ] 6. [nome] — [scopo] (se usate [servizio])
  [ ] 7. [nome] — [scopo] (se usate [servizio])

Indica i numeri da RIMUOVERE o AGGIUNGERE, oppure premi invio per confermare.
```

Dopo la conferma dell'utente, procedi con l'installazione automatica.

---

## Installazione Automatica

Dopo che l'utente ha confermato la selezione, installa TUTTO automaticamente:

### Plugin (dal marketplace ufficiale)
Esegui via Bash:
```bash
claude mcp add --transport http <nome> <url>
```
oppure usa il comando di installazione plugin appropriato.

### MCP Server Stdio (locali)
Genera il file `.mcp.json` nella root del progetto con tutti i server selezionati:
```json
{
  "mcpServers": {
    "server1": {
      "type": "stdio",
      "command": "npx",
      "args": ["-y", "@pacchetto/server"],
      "env": { "VAR": "${VAR}" }
    }
  }
}
```

### MCP Server HTTP (remoti)
Esegui via Bash:
```bash
claude mcp add --transport http <nome> <url>
```

### Gestione Credenziali
- Le credenziali devono usare variabili d'ambiente `${VAR}`, **mai valori hardcoded**
- Se un server richiede credenziali, installalo comunque e segnala nel report finale quali variabili d'ambiente configurare
- Non chiedere credenziali all'utente durante l'installazione — installa e basta

### Gestione Errori
- Se un'installazione fallisce, segnala l'errore e **prosegui con le successive**
- Non interrompere il flusso per un singolo errore
- Raccogli tutti gli errori e riportali nel report finale
