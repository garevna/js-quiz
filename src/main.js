import '@mdi/font/css/materialdesignicons.css'
import { createApp } from 'vue/dist/vue.esm-bundler'
import App from './App.vue'

/* eslint-disable no-unused-vars */

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { VBtn } from 'vuetify/components/VBtn'

const vuetify = createVuetify({
  defaults: {
    VBtn: {
      style: 'background: transparent; box-shadow: none;',
    },
    VSnackbar: {
      style: 'background: #0007'
    }
  },
  components,
  directives,
  iconfont: 'mdi',
  theme: {
    defaultTheme: 'dark',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#09B',
          secondary: '#079',
          accent: '#F0F',
          error: '#C00',
          info: '#5AF',
          success: '#090',
          warning: '#FA0'
        }
      },
      dark: {
        dark: true,
        colors: {
          primary: '#09B',
          secondary: '#079',
          accent: '#F0F',
          error: '#C00',
          info: '#5AF',
          success: '#090',
          warning: '#FA0'
        }
      }
    },
  },
})

import { canvasWidth, canvasHeight } from '@/configs'

// import { mainMenuItems } from '@/mainMenuItems'

import { init } from '@/init'

// const items = await (await fetch(`${getHost()}/mainMenuData.json`)).json()
// const levels = await (await fetch(`${getHost()}/levels.json`)).json()

// const mainMenuFolders = items.map(item => item.folder)

// console.warn(mainMenuFolders.filter(folder => !levels[folder]))
// console.warn(Object.keys(levels).filter(key => !mainMenuFolders.includes(key)))

// items.forEach(item => {
//   const level = levels[item.folder]
//   Object.assign(item, { levels: level })
// })
//
// mainMenuItems(items)

init().then(() => {
  createApp(App)
    .use(vuetify)
    .mount('#js-quiz')

  const root = document.querySelector(':root')
  root.style.setProperty('--canvas-width', canvasWidth + 'px')
  root.style.setProperty('--canvas-height', canvasHeight + 'px')
})

// createApp(App)
//   .use(vuetify)
//   .mount('#js-quiz')

// const root = document.querySelector(':root')
//
// root.style.setProperty('--canvas-width', canvasWidth + 'px')
// root.style.setProperty('--canvas-height', canvasHeight + 'px')
