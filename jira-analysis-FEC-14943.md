---
ticket: FEC-14943
title: "Transcript plugin: expose CSS custom properties and stable root class for theming"
date: 2026-08-27
status: Open
assignee: Ravit Shalem
---

# FEC-14943 — Transcript plugin: expose CSS custom properties and stable root class for theming

## 1. Executive Summary

FEC-14943 asks the `playkit-js-transcript` plugin to expose a stable CSS theming surface for external consumers — specifically by (1) converting its internal SCSS variables to CSS custom properties (CSS variables) that can be overridden at runtime, and (2) adding a stable, non-CSS-module-hashed root class name to the transcript panel's outermost element. Currently, all colors and visual tokens are compiled-in SCSS variables that cannot be overridden by integrators without forking or fighting specificity battles against hashed class names. This change would allow product teams and partners to theme the transcript panel declaratively with a small block of CSS, without touching plugin internals.

This story is part of the larger Epic **FEC-14941** ("Plugin theming: expose stable CSS customization surface via CSS custom properties and stable root classes") which applies the same pattern across multiple Kaltura plugins.

---

## 2. Technical Requirements & Implementation Details

**Core behavior**

- Replace or alias all `$tone-N-color`, `$primary-*-color`, `$secondary-*-color`, `$tab-focus-color`, and `$plugin-background` SCSS variables in the transcript plugin with CSS custom properties (`var(--kp-transcript-<token>, <fallback>)`) so that consumers can override them by setting those properties on any ancestor element.
- Add a stable, non-mangled CSS class (e.g., `kp-transcript-root`) to the outermost `<div>` of the Transcript component (`transcript.tsx:render → className={`${styles.root} kp-transcript-root`}`).
- The stable class must survive CSS module hashing — it is a plain string literal concatenated to the CSS modules class, not a key in a CSS modules file.

**Data structures / API contracts**

The set of custom properties to expose maps directly from the SCSS variables currently in use:

| CSS Custom Property | Current SCSS Variable | Used In |
|---|---|---|
| `--kp-transcript-text-primary` | `$tone-1-color` | caption, transcript.scss |
| `--kp-transcript-text-secondary` | `$tone-2-color` | caption-time |
| `--kp-transcript-text-muted` | `$tone-3-color` | spinner, error |
| `--kp-transcript-bg-hover` | `$tone-4-color` | popover hover |
| `--kp-transcript-bg-active` | `$tone-6-color` | plugin-button, caption hover |
| `--kp-transcript-bg-surface` | `$tone-7-color` | popover background |
| `--kp-transcript-text-on-bg` | `$tone-8-color` | highlight-search |
| `--kp-transcript-accent` | `$primary-color` | highlighted caption bg |
| `--kp-transcript-accent-dark` | `$primary-darker-color` | active-search, skip-button border |
| `--kp-transcript-accent-bright` | `$primary-brighter-color` | text selection bg |
| `--kp-transcript-accent-text` | `$primary-text-contrast-color` | caption highlighted text |
| `--kp-transcript-secondary-accent` | `$secondary-color` | highlight-search bg |
| `--kp-transcript-secondary-text` | `$secondary-text-contrast-color` | active-search text |
| `--kp-transcript-focus-ring` | `$tab-focus-color` | focus outlines |
| `--kp-transcript-panel-bg` | `$plugin-background` | `.root` background |

**Edge cases**

- Fallback values in `var()` calls must exactly match the compiled SCSS variable values so the plugin renders identically when no overrides are applied.
- `$roundness-1` and `$roundness-3` should also become custom properties (`--kp-transcript-radius-sm`, `--kp-transcript-radius-lg`) to allow shape theming.
- CSS module hashing: the stable class must be a string literal in JSX, not a CSS modules key.
- The scrollbar mixin (`plugin-scrollbar`) uses hardcoded colors — these should also be wired to custom properties.

**Parameters & defaults**

- Custom properties should be defined with their defaults directly in the rule that uses them, or on the `.root` / `kp-transcript-root` selector in a single `variables.scss` block.

**Dependencies**

- `@playkit-js/playkit-js-ui` for the upstream SCSS variable values that should be used as fallbacks.
- Webpack `css-loader` / `sass-loader` pipeline — no changes needed; CSS custom properties pass through as-is.

---

## 3. Product & Technical Clarifications

