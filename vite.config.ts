import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import progress from 'vite-plugin-progress';
import svgr from 'vite-plugin-svgr';
import TurboConsole from 'vite-plugin-turbo-console';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('@mui/base')) return 'vendor_mui_base';
          else if (id.includes('@mui/material')) return 'vendor_mui_material';
          else if (id.includes('@mui/system')) return 'vendor_mui_system';
          else if (id.includes('@mui/x')) return 'vendor_mui_x';
          else if (id.includes('lottie')) return 'vendor_lottie';
          else if (id.includes('framer')) return 'vendor_framer';
        },
      },
    },
  },
  plugins: [react(), progress(), svgr(), TurboConsole()],
});
