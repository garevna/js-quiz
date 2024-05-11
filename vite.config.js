import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

const path = require('path')

export default defineConfig({
  rollupOptions: {
    external: ['vue'],
    output: {
      globals: { vue: 'Vue' }
    }
  },
  plugins: [
    vue(),
    vuetify({
      autoImport: true
    }),
  ],
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'true',
    'process.env': {}
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    symlinks: false
  }
})
