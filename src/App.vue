<template>
  <v-app class = "main-content" v-resize="windowResized">
    <parallax-back />

		<app-header />

    <canvas-component
      color="#fa0"
      width="100"
      height="90"
    />

    <app-footer />

    <show-slogans />

		<quiz-component />

    <nav-panel />
  </v-app>
</template>

<script>

import '@/css/root.css'
import '@/css/main.css'

import { provideGlobalData } from '@/globalState'
import { provideQuizData } from '@/quizData'
import { provideQuizLevelData } from '@/quizLevelData'

import { Parallax } from '@/components/parallax'

import AppHeader from '@/components/AppHeader.vue'
import AppFooter from '@/components/AppFooter.vue'

import QuizComponent from '@/components/QuizComponent.vue'
import NavigationPanel from '@/components/NavigationPanel.vue'
import CanvasComponent from '@/components/CanvasComponent.vue'
import ShowSlogans from '@/components/ShowSlogans.vue'

export default {
  name: 'App',

  components: {
    'app-header': AppHeader,
    'app-footer': AppFooter,
    'parallax-back': Parallax,
    'canvas-component': CanvasComponent,
    'nav-panel': NavigationPanel,
    'quiz-component': QuizComponent,
    'show-slogans': ShowSlogans
  },

  async created () {
    provideGlobalData()
    provideQuizData()
    provideQuizLevelData()
  }
}
</script>
