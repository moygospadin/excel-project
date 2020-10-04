export class DOMListener {
  constructor($root) {
    if (!$root) {
      throw new Error('No $root provided from DOMListener')
    }
    this.$root = $root
  }
}
