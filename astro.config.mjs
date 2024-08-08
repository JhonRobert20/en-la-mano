import { defineConfig } from 'astro/config'
import node from '@astrojs/node'
import preact from '@astrojs/preact'
import tailwind from '@astrojs/tailwind'

export default defineConfig({
  output: 'server',
  adapter: node({ mode: 'standalone' }),
  integrations: [preact(), tailwind({ applyBaseStyles: false })],
  security: { checkOrigin: true },
  server: { host: true, port: 3000 }
})
