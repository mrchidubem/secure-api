import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'          // ← this is correct for Tailwind v4+
import path from 'path'                               // ← add this import

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    tailwindcss(),
  ],

  // ← Add this block to fix the @/ import error
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})