import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'
import type { PlopTypes } from '@turbo/gen'

/** Shape of `turbo/generators/config.json`, injected into every template as `org`. */
interface OrganizationConfig {
  name: string
  scope: string
  email: string
  website: string
  repository: string
  license: string
  author: string
}

const PACKAGE_NAME_PATTERN = /^[a-z][a-z0-9-]*$/

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  // Turborepo bundles this plopfile into a temporary file and makes
  // `getPlopfilePath()` return that file's *directory* (i.e. `turbo/generators`),
  // which is also the safest way to locate the sibling `config.json`.
  const generatorsDir = plop.getPlopfilePath()
  const packagesDir = join(generatorsDir, '..', '..', 'packages')
  const rootDir = join(generatorsDir, '..', '..')

  const org = JSON.parse(
    readFileSync(join(rootDir, 'meta.json'), 'utf-8'),
  ) as OrganizationConfig

  plop.setGenerator('typescript-package', {
    description:
      'Create a new TypeScript package for the Bun runtime, pre-configured with the shared tsconfig, license, readme and changelog',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Package name (kebab-case, without the npm scope):',
        validate: (input: string) => {
          if (!input) return 'A package name is required'
          if (!PACKAGE_NAME_PATTERN.test(input))
            return 'Use lowercase letters, digits and dashes only (e.g. "date-utils")'
          if (existsSync(join(packagesDir, input)))
            return `packages/${input} already exists`
          return true
        },
      },
      {
        type: 'input',
        name: 'description',
        message: 'Short package description:',
        default: 'TODO: describe this package',
      },
    ],
    actions: (answers) => {
      if (!answers) return []

      // Expose the organization variables and the current year to every
      // Handlebars template rendered by the actions below.
      answers.org = org
      answers.year = new Date().getFullYear()

      const destination = 'packages/{{ dashCase name }}'

      return [
        {
          // `addMany` only strips the trailing `.hbs` extension when the
          // remaining file name still has an extension of its own (e.g.
          // `README.md.hbs` -> `README.md`). `LICENSE.hbs` has none, so it
          // is added explicitly with its final file name instead.
          type: 'add',
          path: `${destination}/LICENSE`,
          templateFile: 'templates/shared/LICENSE.hbs',
        },
        {
          type: 'addMany',
          destination,
          base: 'templates/shared',
          templateFiles: [
            'templates/shared/**/*.hbs',
            '!templates/shared/LICENSE.hbs',
          ],
        },
        {
          type: 'addMany',
          destination,
          base: 'templates/typescript-package',
          templateFiles: 'templates/typescript-package/**/*.hbs',
        },
      ]
    },
  })
}
