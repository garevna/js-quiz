import { getPositive } from './getPositive'

export function * sloganIndexGenerator (maxVal) {
  let startTime = 0, prevIndex = 0
  while (true) {
    const time = startTime + (startTime === 0 ? 40 : getPositive(10000))
    startTime = time
    do {
      var index = getPositive(maxVal)
    } while (prevIndex === index)

    prevIndex = index

    yield { index, time }
  }
}
