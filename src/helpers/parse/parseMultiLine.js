export function parseMultiLine (text, template) {
  // const regex = new RegExp(`_+(${template})_+\n+(.[^_]*)`, 'gm')
  const regex = new RegExp(`(§${template})\n+(.[^§]*)`, 'gm')
  const match = text.match(regex)
  // const matches = text.matchAll(regex)
  // const groups = matches.next().value
  //

  const header = `§${template}\n`

  const result = match ? match[0].replace(header, '') : ''

  // return result ? result.slice(-1)[0].trim() : ''
  return result
}
