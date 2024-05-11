// swith-01

var inputText = document.body
  .appendChild(document.createElement('input'))

inputText.style = `
  width: 360px;
  padding: 8px 16px;
  font-size: 16px;
`

inputText.setAttrs = function (ind) {
  this.style.color = ['blue', 'green', 'red', 'yellow', 'grey'][ind]
  this.value = [
    ['снег', 'елка', 'каток', 'шуба'],
    ['капель', 'ласточки', 'подснежники', 'цветение'],
    ['жара', 'речка', 'отпуск', 'каникулы'],
    ['школа', 'листопад', 'урожай', 'дождь'],
    ['Нет такого времени года']
  ][ind]
}


/* swith-02 */

// function addElem (tagName) {
//   return document.body
//     .appendChild(document.createElement(tagName))
// }
//
// var userAvatar = addElem('img')
//
// userAvatar.height = '100'
// userAvatar.style.display = 'block'
//
// var inputText = addElem('input')
//
// inputText.style = `
//   width: 360px;
//   padding: 8px 16px;
//   font-size: 16px;
// `
