<template>
  <v-tooltip top color="transparent">
    <template v-slot:activator="{ on }">
      <v-btn
        icon
        @click="$parent.exitQuiz"
        v-on="on"
      >
        <v-icon> mdi-exit-to-app </v-icon>
      </v-btn>
    </template>
    <span>Exit</span>
  </v-tooltip>
</template>

<script>

import { getExitQuiz, setExitQuiz } from '@/globalState'

export default {
  name: 'ExitButton',

  computed: {
    exitValue: {
      get () {
        return getExitQuiz()
      },
      set (val) {
        setExitQuiz(val)
      }
    }
  }
}
</script>
