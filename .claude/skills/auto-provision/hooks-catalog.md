# Catalogo Hook — Auto-Provision

Questo catalogo contiene gli hook Claude Code raccomandati per ogni tech stack. Seleziona SOLO gli hook pertinenti al progetto analizzato.

## Formato Hook in settings.json

```json
{
  "hooks": {
    "[EventName]": [
      {
        "matcher": "[ToolPattern]",
        "hooks": [
          {
            "type": "command",
            "command": "[comando shell]"
          }
        ]
      }
    ]
  }
}
```

## Eventi Hook Disponibili

| Evento | Quando scatta | Uso tipico |
|--------|---------------|------------|
| `PreToolUse` | Prima dell'esecuzione di un tool | Validazione, blocco operazioni |
| `PostToolUse` | Dopo l'esecuzione di un tool | Auto-format, lint, notifiche |
| `SessionStart` | All'avvio della sessione | Setup ambiente |
| `Stop` | Quando Claude finisce di rispondere | Validazione finale |
| `Notification` | Quando Claude ha bisogno di attenzione | Alert sonori/visivi |

---

## Hook per Linguaggio e Tool

### JavaScript / TypeScript

#### Prettier (Formattazione automatica)
**Condizione**: Progetto ha `.prettierrc*` OPPURE `prettier` in devDependencies
```json
{
  "matcher": "Edit|Write",
  "hooks": [
    {
      "type": "command",
      "command": "jq -r '.tool_input.file_path // .tool_input.file_path' | grep -E '\\.(js|jsx|ts|tsx|json|css|scss|html|md|yaml|yml)$' | xargs -I{} npx prettier --write '{}' 2>/dev/null || true"
    }
  ]
}
```

#### Biome (Formattazione + Linting)
**Condizione**: Progetto ha `biome.json` OPPURE `@biomejs/biome` in devDependencies
```json
{
  "matcher": "Edit|Write",
  "hooks": [
    {
      "type": "command",
      "command": "jq -r '.tool_input.file_path' | grep -E '\\.(js|jsx|ts|tsx|json|css)$' | xargs -I{} npx biome check --write '{}' 2>/dev/null || true"
    }
  ]
}
```

#### ESLint (Linting con auto-fix)
**Condizione**: Progetto ha `.eslintrc*` o `eslint.config.*` OPPURE `eslint` in devDependencies
```json
{
  "matcher": "Edit|Write",
  "hooks": [
    {
      "type": "command",
      "command": "jq -r '.tool_input.file_path' | grep -E '\\.(js|jsx|ts|tsx)$' | xargs -I{} npx eslint --fix '{}' 2>/dev/null || true"
    }
  ]
}
```

#### dprint (Formatter veloce)
**Condizione**: Progetto ha `dprint.json`
```json
{
  "matcher": "Edit|Write",
  "hooks": [
    {
      "type": "command",
      "command": "jq -r '.tool_input.file_path' | xargs -I{} dprint fmt '{}' 2>/dev/null || true"
    }
  ]
}
```

---

### Python

#### Black (Formattazione)
**Condizione**: `black` in dipendenze dev o `[tool.black]` in pyproject.toml
```json
{
  "matcher": "Edit|Write",
  "hooks": [
    {
      "type": "command",
      "command": "jq -r '.tool_input.file_path' | grep -E '\\.py$' | xargs -I{} black '{}' 2>/dev/null || true"
    }
  ]
}
```

#### Ruff (Linting + Formattazione)
**Condizione**: `ruff` in dipendenze o `[tool.ruff]` in pyproject.toml
```json
{
  "matcher": "Edit|Write",
  "hooks": [
    {
      "type": "command",
      "command": "jq -r '.tool_input.file_path' | grep -E '\\.py$' | xargs -I{} sh -c 'ruff check --fix \"{}\" 2>/dev/null; ruff format \"{}\" 2>/dev/null' || true"
    }
  ]
}
```

#### isort (Ordinamento import)
**Condizione**: `isort` in dipendenze o `[tool.isort]` in pyproject.toml
```json
{
  "matcher": "Edit|Write",
  "hooks": [
    {
      "type": "command",
      "command": "jq -r '.tool_input.file_path' | grep -E '\\.py$' | xargs -I{} isort '{}' 2>/dev/null || true"
    }
  ]
}
```

---

### Rust

#### rustfmt (Formattazione)
**Condizione**: Sempre per progetti Rust
```json
{
  "matcher": "Edit|Write",
  "hooks": [
    {
      "type": "command",
      "command": "jq -r '.tool_input.file_path' | grep -E '\\.rs$' | xargs -I{} rustfmt '{}' 2>/dev/null || true"
    }
  ]
}
```

#### Clippy (Linting — solo su richiesta, potenzialmente lento)
**Nota**: Non raccomandato come hook PostToolUse perche troppo lento. Meglio come skill dedicata.

