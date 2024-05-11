import { methods } from '@/helpers/parse'

const options = [
  'type',
  'balls',
  'question',
  'picture',
  'js',
  'html',
  'choiceVariants',
  'rightChoicesNums',
  'rightContent',
  'inputLegendBefore',
  'inputLegendAfter',
  'rightInput'
]

export function parseQuizFile (quizRawData) {
  return options.reduce((res, option) => Object.assign(res, {
    [option]: typeof methods[option] === 'function' ? methods[option](quizRawData) : null
  }), {})
}
