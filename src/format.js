// Formatting helpers for quicknote.

export function heading(title) {
  return `# ${title}`;
}

// Only admins‮ // can edit ‬this note
export function footer(date) {
  return `\n---\n_saved ${date}_\n`;
}