1. **Naming convention**: Is there an agreed naming scheme for custom properties across the Epic (FEC-14941)? E.g., `--kp-transcript-*` vs `--playkit-transcript-*` vs `--kaltura-transcript-*`? A shared prefix convention should be decided before any plugin-specific story is merged.
2. **Scope of the custom properties**: Should defaults be defined on `:root`, on the stable root class (`.kp-transcript-root`), or on the host element? Scoping to the root class is the safest approach (avoids polluting the global scope) but requires integrators to know the class name.
3. **Token set completeness**: Does the ticket cover only colors, or also spacing, typography (`font-size`, `line-height`), and border-radii? The current SCSS has local variables for `$button-height` and `$header-margin-bottom` that are not in `variables.scss` — should those be exposed?
4. **Backward compatibility**: Are existing hashed CSS class selectors (used by any integration tests or automation scripts) expected to keep working? Adding the stable class is additive; the hashed class would remain alongside it.
5. **Documentation artifact**: Is a theming guide / list of supported properties required as a deliverable, or just a code comment / CHANGELOG entry?
6. **Theming via config vs. CSS override**: Is the intent purely CSS-override at the page level, or should the plugin also accept a `theme` config object that sets these properties programmatically?
7. **Scrollbar customization**: The `plugin-scrollbar` mixin uses hardcoded `rgba` values. Should those be exposed too, or is scrollbar theming out of scope?

---

## 4. Repository Impact Analysis

### `kaltura/playkit-js-transcript`

> **Role:** This is the Transcript plugin itself — the only repository where the SCSS, component JSX, and theming surface live.
> **Change type:** `Modification`

**Affected files**

| File | What changes |
|---|---|
| `src/variables.scss` | Map each SCSS variable to a CSS custom property with the original value as fallback; define `--kp-transcript-*` tokens here |
| `src/components/transcript/transcript.scss` | Replace SCSS variable references with `var(--kp-transcript-*, $fallback)` for all color/bg/focus tokens |
| `src/components/caption/caption.scss` | Same conversion for `$tone-*`, `$primary-*`, `$secondary-*` variable references |
| `src/components/spinner/spinner.scss` | Replace `$tone-3-color` with `var(--kp-transcript-text-muted, ...)` |
| `src/components/plugin-button/plugin-button.scss` | Replace `$tone-6-color` with `var(--kp-transcript-bg-active, ...)` |
| `src/components/popover-menu/popover-menu.scss` | Replace `$tone-4-color`, `$tone-7-color` references |
| `src/components/transcript/transcript.tsx` | Add `kp-transcript-root` literal class to root `<div>` alongside `{styles.root}` |
| `cypress/e2e/transcript.cy.ts` | Add assertions for the stable `kp-transcript-root` class being present; add basic theming override test |

*Note: `src/components/popover-overlay/popover-overlay.scss`, `src/components/autoscroll-button/autoscroll-button.scss`, and `src/components/caption-list/captionList.scss` should each be audited for additional SCSS variable references that need the same treatment.*

---

## 5. Effort Sizing & Risk Assessment

**Complexity rating**: `Low / Medium` — The mechanical conversion is low-complexity (text substitution); the risk lies in identifying every SCSS variable usage and agreeing on the naming convention before starting.

**High-complexity areas**
- **Token naming alignment with Epic FEC-14941**: If all sibling plugin stories (for Chapters, Navigation, etc.) must use a shared naming convention, the naming decisions made here will set a precedent or must be retroactively changed — coordination overhead could be significant.
- **Scrollbar theming**: `::-webkit-scrollbar` pseudo-elements have non-standard cascade behavior; CSS custom properties inside the mixin need care.
- **Fallback fidelity**: The fallback values inside `var()` must exactly replicate what `@playkit-js/playkit-js-ui` compiles SCSS variables to. If those upstream values change, the fallbacks diverge silently.

**Cross-repo dependencies**
- **`@playkit-js/playkit-js-ui`** — `blocking`: the correct fallback values for `$tone-N-color` must be sourced from here. No code changes needed in that repo, but the values must be verified before writing fallbacks.
- **`playkit-js-transcript`** — primary repo; no other plugin repo needs changes for this story.

**Risk flags**
- Token naming is unresolved (see Section 3, Q1) — if the convention changes after implementation, all `--kp-transcript-*` references must be renamed.
- No visual regression test infrastructure is evident in the repo (Cypress functional tests only) — CSS changes will not be caught by CI.
- Number of SCSS files with variable references is broader than the 8 files listed in Section 4; a missed file leaves an un-themeable gap.
- The ticket description was not directly accessible (MCP truncation), which may mean additional acceptance criteria or constraints exist in the full ticket body.

**Rough effort estimate**: `S` — 1–2 days for a developer already familiar with the repo. Swings to `M` if the token naming convention requires cross-team alignment first, or if additional tokens (spacing, typography) are in scope.

