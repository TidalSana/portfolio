# Interactive keyboard portfolio checkpoint

Saved 2026-10-06. Development is paused at the accepted single-cursor interaction.

## Preview

With the existing Next.js development server, open `/keyspace/index.html#home`.
For a dependency-free preview from the repository root:

```sh
python3 -m http.server 8780 --directory public
```

Then visit http://127.0.0.1:8780/keyspace/index.html#home. Serve over HTTP; ES modules do not run correctly from file URLs. The existing production homepage is unchanged.

## Accepted design

Turquoise case, GMK Rubrehose keycaps, Cherry-profile geometry and finished lighting. Header contains Joshua Semana and the animated Spellkey. Drag the keyboard to orbit. Type Work, Projects, Me or Keyboards and press Enter, or click a floating word. Escape returns home. Clicking rendered keys also types, with key travel and fading highlights.

Spellkey has mirrored rubber-hose hands, hidden at rest. Clicking him retracts and redistributes the words; leaving and returning to the page also retracts/releases them. Word positions and the idle suggested destination are random. Exactly one floating word has a cursor; typing moves it into the matching word after the entered letters. Reduced motion is supported.

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
