export function getPositiveFloat (maxVal, minVal = 0) {
  return Math.max(minVal, Math.random() * maxVal)
}
