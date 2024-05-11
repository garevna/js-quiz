import { timeStampStartStep, timeStampStepDecrement } from '@/configs'
import { move, clearImageData } from '@/helpers/canvas'

let start = null
let timeStampStep

export function breakImage (arg) {
  const timeStamp = Math.round(arg instanceof PointerEvent ? arg.timeStamp : arg)

  if (!start) start = timeStamp
  if (!timeStampStep) timeStampStep = timeStampStartStep

  const canvas = document.querySelector('canvas')
  const ctx = canvas.getContext('2d', { willReadFrequently: true })

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imageData.data

  const visiblePoints = Array.from(data).filter(byte => !!byte).length

  if (visiblePoints === 0) return

  if (timeStamp - start < timeStampStep) return requestAnimationFrame(this.breakImage)

  start = timeStamp
  timeStampStep = Math.max(timeStampStep - timeStampStepDecrement, 0)

  for (const layer of this.layers) {
    for (const row of [layer.rows[0], layer.rows[1]]) {
      for (let col = 0; col < canvas.width; col++) {
        move(canvas, data, row, col)
      }
    }
    for (const col of [layer.cols[0], layer.cols[1]]) {
      for (let row = 0; row < canvas.height; row++) {
        move(canvas, data, row, col)
      }
    }
  }

  ctx.putImageData(imageData, 0, 0)

  window[Symbol.for('build-canvas-image')]
  ? clearImageData()
  : requestAnimationFrame(this.breakImage)
}
