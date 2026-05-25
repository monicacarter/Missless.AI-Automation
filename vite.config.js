import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Missless.AI-Automation/',
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
});
