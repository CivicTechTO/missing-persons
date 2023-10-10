const path = require('path');
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/missing-persons/',
  resolve: {
    alias: {
      src: path.resolve('src/'),
    },
  },
});
