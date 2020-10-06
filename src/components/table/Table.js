import { $ } from '@core/dom'
import { ExcelComponent } from '@core/ExcelComponent'
import { isCell, shouldResize } from './table.functions'
import { tableResizeHandler } from './table.resize'
import { createTable } from './table.template'
import { TableSelection } from './TableSelection'

export class Table extends ExcelComponent {
  static className = 'excel__table'
  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    })
  }
  toHTML() {
    return createTable(20)
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
      this.selection.select($target)
    }
  }
}
