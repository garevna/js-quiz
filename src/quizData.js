import { provide, inject, reactive, readonly } from 'vue'

import { getHost } from '@/globalState'

import { parseQuizFile } from '@/helpers'

import { getCurrentState } from '@/helpers'

const { folder, title, levels, lives, score, maxScore, currentLevel } = getCurrentState()

const createQuizState = () => reactive({
  folder,
  title,
  levels,
  currentLevel,
  lives,
  maxScore,
  score
})

function provideQuizData () {
  const state = createQuizState()
  provide(Symbol.for('quiz-state'), state)
}

function injectQuizData () {
  const state = inject(Symbol.for('quiz-state'))
  if (!state) {
    throw new Error('injectQuizData must be used within a component wrapped with provideQuizData')
  }
  return state
}

function injectReadOnlyQuizData () {
  const state = injectQuizData()
  return readonly(state)
}

async function readQuiz (folder) {
  if (!folder) return console.error(`Failed to read quiz: folder ${folder} not defined`)

  const fileName = this.level.toString().padStart(2, '0') + '.md'
  const data = await (await fetch(`${getHost()}/quiz/${this.folder}/${fileName}`)).text()
  return parseQuizFile(data)
}

export {
  provideQuizData,
  injectQuizData,
  injectReadOnlyQuizData,
  readQuiz
}
