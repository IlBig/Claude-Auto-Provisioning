# Catalogo Skill Generabili — Auto-Provision

Questo catalogo contiene le skill che possono essere generate automaticamente in base al tech stack del progetto. Ogni skill viene creata come `.claude/skills/[nome]/SKILL.md`.

Seleziona SOLO le skill pertinenti al progetto analizzato. Non generare skill inutili.

---

## Skill Universali (tutti i progetti)

### write-test
**Genera sempre** — Adatta al test framework rilevato.

```yaml
---
name: write-test
description: Genera test per un file o funzione specificata, seguendo le convenzioni di test del progetto
argument-hint: "[file-o-funzione]"
---
```

**Corpo della skill (adattare al framework rilevato):**

```markdown
Scrivi test per $ARGUMENTS seguendo le convenzioni di test di questo progetto.

## Istruzioni

1. Leggi il file/funzione target per comprendere il comportamento
2. Identifica i test esistenti nel progetto per copiare stile e pattern
3. Genera test che coprono:
   - Caso base / happy path
   - Casi limite (edge cases)
   - Gestione errori
   - Input non validi (se applicabile)
4. Usa il framework di test del progetto: [FRAMEWORK_TEST]
5. Posiziona il file test secondo la convenzione del progetto: [POSIZIONE_TEST]
6. Naming convention per i test: [NAMING_TEST]
7. Esegui i test per verificare che passino

## Convenzioni Test del Progetto
- Framework: [jest/vitest/pytest/cargo test/go test/etc.]
- Posizione: [co-located/directory separata]
- Pattern naming: [*.test.ts/*.spec.ts/test_*.py/*_test.go]
- Pattern: [Arrange-Act-Assert / Given-When-Then / table-driven]
```

---

### debug
**Genera sempre** — Utile per qualsiasi progetto.

```yaml
---
name: debug
description: Analizza e risolvi un bug o problema nel codice
argument-hint: "[descrizione-problema]"
---
```

**Corpo:**
```markdown
Analizza e risolvi il seguente problema: $ARGUMENTS

## Processo di Debug

1. **Comprendi il problema**: Analizza la descrizione e riproduci mentalmente il bug
2. **Localizza**: Usa Grep e Glob per trovare il codice rilevante
3. **Analizza**: Leggi il codice coinvolto e identifica la causa root
4. **Verifica**: Controlla se ci sono test che coprono questo caso
5. **Correggi**: Implementa la fix minima necessaria
6. **Testa**: Esegui i test esistenti per verificare che la fix funzioni e non introduca regressioni
7. **Riassumi**: Spiega cosa causava il bug e come è stato risolto
```

---

### refactor
**Genera sempre** — Utile per qualsiasi progetto.

```yaml
---
name: refactor
description: Refactoring mirato di un file o modulo mantenendo il comportamento
argument-hint: "[file-o-modulo]"
---
```

**Corpo:**
```markdown
Esegui un refactoring di $ARGUMENTS mantenendo invariato il comportamento esterno.

## Processo

1. Leggi il codice target e comprendi il comportamento attuale
2. Identifica i test esistenti (se non ci sono, scrivi test prima del refactoring)
3. Identifica code smell: duplicazione, funzioni troppo lunghe, naming poco chiaro, accoppiamento eccessivo
4. Proponi le modifiche all'utente con spiegazione del perché
5. Dopo conferma, implementa il refactoring
6. Esegui i test per verificare che il comportamento non sia cambiato
7. Riassumi le modifiche effettuate
```

---

## Skill per Framework Frontend

### create-component (React / Vue / Svelte / Angular)
**Condizione**: Framework frontend rilevato

**React:**
```yaml
---
name: create-component
description: Crea un nuovo componente React seguendo le convenzioni del progetto
argument-hint: "[NomeComponente]"
---
```

```markdown
Crea un nuovo componente React chiamato $ARGUMENTS.

## Istruzioni

1. Analizza i componenti esistenti in [DIRECTORY_COMPONENTI] per copiare stile e pattern
2. Crea il componente seguendo queste convenzioni del progetto:
   - Stile: [funzionale/classe] con [hooks/HOC]
   - Styling: [CSS Modules/Tailwind/styled-components/etc.]
   - Typing: [TypeScript interfaces/PropTypes/nessuno]
   - Exports: [default/named]
3. Struttura file:
   - [PATTERN_FILE]: es. `ComponentName/index.tsx` oppure `ComponentName.tsx`
   - [SE_TEST_CO-LOCATED]: `ComponentName.test.tsx`
   - [SE_STYLE_SEPARATO]: `ComponentName.module.css`
4. Il componente deve includere:
   - Props interface/type (se TypeScript)
   - Gestione stato base se necessario
   - Accessibility attributes base (aria-label, role)
```

**Vue:**
Analoga ma con template `.vue` (SFC), `<script setup>` se Vue 3, Composition API vs Options API.

**Svelte:**
Analoga ma con file `.svelte`, runes se Svelte 5, props con `$props()`.

---

### add-page (Next.js / Nuxt / SvelteKit / Remix)
**Condizione**: Framework SSR/SSG rilevato

```yaml
---
name: add-page
description: Crea una nuova pagina/route nel framework
argument-hint: "[/percorso-route]"
---
```

