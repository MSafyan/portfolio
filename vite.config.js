import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.glb', '**/*.gltf'],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('three') || id.includes('@react-three') || id.includes('troika')) {
            return 'three-vendor';
          }
          if (id.includes('framer-motion')) {
            return 'framer-vendor';
          }
        },
      },
    },
  },
})
