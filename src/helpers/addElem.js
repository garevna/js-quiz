export function addElem (tag, container = document.body) {
  return container.appendChild(document.createElement(tag))
}
