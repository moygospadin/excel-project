import { DOMListener } from '@core/DOMListener'

export class ExcelComponent extends DOMListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    this.name = options.name || ''
    this.prepare()
    this.emitter = options.emitter
    this.store = options.store
    this.unsubscribers = []
    this.storeSub = null
  }
  prepare() {}

  toHTML() {
    return ''
  }
  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }
  $dispatch(action) {
    this.store.dispatch(action)
  }
  $subscribe(fn) {
    this.storeSub = this.store.subscribe(fn)
  }
  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }
  init() {
    this.initDOMListeners()
  }
  destoy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach((unsub) => unsub())
    this.storeSub.unsubscribe()
  }
}
