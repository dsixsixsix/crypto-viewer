import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Оптимизация для продакшена
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    },
    // Разделение кода на чанки
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          // Можно добавить другие чанки по необходимости
        }
      }
    },
    // Настройки для ассетов
    assetsInlineLimit: 4096, // 4kb
  },
  // Настройки сервера разработки
  server: {
    port: 3000,
    open: true,
    // Настройка CORS
    cors: true
  },
  // Алиасы путей
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    }
  },
  // Настройки для обработки ассетов
  publicDir: 'public',
  assetsInclude: ['**/*.woff', '**/*.woff2']
})
