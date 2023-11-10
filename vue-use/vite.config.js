import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { loadEnv } from './src/utils/vite.js'

const pathResolve = (dir) => {
  // eslint-disable-next-line no-undef
  return resolve(__dirname, '.', dir)
}

const viteConfig = (vpa) => {
  const { mode } = vpa
  // console.log(vpa)

  const { VITE_PORT, VITE_OPEN, VITE_BASE_PATH, VITE_OUT_DIR, VITE_PROXY_URL } = loadEnv(mode)
  let proxy = {}
  if (VITE_PROXY_URL) {
    proxy = {
      '/api': {
        target: VITE_PROXY_URL,
        changeOrigin: true
      }
    }
  }

  return {
    // eslint-disable-next-line no-undef
    root: process.cwd(),
    base: VITE_BASE_PATH,
    plugins: [vue(), vueJsx()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    server: {
      hmr: true,
      host: '0.0.0.0',
      port: VITE_PORT,
      open: VITE_OPEN,
      proxy
    },
    build: {
      sourcemap: false,
      outDir: VITE_OUT_DIR,
      emptyOutDir: true,
      chunkSizeWarningLimit: 1500
    }
  }
}

export default defineConfig(viteConfig)
