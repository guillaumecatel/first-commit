# @first-commit/tsconfigs

Shared `tsconfig.json` bases for every package and app of the monorepo.

This package is intentionally **not published**: it is consumed by other
workspaces only through Bun's workspace protocol
(`"@first-commit/tsconfigs": "workspace:*"`).

## Available configurations

Each configuration is exposed as a package subpath export so it can be
referenced directly from a workspace's `tsconfig.json`:

| Export                                | File               | Use case                                               |
| ------------------------------------- | ------------------ | ------------------------------------------------------ |
| `@first-commit/tsconfigs/base`        | `base.json`        | Shared compiler options, extended by all other configs |
| `@first-commit/tsconfigs/bun-library` | `bun-library.json` | TypeScript packages built for the Bun runtime          |

## Usage

```json
// packages/my-package/tsconfig.json
{
  "extends": "@first-commit/tsconfigs/bun-library",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": ["src"],
  "exclude": ["src/**/*.test.ts", "src/**/*.spec.ts"]
}
```

> **Note:** TypeScript resolves path-based options (`rootDir`, `outDir`, `include`,
> `exclude`, ...) relative to the config file that declares them, not the file
> that extends it. For that reason these options are **not** set in the shared
> configs here and must be declared in each consuming package's own
> `tsconfig.json`, as shown above.

New flavors (e.g. `/svelte`, `/node`) can be added the same way: create the
new `*.json` file at the root of this package and expose it under
`exports` in [package.json](./package.json).
