// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/Missless.AI-Automation/', // important for GitHub Pages
  plugins: [react()],
});