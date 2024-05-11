import { drawPoints } from './drawPoints'

const amount = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]

export function movie (data) {
  const points = data.filter(item => item.normalIndex !== item.currentIndex)
  if (!points.length) return
  const tmp = amount.map(() => Math.round(Math.random() * (points.length - 1)))
  const indexes = Array.from(new Set(tmp))
  const moved = []
  for (const index of indexes) moved.push(points[index])
  moved.forEach(point => {
    const currentIndex = point.normalIndex
    Object.assign(point, { currentIndex })
    point.color.splice(3, 1, 255)
  })

  drawPoints(data)
  moved.length &&
  window[Symbol.for('build-canvas-image')] &&
  requestAnimationFrame(() => movie(data))
}
