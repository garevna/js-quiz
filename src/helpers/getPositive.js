export function getPositive (maxVal, minVal = 0) {
  return Math.max(minVal, Math.round(Math.random() * maxVal))
}
