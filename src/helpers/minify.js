export function minify (str) {
  return str.replaceAll(/[\s]/gmi, '')
    .replaceAll(String.fromCharCode(13), '')
    .replaceAll(String.fromCharCode(10), '')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}
