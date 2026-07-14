import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_ACTIONS ? '/caravel/' : '/',
  build: {
    rollupOptions: {
      input: {
        home: 'index.html',
        studio: 'create-website.html',
      },
    },
  },
});
