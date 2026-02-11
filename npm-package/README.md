# claude-auto-provision

Analizza qualsiasi progetto e genera automaticamente la configurazione completa per Claude Code.

## Installazione

```bash
# Con npx (esegui e installa in un colpo)
npx claude-auto-provision

# Oppure con npm
npm exec claude-auto-provision
```

Esegui il comando **nella root del progetto** che vuoi configurare.

## Cosa Fa

Installa la skill `/auto-provision` nel tuo progetto. Quando invocata in Claude Code:

1. **Analizza** il progetto su 11 dimensioni: tech stack, sicurezza, qualità codice, prestazioni, UX, prodotto
2. **Cerca** componenti aggiornati dai marketplace live (MCP Registry, Smithery, wshobson/agents, etc.)
3. **Presenta** un piano con lista selezionabile di MCP server, plugin, skill, hook, moduli BMAD
4. **Installa automaticamente** tutto ciò che selezioni

## Uso

Dopo l'installazione:

```bash
claude                    # Avvia Claude Code
/auto-provision           # Lancia l'analisi
/auto-provision --force   # Salta conferma
```

## Cosa Viene Generato

| Artefatto | Descrizione |
|-----------|-------------|
| `CLAUDE.md` | Regole, convenzioni, architettura, comandi |
| `.claude/settings.json` | Hook auto-format, lint, sicurezza |
| `.claude/skills/` | Skill su misura (write-test, debug, refactor, etc.) |
| `.mcp.json` | MCP server configurati |
| Plugin & marketplace | Installati automaticamente |

## Linguaggi Supportati

JavaScript/TypeScript, Python, Rust, Go, Java/Kotlin, Ruby, PHP, C#/.NET, Swift, Elixir — con 50+ framework e 20+ tool.

## Note

- **Non installa BMAD** — per il metodo BMAD usa `npx bmad-method install`
- **Non sovrascrive** file esistenti — fa merge intelligente
- **Ogni raccomandazione è motivata** dall'analisi del progetto

## License

MIT
