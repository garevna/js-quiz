<template>
  <v-card
    flat
    class="dark-glass mx-auto"
    max-width="900"
    width="100%"
    height="600"
    v-if="state.startQuiz"
    style="margin-top: 64px; margin-bottom: 64px"
  >
    <v-card-title flat class="transparent">
      <v-avatar
         v-if="quizLevelData.type !== 'finish'"
        size="32"
        color="warning"
        class="mr-4"
      >
        <span class="text-h6">
          {{ quizData.currentLevel + 1 }}
        </span>
      </v-avatar>
      <small class="text-white" style="white-space: pre-wrap">
        {{ quizLevelData.question }}
      </small>
    </v-card-title>

    <v-tabs
      v-model="tab"
      color="warning"
      slider-color="warning"
      dark
      class="dark-glass"
    >
      <v-tab
        v-for="(item, index) in params"
        :key="index"
        ripple
      >
        <v-icon>{{ item.icon }}</v-icon>
      </v-tab>
    </v-tabs>

    <v-card
      v-if="state.quizReady"
      flat
      class="pb-12 dark-glass overflow-auto"
      height="412"
      width="100%"
    >
      <component :is="params[tab].component" />
    </v-card>

    <div class="bottom-bar dark-glass">
      <v-btn
        v-if="quizLevelData.type !== 'finish'"
        variant="text"
        @click="showResults"
        append-icon="mdi-send-check"
      >
        {{ buttonText }}
      </v-btn>

      <v-btn
        v-if="quizLevelData.type !== 'finish'"
        append-icon="mdi-page-next"
        @click="gotoNext"
        variant="text"
        class="mx-8"
      >
        Next
      </v-btn>

      <v-btn
        @click="exit"
        variant="text"
        append-icon="mdi-exit-to-app"
      >
        Exit
      </v-btn>
    </div>

    <results-popup />

  </v-card>
</template>

<script>
import '@/css/quiz.css'

import { injectGlobalData, getHost } from '@/globalState'
import { injectQuizData } from '@/quizData'
import { injectQuizLevelData } from '@/quizLevelData'

import {
  parseQuizFile,
  minify
} from '@/helpers'

import choiceVariants from '@/components/quiz-elements/choiceVariants.vue'
import InputAnswer from '@/components/quiz-elements/InputAnswer.vue'
import { jsCode } from '@/components/quiz-elements/js-code'
import { htmlCode } from '@/components/quiz-elements/html-code'
import ShowPicture from '@/components/quiz-elements/show-picture.vue'
import FinishPage from '@/components/quiz-elements/finish-page.vue'

import ResultsPopup from '@/components/quiz-elements/ResultsPopup.vue'

export default {
  name: 'QuizComponent',

  components: {
    'choice-variants': choiceVariants,
    'input-answer': InputAnswer,
    'js-code': jsCode,
    'html-code': htmlCode,
    'results-popup': ResultsPopup,
    'show-picture': ShowPicture,
    'finish-page': FinishPage
  },

  data: function () {
    return {
      tab: 0,
      state: {},
      quizData: {},
      quizLevelData: {},
      level: 1,
      validated: false
    }
  },

  computed: {
    pathToFile () {
      const level = this.quizData.levels[this.quizData.currentLevel]
      return `${getHost()}/quiz/${this.quizData.folder}/${level}.md`
    },

    buttonText () {
      return ['Check answer', 'Show result'][Number(this.validated)]
    },

    params () {
      if (this.quizLevelData.type === 'finish') return [{
        icon: 'mdi-account-school',
        component: 'finish-page'
      }]

      const result = []

      if (this.quizLevelData.picture) {
        result.push({
          icon: 'mdi-image',
          component: 'show-picture'
        })
      }

      if (this.quizLevelData.js) {
        result.push({
          icon: this.quizLevelData.type === 'findError' ? 'mdi-file-document-edit-outline' : 'mdi-code-json',
          component: 'js-code'
        })
      }
      if (this.quizLevelData.html) {
        result.push({
          icon: 'mdi-code-block-tags',
          component: 'html-code'
        })
      }

      if (this.quizLevelData.type === 'input') {
        result.push({
          icon: 'mdi-keyboard-variant',
          component: 'input-answer'
        })
      }
      if (this.quizLevelData.type === 'choice') {
        result.push({
          icon: 'mdi-button-cursor',
          component: 'choice-variants'
        })
      }

      return result
    }
  },

  watch: {
    'quizData.lives' (value) {
      !value && this.finish()
    }
  },

  methods: {
    showResults () {
      if (!this.validated) {
        if (this.quizLevelData.type === 'findError') this.validate()

        this.quizData.score += this.quizLevelData.results.right * this.quizLevelData.balls
        this.quizData.lives -= this.quizLevelData.results.wrong

        this.validated = true
      }

      this.state.showLevelResults = true
    },

    validate () {
      const snippet = document.querySelector('#js-script-snippet > pre > code')
      const answer = minify(snippet.innerText)
      const valid = minify(this.quizLevelData.rightContent)

      Object.assign(this.quizLevelData.results, {
        right: Number(answer === valid),
        wrong: Number(answer !== valid)
      })
    },

    async gotoNext () {
      this.validated = false
      this.tab = 0
      this.state.showLevelResults = false

      if (this.quizData.levels.length - 1 > this.quizData.currentLevel) {
        this.state.quizReady = false
        this.quizData.currentLevel += 1
        const response = await (await fetch(this.pathToFile)).text()
        Object.assign(this.quizLevelData, parseQuizFile(response))

        this.state.quizReady = true
      } else this.finish()
      // } else {
      //   Object.assign(this.quizLevelData, {
      //     type: 'finish',
      //     balls: 0,
      //     question: 'Results'
      //   })
      //
      //   this.state.quizReady = true
      // }

      localStorage.setItem('current-quiz', JSON.stringify(this.quizData))
    },

    finish () {
      this.validated = false
      this.tab = 0
      this.state.showLevelResults = false
      Object.assign(this.quizLevelData, {
        type: 'finish',
        balls: 0,
        question: 'Results'
      })

      this.state.quizReady = true
    },

    exit () {
      this.state.startQuiz = false
      this.state.quizReady = false
      localStorage.removeItem('current-quiz')
    }
  },

  created () {
    this.state = injectGlobalData()
    this.quizData = injectQuizData()
    this.quizLevelData = injectQuizLevelData()

    const { folder, currentLevel } = this.quizData
    if (folder && typeof currentLevel === 'number') {
      currentLevel < this.quizData.levels.length - 1 && this.quizData.currentLevel--
      this.gotoNext()
    }
  }
}
</script>

<style scoped>

.bottom-bar {
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0px;
  z-index: 1008;
  transform: translateY(0%);
  position: absolute;
  height: 56px;
  left: 0px;
  width: calc(100% + 0px);
}

/* .bottom-bar button {
  background: transparent;
  box-shadow: none;
}

.bottom-bar button:hover {
  background: transparent;
  color: #fa0;
} */

</style>
