<template>
  <img
    :src="quizLevelData.picture"
    max-width="100%"
  />
</template>

<script>

import { injectQuizLevelData } from '@/quizLevelData'

export default {
  name: 'ShowPicture',

  data: () => ({
    quizLevelData: {}
  }),

  mounted () {
    this.quizLevelData = injectQuizLevelData()
  }
}
</script>
