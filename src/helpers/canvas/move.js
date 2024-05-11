import { step } from '@/configs'

export function move (canvas, data, row, col) {
  const index = (row * canvas.width + col) * 4

  let [r, g, b, a] = data.slice(index, index + 4)

  if (!a) return

  data[index + 3] = 0

  const signY = Math.random() > 0.5 ? 1 : -1
  const signX = Math.random() > 0.5 ? 1 : -1

  const [distanceY, distanceX] = [
    row > canvas.height / 2 ? canvas.height - row : row,
    col > canvas.width / 2 ? canvas.width - col : col
  ]

  const [stepY, stepX] = [
    Math.round(Math.random() * Math.min(step, distanceY)),
    Math.round(Math.random() * Math.min(step, distanceX))
  ]

  const [newRow, newCol] = [row + signY * stepY, col + signX * stepX]

  const newIndex = (newRow * canvas.width + newCol) * 4

  a--

  ;[r, g, b, a].forEach((item, i) => { data[newIndex + i] = item })
}
