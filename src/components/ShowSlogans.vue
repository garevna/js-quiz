<template>
  <figure
    id="slogan-container"
    @click="stopIteratingSlogans"
    :style="{ transform: generateContainerTransform() }"
  >
    <span
      v-for="(word, index) of words"
      :key="index"
      id="`word-${index}`"
      :style="generateWordStyle()"
    >
      <span
        v-for="(char, num) of getLetters(word)"
        :key="num"
        :style="generateCharStyle()"
      >
        {{ char }}
      </span>
    </span>
  </figure>
</template>

<script>

import { mainMenuItems } from '@/mainMenuItems'

import { getPositive, getPositiveFloat, getSigned, sloganGenerator } from '@/helpers'

import { colors } from '@/configs'

export default {
  name: 'ShowSlogans',

  data: () => ({
    colors,
    mainMenuItems: mainMenuItems(),
    currentSlogan: ''
  }),

  computed: {
    words () {
      return this.currentSlogan.split(' ')
    }
  },

  methods: {
    getLetters (word) {
      return word.split('')
    },

    getColor () {
      return this.colors[getPositive(this.colors.length - 1)]
    },

    generateCharStyle () {
      const delay = getPositiveFloat(20, .5)
      return `
        font-size: ${getPositive(48, 24)}px;
        display: inline-block;
        transform: rotate(${getSigned(5)}deg);
        text-shadow: 0px 0px 4px #0009;
        animation: shrink-jump 0.8s ${delay}s ease-in-out;
      `
    },

    generateWordStyle () {
      return `
        display: inline-block;
        margin-top: ${getSigned(24)}px;
        margin-left: 16px;
        color: ${this.getColor()};
      `
    },

    generateContainerTransform () {
      return `rotate(${getSigned(8)}deg)`
    },

    stopIteratingSlogans () {
      window[Symbol.for('continue-slogans-iteration')] = false
    }
  },

  async mounted () {
    const sloganIterator = sloganGenerator()
    for await (const slogan of sloganIterator) {
      this.currentSlogan = slogan
    }
  }
}
</script>

<style scoped>
#slogan-container {
  position: fixed;
  bottom: 80px;
  right: 32px;
  width: 80vw;
  transition: all .5s;
  font-family: 'Happy Monkey', Montserrat, Roboto, monospace, Arial;
  font-weight: bold;
  text-align: right;
  transform-origin: bottom right 120px;
}
</style>

<style>

@keyframes shrink-jump {
	10%, 20% {
    transform: scale(1, .7) translate(0, 0);
    opacity: 1;
	}

	45% {
		transform: scale(1) translate(0, -80px);
    opacity: 0.5;
	}

	50% {
		transform: scale(1) translate(0, 60px);
    opacity: 0.2;
	}

	80% {
		transform: scale(1) translate(0, 0);
    opacity: 1;
	}
}
</style>
