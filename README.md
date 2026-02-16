# Claude Auto-Provisioning

Analizza qualsiasi progetto e genera automaticamente la configurazione completa per Claude Code: `CLAUDE.md`, hook, skill, MCP server e plugin.

## Installazione

Esegui il comando nella **root del progetto** che vuoi configurare:

```bash
npx github:IlBig/Claude-Auto-Provisioning
```

L'installer interattivo:

1. Installa le skill `/auto-provision` e `/auto-provision-need` in `.claude/skills/`
2. Propone l'installazione opzionale di [BMAD Method](https://github.com/bmadcode/BMAD-METHOD) (framework AI-Driven Development)

## Uso

Dopo l'installazione, avvia Claude Code ed esegui:

```bash
claude                                        # Avvia Claude Code
/auto-provision                               # Analisi completa e configurazione
/auto-provision --force                       # Salta la conferma
/auto-provision-need "linter per TypeScript"  # Installa componenti specifici on-demand
```

### `/auto-provision`

Esegue un'analisi completa del progetto su 11 dimensioni (tech stack, sicurezza, qualità codice, prestazioni, UX, prodotto) e genera tutta la configurazione:

| Artefatto | Descrizione |
|-----------|-------------|
| `CLAUDE.md` | Regole, convenzioni, architettura, comandi |
| `.claude/settings.json` | Hook auto-format, lint, sicurezza |
| `.claude/skills/` | Skill su misura (write-test, debug, refactor, etc.) |
| `.mcp.json` | MCP server configurati |
| Plugin & marketplace | Installati automaticamente |

### `/auto-provision-need`

Cerca e installa componenti specifici per un'esigenza descritta in linguaggio naturale, senza eseguire il provisioning completo. Utile per aggiungere singoli strumenti al volo.

## Linguaggi Supportati

JavaScript/TypeScript, Python, Rust, Go, Java/Kotlin, Ruby, PHP, C#/.NET, Swift, Elixir — con rilevamento automatico di 50+ framework e 20+ tool.

## Esempi

### Progetto Next.js + Prisma + PostgreSQL

| Artefatto | Contenuto |
|-----------|-----------|
| `CLAUDE.md` | App Router patterns, Prisma schema conventions, API routes |
| Hook | Prettier auto-format, ESLint fix |
| Skill | `/create-component`, `/add-page`, `/write-test`, `/add-model` |
| MCP | DBHub (PostgreSQL), Playwright (E2E) |

### Progetto Python FastAPI + SQLAlchemy

| Artefatto | Contenuto |
|-----------|-----------|
| `CLAUDE.md` | Pydantic models, dependency injection, alembic migrations |
| Hook | Ruff format + lint |
| Skill | `/add-endpoint`, `/write-test`, `/add-model`, `/debug` |
| MCP | DBHub (PostgreSQL/SQLite), Postman |

### Progetto Rust Axum

| Artefatto | Contenuto |
|-----------|-----------|
| `CLAUDE.md` | Error handling patterns, module structure, cargo workspace |
| Hook | rustfmt auto-format |
| Skill | `/write-test`, `/add-endpoint`, `/refactor`, `/debug` |
| MCP | DBHub (se database presente) |

## Note

- **Non sovrascrive** file esistenti — fa merge intelligente
- **Ogni raccomandazione è motivata** dall'analisi del progetto
- Richiede **Node.js >= 18**

## Licenza

MIT
