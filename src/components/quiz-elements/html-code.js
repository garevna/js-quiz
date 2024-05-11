// import { attrs } from '@/configs'

import { injectQuizLevelData } from '@/quizLevelData'

export const htmlCode = {
	data: function () {
		return {
			quizLevelData: {}
    }
  },

	computed: {
    editable () {
      return this.quizLevelData.type === 'findError'
    }
  },

	created () {
    this.quizLevelData = injectQuizLevelData()
  },

	mounted () {
    this.$el.appendChild(this.quizLevelData.html)
  },

  template: '<div id="html-snippet" :contenteditable="editable"></div>'
}
