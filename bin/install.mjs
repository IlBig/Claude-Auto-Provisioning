#!/usr/bin/env node

import { existsSync, mkdirSync, cpSync, readdirSync } from "node:fs";
import { resolve, join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createInterface } from "node:readline";
import { spawn } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const packageRoot = resolve(__dirname, "..");
const sourceDir = join(packageRoot, ".claude", "skills", "auto-provision");
const targetBase = process.cwd();
const targetDir = join(targetBase, ".claude", "skills", "auto-provision");

const RESET = "\x1b[0m";
const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const YELLOW = "\x1b[33m";
const CYAN = "\x1b[36m";
const DIM = "\x1b[2m";
const BOLD = "\x1b[1m";

// --- Post-install actions catalog ---
const POST_ACTIONS = [
  {
    id: "bmad",
    name: "BMAD Method",
    description: "Metodo Agile-AI con 12 agenti e 36+ workflow",
    command: "npx",
    args: ["bmad-method", "install"],
    detect: () => existsSync(join(targetBase, "_bmad")),
    detectMessage: "già installato",
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

// --- Main ---
async function main() {
  console.log("");
  console.log(`${BOLD}${CYAN}╔══════════════════════════════════════════╗${RESET}`);
  console.log(`${BOLD}${CYAN}║     Claude Auto-Provision Installer      ║${RESET}`);
  console.log(`${BOLD}${CYAN}╚══════════════════════════════════════════╝${RESET}`);
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

  // --- Step 1: Install skill files ---
  console.log(`${BOLD}[1/2] Installazione skill auto-provision${RESET}`);
  console.log("");

  if (existsSync(targetDir) && readdirSync(targetDir).length > 0) {
    console.log(`${YELLOW}  Auto-provision già presente — aggiornamento file...${RESET}`);
  }

  mkdirSync(targetDir, { recursive: true });
  cpSync(sourceDir, targetDir, { recursive: true });

  const installedFiles = readdirSync(targetDir).filter((f) => f.endsWith(".md"));
  console.log(`  ${GREEN}✓${RESET} Installato in: ${BOLD}.claude/skills/auto-provision/${RESET}`);
  console.log(`  ${GREEN}✓${RESET} File copiati: ${installedFiles.length}`);
  installedFiles.forEach((f) => {
    console.log(`    ${CYAN}→${RESET} ${f}`);
  });
  console.log("");

  // --- Step 2: Post-install actions ---
  console.log(`${BOLD}[2/2] Componenti aggiuntivi${RESET}`);
  console.log("");

  const available = [];
  for (const action of POST_ACTIONS) {
    if (action.detect()) {
      console.log(`  ${DIM}${action.name}: ${action.detectMessage}${RESET}`);
    } else {
      available.push(action);
    }
  }

  if (available.length === 0) {
    console.log(`  ${DIM}Nessun componente aggiuntivo da installare.${RESET}`);
  } else {
    console.log(`  Componenti disponibili:`);
    console.log("");
    available.forEach((a, i) => {
      console.log(`    ${BOLD}${i + 1}.${RESET} ${a.name} — ${a.description}`);
      console.log(`       ${DIM}${a.command} ${a.args.join(" ")}${RESET}`);
    });
    console.log("");

    const rl = createInterface({ input: process.stdin, output: process.stdout });

    const answer = await ask(
      rl,
      `  Installa tutti? ${BOLD}[S/n]${RESET} oppure indica i numeri (es: 1,2): `
    );
    rl.close();

    const trimmed = answer.trim().toLowerCase();

    let selected = [];
    if (trimmed === "" || trimmed === "s" || trimmed === "si" || trimmed === "y" || trimmed === "yes") {
      selected = available;
    } else if (trimmed === "n" || trimmed === "no") {
      selected = [];
    } else {
      const nums = trimmed.split(/[,\s]+/).map((n) => parseInt(n, 10) - 1);
      selected = nums.filter((n) => n >= 0 && n < available.length).map((n) => available[n]);
    }

    console.log("");

    for (const action of selected) {
      console.log(`  ${CYAN}→${RESET} Installazione ${BOLD}${action.name}${RESET}...`);
      console.log("");
      try {
        await runCommand(action.command, action.args);
        console.log("");
        console.log(`  ${GREEN}✓${RESET} ${action.name} installato`);
      } catch (err) {
        console.log(`  ${RED}✗${RESET} ${action.name}: ${err.message}`);
      }
      console.log("");
    }
  }

  // --- Summary ---
  console.log("");
  console.log(`${BOLD}${GREEN}══════════════════════════════════════════${RESET}`);
  console.log(`${BOLD}${GREEN}  Installazione completata!${RESET}`);
  console.log(`${BOLD}${GREEN}══════════════════════════════════════════${RESET}`);
  console.log("");
  console.log(`${BOLD}Prossimi passi:${RESET}`);
  console.log(`  1. Avvia Claude Code:  ${CYAN}claude${RESET}`);
  console.log(`  2. Esegui:             ${CYAN}/auto-provision${RESET}`);
  console.log(`     Il sistema analizzerà il progetto e configurerà tutto.`);
  console.log("");
}

main().catch((err) => {
  console.error(`${RED}Errore:${RESET} ${err.message}`);
  process.exit(1);
});
