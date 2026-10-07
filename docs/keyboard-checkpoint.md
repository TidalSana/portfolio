# Interactive keyboard portfolio checkpoint

Saved 2026-10-06. Current checkpoint includes word-only navigation and forgiving typing.

## Preview

With the existing Next.js development server, open `/keyspace/index.html#home`.
For a dependency-free preview from the repository root:

```sh
python3 -m http.server 8780 --directory public
```

Then visit http://127.0.0.1:8780/keyspace/index.html#home. Serve over HTTP; ES modules do not run correctly from file URLs. The existing production homepage is unchanged.

## Accepted design

Turquoise case, GMK Rubrehose keycaps, Cherry-profile geometry and finished lighting. Header contains Joshua Semana and the animated Spellkey. Drag the keyboard to orbit. Type Work, Projects, Me or Keyboards and press Enter, or click a floating word. Escape returns home. Clicking rendered keys also types, with key travel and fading highlights.

Spellkey’s arms and hands are hidden entirely. His eye follows the pointer while the page is active, including over the keyboard iframe. Clicking him retracts and redistributes the words; leaving and returning to the page also retracts/releases them. Word positions and the idle suggested destination are random. Exactly one floating word has a cursor; typing moves it into the matching word after the entered letters. There is no visible input section. Random keys recover by keeping the longest suffix that begins work, projects, me, or keyboards. Typed letters darken; complete words show an Enter cue. Enter opens only a complete word, Backspace edits progress, and Escape clears progress even at home. Reduced motion is supported.

## Files

- `public/keyspace/minimal.js`: input, navigation and single cursor.
- `public/keyspace/spellkey-performer.js`: mascot, focus lifecycle and scattering.
- `public/keyspace/minimal.css` and `shell.css`: layout and animation styles.
- `public/keyspace/destinations.js`: current content snapshot; review before production replacement.
- `public/keyspace/keyboard-render/`: copied finished renderer, bundled dependencies and asset provenance.
- `public/keyspace/render-adapter.js` and `keyboard-render/portfolio-bridge.js`: iframe interaction bridge.

## Provenance and limits

The renderer was copied from the supplied corsa-study before portfolio adaptation. Its geometry, palette and lighting are retained. The scene background was matched to the floor to remove gray bands at low camera angles. The bridge adds input and key feedback. Bundled license/provenance files are retained; renderer SOURCES.md contains historical notes from earlier iterations. The active default is turquoise/Rubrehose, not the older four-key Striker study. Case geometry is a reference-based reconstruction, not manufacturer CAD. This checkpoint does not establish third-party asset rights or manufacturing accuracy.

## Verification

The original preview was checked on desktop/mobile, including navigation, Escape, focus retract/release, repeated-key fade and the single matching cursor. Packaging checks compare runtime files byte-for-byte, check JavaScript syntax and resolve local asset/module references. No Next.js build or production deployment is claimed for this static checkpoint.

## Resume

Continue from this checkpoint only when asked. Next decision: integrate the accepted prototype into the production Next.js homepage or keep iterating at the standalone preview route. Do not resume visual changes merely because the handoff is loaded.

## Follow-up checkpoint — 2026-10-06

F and J have raised homing bars with local contact shadows. They share the keycap material and move with keypresses. Hidden arm geometry and arm-poses.js remain to preserve the current body gestures; no arms are visible. Earlier glove/emotion sheets remain local design experiments, not production routes.

word-matching.js implements bounded suffix matching. Run its regression checks with `node --test tests/keyspace-word-matching.test.mjs`.

This checkpoint updates /keyspace/index.html only. The Next.js root homepage is unchanged. Full Next.js build and deployment are not claimed by this static checkpoint.

## Root homepage cutover

The cutover PR serves the accepted static keyboard page at `/` using a Next.js beforeFiles rewrite. Browser URLs remain on the root with hash destinations such as `/#work`. `/keyspace/index.html` remains available. Styles/scripts use the stable /keyspace asset prefix; the keyboard iframe and destination photos resolve relative to their modules.

Rollback: remove the root beforeFiles rewrite in next.config.js to restore the retained legacy pages/index.tsx. No legacy source or routes are deleted.

Post-deploy check: open / in a fresh tab, type random letters followed by work and Enter, return with Escape, open Me and Keyboards to check photos, and confirm the F/J bars and arm-free Spellkey. Verify /keyspace/index.html still loads.
