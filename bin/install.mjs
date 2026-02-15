#!/usr/bin/env node

import { existsSync, mkdirSync, cpSync, readdirSync } from "node:fs";
import { resolve, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createInterface } from "node:readline";
import { spawn } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(__dirname, "..");
const sourceDir = join(packageRoot, ".claude", "skills", "auto-provision");
const sourceNeedDir = join(packageRoot, ".claude", "skills", "auto-provision-need");
const targetBase = process.cwd();
const targetDir = join(targetBase, ".claude", "skills", "auto-provision");
const targetNeedDir = join(targetBase, ".claude", "skills", "auto-provision-need");

// --- Colors ---
const RESET = "\x1b[0m";
const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const YELLOW = "\x1b[33m";
const CYAN = "\x1b[36m";
const DIM = "\x1b[2m";
const BOLD = "\x1b[1m";
const WHITE = "\x1b[37m";

// --- BMAD Modules Guide ---
const BMAD_MODULES = [
  {
    id: "core",
    name: "BMad Core",
    emoji: "🟢",
    required: true,
    description: `Il motore fondamentale del framework. Fornisce l'orchestrazione degli
     agenti AI, il sistema di configurazione, la compilazione degli agenti e
     le policy di base. Tutti gli altri moduli si appoggiano su di esso.`,
  },
  {
    id: "bmm",
    name: "BMad Method (BMM)",
    emoji: "📋",
    required: false,
    description: `Agile-AI Driven Development. Il modulo principale per lo sviluppo
     software agile guidato da AI. Include ~12 agenti specializzati (Analyst,
     PM, Architect, Developer, Scrum Master, QA, UX Designer, Tech Writer)
     e 50+ workflow. Copre l'intero ciclo di vita: dall'analisi dei requisiti
     alla pianificazione, architettura, implementazione e testing.`,
  },
  {
    id: "bmb",
    name: "BMad Builder (BMB)",
    emoji: "🔧",
    required: false,
    description: `Permette di creare agenti, workflow e moduli personalizzati. Trasforma
     BMad da un framework fisso in una piattaforma estensibile. Puoi creare
     soluzioni specifiche per qualsiasi dominio (legale, medico, finanziario,
     educativo) e condividerle con la community.`,
  },
  {
    id: "cis",
    name: "Creative Intelligence Suite (CIS)",
    emoji: "💡",
    required: false,
    description: `Modulo per il pensiero creativo e strategico. Include 5 workflow
     interattivi (brainstorming, design thinking, problem solving, strategia
     d'innovazione, storytelling) con oltre 150 tecniche creative e 5 agenti
     specializzati con stili di facilitazione unici.`,
  },
  {
    id: "gamedev",
    name: "Game Dev Studio",
    emoji: "🎮",
    required: false,
    description: `Modulo opzionale per lo sviluppo di videogiochi. Aggiunge agenti
     specifici come Game Architect, Game Designer e Game Developer, con
     workflow dedicati ai Game Design Document (GDD) e alla meccanica di gioco.`,
  },
  {
    id: "tea",
    name: "Test Architect (TEA)",
    emoji: "🧪",
    required: false,
    description: `Modulo standalone per testing e quality assurance avanzati. Si integra
     con strumenti come Playwright per test fixture-based di web app.
     Approfondisce gli aspetti di testing oltre quanto già offerto dal QA
     agent base nel modulo BMM.`,
  },
];

// --- Utilities ---
function ask(rl, question) {
  return new Promise((r) => rl.question(question, r));
}

