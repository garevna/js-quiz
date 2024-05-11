<template>
	<v-app-bar app class="dark-glass">
		<div
      v-if="!state.startQuiz && !state.navDriwer"
			@click="state.navDriwer = true"
		>
      <img :src="navigationPanelIcon" width="40" class="ml-4" />
  </div>
  <div v-else>
    <h4 class="text-white my-auto ml-5 d-inline-block">
      {{ quizData.title }}
    </h4>
	</div>

	<img :src="personage" style="position: fixed; top: 0; right: 8px;" height="56" />
	</v-app-bar>
</template>

<script>

import { injectGlobalData } from '@/globalState'
import { injectQuizData } from '@/quizData'

import { pictures } from '@/configs'

export default {
  name: 'AppHeader',

  data: () => ({
    state: {
      currentQuizTitle: '',
      quizReady: false,
      navDriwer: false
    }
  }),

  computed: {
		navigationPanelIcon () {
      return pictures.navigationPanelIcon
    },

		personage () {
      return pictures.personage
    },

    navDriwer: {
      get () {
        return this.state.navDriwer
      },
      set (val) {
        this.state.navDriwer = Boolean(val)
      }
    },

    startQuiz: {
      get () {
        return this.state.startQuiz
      },
      set (val) {
        this.state.startQuiz = Boolean(val)
      }
    },

    currentQuizLevel () {
      return this.quizData.level
    }
  },

  async created () {
    this.state = injectGlobalData()
    this.quizData = injectQuizData()
  }
}
</script>
