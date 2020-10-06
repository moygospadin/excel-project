import { $ } from '@core/dom'
import { ExcelComponent } from '@core/ExcelComponent'
import { isCell, shouldResize, matrix, nextSelector } from './table.functions'
import { tableResizeHandler } from './table.resize'
import { createTable } from './table.template'
import { TableSelection } from './TableSelection'

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'keydown'],
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
    const $cell = this.$root.find('[data-id="0:0"]')
    this.selection.select($cell)
  }
  onMousedown(event) {
    if (shouldResize(event)) {
      tableResizeHandler(event, this.$root)
    } else if (isCell(event)) {
      const $target = $(event.target)
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
      this.selection.select($next)
    }
  }
}
