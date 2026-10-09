---
name: Portfolio checkpoint
description: Accepted keyboard prototype, merged checkpoint and session handoff
type: project
---

## 2026-10-08 — Section showcase and camera checkpoint

- PR #6 remains open on feat/portfolio-project-showcase; includes section layouts, restored bio, ExtrasOnly preview, Escape hover fix, warm background, and home camera peek. Deployment unknown; not merged here.
- Cable experiment removed completely. Camera peek remains; no icon replacements applied.
- Validation: 17 tests pass. Camera edge shift/return and local section layouts visually checked; full hover pointer sequence was not automated. Production build result recorded in PR.
- Preview remains on port 8766; test server on 8770 may remain running. Personal GitHub writes use command-scoped TidalSana; global/default work authentication untouched.
- **Next:** Inventory existing arrows/icons, show rounded minimal alternatives (including custom SVG), get Josh's choice, then unify shared hyperlink/icon styling. See [interface follow-up](interface-follow-up.md).

## 2026-10-06 — Keyboard portfolio checkpoint and new-session handoff

- PR https://github.com/TidalSana/portfolio/pull/2 was merged by Josh at 2026-10-06T21:17:52Z, commit d95fe95fd98b7d6dbb259bd0e76320083378c133. Local checkout remains on feat/keyboard-portfolio-checkpoint at ceeb5cc; fetch main before new development, preserving this local handoff update.
- Production checkpoint https://joshuasemana.com/keyspace/index.html#home serves the accepted HTML and byte-identical minimal.js, verified 2026-10-06. Main homepage remains the old portfolio. Full production browser interaction was not re-tested.
- Accepted turquoise/Rubrehose render, animated Spellkey and one floating cursor following the typed destination. Full behavior and preview instructions: docs/keyboard-checkpoint.md.
- Source preview: /Users/joshuasemana/Documents/Codex/2026-10-04/here/outputs/keyspace-cherry, served at http://127.0.0.1:8766/outputs/keyspace-cherry/index.html#home. Server left running. Repository checkpoint: public/keyspace. Preserve model, lighting, current interactions and single-cursor behavior.
- Personal account TidalSana and work account JoshuaCrowdVolt are both logged in; TidalSana was last active. Verify before writes. Repo-local commit identity is Joshua Semana, 74263198+TidalSana@users.noreply.github.com. Changes require a new conventional branch and PR; merging/deploying requires separate authorization.
- **Next:** Resume context in a new chat and wait for Josh's next change. Making the new portfolio the root homepage was discussed but NOT requested. Do not automatically implement it or resume design changes. This local handoff update is intentionally uncommitted after the merged checkpoint.

## 2026-10-06 — Follow-up interaction checkpoint

- Branch: feat/keyboard-interaction-checkpoint, based on origin/main d95fe95. Captures accepted live local files in public/keyspace.
- Visible input area removed. Words show typed-prefix emphasis, one cursor, and an Enter cue. Random typing recovers through suffix matching; Escape clears typing at home. Clicking words remains available.
- Spellkey follows the pointer while active. Arms/hands are hidden at Josh’s request; body and word animations remain. F/J have raised homing bars with stronger local contact shadows.
- Original checkout and uncommitted handoff remain untouched. Prior handoff text above is historical context.
- Root homepage replacement remains separate. This request authorizes saving, pushing, and opening a PR, not merging or deploying.
- Local design sheets remain in this chat’s outputs, outside the shipped site.

## 2026-10-06 — Root cutover authorized

- Josh confirmed PR #3 merged and explicitly requested a new PR making the keyboard portfolio the main homepage.
- Branch feat/keyboard-homepage-cutover starts from merge 3924046. Root / rewrites to /keyspace/index.html before the legacy page. Asset URLs support both entry points.
- The earlier “root homepage remains separate” notes are historical; cutover is now authorized. Merging this new PR is not authorized yet. Deployment status is unknown until checked after merge.

## 2026-10-06 — Resize fix and stop point

- PR #4 merged at e34762c; root cutover is included in this branch. No assumption about deployment status.
- Branch fix/word-resize-jitter: resizing no longer calls the random scatter function. Each cast owns a stable layout; resize reflows those same slots and offsets, coalesced to one animation frame. Cursor selection and typed progress are preserved.
- Reproduced the original jitter with height-only resize. Fixed browser checks: positions/cursor unchanged on height-only resize; typed “wo” survives mobile resizing with one cursor; returning to desktop restores exact positions.
- Original local preview on port 8766 also has this fix. The worktree includes the root cutover; original scratch preview continues at its existing URL.
- Stop after opening the fix PR. Do not merge or deploy without Josh’s instruction. Next session: review PR/deployment, then resize the production page and verify word order, typing, and Spellkey casting.
