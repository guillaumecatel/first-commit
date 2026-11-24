# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Bun workspaces monorepo (`apps/*`, `packages/*`) with Turborepo pipeline
- Biome for linting and formatting
- Lefthook git hooks:
  - `pre-commit`: Biome (with auto-fix) on staged files, Syncpack when a `package.json` changes
  - `commit-msg`: Commitlint with Conventional Commits
- Syncpack configuration to keep dependency versions consistent across workspaces
- `@first-commit/tsconfigs` package with `base` and `bun-library` presets
- Turborepo generator with a `typescript-package` template and shared templates (README, LICENSE, CHANGELOG)
- `meta.json` holding project metadata (scope, author, license) used by generators
- Root scripts: `build`, `dev`, `test`, `typecheck`, `lint`, `format`, `gen`, `clean`, `nuke`
- README documenting setup, generators, scripts and git workflow
- MIT license

[Unreleased]: https://github.com/guillaumecatel/first-commit/commits/main
