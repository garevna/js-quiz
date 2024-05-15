import '@mdi/font/css/materialdesignicons.css'
import { createApp } from 'vue/dist/vue.esm-bundler'
import App from './App.vue'

/* eslint-disable no-unused-vars */

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { VBtn } from 'vuetify/components/VBtn'

import { vuetifyOptions } from './vuetifyOptions'

const vuetify = createVuetify(vuetifyOptions)

import { canvasWidth, canvasHeight } from '@/configs'

import { init } from '@/init'

init().then(() => {
  createApp(App)
    .use(vuetify)
    .mount('#js-quiz')

  const root = document.querySelector(':root')
  root.style.setProperty('--canvas-width', canvasWidth + 'px')
  root.style.setProperty('--canvas-height', canvasHeight + 'px')
})
