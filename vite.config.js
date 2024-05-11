import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  rollupOptions: {
    external: ['vue'],
    output: {
      globals: { vue: 'Vue' }
    }
  },
  plugins: [
    vue(),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
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
      // vue: path.resolve(__dirname, 'node_modules/vue'),
      '@': path.resolve(__dirname, 'src'),
    },
    symlinks: false
  },
  /* remove the need to specify .vue files https://vitejs.dev/config/#resolve-extensions
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ]
  },
  */
})
