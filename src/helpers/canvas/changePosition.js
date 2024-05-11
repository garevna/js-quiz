export function changePosition (radius, angle) {
  Object.assign(this, {
    x: this.target.x + Math.round(radius * Math.sin(angle)),
    y: this.target.y + Math.round(radius * Math.cos(angle))
  })
}
