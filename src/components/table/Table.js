import {ExcelComponent} from "../../core/ExcelComponent";
import {createTable} from "./table.templete";
import {resizeHundler} from "./table.resize";
import {shouldResize} from "./tabke.functions";

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
    })
  }

  toHtml() {
    return createTable()
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHundler(this.$root, event)
    }
  }
}