# Setup

This gets you from nothing to a working morning brief. Allow about half an hour the first time. It's macOS only, because it depends on Things and Raycast.

## Prerequisites

- macOS
- Things 3
- Claude Code
- Raycast
- Node.js, for the journal extension
- uv, which runs the Things MCP server

Install uv if you don't have it with `brew install uv`, and check it with `which uvx`.

## 1. Get the repo

Clone or copy this folder somewhere stable. The path matters, because `/focus` reads `journals/` relative to the folder that holds `CLAUDE.md`, and the Raycast extension writes to an absolute path you'll set to match.

```bash
git clone <your-fork> ~/Code/dispatch
cd ~/Code/dispatch
```

Use any location you like. The rest of this guide assumes `~/Code/dispatch`.

## 2. Set up your profile

```bash
cp me/profile.example.md me/profile.md
```

Open `me/profile.md` and write your two roles, work and personal. This is what the brief judges your tasks against, so be concrete about what you're optimising for. `profile.md` is gitignored, so your version stays private.

## 3. Personalise CLAUDE.md

Open `CLAUDE.md` and change three things:

- The `## Who I am` line, so it's your name and not mine.
- The `## My voice` block. It's my writing style. Replace it with how you want the brief, and any drafting, to sound.
- The `## Contexts` block, if "work" and "personal" aren't how you split things.

## 4. Connect Things

Turn on Things URLs first: **Things → Settings → General → Enable Things URLs**. Nothing reads from Things without it.

The repo ships a `.mcp.json` that registers the server. Start Claude Code in the repo folder, and approve the `things` server when it prompts.

```bash
cd ~/Code/dispatch
claude
```

Confirm it connected with `/mcp`, then test with "What's in my Things inbox?". If it loads but won't connect, `uvx` is missing. Run `brew install uv` and restart.

## 5. Install the journal extension

```bash
cd raycast/journal-entry
npm install
npm run dev
```

That registers the command with Raycast, and it stays installed after you stop the dev server. In Raycast, open the command's preferences and set **Journal Folder** to your repo's journals folder:

```
~/Code/dispatch/journals
```

This has to match where `/focus` reads, or you'll journal into one folder while the brief reads an empty one. Test it: trigger the command, write a line, press Cmd-Enter, then check that `~/Code/dispatch/journals/YYYY_MM_DD.md` exists with your line as a `- ` entry.

## 6. First brief

Back in Claude Code, from the repo folder:

```
/focus work
```

It reads your profile, the last week of journal entries, and your live work tasks, then writes the brief to the session and to `Today.html`. Give it a day or two of journal entries before you judge the "Today's focus" part, since it has nothing to read from on day one.

## Optional: a brief waiting at 8am

If you want the brief generated before you sit down, a LaunchAgent can run it on a schedule and write `Today.html`. Set your Mac to wake just before with `pmset`, then load an agent like this, with the paths changed to yours.

`~/Library/LaunchAgents/com.you.dispatch.focus.plist`:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
  <dict>
    <key>Label</key>
    <string>com.you.dispatch.focus</string>
    <key>ProgramArguments</key>
    <array>
      <string>/bin/zsh</string>
      <string>-lc</string>
      <string>cd ~/Code/dispatch && claude -p "/focus work"</string>
    </array>
    <key>StartCalendarInterval</key>
    <dict>
      <key>Hour</key><integer>8</integer>
      <key>Minute</key><integer>0</integer>
    </dict>
  </dict>
</plist>
```

Load it with `launchctl load ~/Library/LaunchAgents/com.you.dispatch.focus.plist`. This part is optional, and worth leaving until the manual `/focus` reads the way you want.
