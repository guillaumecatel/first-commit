import { defineConfig } from '@terrazzo/cli'
import css from '@terrazzo/plugin-css'
import js from '@terrazzo/plugin-js'
import tailwind from '@terrazzo/plugin-tailwind'

export default defineConfig({
  tokens: ['src/tokens.resolver.json'],
  outDir: './dist/',
  plugins: [
    css({
      filename: 'tokens.css',
      permutations: [
        {
          input: { theme: 'light' },
          prepare: (contents) => `:root {\n  ${contents}\n}`,
        },
        {
          input: { theme: 'dark' },
          prepare: (contents) =>
            `@media (prefers-color-scheme: dark) {\n  :root {\n    ${contents}\n  }\n}`,
        },
      ],
    }),
    tailwind({
      template: '../src/tailwind.template.css',
      filename: 'tokens.tailwind.css',

      theme: {
        color: ['color.**'],
        spacing: ['spacing.**'],
        radius: ['borderRadius.**'],

        font: {
          sans: 'typography.family.base',
        },

        text: ['typography.**'],
      },
    }),
    js({
      filename: 'tokens.js',
    }),
  ],
  lint: {
    build: { enabled: true },
    rules: {
      'core/valid-color': 'error',
      'core/valid-dimension': 'error',
      'core/valid-font-family': 'error',
      'core/valid-font-weight': 'error',
      'core/valid-duration': 'error',
      'core/valid-cubic-bezier': 'error',
      'core/valid-number': 'error',
      'core/valid-link': 'error',
      'core/valid-boolean': 'error',
      'core/valid-string': 'error',
      'core/valid-stroke-style': 'error',
      'core/valid-border': 'error',
      'core/valid-transition': 'error',
      'core/valid-shadow': 'error',
      'core/valid-gradient': 'error',
      'core/valid-typography': 'error',
      'core/consistent-naming': 'warn',
    },
  },
})
