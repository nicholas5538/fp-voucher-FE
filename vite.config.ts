import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('@mui/x')) {
            return 'vendor_mui_x';
          } else if (id.includes('@mui')) {
            return 'vendor_mui';
          } else if (id.includes('lottie')) {
            return 'vendor_lottie';
          } else if (id.includes('framer')) {
            return 'vendor_framer';
          }
        },
      },
    },
  },
  plugins: [react(), svgr(), splitVendorChunkPlugin()],
});
