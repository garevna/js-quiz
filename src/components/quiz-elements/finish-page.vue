<template>
  <v-card
    flat
    width="100%"
    height="100%"
    class = "background-picture"
    :image="background"
  >
    <h3 class="text-center my-12">
      You have <v-avatar color="secondary">{{ quizData.lives }}</v-avatar> lives left
    </h3>
    <h3 class="text-center">
      You've scored <v-avatar color="secondary">{{ quizData.score }}</v-avatar> points out of <v-avatar color="secondary">{{quizData.maxScore}}</v-avatar> possible
    </h3>
  </v-card>
</template>

<script>

import { injectQuizData } from '@/quizData'

import { pictures } from '@/configs'

export default {
  name: 'FinishPage',

  data: () => ({
    quizData: {},
    scoreIcon: pictures.scoreIcon
  }),

  computed: {
    success () {
      return this.quizData.lives === 10 && this.quizData.score === this.quizData.maxScore
    },

    failure () {
      return this.quizData.lives === 0
    },

    background () {
      return this.success
        ? pictures.success
        : this.failure
          ? pictures.failure
          : pictures.final
    }
  },

  mounted () {
    this.quizData = injectQuizData()
  },

  beforeUnmount () {
    const { folder, lives, score, maxScore } = this.quizData

    localStorage.setItem(folder, JSON.stringify({
      data: Date.now(),
      lives,
      score,
      maxScore
    }))

    Object.assign(this.quizData, {
      folder: '',
      title: '',
      levels: [],
      currentLevel: 0,
      lives: 10,
      score: 0
    })
  }
}
</script>

<style>

.background-picture {
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

h3 {
  text-shadow: 0 0 3px #000d;
}
</style>
