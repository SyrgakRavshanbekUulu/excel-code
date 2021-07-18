import {createToolbar} from "./toolbar.template"
import {$} from '../../core/dom'
import {ExcelStateComponent} from "../../core/ExcelStateComponent"
import {defaultStyle} from "../../constants"

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name: "Toolbar",
      listeners: ['click'],
      subscribe: ['currentStyles'],
      ...options,
    })
  }

  prepare() {
    this.initState(defaultStyle)
  }

  get templete() {
    return createToolbar(this.state)
  }
  toHtml() {
    return this.templete
  }
  storeChanged(changes) {
    this.setState(changes.currentStyles)
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.type === 'button') {
      const value = JSON.parse($target.data.value)
      this.$emit('toolbar:applyStyle', value)
    }
  }
}