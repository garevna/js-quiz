import { injectQuizLevelData } from '@/quizLevelData'

const redPoints = '<span style="color: #f00; font-weight">•••</span>'

export const jsCode = {
	data: () => ({
    quizLevelData: {}
  }),

  computed: {
    editable () {
      return this.quizLevelData.type === 'findError'
    }
  },

  created () {
    this.quizLevelData = injectQuizLevelData()
  },

  mounted () {
    this.$el.appendChild(this.quizLevelData.js)

		const {
			editable,
			quizLevelData: {
				js: {
					children: { 0: container }
				}
			}
		} = this

		if (!editable) return

		setTimeout(() => Object.assign(container, {
			innerHTML: container.innerHTML.replaceAll('•••', redPoints)
		}), 200)


  },

  template: '<div id="js-script-snippet" :contenteditable="editable"></div>'
}
