# First Commit

An opinionated **Bun + Turborepo** monorepo starter. It gives you a solid foundation (tooling, shared TypeScript configs, git hooks, code generators) so you can focus on building packages and apps instead of wiring infrastructure.

The goal: run one command to scaffold a new package or application, with everything already consistent across the workspace.

## Features

- **[Bun](https://bun.sh)** as runtime, package manager and test runner
- **[Turborepo](https://turbo.build)** for task orchestration and caching
- **[Biome](https://biomejs.dev)** for linting and formatting
- **[Lefthook](https://github.com/evilmartians/lefthook)** for fast git hooks
- **[Commitlint](https://commitlint.js.org)** to enforce Conventional Commits
- **[Syncpack](https://jamiemason.github.io/syncpack/)** to keep dependency versions aligned across the workspace
- **Shared TypeScript configs** as an internal package (`@first-commit/tsconfigs`)
- **Turborepo generators** to scaffold new workspaces from templates

## Project structure

```
.
├── apps/                    # Applications
├── packages/
│   └── tsconfigs/           # Shared TypeScript configurations
├── turbo/
│   └── generators/          # Turborepo generators and Handlebars templates
│       └── templates/
│           ├── shared/              # Files common to every workspace (README, LICENSE, CHANGELOG)
│           └── typescript-package/  # TypeScript package template
├── biome.json               # Linter / formatter configuration
├── commitlint.config.ts     # Conventional Commits rules
├── lefthook.yml             # Git hooks
├── meta.json                # Project metadata (scope, author, license...) used by generators
├── syncpack.config.ts       # Dependency version consistency rules
├── tsconfig.json            # Root TypeScript configuration
└── turbo.json               # Turborepo pipeline
```

## Getting started

### Prerequisites

- [Bun](https://bun.sh) `1.4.5` or later
- Git

> The repository enforces Bun as its package manager: installing with npm, yarn or pnpm will fail.

### Installation

```bash
git clone https://github.com/guillaumecatel/first-commit.git
cd first-commit
bun install
```

Installing dependencies also sets up the git hooks through Lefthook.

## Scaffolding with generators

Create a new workspace interactively:

```bash
bun gen
```

This runs `turbo gen` and then `bun install` so the new workspace is linked right away.

Available generators:

| Generator            | Description                                                            |
| -------------------- | ---------------------------------------------------------------------- |
| `typescript-package` | A TypeScript library with build config, `bunfig.toml` and a test setup |

Every generated workspace ships with a `README.md`, a `LICENSE` and a `CHANGELOG.md`, built from the shared templates and the values in `meta.json`.

## Shared TypeScript configs

The `tsconfigs` package exposes reusable presets:

- `base.json`: strict baseline shared by every workspace
- `bun-library.json`: preset for libraries running on Bun

Extend them from any workspace:

```json
{
  "extends": "@first-commit/tsconfigs/bun-library.json"
}
```

## Scripts

All scripts are run from the repository root.

| Script               | Description                            |
| -------------------- | -------------------------------------- |
| `bun run build`      | Build all workspaces                   |
| `bun run dev`        | Start development tasks                |
| `bun run test`       | Run all tests                          |
| `bun run typecheck`  | Type-check all workspaces              |
| `bun run lint`       | Lint with Biome                        |
| `bun run lint:fix`   | Lint and apply fixes                   |
| `bun run format`     | Check formatting (Biome and Syncpack)  |
| `bun run format:fix` | Apply formatting (Biome and Syncpack)  |
| `bun run gen`        | Scaffold a new workspace, then install |
| `bun run clean`      | Remove build caches and `node_modules` |
| `bun run nuke`       | `clean` and remove the lockfile        |

## Git workflow

- **`pre-commit`**: runs Biome on staged files (with auto-fix) and Syncpack when a `package.json` changes
- **`commit-msg`**: Commitlint enforces [Conventional Commits](https://www.conventionalcommits.org), e.g. `feat(tsconfigs): add bun-library preset`

## Roadmap

- [ ] Application generators (with deployment configuration)
- [ ] Additional package templates
- [ ] CI/CD workflows
- [ ] Release automation and changelog generation

## License

[MIT](./LICENSE) © [First Commit](https://first-commit.site)
