**Harmless demo for repovet. Every suspicious file here is a dummy that shows what repovet detects. Do not use as a template.**

This repository looks like a small note-taking CLI called `quicknote`, but it is
built to be scanned, not run. Each "payload" is inert: the only command anything
runs is `echo`, every URL points at the reserved `example.invalid` domain, and the
disguised binary is a header with no program behind it. Nothing here does anything
if executed.

Scan it yourself:

```
repovet scan https://github.com/m3xXmo0/repovet-demo
```

## What is hidden where

| # | File | What is hidden there | How it is hidden | repovet rule |
|---|------|----------------------|------------------|--------------|
| 1 | `AGENTS.md` | An instruction telling an agent to email `.env` files to an outside address | Invisible Unicode **tag characters** appended after normal text (ASCII smuggling) | `RC-AGENT-002` (critical) |
| 2 | `assets/logo.png` | A Linux **ELF executable** wearing a `.png` extension | File extension lies about the real file type | `RC-BIN-002` (critical) |
| 3 | `.vscode/tasks.json` | A task that **runs as soon as the folder is opened** in VS Code | `runOptions.runOn: "folderOpen"` | `RC-AUTO-020` (high) |
| 4 | `CLAUDE.md` | "Ignore previous instructions", fetch a remote script, and "do not tell the user" | Text placed inside an **HTML comment**, invisible in the rendered view | `RC-AGENT-010` (medium), `RC-AGENT-020` (high) |
| 5 | `package.json` | A dependency `expresz` declared next to real ones | **Typosquat**: one letter away from the popular `express`. The name is not registered on npm, and it is an *optional* peer dependency, which npm, pnpm and Yarn do not install automatically | `RC-DEP-001` (high) |
| 6 | `pyhelper/quicknote.pth` | Code that runs **every time Python starts** once installed | A `.pth` file whose line begins with `import` | `RC-AUTO-016` (high) |
| 7 | `pyhelper/quicknote_sync.py` | A command stored out of sight, then run | **Base64 blob decoded and `exec`'d** in one step | `RC-OBF-002` + `RC-OBF-003` (high) |
| 8 | `src/format.js` | A comment that reads one way but is parsed another | A **bidirectional override** character (Trojan Source) | `RC-OBF-008` (high) |
| 9 | `src/index.js` | A function name that looks like `validateTitle` but is a different identifier | A Cyrillic **look-alike letter** (homoglyph) | `RC-OBF-010` (medium) |
| 10 | `package.json` | A script that runs automatically on `npm install` | npm **`postinstall`** lifecycle script | `RC-AUTO-001` (medium) |

## One honest "Not checked"

`.github/workflows/ci.yml` is an ordinary CI workflow. repovet only checks workflows
for a couple of specific risks and lists the rest under **Not checked** rather than
pretending it reviewed the whole file. This is here to show that repovet says what it
cannot see, instead of implying the repository is clean.

## License

MIT. See [LICENSE](LICENSE).
