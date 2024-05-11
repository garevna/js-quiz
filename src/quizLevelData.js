import { provide, inject, reactive, readonly } from 'vue'

import { getHost } from '@/globalState'

import { parseQuizFile } from '@/helpers'

const createQuizLevelState = () => reactive({
  type: '',
  balls: 0,
  question: '',
  picture: null,
  js: null,
  html: null,
  rightContent: '',
  choiceVariants: null,
  rightChoicesNums: null,
  rightInput: null,

  results: {
    right: 0,
    wrong: 0
  }
})

function provideQuizLevelData () {
  const state = createQuizLevelState()
  provide(Symbol.for('quiz-level-state'), state)
}

function injectQuizLevelData () {
  const state = inject(Symbol.for('quiz-level-state'))
  if (!state) {
    throw new Error('injectQuizLevelData must be used within a component wrapped with provideQuizLevelData')
  }
  return state
}

function useReadOnlyState () {
  const state = injectQuizLevelData()
  return readonly(state)
}

async function readQuizLevel (folder, level) {
  if (!folder || !level) return console.error(`Failed to read quiz level: folder ${folder} or level ${level} not defined`)

  const fileName = level.toString().padStart(2, '0') + '.md'
  const data = await (await fetch(`${getHost()}/quiz/${folder}/${fileName}`)).text()

  const quizData = parseQuizFile(data)
  return quizData
}

export {
  provideQuizLevelData,
  injectQuizLevelData,
  useReadOnlyState,
  readQuizLevel
}
