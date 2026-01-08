import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // <-- allow network access (phone/devices)
    port: 5173, // optional, Vite port
    proxy: {
      '/api': 'http://localhost:3000', // <-- forward all /api calls to Express
    },
  },
});