class Dom {
  constructor() {}
}
export function $() {
  return new Dom()
}
$.create = (tagname, classes = '') => {
  const el = document.createElement(tagname)
  if (classes) {
    el.classList.add(classes)
  }
  return el
}
