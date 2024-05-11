import { getCurrentState } from '@/helpers'

import { provide, inject, reactive, readonly } from 'vue'

const { folder } = getCurrentState()

const createState = () => reactive({
  navDriwer: false,
  quizReady: false,
  startQuiz: Boolean(folder),
  exitQuiz: false,
  nextLevel: false,
  showLevelResults: false
})

function provideGlobalData () {
  const state = createState()
  provide(Symbol.for('global-state'), state)
}

function injectGlobalData () {
  const state = inject(Symbol.for('global-state'))
  if (!state) {
    throw new Error('injectGlobalData must be used within a component wrapped with provideGlobalData')
  }
  return state
}

function injectReadOnlyGlobals () {
  const state = injectGlobalData()
  return readonly(state)
}

function getHost () {
  return location.origin + (location.host === 'garevna.github.io' ? '/js-quiz' : '')
}

export {
  provideGlobalData,
  injectGlobalData,
  injectReadOnlyGlobals,
  getHost
}
