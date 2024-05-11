export function selectText (node) {
  if (document.body.createTextRange) {
    const range = document.body.createTextRange()
    range.moveToElementText(node)
    range.select()
  } else if (window.getSelection) {
    const [selection, range] = [window.getSelection(), document.createRange()]
    range.selectNodeContents(node)
    selection.removeAllRanges()
    selection.addRange(range)
    return selection.toString()
  } else {
    console.warn('Your browser does not support Selection API')
  }
}
