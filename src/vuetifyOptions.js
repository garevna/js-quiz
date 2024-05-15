import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export const vuetifyOptions = {
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
    }
  }
}
