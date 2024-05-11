<template>
  <v-navigation-drawer
    app
    bottom
    absolute
    temporary
    class="dark-glass"
    :width="width"
    v-model="state.navDriwer"
  >
    <v-list class="pa-0 transparent">
      <v-list-item class="text-white">
        <select-category
          v-model:selectedCategory="selectedCategory"
          :modelValue="selectedCategory"
          @update:modelValue="selectedCategory = $event"
        />
      </v-list-item>

      <v-divider />

      <v-list-item
        class="transparent"
        v-for="item in items"
        :key="item.folder"
        @click="clickHandler(item)"
      >
        <v-icon color="warning" class="mr-2">mdi-folder-question</v-icon>
        <span class="text-white">{{ item.title }}</span>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>

import { injectGlobalData, getHost } from '@/globalState'
import { injectQuizData } from '@/quizData'
import { injectQuizLevelData } from '@/quizLevelData'

import { parseQuizFile } from '@/helpers'

import { pictures } from '@/configs/pictures'

import { methods } from '@/helpers/parse'

import SelectCategory from '@/components/select-category.vue'

import { mainMenuItems } from '@/mainMenuItems'

export default {
  name: 'NavigationPanel',

  components: {
    'select-category': SelectCategory
  },

  data: () => ({
    state: {},
    quizData: {},
    quizLevelData: {},
    selectedCategory: null
  }),

  computed: {
    navigationPanelIcon () {
      return pictures.navigationPanelIcon
    },

    width: {
      get () {
        return Math.max(window.innerWidth/2, 300)
      }
    },
    height () {
      return window.innerHeight - 80
    },

    items () {
      return this.selectedCategory
        ? mainMenuItems()
          .filter(item => item.categories && item.categories.includes(this.selectedCategory))
        : mainMenuItems()
    },
  },

  methods: {
    async clickHandler (item) {
      let { folder, title, levels, maxScore = 0 } = item

      location.hash = folder

      const promises = levels.map(level => fetch(`${getHost()}/quiz/${folder}/${level}.md`))

      const responses = await Promise.all(promises)

      levels = levels.filter((level, index) => responses[index].status === 200)

      const tmp = responses
        .filter(response => response.status === 200)
        .map(response => response.text())

      const results = await Promise.all(tmp)

      const quizLevelData = parseQuizFile(results[0])

      const scores = results.map(result => methods.balls(result))

      maxScore = scores.reduce((res, item) => res += item, 0)

      Object.assign(this.quizData, {
        folder,
        title,
        levels,
        lives: 10,
        maxScore,
        currentLevel: 0,
        score: 0
      })

      Object.assign(this.state, {
        startQuiz: true,
        quizReady: true,
        navDriwer: false
      })

      Object.assign(this.quizLevelData, quizLevelData)

      localStorage.setItem('current-quiz', JSON.stringify(this.quizData))
    }
  },

  created () {
    this.state = injectGlobalData()
    this.quizData = injectQuizData()
    this.quizLevelData = injectQuizLevelData()
  }
}
</script>
