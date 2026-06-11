 ---
description: Generate the morning briefing for a context (work, personal, or all)
argument-hint: [work | personal | all]
allowed-tools: Read, Write, mcp__things
---

# Morning briefing

Produce my morning briefing, following the spec and voice in CLAUDE.md.

**Set the context from `$ARGUMENTS`:**

- `work` → Work area, work role
- `personal` → Personal area, personal role
- `all` → both
- empty → default to `work`

Steps:

1. Read `me/profile.md`. Use the role matching the context as the evaluative frame. For `all`, use each role for its own section. If the relevant role is missing, note it rather than guessing.
2. Read every journal entry in `journals/` from the last 7 days. Pull out `→` / `->` reflections and `!!` flags. Note any pattern that recurs without resolution, and any gap of 3 or more days. The journal covers both contexts, don't filter it.
3. Read open tasks from the Things area matching the context via the MCP, scoped to the next two weeks. `work` → Work area, `personal` → Personal area, `all` → both. Remember `Start` is when a task was started, not its deadline.

## What to synthesize

- **Top 3 priorities for today** — Always lead with the work tasks. Never more than 3.
- **The thing you're avoiding** — pull from profile growth edges, open threads, and any `!! ` lines from recent journal entries. Name it plainly. If a specific action has been committed to but not done, name it directly every day until it's complete.
- **Hard deadlines** — any tasks with a specific deadline. Always show hard deadlines until they pass.
- **Journal signals** — from the last 7 days of `journals/` entries: (a) extract any `!! ` lines and fold them into "The thing you're avoiding" — treat them as first-person self-flags, not third-party observations; (b) extract any `→ ` or `-> ` lines as flagged reflections; (c) if the same theme recurs across multiple entries without resolution, name the pattern plainly; (d) if there are no journal files in the last 3 days, note the gap — absence from the journal is usually avoidance data.
- **One reflection prompt** — one short question drawn from the growth edges in your profile, to give you something to sit with. Rotate across the edges named there, and don't repeat the same one two days running.

## What to write

 - **Single context** (`work` or `personal`): the five parts in order. Top Three Today, The Thing You're Avoiding, Hard Deadlines, From Your Journal, Sit With This. Judge tasks against that context's role.
- **`all`**: Today's focus once at the top from the whole journal. Then a **Work** section and a **Personal** section, each with its own Top Three Today, The Thing You're Avoiding, Hard Deadlines, From Your Journal, Sit With This.
- Write the brief to `Today.html` at the repo root. Keep the styling plain and readable: a single column, generous line spacing, clear section headings, system font. No external assets.
- Also print the brief in the session so I can read it without opening the file.

Keep a single-context brief to a three-minute read. Don't pad it.
