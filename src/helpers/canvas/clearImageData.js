export function clearImageData () {
  const canvas = document.querySelector('canvas')
  const { width, height } = canvas
  Object.assign(canvas, { width: 0, height: 0 })
  Object.assign(canvas, { width, height })
  const ctx = canvas.getContext('2d', {
    willReadFrequently: true
  })
  return ctx
}
