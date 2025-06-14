import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    base: env.VITE_BASENAME,
    build: {
        outDir: 'dist'
    },
    server: {
        port: 3000,
        // --- CLEANED UP CSP ---
        headers: {
          "Content-Security-Policy": 
            "default-src 'self'; " +
            "connect-src 'self' https://www.swapi.tech; " +
            "img-src 'self' https://starwars-visualguide.com data:; " +
            "style-src 'self' 'unsafe-inline'; " + // Allow styles from our domain and inline styles from Vite
            "script-src 'self' 'unsafe-inline';"   // Allow scripts from our domain and inline scripts
        }
        // --- END CLEANUP ---
    }
  }
})