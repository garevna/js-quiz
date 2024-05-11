<template>
  <span>
    <v-badge
      large
      color="warning"
      :content="`${quizData.score}/${quizData.maxScore}`"
      dark
    >
      <img :src="scoreIcon" height="36" />
    </v-badge>
    <v-progress-linear
      style="display: inline-block; width: 120px"
      v-model="rating"
      :color="color || 'amber'"
      height="36"
    >
      <template v-slot:default="{ value }">
        <strong style="font-size: 12px; color: #f50">{{ Math.ceil(value) }}%</strong>
      </template>
    </v-progress-linear>
  </span>
</template>

<script>

import { injectQuizData } from '@/quizData'
import { pictures } from '@/configs'

export default {
  name: 'ProgressScore',

  props: ['size', 'color'],

  data: () => ({
    quizData: {},
    state: {},
    scoreIcon: pictures.scoreIcon
  }),

  computed: {
    rating () {
      return (this.quizData.score || 0) * 100 / (this.quizData.maxScore || 100)
    }
  },

  created () {
    this.quizData = injectQuizData()
  }
}
</script>
