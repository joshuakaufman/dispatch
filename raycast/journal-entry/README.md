# Journal Entry

A single-command Raycast extension that appends a note to today's journal file.

Trigger it, type in the multi-line box, and press Cmd-Enter. Return inserts a newline, so multi-line notes work without any extra wiring.

## Output

- One file per day in the configured folder, named `YYYY_MM_DD.md`.
- Each entry written as a `- ` list item, with no header and no blank line between entries.

## Setup

Run `npm install` then `npm run dev` from this folder to register the command with Raycast. It stays installed after the dev server stops.

Open the command's preferences and set **Journal Folder** to your brain repo's `journals/` folder, so the morning briefing reads what you write. A leading `~` is expanded for you.
