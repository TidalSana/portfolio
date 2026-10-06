# Geometry and palette sources

## Imported CAD

The keycaps are tessellated directly from CHERRYMX CAD_CAM KEYCAPS.stp in Josh’s supplied ZIP, from [Shoppster’s Cherry MX keycaps](https://grabcad.com/library/cherry-mx-keycaps-1).

W and P use the 1U R2 mesh; K and J use the 1U R3 mesh. Row mapping follows the arrangement in the supplied model and reference render. The source meshes retain their top dish, sidewalls, underside and stems. Only translation, axis rotation and uniform scaling are applied. These are the supplied community CAD models, not certified manufacturer CAD.

R2 dimensions: 18 × 18 × 7.2308 mm. R3 dimensions: 18 × 18 × 7.1474 mm. Conversion uses OpenCascade through occt-import-js with 0.025 mm tessellation tolerance. Source hash and transforms are recorded in [cad-provenance.json](assets/cad-provenance.json). Legends are separately rendered upright Latin letters and Japanese sublegends.

## Striker alpha colors

[Matrix’s Striker archive](https://matrixzj.github.io/docs/gmk-keycaps/Striker/) lists the set color codes as unknown. The active cap color #345B94 and legend color #FFFCF7 are sampled from the alpha region of Josh’s supplied core-kit image. All four keys share this palette. Kana: W/て, K/の, P/せ, J/ま.

These are image-derived screen values, not factory plastic specifications. Lighting and displays affect perceived color.

## Other assets

Fonts: Manrope, DM Sans and Newsreader from Google Fonts, self-hosted with OFL licenses. Three.js is bundled with its MIT license. Portrait and keyboard photos originate from Joshua Semana’s existing portfolio. Spellkey is the previously approved character.

## Legend lettering

Latin W/K/P/J use [Open Cherry by Dakota Felder](https://github.com/dakotafelder/open-cherry), an MIT-licensed community font based on Cherry legends, recommended in the [linked Geekhack discussion](https://geekhack.org/index.php?topic=99762.0). This is not an official GMK font. This initial font-based implementation has been superseded by the outlined glyph implementation below. Legend textures render at 2048 × 2048 with maximum supported anisotropic filtering.

## Official GMK guide applied

Source: [GMK custom keycap guidelines v14](https://www.gmk.net/fileadmin/user_upload/faq/Guidelines_for_Custom_GMK_Keycap_Set_14.pdf), pages 4–6. All eight glyphs are now vector outlines in one SVG, placed in millimeters inside the 9.6 × 12 mm 1U legend region. Latin capitals are 3 mm high; kana are 3.5 mm high using Hiragino W6 outlines. These are our explicit placement choices, not dimensions prescribed for standard alphas by GMK. One base and one legend color are used, consistent with the guide’s double-shot color limit.

The guide does not specify complete keycap CAD dimensions or distribute official font outlines. The imported CAD remains unchanged. Minimum local stroke (0.3 mm), internal channels/gaps (0.4 mm), enclosed base-color diameter (0.6 mm), convex contour clearance (0.3 mm), and terminal radius (0.1 mm) are recorded for production review; this mockup is not a certified manufacturing design. Screen Striker colors remain reference-image samples, not approved RAL/Pantone physical colors.

See assets/gmk-guide-checks.json for measured bounds and limitations, and assets/gmk-legend-outlines.svg for all outlines.

## Full-board CAD mapping

Additional meshes extracted from the same user-supplied STEP: R1 1u mesh 10, R2 1u mesh 9, R3 1u mesh 7, R4 1u mesh 8; R1 2u mesh 26; R2 1.5u mesh 34; R3 1.75u mesh 39 and 2.25u mesh 24; R4 2.25u mesh 25 and 2.75u mesh 21; bottom 1.5u mesh 29; 7u spacebar mesh 3. Original proportions are preserved. Assembly pitch is 19.05 mm. The case and blockers are simple authored mockup geometry, not manufacturer CAD. Additional legends are visual lettering, not certified GMK molds.

## Personal 60 reference update

Case styling is based on the six user-supplied Korsa Mini reference images. It is a visual reconstruction with estimated dimensions and original JS detailing. No designer case CAD was supplied. Switch and PCB construction is illustrative. Stepped Caps Lock is derived from R3 mesh39 with a lowered right 0.5u shelf and added riser, not an imported GMK stepped mold.

striker-legends.js and assets/striker-outlines.js replace the earlier four-glyph implementation: all applicable 60% Striker legends are represented, including small kana and shifted number/punctuation legends. Dark Escape and Enter use #33455F sampled from the supplied kit image. Open Cherry and Hiragino-derived outlines remain substitutes for official molds; exact manufacturing equivalence is not asserted.

## Additional side-profile references

The three further user-supplied Korsa Mini screenshots informed the deeper wedge, upper/lower seam and internal cavity. 7° tilt and case dimensions are chosen estimates, not extracted measurements. No exact Korsa model was imported. Personal-use intent and cosmetic changes are not represented as permission or legal clearance.

## Standalone studio study

This copy adds a neutral photographic stage, large environment softboxes, physical materials, filmic tone mapping, moulded-plastic microtexture, and rounded case bevel subdivisions. It preserves the existing community keycap CAD and authored Korsa-inspired reconstruction. It does not contain or claim Keyboard Render Kit's paid meshes or Blender scenes; only general studio-lighting principles are used. Original portfolio files are untouched.

## Three-photo case revision

The current case is reconstructed from the three photos supplied in this session: underside from the USB edge, upright plate from the USB edge, and an underside side-recess close-up. Rear means the centered USB edge; the WKL blockers are on the opposite front edge. The lower body is inset along the sides and returns to full width at the front shoulders. The plain recessed brass weight is rear-biased. The USB port has an inset pill-shaped counterbore. Eight perimeter screw wells and four shallow circular foot recesses follow the photographs. Earlier ornamental underside marks are removed. Dimensions and unseen construction remain estimated from perspective photographs; this is not an exact measured CAD reproduction.

## Edge close-up correction

The supplied real-versus-render comparison prompted replacing independently overlapping floor, bevel, and sidewall strips with a single shared contour. The rounded return starts earlier to preserve a larger front land; one continuous chamfer follows it. The case seam is an actual narrow gap with recessed backing. Shoulder radii remain photo-derived estimates.

## Proportion adjustment, 2026-10-06

Following user feedback, upper-shell depth increased from .76 to 1.05 scene units while keeping the key plane fixed. The side return moved toward mid-depth, leaving approximately 40% full-width land measured from the front. A six-segment quarter-round replaces the sharp underside edge, and return radius increases to .48 scene units. These remain visual fitting choices, not measurements of the reference case.

## Explicit stepped-recess correction

The latest revision supersedes the earlier wedge/roundover interpretation: a long flat shelf, deep vertical inner wall, straight outward shoulder segment between two rounded plan-view corners, and a narrow .06-unit straight chamfer around the underside. The shelf width is 1.55 units and the shoulder corner radius .32, leaving .91 units of straight outward return. Ray checks confirm the shelf at y=-.082 and raised underside at y=-1.5 at mid-depth; the front rejoins the full-width body. These are authored reconstruction parameters, not measured reference dimensions.

## Color studies (2026-10-06)
Modern Dolch palette reference: https://omnitype.com/products/gmk-modo-cyl and https://www.qoda.studio/products/gmk-modern-dolch-2 . 9009 reference: original designer/vendor announcement https://www.reddit.com/r/MechanicalKeyboards/comments/cyghzj/ . Palette values are visual approximations; replacement Latin legends are placeholders, not exact GMK artwork.

## Mint and legend correction (2026-10-06)
Font cross-reference supplied by Josh: https://geekhack.org/index.php?topic=99762.0 . This thread links Dakota Felder's Open Cherry: https://github.com/dakotafelder/open-cherry (MIT; existing license retained). keycap-legends.js reuses the bundled Open Cherry vector outlines rather than Arial or browser font metrics.
Placement reference: https://matrixzj.github.io/docs/gmk-keycaps/Rubrehose/ (base kit and assembled image). Modifier ink is 2.0–2.1 mm high and centered vertically; Control/Alt centered horizontally, wide Shift left inset, Enter/Backspace right inset, Caps kept on its raised dish. Alphas use 3.05 mm Cherry outlines; number/punctuation pairs restored. This is a visual approximation of Cherry/GMK legends, not official GMK tooling. Mint case added; existing keycap colors and geometry unchanged.

## Rubrehose base-kit preset
Applied from the user's supplied Rubrehose base-kit image (720×480), matching the base kit documented at https://matrixzj.github.io/docs/gmk-keycaps/Rubrehose/ . Standard cream/gray configuration for the existing 60% WKL layout; novelty artwork and optional cyan row are not included. Open Cherry outlines approximate the GMK legends. Colors estimated visually, not sampled production swatches.

## Font proportions and stepped Caps Lock
Latest user-supplied GMK base-set image is the typography reference only; Rubrehose/mint colors retained. Open Cherry repository rechecked: https://github.com/dakotafelder/open-cherry . Punctuation now shares a font-unit scale instead of being enlarged individually to matching bounding-box heights. modifier-words.js derives Caps, Lock and Ctrl directly from the bundled MIT-licensed OTF. Stacked Caps/Lock follows reference placement on the existing raised platform.

## Dedicated stepped CAD replacement — 2026-10-06
GMK guidelines v14 p6 confirms 1x1.75 stepped is Row3, but contains no stepped profile/radii/height dimensions. Replaced entire improvised stepped-caps.js deformation with dedicated R3_1.75u_Stepped CAD from https://github.com/endeavoursc/cherry-mx-keycaps (MIT, license bundled). Source Cherry Keycaps Full.stp, mesh28 imported by occt-import-js with .035mm deflection/.15 angular. Center XY, Z floor, rotate -90deg X, scale .1; no shape deformation. Native dimensions32.3875x18.1x7.345433mm. New assets/stepped-cad.js. Legend UV width now uses imported cap width. Dedicated model has narrower raised plateau and larger lower shelf than prior approximation. Backup old shape work/stepped-caps-before-import.js. Cache cad-caps34. Original case/other caps unchanged. Finite attributes/index bounds verified and closeup rendered. Community CAD is not certified GMK tooling. Extraction tools and source STEP in newer chat work/ folder.

## Rubrehose novelty modifiers (2026-10-06)
Artwork reference: https://oblotzky.industries/products/gmk-cyl-rubrehose
Local reference asset: assets/rubrehose-kit.jpg, from the vendor's 2400px base-kit render, gmk_cyl_rubrehose_01_base_f74f402d-ad27-4950-8085-913d73250ee1.jpg. Original artwork belongs to its respective designers; this is reference-derived imagery, not original vector master artwork.
Rubrehose novelty masks are extracted at load time in rubrehose-novelties.js, retaining dark artwork and removing colored backgrounds. Escape: pink face; Backspace: yellow novelty; Enter: green script; Caps: purple BE BAD; left/right Alt: cyan wolf/face; left/right Ctrl: coral eyes/hose. Tab and Shift retain regular legends. Approved Caps CAD is unchanged. Source raster limits sharpness at extreme close-up.

Shadow postprocessing uses Three.js r160 MIT modules from https://github.com/mrdoob/three.js/tree/r160/examples/jsm, vendored in assets/post. Orthographic SSAO adds view-dependent cavity shading; OutputPass handles display conversion.

Bottom-row Ctrl/Alt now use endeavoursc/cherry-mx-keycaps R4_1.5u (mesh44), extracted from the same MIT-licensed STEP source as stepped Caps. Asset bottom-mod-cad.js; license stepped-cad-LICENSE.txt applies. This is community Cherry-profile CAD, not GMK manufacturing CAD. Rubrehose base-kit render labels these modifiers R4; GMK guidelines distinguish regular row profiles from 4C spacebars. Measured transverse dish: center approx .33mm below samples 8mm either side. Existing spacebar is unchanged.
