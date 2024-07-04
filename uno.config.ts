import { readFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { defineConfig, transformerVariantGroup } from 'unocss'

async function css(filename: string) {
  const css = await readFile(resolve(`./app/styles/${filename}.css`), 'utf-8')

  return css
}

export default defineConfig({
  rules: [
    [
      /^animate-scroll-([a-zA-Z-]+)-(\d+)$/,
      ([, name, range]) => ({
        animation: `${name} linear both`,
        'animation-timeline': 'scroll()',
        'animation-range': `0 ${Number(range) / 4}rem`
      })
    ]
  ],
  theme: {
    colors: {
      neutral: '#f3f3f3',
      primary: '#060247',
      secondary: '#c644fd',
      decoration: '#3f0b79',
      warning: '#ff7100'
    }
  },
  transformers: [transformerVariantGroup()],
  preflights: [
    {
      layer: 'fonts',
      getCSS: async () => await css('fonts')
    },
    {
      layer: 'base',
      getCSS: async () => await css('base')
    },
    {
      layer: 'animations',
      getCSS: async () => await css('animations')
    }
  ],
  layers: { preflights: 1, base: 2, default: 3, animations: 4 }
})
