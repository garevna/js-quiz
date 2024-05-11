import { getPositive } from './getPositive'

export function getSigned (maxVal, minVal) {
  return (Math.random() > 0.5 ? -1 : 1) * getPositive(maxVal, minVal)
}
