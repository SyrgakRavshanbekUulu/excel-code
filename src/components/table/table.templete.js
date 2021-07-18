import {defaultStyle} from "../../constants"
import {parse} from "../../core/parse"
import {toInlineStyles} from "../../core/utils"

const CODES = {
  A: 65,
  Z: 90,
}

const DEFAULT_WIDTH = 120
const DEFAULT_HEIGHT = 24

function getWidth(state, index) {
  return (state[index] || DEFAULT_WIDTH) + 'px'
}

function getHeight(state, index) {
  return (state[index] || DEFAULT_HEIGHT) + 'px'
}

function toCell(row, state) {
  return function(_, col) {
    const id = `${row}:${col}`
    const width = getWidth(state.colState, col)
    const data = state.dataState[id]
    const styles = toInlineStyles({
      ...defaultStyle,
      ...state.stylesState[id],
    })
    return `
      <div 
        class='cell' 
        contenteditable 
        data-col="${col}"
        data-type="cell"
        data-value="${data || ''}"
        data-id="${id}"
        style="${styles}; width: ${width}"
      >${parse(data) || ''}</div>
    `
  }
}

function createRow(index, content, state) {
  const resize = index ? `<div class='row-resize' data-resize='row'></div>` : ''
  const hieght = getHeight(state, index)

  return `
  <div 
    class='row'
    data-type="resizeble"
    data-row="${index}"
    style="height: ${hieght}"
  >
    <div class=row-info>
      ${index ? index : ''}
      ${resize}
    </div>
    <div class=row-data>${content}</div>
  </div>
  `
}

function toColumn({col, index, width}) {
  return `
    <div 
      class='column'
      data-type="resizeble"
      data-col="${index}"
      style="width: ${width}"
    >
      ${col}
      <div class='col-resize' data-resize='col'></div>
    </div>
  `
}
function toChar(_, index) {
  return String.fromCharCode(CODES.A + index)
}

function withWidthFrom(state) {
  return (col, index) => {
    return {
      col, index, width: getWidth(state.colState, index),
    }
  }
}
export function createTable(rowsCount = 25, state = {}) {
  const columnCount = CODES.Z - CODES.A + 1
  const rows = []

  const cols = new Array(columnCount)
      .fill('')
      .map(toChar)
      .map(withWidthFrom(state))
      .map(toColumn)
      .join('')

  rows.push(createRow(null, cols, {}))
  for (let row = 0; row < rowsCount; row++) {
    const cells = new Array(columnCount)
        .fill('')
        .map(toCell(row, state))
        .join('')
    rows.push(createRow(row + 1, cells, state.rowState))
  }
  return rows.join('')
}