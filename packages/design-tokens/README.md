# @first-commit/design-tokens

A modular design token pipeline for validating, transforming, and distributing DTCG-compliant tokens across platforms and design systems.

The source of truth lives in `src/` as DTCG JSON. [Terrazzo](https://terrazzo.app/docs/) validates the token files and generates CSS and JavaScript artifacts in `dist/`.

## Package status

This package is currently private and intended for use inside the First Commit monorepo.

Add it to another workspace package with:

```json
{
  "dependencies": {
    "@first-commit/design-tokens": "workspace:*"
  }
}
```

## Build

```sh
bun run build
```

This generates:

- `dist/tokens.css` — CSS custom properties with light and dark theme permutations.
- `dist/tokens.js` — the JavaScript token resolver.
- `dist/tokens.d.ts` — generated TypeScript declarations.

## Usage

### CSS

Import the generated stylesheet from your application:

```css
@import "@first-commit/design-tokens/css";
```

The stylesheet follows the operating system color-scheme preference:

- Light tokens are applied by default.
- Dark tokens are applied inside `prefers-color-scheme: dark`.

### JavaScript

Select a theme permutation with the generated resolver:

```ts
import { resolver } from '@first-commit/design-tokens'

const tokens = resolver.apply({ theme: 'light' })
```

The resolver provides typed access to the resolved token set.

It is intended for programmatic token consumption. For browser styling, prefer the generated CSS output.

## Validation

```sh
bun run check
```

This validates the resolver configuration and runs Terrazzo's token lint rules.

## Scripts

| Script          | Description                                        |
| --------------- | -------------------------------------------------- |
| `bun run build` | Generates CSS and JavaScript artifacts in `dist/`. |
| `bun run dev`   | Watches token sources and rebuilds artifacts.      |
| `bun run check` | Validates the resolver and lints token sources.    |
| `bun run test`  | Runs the package validation checks.                |
| `bun run clean` | Removes generated build artifacts.                 |

## Source structure

```text
src/
├── foundation/
│   ├── colors.tokens.json
│   └── layout.tokens.json
├── theme/
│   ├── dark.tokens.json
│   └── light.tokens.json
└── tokens.resolver.json
```

- `foundation/` contains shared primitive tokens.
- `theme/` contains theme-specific semantic tokens.
- `tokens.resolver.json` composes the token sets and theme modifiers.

## Theming

The CSS output currently supports automatic color-scheme detection through the `prefers-color-scheme` media feature.

Theme selection is controlled by the user's operating system preferences.

## License

[MIT](./LICENSE) © First Commit
