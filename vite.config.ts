import { resolve } from 'path';
import { config } from 'dotenv';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import TurboConsole from 'unplugin-turbo-console/vite';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const path = mode === 'development' ? '.env.development' : '.env.production';
  config({ path });
  return {
    plugins: [react(), svgr(), TurboConsole()],
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('@mui/base')) return 'vendor_mui_base';
            else if (id.includes('@mui/material')) return 'vendor_mui_material';
            else if (id.includes('@mui/system')) return 'vendor_mui_system';
            else if (id.includes('@mui/x')) return 'vendor_mui_x';
            else if (id.includes('lottie')) return 'vendor_lottie';
          },
        },
      },
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
      target: 'esnext',
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: process.env.VITE_API_BASE_URL,
          changeOrigin: true,
        },
      },
    },
  };
});