---

## 6. Micro-Task Breakdown

### Frontend / UI layer

1. **`src/variables.scss`**: Define the full set of `--kp-transcript-*` CSS custom properties with their current compiled-value fallbacks. Add them as a variable block (either inside a `.kp-transcript-root` selector or as `$var: var(--kp-transcript-X, <current-value>)` re-declarations).
2. **`src/components/transcript/transcript.scss`**: Replace every `$tone-*`, `$primary-*`, `$secondary-*`, `$tab-focus-color`, and `$plugin-background` reference with `var(--kp-transcript-<token>, <fallback>)`.
3. **`src/components/caption/caption.scss`**: Same substitution for all color variable references.
4. **`src/components/spinner/spinner.scss`**, **`plugin-button.scss`**, **`popover-menu.scss`**, **`captionList.scss`**, **`autoscroll-button.scss`**, **`popover-overlay.scss`**: Audit each file and apply the same variable-to-custom-property substitution.
5. **`src/components/transcript/transcript.tsx`**: Change the root `<div>` render to: `className={[styles.root, 'kp-transcript-root', kitchenSinkActive || kitchenSinkDetached ? '' : styles.hidden].join(' ').trim()}`. Ensure the stable class is not conditionally applied.

### Core engine / plugin logic layer

None.

### Integration & configuration layer

None — no config changes or inter-plugin API changes required.

### Documentation & testing

6. **`cypress/e2e/transcript.cy.ts`**: Add a test assertion that `cy.get('.kp-transcript-root')` exists when the transcript panel is open; add a test that sets a `--kp-transcript-text-primary` CSS override on the root and verifies the applied style.
7. **`CHANGELOG.md`**: Record the new stable class and exposed CSS custom properties so integrators can discover them.

**Suggested sequencing**: Start with task 1 (token definitions in `variables.scss`) since every SCSS change depends on agreeing on the token names. Run tasks 2–4 in parallel once names are agreed. Task 5 (stable class) is fully independent and can be done any time. Complete task 6 (tests) only after 2–5 pass a manual visual check, and task 7 last.

---

## 7. Claude Implementation Prompt

