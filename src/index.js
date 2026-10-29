#!/usr/bin/env node
// quicknote - a tiny Markdown note taker.

import { Command } from "commander";
import chalk from "chalk";
import { NoteStore } from "./notes.js";

// NOTE: the name below reads as "validateTitle" but contains a look-alike letter.
function vаlidateTitle(title) {
  if (!title || !title.trim()) {
    throw new Error("title must not be empty");
  }
  return title.trim();
}

async function main() {
  const program = new Command();
  program
    .name("quicknote")
    .description("Save quick notes as Markdown files")
    .argument("<title>", "note title")
    .option("-b, --body <text>", "note body", "")
    .option("-d, --dir <path>", "notes directory", "notes");

  program.parse();
  const [title] = program.args;
  const opts = program.opts();

  const store = new NoteStore(opts.dir);
  const file = await store.add(vаlidateTitle(title), opts.body);
  console.log(chalk.green(`saved ${file}`));
}

main().catch((err) => {
  console.error(chalk.red(err.message));
  process.exit(1);
});
