import { $ } from '@core/dom'
import { ExcelComponent } from '@core/ExcelComponent'
import { isCell, shouldResize, matrix, nextSelector } from './table.functions'
import { tableResizeHandler } from './table.resize'
import { createTable } from './table.template'
import { TableSelection } from './TableSelection'

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      ...options,
    })
    this.MAX_COL = 25
    this.MAX_ROW = 30
  }
  toHTML() {
    return createTable(this.MAX_ROW)
  }
  prepare() {
    this.selection = new TableSelection()
  }
  init() {
    super.init()
    this.selectCell(this.$root.find('[data-id="0:0"]'))
    this.$on('formula:input', (text) => {
      this.selection.current.text(text)
      console.log('Table:', text)
    })
    this.$on('formula:done', () => {
      this.selection.current.focus()
    })
  }
  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:input', $cell)
  }
  onMousedown(event) {
    if (shouldResize(event)) {
      tableResizeHandler(event, this.$root)
    } else if (isCell(event)) {
      const $target = $(event.target)

      const id = this.selection.current.id(true)
      this.selectCell(this.$root.find(`[data-id="${id.row}:${id.col}"]`))
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current).map((id) =>
          this.$root.find(`[data-id="${id}"]`)
        )
        this.selection.selectGroup($cells)
      } else {
        this.selection.select($target)
      }
    }
  }
  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
    ]
    const { key } = event
    if (keys.includes(key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(
        nextSelector(key, id, this.MAX_COL, this.MAX_ROW)
      )
      this.selectCell($next)
    }
  }
  onInput(event) {
    this.$emit('table:input', $(event.target))
  }
}
