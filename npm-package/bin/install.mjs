#!/usr/bin/env node

import { existsSync, mkdirSync, cpSync, readdirSync } from "node:fs";
import { resolve, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(__dirname, "..");
const sourceDir = join(packageRoot, "skills", "auto-provision");
const targetBase = process.cwd();
const targetDir = join(targetBase, ".claude", "skills", "auto-provision");

const RESET = "\x1b[0m";
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const CYAN = "\x1b[36m";
const BOLD = "\x1b[1m";

console.log("");
console.log(`${BOLD}${CYAN}╔══════════════════════════════════════════╗${RESET}`);
console.log(`${BOLD}${CYAN}║     Claude Auto-Provision Installer      ║${RESET}`);
console.log(`${BOLD}${CYAN}╚══════════════════════════════════════════╝${RESET}`);
console.log("");

// Check if source files exist
if (!existsSync(sourceDir)) {
  console.error("Errore: file sorgente non trovati. Reinstalla il pacchetto.");
  process.exit(1);
}

// Check if already installed
if (existsSync(targetDir)) {
  const files = readdirSync(targetDir);
  if (files.length > 0) {
    console.log(`${YELLOW}Auto-provision è già installato in questo progetto.${RESET}`);
    console.log(`${YELLOW}Sovrascrittura dei file...${RESET}`);
    console.log("");
  }
}

// Create target directory
mkdirSync(targetDir, { recursive: true });

// Copy skill files
cpSync(sourceDir, targetDir, { recursive: true });

// Count installed files
const installedFiles = readdirSync(targetDir).filter((f) => f.endsWith(".md"));

console.log(`${GREEN}✓${RESET} Installato in: ${BOLD}.claude/skills/auto-provision/${RESET}`);
console.log(`${GREEN}✓${RESET} File copiati: ${installedFiles.length}`);
installedFiles.forEach((f) => {
  console.log(`  ${CYAN}→${RESET} ${f}`);
});

console.log("");
console.log(`${BOLD}Come usarlo:${RESET}`);
console.log(`  1. Avvia Claude Code:  ${CYAN}claude${RESET}`);
console.log(`  2. Esegui:             ${CYAN}/auto-provision${RESET}`);
console.log("");
console.log(`${BOLD}Opzioni:${RESET}`);
console.log(`  ${CYAN}/auto-provision${RESET}          Analisi interattiva (consigliato)`);
console.log(`  ${CYAN}/auto-provision --force${RESET}  Salta conferma, genera tutto`);
console.log("");
console.log(
  `${YELLOW}Nota:${RESET} Per installare anche il metodo BMAD, usa: ${CYAN}npx bmad-method install${RESET}`
);
console.log("");
