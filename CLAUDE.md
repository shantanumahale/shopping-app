# CLAUDE.md

The full engineering guide lives in `AGENTS.md` — read it before writing code. It is the single source of truth for stack, architecture, conventions, the verification loop, how to work a task or bug, and how to split an epic into parallel subtasks.

@AGENTS.md

## Claude Code notes

- Prefer the dedicated file/search tools over shell `cat`/`sed`/`grep`; run independent reads in parallel.
- Don't token-maxx: read only what a task needs, don't reprint files you just read, keep replies tight.
- For an epic, produce the subtask checklist from `AGENTS.md` ("Breaking down an epic") — with per-subtask file ownership and type/signature contracts — before writing code, so subtasks can be handed to parallel agents.
- Verify with `npm run lint && npm test && npm run test:types` before claiming done; state anything skipped.
