# Guida Analisi Progetto — Auto-Provision

Questa guida fornisce istruzioni dettagliate per analizzare qualsiasi progetto software e costruire un profilo completo.

## Strategia di Rilevamento Tech Stack

### Priorità di Rilevamento

Segui quest'ordine per identificare il linguaggio principale:

| Priorità | File | Linguaggio |
|----------|------|------------|
| 1 | `package.json` | JavaScript/TypeScript |
| 1 | `Cargo.toml` | Rust |
| 1 | `pyproject.toml`, `setup.py` | Python |
| 1 | `go.mod` | Go |
| 1 | `pom.xml`, `build.gradle` | Java/Kotlin |
| 1 | `Gemfile` | Ruby |
| 1 | `composer.json` | PHP |
| 1 | `*.csproj`, `*.sln` | C#/.NET |
| 1 | `Package.swift` | Swift |
| 1 | `mix.exs` | Elixir |
| 2 | `deno.json` | TypeScript (Deno) |
| 3 | Estensioni file prevalenti | Fallback |

### Rilevamento Framework (per linguaggio)

#### JavaScript/TypeScript
Leggi `package.json` → campo `dependencies` e `devDependencies`:

| Dipendenza | Framework |
|------------|-----------|
| `react`, `react-dom` | React |
| `next` | Next.js |
| `vue` | Vue.js |
| `nuxt` | Nuxt |
| `@angular/core` | Angular |
| `svelte` | Svelte |
| `@sveltejs/kit` | SvelteKit |
| `express` | Express.js |
| `fastify` | Fastify |
| `hono` | Hono |
| `@nestjs/core` | NestJS |
| `astro` | Astro |
| `gatsby` | Gatsby |
| `remix`, `@remix-run/*` | Remix |
| `electron` | Electron |
| `react-native` | React Native |
| `expo` | Expo (React Native) |
| `tauri`, `@tauri-apps/*` | Tauri |

#### Python
Leggi `pyproject.toml` o `requirements.txt`:

| Dipendenza | Framework |
|------------|-----------|
| `django` | Django |
| `flask` | Flask |
| `fastapi` | FastAPI |
| `starlette` | Starlette |
| `tornado` | Tornado |
| `aiohttp` | aiohttp |
| `celery` | Celery (task queue) |
| `sqlalchemy` | SQLAlchemy (ORM) |
| `pydantic` | Pydantic (validazione) |
| `pytest` | pytest (testing) |
| `numpy`, `pandas` | Data Science |
| `torch`, `tensorflow` | Machine Learning |
| `langchain`, `llama-index` | AI/LLM |

#### Rust
Leggi `Cargo.toml` → `[dependencies]`:

| Dipendenza | Framework |
|------------|-----------|
| `actix-web` | Actix Web |
| `axum` | Axum |
| `rocket` | Rocket |
| `warp` | Warp |
| `tokio` | Tokio (async runtime) |
| `serde` | Serde (serializzazione) |
| `diesel` | Diesel (ORM) |
| `sqlx` | SQLx (database) |
| `tauri` | Tauri |
| `bevy` | Bevy (game engine) |

#### Go
Leggi `go.mod` → `require`:

| Dipendenza | Framework |
|------------|-----------|
| `github.com/gin-gonic/gin` | Gin |
| `github.com/labstack/echo` | Echo |
| `github.com/gofiber/fiber` | Fiber |
| `github.com/gorilla/mux` | Gorilla Mux |
| `google.golang.org/grpc` | gRPC |
| `github.com/spf13/cobra` | Cobra (CLI) |
| `gorm.io/gorm` | GORM (ORM) |

---

## Pattern Architetturali da Rilevare

### Struttura Directory → Pattern

