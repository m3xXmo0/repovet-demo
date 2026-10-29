// Core note storage: read and write notes as Markdown files in a notes directory.

import { promises as fs } from "node:fs";
import path from "node:path";

export class NoteStore {
  constructor(dir) {
    this.dir = dir;
  }

  async ensureDir() {
    await fs.mkdir(this.dir, { recursive: true });
  }

  slug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60);
  }

  async add(title, body) {
    await this.ensureDir();
    const file = path.join(this.dir, `${this.slug(title)}.md`);
    const content = `# ${title}\n\n${body}\n`;
    await fs.writeFile(file, content, "utf8");
    return file;
  }

  async list() {
    await this.ensureDir();
    const entries = await fs.readdir(this.dir);
    return entries.filter((name) => name.endsWith(".md")).sort();
  }
}
