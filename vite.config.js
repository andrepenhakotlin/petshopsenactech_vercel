// vite.config.js
import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  publicDir: 'assets',
  server: {
    port: 3000,
    open: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      input: {
        main: './index.html',
        cachorros: './pages/cachorros.html',
        gatos: './pages/gatos.html',
        passaros: './pages/passaros.html',
        peixes: './pages/peixes.html',
        jardim: './pages/jardim.html',
        promocoes: './pages/promocoes.html',
        areainterna: './pages/areainterna.html',
        contato: './pages/contato.html',
        sobre: './pages/sobre.html'
      }
    }
  }
})
