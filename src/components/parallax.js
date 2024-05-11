import { getHost } from '@/globalState'
import { parallax } from '@/configs'

export const Parallax = ('parallax-back', {
  data: function () {
    return {
      moveCounter: 0,
      pictureCounter: 0,
      pictures: parallax,
      parallax: null
    }
  },

  template: `
    <section id="parallax-container">
      <div id="parallax-element"></div>
    </section>
  `,

  methods: {
    changePicture () {
      const num = Math.round(Math.random() * (this.pictures.length - 1))
      this.parallax.style.backgroundImage = `url(${getHost()}/images/${this.pictures[num]}.jpg)`
    },

    loopParallax () {
      if (this.pictureCounter-- === 0) {
        this.pictureCounter = 600
        this.changePicture()
      }
      if (this.moveCounter-- === 0) {
        this.moveCounter = 240
        const src = this.parallax.style.backgroundImage
        const position = ['top', 'left', 'right', 'bottom', 'center'][Math.round(Math.random() * 4)]
        this.parallax.style = `
          width: ${window.innerWidth * (1 + Math.random() * 0.3)}px;
          height: ${window.innerHeight * (1 + Math.random() * 0.3)}px;
          background-position: ${position};
          background-image: ${src};
          background-size: cover;
          transition: all 2s ease;
        `
      }
      requestAnimationFrame(this.loopParallax.bind(this))
    }
  },

  mounted () {
    const container = document.getElementById('parallax-container')
    container.style = `
      position:fixed;
      top:0;
      left:0;
      bottom: 0;
      right:0;
      overflow: hidden;
      box-sizing: border-box;
      margin:0;
      transition: all 2s ease;
    `

    this.parallax = document.getElementById('parallax-element')
    this.parallax.style = `
      width:100vw;
      height: 100vh;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      transition: all 2s ease;
    `
    this.loopParallax()
  }
})
