const CODES = {
  A: 65,
  Z: 90,
}

function createCell() {
  return `
  <div class="cell" contenteditable></div>
  `
}

function createCol(el) {
  return `
  <div class="column">
    ${el}
  </div>
  `
}

function createRow(index, content) {
  return `
  <div class="row">
   <div class="row-info">${index ? index : ''}</div>
   <div class="row-data">${content}</div>
  </div>`
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}
export function createTable(rowsCount = 20) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount).fill('').map(toChar).map(createCol).join('')
  rows.push(createRow(null, cols))

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount).fill('').map(createCell).join('')
    rows.push(createRow(i + 1, cells))
  }
  return rows.join('')
}
