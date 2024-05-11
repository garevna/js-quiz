<template>
  <figure
    id="garevna-canvas--figure"
    @click="breakImage"
  >
    <canvas id="garevna-canvas" />
  </figure>
</template>

<script>

import { pictures } from '@/configs'

import { buildImage, breakImage } from '@/helpers/canvas'

import { injectGlobalData } from '@/globalState'

export default {
  name: 'CanvasComponent',

  data: function () {
    return {
      state: {},
      mode: 'draw',
      canvas: null,
      image: document.createElement('img')
    }
  },

  computed: {
    build () {
      return !this.state.navDriwer && !this.state.startQuiz
    }
  },

  watch: {
    build (val) {
      window[Symbol.for('build-canvas-image')] = val
      val ? this.buildImage(this.image) : this.breakImage()
    }
  },

  methods: {
    buildImage,
    breakImage,
    clickHandler () {
      this.state.navDriwer = true
    }
  },

  created () {
    this.state = injectGlobalData()
  },

  mounted () {
    window[Symbol.for('build-canvas-image')] = true
    this.canvas = Object.assign(document.getElementById('garevna-canvas'), {
      width: 320,
      height: 320,
      onclick: this.clickHandler,
      points: []
    })

    Object.assign(this.image, {
      src: this.imageURL || pictures.navigationPanelIcon,
      onload: function (event) {
        const { width, height } = event.target

        Object.assign(this, {
          imageWidth: width,
          imageHeight: height
        })

        Object.assign(this.canvas, {
          width: width * 2,
          height: height * 2
        })

        Object.assign(this.canvas.parentElement.style, {
          width: this.canvas.width + 'px',
          height: this.canvas.height + 'px'
        })

        this.buildImage(this.image)
      }.bind(this)
    })
  }
}
</script>

<style>

#garevna-canvas--figure {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