---

### Go

#### gofmt / goimports (Formattazione)
**Condizione**: Sempre per progetti Go
```json
{
  "matcher": "Edit|Write",
  "hooks": [
    {
      "type": "command",
      "command": "jq -r '.tool_input.file_path' | grep -E '\\.go$' | xargs -I{} goimports -w '{}' 2>/dev/null || jq -r '.tool_input.file_path' | grep -E '\\.go$' | xargs -I{} gofmt -w '{}' 2>/dev/null || true"
    }
  ]
}
```

---

### PHP

#### PHP-CS-Fixer (Formattazione)
**Condizione**: `php-cs-fixer` nel progetto
```json
{
  "matcher": "Edit|Write",
  "hooks": [
    {
      "type": "command",
      "command": "jq -r '.tool_input.file_path' | grep -E '\\.php$' | xargs -I{} php-cs-fixer fix '{}' --quiet 2>/dev/null || true"
    }
  ]
}
```

#### Pint (Laravel)
**Condizione**: Progetto Laravel con `laravel/pint`
```json
{
  "matcher": "Edit|Write",
  "hooks": [
    {
      "type": "command",
      "command": "jq -r '.tool_input.file_path' | grep -E '\\.php$' | xargs -I{} ./vendor/bin/pint '{}' --quiet 2>/dev/null || true"
    }
  ]
}
```

---

### Ruby

#### RuboCop (Linting + Formattazione)
**Condizione**: `rubocop` in Gemfile
```json
{
  "matcher": "Edit|Write",
  "hooks": [
    {
      "type": "command",
      "command": "jq -r '.tool_input.file_path' | grep -E '\\.rb$' | xargs -I{} rubocop -a '{}' 2>/dev/null || true"
    }
  ]
}
```

---

### C# / .NET

#### dotnet format
**Condizione**: Sempre per progetti .NET
```json
{
  "matcher": "Edit|Write",
  "hooks": [
    {
      "type": "command",
      "command": "jq -r '.tool_input.file_path' | grep -E '\\.cs$' | xargs -I{} dotnet format --include '{}' 2>/dev/null || true"
    }
  ]
}
```

---

### Java / Kotlin

#### google-java-format
**Condizione**: Progetto usa google-java-format
```json
{
  "matcher": "Edit|Write",
  "hooks": [
    {
      "type": "command",
      "command": "jq -r '.tool_input.file_path' | grep -E '\\.java$' | xargs -I{} google-java-format --replace '{}' 2>/dev/null || true"
    }
  ]
}
```

#### ktlint (Kotlin)
**Condizione**: Progetto Kotlin con ktlint
```json
{
  "matcher": "Edit|Write",
  "hooks": [
    {
      "type": "command",
      "command": "jq -r '.tool_input.file_path' | grep -E '\\.kt$' | xargs -I{} ktlint --format '{}' 2>/dev/null || true"
    }
  ]
}
```

---

### Swift

#### swift-format
**Condizione**: Sempre per progetti Swift
```json
{
  "matcher": "Edit|Write",
  "hooks": [
    {
      "type": "command",
      "command": "jq -r '.tool_input.file_path' | grep -E '\\.swift$' | xargs -I{} swift-format format --in-place '{}' 2>/dev/null || true"
    }
  ]
}
```

---

## Hook Universali (indipendenti dal linguaggio)

### Notifica Sonora al Completamento
**Condizione**: Sempre raccomandato su macOS
```json
{
  "event": "Notification",
  "hooks": [
    {
      "type": "command",
      "command": "afplay /System/Library/Sounds/Blow.aiff 2>/dev/null || true"
    }
  ]
}
```

### Notifica Sonora Stop (Claude ha finito)
**Condizione**: Opzionale, utile per task lunghi
```json
{
  "event": "Stop",
  "hooks": [
    {
      "type": "command",
      "command": "afplay /System/Library/Sounds/Glass.aiff 2>/dev/null || true"
    }
  ]
}
```

---

## Regole di Selezione Hook

1. **Seleziona UN SOLO formatter** per linguaggio — non combinare prettier + biome
2. **Preferisci il formatter gia configurato** nel progetto (guarda config file esistenti)
3. **Se nessun formatter configurato**, suggerisci quello standard per il linguaggio
4. **Non aggiungere linter come hook** se sono troppo lenti (>2 secondi) — suggerisci skill invece
5. **Hook universali**: notifica sonora è sempre un buon default su macOS
6. **Tutti gli hook devono terminare con `|| true`** per non bloccare il flusso in caso di errore
7. **Usa `2>/dev/null`** per sopprimere output di errore non rilevante

## Composizione settings.json Finale

Quando generi il file `.claude/settings.json`, strutturalo così:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "[formatter command]"
          }
        ]
      }
    ],
    "Notification": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "[notification command]"
          }
        ]
      }
    ]
  }
}
```
