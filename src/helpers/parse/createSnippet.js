/* eslint-disable no-undef */

export function createSnippet (fragment, lang) {
  const elem = document.createElement('pre')
  elem.innerHTML = `
    <code data-language=${lang}>${'\n' + fragment.trim()}</code>`
  Rainbow.color(elem)
  Array.from(document.getElementsByClassName('preloader')).forEach(el => el.remove())
  return elem
}
