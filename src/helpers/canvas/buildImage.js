import { movie } from '@/helpers/canvas'

export function buildImage (image) {
  const canvas = document.querySelector('canvas')
  const ctx = canvas.getContext('2d', { willReadFrequently: true })

  const [top, left] = [Math.round(image.height / 2), Math.round(image.width / 2)]

  ctx.drawImage(image, left, top, image.width, image.height)

  const [cols, rows] = [canvas.width, canvas.height]

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)

  const getEmpty = (function (data) {
    const tmp = Array.from(data)
      .map((byte, i, arr) => {
        const test = i % 4 === 0 && arr[i] + arr[i + 1] + arr[i + 2] + arr[i + 3] === 0
        return test ? i : undefined
      }).filter(index => index !== undefined)

    const emptyPoints = Array.from(new Set(tmp))

    return () => emptyPoints.splice(Math.round(Math.random() * (emptyPoints.length - 1)), 1)[0]
  })(imageData.data)

  this.layers = []

  for (let layer = 0; layer < parseInt(Math.max(rows / 2, cols / 2)); layer++) {
    this.layers.push({ rows: [layer, rows - layer - 1], cols: [layer, cols - layer - 1] })
  }

  const points = imageData.data.reduce((res, byte, index, arr) => {
    if (index % 4 === 0) {
      if (byte + arr[index + 1] + arr[index + 2] + arr[index + 3] !== 0) {
        const num = getEmpty(imageData.data)
        const color = [0, 1, 2].map(() => Math.round(Math.max(150, Math.random() * 255)))
        color.push(0)
        res.push({
          normalIndex: index,
          currentIndex: num,
          color
        })
      }
    }

    return res
  }, [])

  movie(points)
}
