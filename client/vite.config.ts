import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://plot-automation.onrender.com',
        
        changeOrigin: true,
      },
      '/socket.io': {
        target: 'https://plot-automation.onrender.com',
        ws: true,
      },
    },
  },
});
