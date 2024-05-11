import { getPositive } from './getPositive'

import { slogans } from '@/configs'

export const sloganGenerator = (function (messages) {
  let prevIndex = 0
  window[Symbol.for('continue-slogans-iteration')] = true
  let start = true

  return function * recurse () {
    while (window[Symbol.for('continue-slogans-iteration')]) {
      yield new Promise (resolve => {
        setTimeout(() => {
          do {
            var index = getPositive(messages.length - 1)
          } while (prevIndex === index)

          prevIndex = index

          resolve(messages[index])
          start = false
        }, start ? 0: 10000)
      })
    }
  }
})(slogans)
