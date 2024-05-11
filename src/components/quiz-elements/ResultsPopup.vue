<template>
  <v-snackbar
    :timeout="600000"
    color="#0007"
    v-model="state.showLevelResults"
    class="mb-12"
  >
    <v-badge color="success" :content="quizLevelData.results.right" class="mr-12 mt-4">
      <v-img width="48" :src="icons.right" />
    </v-badge>

    <v-badge color="error" :content="quizLevelData.results.wrong" class="ml-12 mt-4">
      <v-img width="48" :src="icons.wrong" />
    </v-badge>

    <template v-slot:actions>
      <v-btn
        text
        icon
        color="warning"
        @click="state.showLevelResults = false"
      >
        <v-icon>
          mdi-close
        </v-icon>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>

import { injectQuizLevelData } from '@/quizLevelData'
import { injectQuizData } from '@/quizData'
import { injectGlobalData } from '@/globalState'
import { icons } from '@/configs'

export default {
  name: 'ResultsPopup',

  data: () => ({
    icons,
    state: {},
    quizData: {},
    quizLevelData: {}
  }),

  created () {
    this.state = injectGlobalData()
    this.quizLevelData = injectQuizLevelData()
    this.quizData = injectQuizData()
  },

  updated () {
    if (this.state.showLevelResults) {
      const overlay = document.querySelector('.v-overlay.v-overlay--active')
      overlay && Object.assign(overlay.style, { background: 'rgba(0, 0, 0, 0)' })
    }
  }
}

</script>
