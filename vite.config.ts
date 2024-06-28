import { vitePlugin as remix } from '@remix-run/dev'
import unocss from 'unocss/vite'
import { defineConfig } from 'vite'
import viteRestart from 'vite-plugin-restart'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [
    remix(),
    unocss(),
    tsconfigPaths(),
    viteRestart({ restart: './app/styles/*.css' })
  ],
  server: {
    host: true,
    port: 3000
  },
  optimizeDeps: {
    include: ['./app/styles/*.css']
  }
})
