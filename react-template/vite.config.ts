import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import eslint from 'vite-plugin-eslint'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  return {
    base: './',
    plugins: [
      eslint({
        lintOnStart: true,
        exclude: ['node_modules', 'dist']
      }),
      react()
    ],
    define: {
      'process.env': env
    },
    optimizeDeps: {
      esbuildOptions: {
        define: {
          global: 'global'
        }
      },
      entries: []
    },
    server: {
      host: '0.0.0.0',
      port: 8090
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    }
  }
})