```markdown
Crea una nuova pagina per la route $ARGUMENTS.

## Istruzioni

1. Identifica il router del progetto: [file-based routing / configurazione esplicita]
2. Crea il file nella posizione corretta:
   - Next.js App Router: `app/$ARGUMENTS/page.tsx`
   - Next.js Pages: `pages/$ARGUMENTS.tsx`
   - Nuxt: `pages/$ARGUMENTS.vue`
   - SvelteKit: `src/routes/$ARGUMENTS/+page.svelte`
   - Remix: `app/routes/$ARGUMENTS.tsx`
3. Includi:
   - Componente pagina base
   - Metadata/head (title, description)
   - Loading state se applicabile
   - Error boundary se il framework lo supporta
4. Se la pagina necessita di dati, crea anche il loader/server function appropriato
```

---

## Skill per Framework Backend

### add-endpoint (Express / Fastify / NestJS / FastAPI / Django / Gin / Axum)
**Condizione**: Framework backend rilevato

```yaml
---
name: add-endpoint
description: Aggiungi un nuovo endpoint API al progetto
argument-hint: "[METHOD /percorso]"
---
```

```markdown
Aggiungi un nuovo endpoint API: $ARGUMENTS

## Istruzioni

1. Analizza gli endpoint esistenti per copiare pattern e struttura
2. Identifica:
   - Come sono organizzati i route (file singolo / per risorsa / per feature)
   - Middleware applicati (auth, validation, logging)
   - Pattern di response (envelope, status codes, error format)
   - Validazione input (zod, joi, pydantic, etc.)
3. Crea:
   - Handler/controller per l'endpoint
   - Schema di validazione input (se il progetto usa validazione)
   - Tipo/interface per request e response
   - Registra il route nel router appropriato
4. Genera test per l'endpoint
5. Aggiorna la documentazione API se presente (OpenAPI/Swagger)
```

---

### add-model / add-migration
**Condizione**: ORM/database rilevato (Prisma, Drizzle, SQLAlchemy, Diesel, GORM, etc.)

```yaml
---
name: add-model
description: Aggiungi un nuovo modello/entità al database con migrazione
argument-hint: "[NomeModello]"
---
```

```markdown
Crea un nuovo modello dati per $ARGUMENTS.

## Istruzioni

1. Analizza i modelli esistenti per copiare pattern e convenzioni
2. Chiedi all'utente i campi necessari (o deducili dal contesto)
3. Crea il modello seguendo l'ORM del progetto:
   - [Prisma]: Aggiungi al schema.prisma
   - [Drizzle]: Crea schema in src/db/schema/
   - [SQLAlchemy]: Crea model class
   - [Diesel]: Crea schema e model
   - [TypeORM]: Crea entity
4. Genera la migrazione:
   - [Prisma]: `npx prisma migrate dev --name add_[nome]`
   - [Drizzle]: `npx drizzle-kit generate`
   - [Alembic]: `alembic revision --autogenerate -m "add [nome]"`
   - [Diesel]: `diesel migration generate add_[nome]`
5. Crea tipi/interfacce associati se necessario
```

---

## Skill per Mobile

### create-screen (React Native / Expo / Flutter)
**Condizione**: Framework mobile rilevato

```yaml
---
name: create-screen
description: Crea una nuova schermata nell'app mobile
argument-hint: "[NomeSchermata]"
---
```

---

## Skill per Testing Avanzato

### test-coverage
**Condizione**: Progetto con test framework configurato

```yaml
---
name: test-coverage
description: Analizza la copertura test e suggerisci test mancanti
argument-hint: "[file-o-directory]"
---
```

```markdown
Analizza la copertura test per $ARGUMENTS.

## Istruzioni

1. Identifica tutti i file sorgente nella area target
2. Per ogni file, verifica se esiste un file test corrispondente
3. Per i file con test, analizza:
   - Funzioni/metodi non coperti da test
   - Branch non coperti
   - Edge case mancanti
4. Presenta un report:
   - File senza test
   - Funzioni senza test
   - Test suggeriti con priorita (alto/medio/basso)
5. Chiedi all'utente se generare i test mancanti
```

---

## Skill per DevOps / Infrastruttura

### docker-setup
**Condizione**: Progetto senza Dockerfile ma con necessita evidente (app web, API)

```yaml
---
name: docker-setup
description: Genera Dockerfile e docker-compose per il progetto
---
```

---

## Skill per Documentazione

### document-api
**Condizione**: Progetto con API endpoints

```yaml
---
name: document-api
description: Genera o aggiorna documentazione API (OpenAPI/Swagger)
argument-hint: "[file-o-directory-api]"
---
```

---

## Regole di Selezione Skill

1. **Genera SEMPRE**: `write-test`, `debug`, `refactor` — sono universali
2. **Genera SE framework frontend**: `create-component`, `add-page` (se SSR)
3. **Genera SE framework backend**: `add-endpoint`
4. **Genera SE database/ORM**: `add-model`
5. **Genera SE mobile**: `create-screen`
6. **Genera SE API**: `document-api`
7. **Non generare** skill per cose che il progetto non fa
8. **Adatta SEMPRE** il contenuto della skill alle convenzioni specifiche del progetto rilevate durante l'analisi
9. **Massimo 6-8 skill** per progetto — meglio poche e utili che tante e generiche
10. **Ogni skill deve referenziare** le convenzioni specifiche del progetto (naming, directory, pattern)

## Note sulla Generazione

Quando generi una skill, riempi TUTTI i placeholder `[...]` con le informazioni reali rilevate durante l'analisi del progetto. Non lasciare placeholder nel file finale.

Ogni skill generata deve essere **immediatamente utilizzabile** senza configurazione aggiuntiva.