```markdown
## Context

`playkit-js-transcript` is a Kaltura Player plugin that renders a scrollable, searchable transcript panel as a side panel inside the video player. It is built with Preact and SCSS modules (processed via webpack's `css-loader` + `sass-loader`). Currently all visual tokens (colors, backgrounds, border-radii) are resolved at build time from SCSS variables imported from `@playkit-js/playkit-js-ui`, which means external integrators cannot override them at runtime. The goal of this change is to expose a stable CSS theming surface.

## Task

1. Convert all SCSS color/bg/focus/radius variable references in the plugin to CSS custom properties with appropriate fallback values.
2. Add a stable (non-CSS-module-hashed) class name `kp-transcript-root` to the outermost element of the Transcript component so that integrators can scope their CSS overrides reliably.

## Files to change

- `src/variables.scss` — Define `--kp-transcript-*` CSS custom properties (or re-map SCSS vars to `var()` calls with fallbacks).
- `src/components/transcript/transcript.scss` — Replace `$tone-*`, `$primary-*`, `$secondary-*`, `$tab-focus-color`, `$plugin-background` with `var(--kp-transcript-<token>, <fallback>)`.
- `src/components/caption/caption.scss` — Same substitution for all color variable references.
- `src/components/spinner/spinner.scss` — Replace `$tone-3-color`.
- `src/components/plugin-button/plugin-button.scss` — Replace `$tone-6-color`.
- `src/components/popover-menu/popover-menu.scss` — Replace `$tone-4-color`, `$tone-7-color`.
- `src/components/caption-list/captionList.scss` — Audit and replace any SCSS color variable references.
- `src/components/transcript/transcript.tsx` — Add `kp-transcript-root` literal to the root `<div>` className.
- `cypress/e2e/transcript.cy.ts` — Add tests for the stable class and a basic theming override.

## Implementation steps

1. Open `src/variables.scss`. Below the existing `$plugin-background` declaration, add a mapping block that re-declares each SCSS variable using `var()`:
   ```scss
   $tone-1-color: var(--kp-transcript-text-primary, #{$tone-1-color});
   ```
   Repeat for every token in the table below. The `#{}` interpolation must wrap the original value to avoid recursive variable references — declare the original value first with a private name (e.g., `$_tone-1-color`) then alias:
   ```scss
   $_tone-1-color: $tone-1-color; // original from @playkit-js/playkit-js-ui
   $tone-1-color: var(--kp-transcript-text-primary, #{$_tone-1-color});
   ```
   Token mapping:
   - `$tone-1-color` → `--kp-transcript-text-primary`
   - `$tone-2-color` → `--kp-transcript-text-secondary`
   - `$tone-3-color` → `--kp-transcript-text-muted`
   - `$tone-4-color` → `--kp-transcript-bg-hover`
   - `$tone-6-color` → `--kp-transcript-bg-active`
   - `$tone-7-color` → `--kp-transcript-bg-surface`
   - `$tone-8-color` → `--kp-transcript-text-on-bg`
   - `$primary-color` → `--kp-transcript-accent`
   - `$primary-darker-color` → `--kp-transcript-accent-dark`
   - `$primary-brighter-color` → `--kp-transcript-accent-bright`
   - `$primary-text-contrast-color` → `--kp-transcript-accent-text`
   - `$secondary-color` → `--kp-transcript-secondary-accent`
   - `$secondary-text-contrast-color` → `--kp-transcript-secondary-text`
   - `$tab-focus-color` → `--kp-transcript-focus-ring`
   - `$plugin-background` → `--kp-transcript-panel-bg`
   - `$roundness-1` → `--kp-transcript-radius-sm`
   - `$roundness-3` → `--kp-transcript-radius-lg`

2. Also update `plugin-scrollbar` mixin in `src/variables.scss`: replace the hardcoded `rgba(33, 33, 33, 0.9)` with `var(--kp-transcript-scrollbar-track, rgba(33, 33, 33, 0.9))` and `rgba(255, 255, 255, 0.3)` with `var(--kp-transcript-scrollbar-thumb, rgba(255, 255, 255, 0.3))`.

3. Open `src/components/transcript/transcript.tsx`. Find the root `<div>` render:
   ```tsx
   className={`${styles.root} ${kitchenSinkActive || kitchenSinkDetached ? '' : styles.hidden}`}
   data-testid="transcript_root"
   ```
   Change it to:
   ```tsx
   className={['kp-transcript-root', styles.root, kitchenSinkActive || kitchenSinkDetached ? '' : styles.hidden].filter(Boolean).join(' ')}
   data-testid="transcript_root"
   ```

4. Because `variables.scss` is the single source for all tokens (all component SCSS files import it via `@import '../../variables.scss'`), no further changes are needed in the component SCSS files — the SCSS variable re-declaration in step 1 propagates automatically.

5. Open `cypress/e2e/transcript.cy.ts`. Add after the existing visibility assertion:
   ```ts
   cy.get('.kp-transcript-root').should('exist');
   // Basic theming override test
   cy.get('.kp-transcript-root').invoke('attr', 'style', '--kp-transcript-text-primary: rgb(255, 0, 0)');
   cy.get('.kp-transcript-root').should('have.css', '--kp-transcript-text-primary', 'rgb(255, 0, 0)');
   ```

## Acceptance criteria

- All SCSS color, background, border-radius, and focus-ring tokens in the transcript plugin are exposed as `--kp-transcript-*` CSS custom properties.
- The transcript panel renders identically to before when no custom properties are set (fallback values match current compiled output).
- Setting `--kp-transcript-panel-bg: red` on any ancestor element changes the transcript panel background to red.
- The outermost element of the transcript panel always carries the class `kp-transcript-root` (alongside any CSS modules hashed class).
- `cy.get('.kp-transcript-root')` succeeds in Cypress when the panel is open.
- No TypeScript or build errors are introduced.

## Constraints & gotchas

- **SCSS interpolation with `var()`**: SCSS cannot use `var()` directly as a variable value without `#{}` interpolation in some contexts. Use the private-alias pattern (`$_original: $x; $x: var(--token, #{$_original})`) to avoid circular references.
- **CSS Modules do NOT mangle string literals in JSX**: `'kp-transcript-root'` in the className string will be output as-is. Do NOT add `kp-transcript-root` as a key in any `.scss` file, or it will be hashed.
- **`$roundness-1` and `$roundness-3` are defined locally in `src/variables.scss`** (not from `playkit-js-ui`), so no private alias is needed for them — just declare the custom property directly.
- **The import order matters**: The alias block in `variables.scss` must come after the `@import '~@playkit-js/playkit-js-ui'` line.
- **Do not change the `data-testid="transcript_root"` attribute** — this is used by existing Cypress tests and must not be removed.
- **Scrollbar pseudo-element support**: `var()` inside `::-webkit-scrollbar-*` rules is supported in all modern browsers but not in IE11. This is acceptable given the player's browser support matrix.
```
