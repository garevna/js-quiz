import { getRandomColor } from '@/helpers/canvas'

export function createPoints () {
  const [width, height] = [this.imageWidth, this.imageHeight]

  const [top, left] = [Math.round(height / 2), Math.round(width / 2)]

  this.points = []
  this.ctx.drawImage(this.image, left, top, width, height)

  this.imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
  const ctxData = this.imageData.data

  const [cols, rows] = [this.canvas.width, this.canvas.height]

  this.layers = []

  for (let layer = 0; layer < parseInt(Math.max(rows / 2, cols / 2)); layer++) {
    this.layers.push({ rows: [layer, rows - layer - 1], cols: [layer, cols - layer - 1] })
  }

  for (let row = 0; row < this.canvas.height; row++) {
    for (let col = 0; col < this.canvas.width; col++) {
      const index = (row * cols + col) * 4

      const layer = this.layers.findIndex(item => item.rows.includes(row) || item.cols.includes(col))

      const color = [getRandomColor(), getRandomColor(), getRandomColor(), 255]

      this.points.push({
        normal: { row, col },
        current: {
          row: Math.round(Math.random() * this.canvas.height),
          col: Math.round(Math.random() * this.canvas.width),
          opacity: 0
        },
        get index () {
          return (this.current.row * this.cols + this.current.col) * 4
        },
        rows,
        cols,
        layer,
        color
      })

      if ((ctxData.slice(index, index + 3).reduce((res, item) => res += item)) /* ctxData[index] || ctxData[index + 1] || ctxData[index + 2] */) {
        [0, 1, 2, 3].forEach(num => { ctxData[index + num] = color[num] })
      }
    }
  }

  this.ctx.putImageData(this.imageData, 0, 0)
}
