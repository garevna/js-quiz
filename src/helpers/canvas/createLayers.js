import { getRandomColor } from '@/helpers/canvas'

export function createLayers (top, left, width, height) {
  this.points = []
  this.ctx.drawImage(this.image, left, top, width, height)

  this.imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height)
  const ctxData = this.imageData.data

  const [cols, rows] = [this.canvas.width, this.canvas.height]

  for (let row = 0; row < this.canvas.height; row++) {
    for (let col = 0; col < this.canvas.width; col++) {
      const index = (row * cols + col) * 4

      const color = [getRandomColor(), getRandomColor(), getRandomColor(), 255]
      this.points.push({
        normal: { row, col },
        current: { row, col },
        get index () {
          return (this.current.row * this.cols + this.current.col) * 4
        },
        rows,
        cols,
        color
      })

      if (ctxData[index] || ctxData[index + 1] || ctxData[index + 2]) {
        [0, 1, 2, 3].forEach(num => { ctxData[index + num] = color[num] })
      }
    }
  }

  this.ctx.putImageData(this.imageData, 0, 0)
}
