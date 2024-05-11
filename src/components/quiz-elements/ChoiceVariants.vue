<template>
  <div v-if="images" class="my-12">
    <div
      v-for="(image, index) in images"
      :key="index"
      class="my-12"
    >
      <v-checkbox
        class="text-white"
        v-model="selected"
        :value="index"
        hide-details
      />
      <img
        :src="image"
        width="80"
        class="ml-8"
        style="margin-top: -80px"
      />
    </div>
  </div>
  <div v-if="html" class="my-12">
    <div
      v-for="(elem, index) in html"
      :key="index"
      class="my-12"
    >
      <v-checkbox
        class="text-white"
        v-model="selected"
        :value="index"
        hide-details
      />
      <div
        class="html-element ml-12"
        v-html="elem"
      />
    </div>
  </div>
  <div v-if="!html && !images">
    <v-checkbox
      v-for="(variant, index) in quizLevelData.choiceVariants"
      :key="index"
      class="text-white"
      :label="variant"
      :value="index"
      hide-details
      dense
      v-model="selected"
    />
  </div>
</template>

<script>

import { injectQuizLevelData } from '@/quizLevelData'
import { getHost } from '@/globalState'

export default {
  name: 'choiceVariants',

  data: () => ({
    quizLevelData: {},
    selected: [],
    selectedHTML: []
  }),

  watch: {
    selected: {
      deep: true,
      handler (data) {
        this.testChoice(data)
      }
    }
  },

  computed: {
    images () {
      return this.quizLevelData.choiceVariants[0].startsWith('img:')
        ? this.quizLevelData.choiceVariants
          .map(choice => `${getHost()}/images/${choice.replace('img:', '').trim()}`)
        : null
    },

    html () {
      return this.quizLevelData.choiceVariants[0].startsWith('html:')
        ? this.quizLevelData.choiceVariants
          .map(choice => choice.replace('html:', '').trim())
        : null
    }
  },

  methods: {
    testChoice (selected) {
      Object.assign(this.quizLevelData.results, { right: 0, wrong: 0 })

      for (const sel of selected) {
        const bool = this.quizLevelData.rightChoicesNums.includes(sel.toString())
        this.quizLevelData.results.right += bool
        this.quizLevelData.results.wrong += !bool
      }
    }
  },

  created () {
    this.quizLevelData = injectQuizLevelData()
  },

  mounted () {
    this.selected = []
  }
}
</script>

<style scoped>

.html-element {
  display: inline-block;
  width: 80px;
  height: 80px;
  margin-top: -80px;
}
</style>
