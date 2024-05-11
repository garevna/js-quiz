<template>
  <v-bottom-navigation
    app
    style="box-shadow: none !important"
    class="dark-glass text-white"
    v-model="action"
    color="warning"
    v-resize="onResize"
  >
    <div v-if="state.startQuiz">
      <v-badge
        color="primary"
        :content="quizData.lives"
        class="mt-4 ml-2 mr-4"
      >
        <lives-icon size="32" />
      </v-badge>

      <progress-score v-model="quizData.score" class="mt-3 ml-4" />
    </div>

    <v-spacer />

    <span class="footer-copyright">
      Irina Fylyppova 2017
    </span>
  </v-bottom-navigation>
</template>

<script>

import { injectGlobalData } from '@/globalState'
import { injectQuizData } from '@/quizData'

import LivesIcon from '@/components/quiz-elements/lives-icon.vue'
import ProgressScore from '@/components/quiz-elements/progress-score.vue'

export default {
  name: 'AppFooter',

  components: {
    'lives-icon': LivesIcon,
    'progress-score': ProgressScore
  },

  data: () => ({
    state: {},
    quizData: {},
    action: 0,
    short: false
  }),

  methods: {
    onResize () {
      this.short = window.innerWidth <= 600
    }
  },

  created () {
    this.state = injectGlobalData()
    this.quizData = injectQuizData()
  }
}
</script>
