import { clearImageData } from './clearImageData'

export function drawPoints (points) {
  const ctx = clearImageData()

  const imageData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height)

  points.forEach(point => {
    [0, 1, 2, 3].forEach(num => {
      imageData.data[point.currentIndex + num] = point.color[num]
    })
  })

  ctx.putImageData(imageData, 0, 0)
}
