import {defaultStyle, defaultTitle} from "../constants"
import {clone} from "../core/utils"

const defaultState = {
  title: defaultTitle,
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyle: defaultStyle,
  openedDate: new Date().toJSON(),
}

const normalize = state => ({
  ...state,
  currentStyle: defaultStyle,
  currentText: '',
})

export function normalizeInitialState(state) {
  return state ? normalize(state) : clone(defaultState)
}