| Struttura | Pattern Probabile |
|-----------|-------------------|
| `packages/`, `apps/`, radice con workspaces | **Monorepo** |
| `services/`, `microservices/` | **Microservizi** |
| `src/controllers/`, `src/models/`, `src/views/` | **MVC** |
| `src/components/`, `src/pages/` | **Component-based (SPA)** |
| `src/features/`, `src/modules/` | **Feature-based / Domain-driven** |
| `src/domain/`, `src/application/`, `src/infrastructure/` | **Clean Architecture / Hexagonal** |
| `cmd/`, `internal/`, `pkg/` | **Go Standard Layout** |
| `src/lib.rs`, `src/bin/` | **Rust Standard Layout** |
| `app/`, `config/`, `db/`, `lib/` | **Rails Convention** |

### Rilevamento Monorepo
Cerca indicatori di monorepo:
- `package.json` → campo `workspaces`
- `pnpm-workspace.yaml`
- `lerna.json`
- `nx.json`
- `turbo.json`
- Multipli `package.json` in sottodirectory

### Rilevamento Database
Cerca:
- Directory `migrations/`, `db/migrate/`, `prisma/`, `drizzle/`
- File: `prisma/schema.prisma`, `drizzle.config.*`, `knexfile.*`
- Dipendenze: `prisma`, `drizzle-orm`, `typeorm`, `sequelize`, `mongoose`, `sqlalchemy`, `diesel`

---

## Convenzioni di Codifica da Rilevare

### Naming Convention
Campiona 3-5 file sorgente e analizza:

| Elemento | Cosa cercare |
|----------|-------------|
| **Variabili** | `camelCase`, `snake_case`, `SCREAMING_SNAKE` |
| **Funzioni** | `camelCase`, `snake_case`, `PascalCase` |
| **Classi/Tipi** | `PascalCase`, `snake_case` |
| **File** | `kebab-case`, `camelCase`, `PascalCase`, `snake_case` |
| **Costanti** | `SCREAMING_SNAKE`, `camelCase` |
| **Directory** | `kebab-case`, `camelCase`, `PascalCase` |

### Stile Import
Cerca pattern di import prevalente:
- ES Modules: `import { x } from 'y'`
- CommonJS: `const x = require('y')`
- Path alias: `@/components/`, `~/utils/`
- Barrel exports: `index.ts` che ri-esporta

### Gestione Errori
Identifica il pattern prevalente:
- Try/catch con classi errore custom
- Result/Option types (Rust-style)
- Error boundaries (React)
- Middleware di error handling (Express/Fastify)
- Pattern Either/Left/Right (FP)

### Pattern di Test
Identifica:
- Posizione test: co-located (`*.test.ts` accanto al sorgente) vs separati (`test/`, `tests/`)
- Naming: `*.test.*`, `*.spec.*`, `test_*.py`, `*_test.go`
- Pattern: Arrange-Act-Assert, Given-When-Then, table-driven tests
- Mocking: jest.mock, unittest.mock, mockito, testify/mock
- Fixtures: conftest.py, beforeEach, test helpers

---

## Rilevamento Comandi Progetto

### Da package.json (Node.js)
Leggi campo `scripts`:
- `dev` / `start` → comando di avvio sviluppo
- `build` → comando di build
- `test` → comando test
- `lint` → comando lint
- `format` → comando formattazione
- `typecheck` / `tsc` → type checking

### Da Makefile
Cerca target principali: `build`, `test`, `run`, `clean`, `lint`, `docker`

### Da Cargo.toml (Rust)
- `cargo build` / `cargo run` / `cargo test` / `cargo clippy` / `cargo fmt`

### Da pyproject.toml (Python)
Leggi `[project.scripts]` e `[tool.pytest]`, `[tool.ruff]`, `[tool.black]`, `[tool.mypy]`

### Da go.mod (Go)
- `go build ./...` / `go test ./...` / `golangci-lint run`

---

## Valutazione Stato Progetto

| Indicatore | Stato |
|------------|-------|
| Pochi file, no test, README minimo | **Nuovo / Prototipo** |
| Struttura definita, alcuni test, documentazione base | **In sviluppo attivo** |
| Test completi, CI/CD, documentazione, versionamento | **Maturo** |
| Dipendenze obsolete, pochi commit recenti | **Manutenzione / Legacy** |
