# Auto-Provision Plugin per Claude Code

Analizza qualsiasi progetto e genera automaticamente la configurazione completa per lavorare al meglio con Claude Code.

## Cosa Fa

Quando invochi `/auto-provision` su un progetto, il plugin:

1. **Analizza** il progetto: tech stack, framework, struttura, convenzioni, pattern
2. **Presenta** un piano dettagliato di configurazione
3. **Genera** (dopo conferma):
   - `CLAUDE.md` — regole di codifica, comandi, architettura
   - `.claude/settings.json` — hook di auto-formattazione e notifiche
   - `.claude/skills/` — skill su misura (write-test, create-component, add-endpoint, etc.)
   - `.mcp.json` — MCP server configurati (database, browser automation, etc.)
   - Comandi pronti per installare plugin e MCP server raccomandati

## Linguaggi Supportati

JavaScript/TypeScript, Python, Rust, Go, Java/Kotlin, Ruby, PHP, C#/.NET, Swift, Elixir — con rilevamento automatico di 50+ framework e 20+ tool.

## Installazione

### Opzione 1: Come Plugin (distribuibile)

```bash
# Aggiungi il marketplace
/plugin marketplace add [tuo-username]/auto-provision-plugin

# Installa il plugin
/plugin install auto-provision@[tuo-username]-auto-provision-plugin
```

### Opzione 2: Come Skill Locale (per singolo progetto)

Copia la cartella `skills/auto-provision/` nella directory `.claude/skills/` del tuo progetto:

```bash
cp -r skills/auto-provision/ /path/to/your-project/.claude/skills/auto-provision/
```

## Uso

```bash
# Avvia Claude Code nel tuo progetto
claude

# Invoca auto-provision
/auto-provision

# Modalita force (salta conferma)
/auto-provision --force
```

## Struttura del Plugin

```
auto-provision-plugin/
├── .claude-plugin/
│   ├── plugin.json           # Manifest del plugin
│   └── marketplace.json      # Per distribuzione via marketplace
├── skills/
│   └── auto-provision/
│       ├── SKILL.md              # Entry point del comando
│       ├── analysis-guide.md     # Guida analisi progetto
│       ├── hooks-catalog.md      # Catalogo hook per linguaggio
│       ├── skills-catalog.md     # Catalogo skill generabili
│       ├── claude-md-guide.md    # Guida generazione CLAUDE.md
│       └── mcp-plugin-catalog.md # Catalogo MCP server e plugin
└── README.md
```

## Cosa Viene Generato (Esempi)

### Progetto Next.js + Prisma + PostgreSQL

| Artefatto | Contenuto |
|-----------|-----------|
| `CLAUDE.md` | App Router patterns, Prisma schema conventions, API routes structure |
| Hook | Prettier auto-format, ESLint fix |
| Skill | `/create-component`, `/add-page`, `/write-test`, `/add-model` |
| MCP | DBHub (PostgreSQL), Playwright (E2E test) |
| Plugin | TypeScript LSP, GitHub, Vercel |

### Progetto Python FastAPI + SQLAlchemy

| Artefatto | Contenuto |
|-----------|-----------|
| `CLAUDE.md` | Pydantic models, dependency injection, alembic migrations |
| Hook | Ruff format + lint |
| Skill | `/add-endpoint`, `/write-test`, `/add-model`, `/debug` |
| MCP | DBHub (PostgreSQL/SQLite), Postman |
| Plugin | Pyright LSP, GitHub, Sentry |

### Progetto Rust Axum

| Artefatto | Contenuto |
|-----------|-----------|
| `CLAUDE.md` | Error handling patterns, module structure, cargo workspace |
| Hook | rustfmt auto-format |
| Skill | `/write-test`, `/add-endpoint`, `/refactor`, `/debug` |
| MCP | DBHub (se database presente) |
| Plugin | rust-analyzer LSP, GitHub |

## Licenza

MIT