function runCommand(command, args) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, {
      cwd: targetBase,
      stdio: "inherit",
      shell: true,
    });
    proc.on("close", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Comando terminato con codice ${code}`));
    });
    proc.on("error", reject);
  });
}

function printSeparator() {
  console.log(`  ${DIM}${"─".repeat(56)}${RESET}`);
}

// --- Main ---
async function main() {
  console.log("");
  console.log(`${BOLD}${CYAN}╔══════════════════════════════════════════════════════════════╗${RESET}`);
  console.log(`${BOLD}${CYAN}║              Claude Auto-Provision Installer                 ║${RESET}`);
  console.log(`${BOLD}${CYAN}╚══════════════════════════════════════════════════════════════╝${RESET}`);
  console.log("");

  // Prevent installing into the package's own directory
  if (resolve(targetBase) === resolve(packageRoot)) {
    console.log(`${YELLOW}Esegui questo comando nella root del progetto che vuoi configurare,`);
    console.log(`non nella directory del pacchetto auto-provision.${RESET}`);
    console.log("");
    console.log(`  cd /path/to/tuo-progetto`);
    console.log(`  npx github:IlBig/Claude-Auto-Provisioning`);
    console.log("");
    process.exit(1);
  }

  // Check if source files exist
  if (!existsSync(sourceDir)) {
    console.error("Errore: file sorgente non trovati. Reinstalla il pacchetto.");
    process.exit(1);
  }

  const rl = createInterface({ input: process.stdin, output: process.stdout });

  // ============================================================
  // STEP 1: Install skill files
  // ============================================================
  console.log(`${BOLD}  [1/2] Installazione skill /auto-provision e /auto-provision-need${RESET}`);
  console.log("");

  if (existsSync(targetDir) && readdirSync(targetDir).length > 0) {
    console.log(`  ${YELLOW}Auto-provision già presente — aggiornamento file...${RESET}`);
  }

  mkdirSync(targetDir, { recursive: true });
  cpSync(sourceDir, targetDir, { recursive: true });
  mkdirSync(targetNeedDir, { recursive: true });
  cpSync(sourceNeedDir, targetNeedDir, { recursive: true });

  const installedFiles = readdirSync(targetDir).filter((f) => f.endsWith(".md"));
  const installedNeedFiles = readdirSync(targetNeedDir).filter((f) => f.endsWith(".md"));
  console.log(`  ${GREEN}✓${RESET} Installato in: ${BOLD}.claude/skills/auto-provision/${RESET}`);
  console.log(`  ${GREEN}✓${RESET} File copiati: ${installedFiles.length}`);
  installedFiles.forEach((f) => {
    console.log(`    ${CYAN}→${RESET} ${f}`);
  });
  console.log(`  ${GREEN}✓${RESET} Installato in: ${BOLD}.claude/skills/auto-provision-need/${RESET}`);
  console.log(`  ${GREEN}✓${RESET} File copiati: ${installedNeedFiles.length}`);
  installedNeedFiles.forEach((f) => {
    console.log(`    ${CYAN}→${RESET} ${f}`);
  });
  console.log("");

  // ============================================================
  // STEP 2: BMAD Method
  // ============================================================
  const bmadAlreadyInstalled = existsSync(join(targetBase, "_bmad"));

  if (bmadAlreadyInstalled) {
    console.log(`${BOLD}  [2/2] BMAD Method${RESET}`);
    console.log(`  ${DIM}Già installato (directory _bmad/ presente)${RESET}`);
    console.log("");
  } else {
    console.log(`${BOLD}  [2/2] BMAD Method — Framework AI-Driven Development${RESET}`);
    console.log("");
    console.log(`  ${WHITE}BMAD è un framework che fornisce agenti AI specializzati,`);
    console.log(`  workflow strutturati e metodologie per lo sviluppo software.${RESET}`);
    console.log(`  ${WHITE}Scegli i moduli più adatti al tuo progetto.${RESET}`);
    console.log("");

    // --- Show module guide ---
    console.log(`${BOLD}${CYAN}  ┌──────────────────────────────────────────────────────────┐${RESET}`);
    console.log(`${BOLD}${CYAN}  │                    Moduli Disponibili                    │${RESET}`);
    console.log(`${BOLD}${CYAN}  └──────────────────────────────────────────────────────────┘${RESET}`);
    console.log("");

    BMAD_MODULES.forEach((mod, i) => {
      const tag = mod.required ? `${GREEN}sempre installato${RESET}` : `${DIM}opzionale${RESET}`;
      console.log(`  ${mod.emoji}  ${BOLD}${mod.name}${RESET}  ${tag}`);
      // Print description lines with proper indentation
      const lines = mod.description.split("\n").map((l) => l.trim());
      lines.forEach((line) => {
        if (line) console.log(`      ${DIM}${line}${RESET}`);
      });
      if (i < BMAD_MODULES.length - 1) console.log("");
    });

    console.log("");
    printSeparator();
    console.log("");

    const bmadAnswer = await ask(
      rl,
      `  Vuoi installare BMAD? ${BOLD}[S/n]${RESET}: `
    );

    const bmadTrimmed = bmadAnswer.trim().toLowerCase();
    const wantsBmad =
      bmadTrimmed === "" ||
      bmadTrimmed === "s" ||
      bmadTrimmed === "si" ||
      bmadTrimmed === "y" ||
      bmadTrimmed === "yes";

    if (wantsBmad) {
      console.log("");
      console.log(`  ${CYAN}→${RESET} Avvio installazione ${BOLD}BMAD Method${RESET}...`);
      console.log(`    ${DIM}L'installer BMAD ti chiederà quali moduli attivare.${RESET}`);
      console.log("");

      try {
        await runCommand("npx", ["bmad-method", "install"]);
        console.log("");
        console.log(`  ${GREEN}✓${RESET} BMAD Method installato`);
      } catch (err) {
        console.log(`  ${RED}✗${RESET} BMAD Method: ${err.message}`);
        console.log(`    ${DIM}Puoi installarlo manualmente con: npx bmad-method install${RESET}`);
      }
    } else {
      console.log("");
      console.log(`  ${DIM}BMAD non installato. Puoi farlo dopo con: npx bmad-method install${RESET}`);
    }

    console.log("");
  }

  rl.close();

  // ============================================================
  // SUMMARY
  // ============================================================
  console.log(`${BOLD}${GREEN}  ══════════════════════════════════════════════════════════${RESET}`);
  console.log(`${BOLD}${GREEN}    Installazione completata!${RESET}`);
  console.log(`${BOLD}${GREEN}  ══════════════════════════════════════════════════════════${RESET}`);
  console.log("");
  console.log(`${BOLD}  Prossimi passi:${RESET}`);
  console.log(`    1. Avvia Claude Code:  ${CYAN}claude${RESET}`);
  console.log(`    2. Esegui:             ${CYAN}/auto-provision${RESET}`);
  console.log(`       Il sistema analizzerà il progetto e configurerà tutto`);
  console.log(`       automaticamente: CLAUDE.md, hook, skill, MCP server, plugin.`);
  console.log("");
  console.log(`    ${DIM}Oppure, per installare componenti specifici on-demand:${RESET}`);
  console.log(`       ${CYAN}/auto-provision-need ${DIM}<descrizione esigenza>${RESET}`);
  console.log("");
}

main().catch((err) => {
  console.error(`${RED}Errore:${RESET} ${err.message}`);
  process.exit(1);
});
