<template>
  <v-text-field
    outlined
    class="ml-5 text-white"
    :suffix="quizLevelData.inputLegendAfter || ''"
    :prefix="quizLevelData.inputLegendBefore || ''"
    filled
    hide-details
    autofocus
    v-model="answer"
    style="max-width: 320px;"
  />
</template>

<script>

import { injectQuizLevelData } from '@/quizLevelData'

export default {
  name: 'InputAnswer',

  data: () => ({
    quizLevelData: {},
    answer: ''
  }),

  computed: {
    suffix () {
      return this.quizLevelData.inputLegend?.after || ''
    },
    prefix () {
      return this.quizLevelData.inputLegend?.before || ''
    }
  },

  watch: {
    answer (text) {
      this.testInput(text)
    }
  },

  methods: {
    testInput (answer) {
      Object.assign(this.quizLevelData.results, { right: 0, wrong: 0 })

      const test = this.quizLevelData.rightInput.includes(answer.trim())

      Object.assign(this.quizLevelData.results, { right: Number(test), wrong: Number(!test) })
    }
  },

  created () {
    this.quizLevelData = injectQuizLevelData()
  }
}
</script>
