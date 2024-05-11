export function parseSingle (text, template) {
  // const regex = new RegExp(`_+(${template})_+\n+(.[^_\n]*)+`, 'gm')
  const regex = new RegExp(`§(${template})\n+(.[^\n§]*)+`, 'gm')
  const matches = text.matchAll(regex)
  const groups = matches.next().value
  return groups ? groups.slice(-1) : null
}
