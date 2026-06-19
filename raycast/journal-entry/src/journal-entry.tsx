import {
  Form,
  ActionPanel,
  Action,
  showHUD,
  showToast,
  Toast,
  closeMainWindow,
  popToRoot,
  getPreferenceValues,
} from "@raycast/api";
import { existsSync, mkdirSync, appendFileSync } from "fs";
import { homedir } from "os";
import { join } from "path";

interface Preferences {
  journalDir: string;
}

interface FormValues {
  entry: string;
}

function expandTilde(p: string): string {
  return p.startsWith("~") ? join(homedir(), p.slice(1)) : p;
}

function todayFileName(): string {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${yyyy}_${mm}_${dd}.md`;
}

export default function Command() {
  const { journalDir } = getPreferenceValues<Preferences>();

  async function handleSubmit(values: FormValues) {
    const text = values.entry.trim();
    if (!text) {
      await showToast({ style: Toast.Style.Failure, title: "Nothing to save" });
      return;
    }

    try {
      const dir = expandTilde(journalDir);
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }
      const file = join(dir, todayFileName());

      // No header on new files. One newline per entry, so no blank line between entries.
      appendFileSync(file, `- ${text}\n`);

      await closeMainWindow();
      await popToRoot();
      await showHUD("Saved to journal");
    } catch (error) {
      await showToast({
        style: Toast.Style.Failure,
        title: "Couldn't save entry",
        message: String(error),
      });
    }
  }

  return (
    <Form
      actions={
        <ActionPanel>
          <Action.SubmitForm title="Save Entry" onSubmit={handleSubmit} />
        </ActionPanel>
      }
    >
      <Form.TextArea id="entry" title="" placeholder="What's on your mind?" autoFocus />
    </Form>
  );
}
