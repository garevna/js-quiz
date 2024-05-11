import { parseSingle } from './parseSingle'
import { parseMultiLine } from './parseMultiLine'
import { createSnippet } from './createSnippet'
import { getHost } from '@/globalState'

const defaults = {
  type: 'choice',
  balls: 1,
  question: ''
}

export const methods = {
  type: text => {
    const result = parseSingle(text, 'quizType')
    return result ? result[0] : defaults.type
  },

  balls: text => {
    const result = parseSingle(text, 'quizBalls')
    return result ? Number(result[0]) : defaults.balls
  },

  question: text => {
    const result = parseSingle(text, 'quizQuestion')
    return result ? result[0] : defaults.question
  },

  js: text => {
    const code = parseMultiLine(text, 'quizJS')
    return code ? createSnippet(code, 'js') : null
  },

  html: text => {
    const code = parseMultiLine(text, 'quizHTML')
    return code ? createSnippet(code, 'html') : null
  },

  choiceVariants: text => {
    const result = parseMultiLine(text, 'choiceVariants')
      .trim()
      .split('\n')
      .map(item => item.trim())
      .filter(item => Boolean(item))
    return result
  },

  rightChoicesNums: text => {
    const str = parseSingle(text, 'rightChoice')
    return str ? str[0].trim().split(',').map(item => item.trim()) : null
  },

  rightContent: text => parseMultiLine(text, 'rightContent'),

  picture: text => {
    const fileName = parseSingle(text, 'quizPicture')
    return fileName ? `${getHost()}/images/${fileName}` : null
  },

  inputLegendBefore: text => {
    const result = parseSingle(text, 'inputLegendBefore')
    return result ? result[0] : ''
  },

  inputLegendAfter: text => {
    const result = parseSingle(text, 'inputLegendAfter')
    return result ? result[0] : ''
  },

  rightInput: text =>{
    const result = parseMultiLine(text, 'rightInput')
    return result ? result.split('\n').map(item => item.trim()) : ['']
  }
}
