const CODES = {
  A: 65,
  Z: 90,
}
const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24
function widthFromState(state) {
  return function (col, index) {
    return {
      col,
      index,
      width: getWidht(state.colState, index),
    }
  }
}
function getWidht(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}
function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}
function createCell(state, row) {
  return function (_, col) {
    const id = `${row}:${col}`
    const width = getWidht(state.colState, col)
    const data = state.dataState[id]
    return `
    <div 
      class="cell"
      contenteditable
      data-col="${col}"
      data-type="cell"
      data-id="${id}"
      style="width: ${width}">
      ${data || ''}
    </div>`
  }
}

function createCol({ col, index, width }) {
  return `
  <div class="column" data-type="resizable" data-col="${index}" 
  style="width:${width}">
    ${col}
    <div class="col-resize" data-resize="col"></div>
  </div>
  `
}

function createRow(index, content, state) {
  const resize = index
    ? ` <div class="row-resize" data-resize="row"></div>`
    : ''
  const height = getHeight(state, index)
  return `
  <div class="row"
   data-type="resizable"
   data-row="${index}"
   style="height:${height}"
    >
   <div class="row-info">
     ${index ? index : ''}
     ${resize}
    </div>
   <div class="row-data">${content}</div>
  </div>`
}

function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

export function createTable(rowsCount = 20, state = {}) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
    .fill('')
    .map(toChar)
    .map(widthFromState(state))
    .map(createCol)
    .join('')
  rows.push(createRow(null, cols, {}))

  for (let i = 0; i < rowsCount; i++) {
    const cells = new Array(colsCount)
      .fill('')
      .map(createCell(state, i))
      .join('')
    rows.push(createRow(i + 1, cells, state.rowState))
  }
  return rows.join('')
}
