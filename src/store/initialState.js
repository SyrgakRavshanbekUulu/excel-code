import {defaultStyle, defaultTitle} from "../constants"
import {storage} from "../core/utils"

const defaultState = {
  title: defaultTitle,
  colState: {},
  rowState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  currentStyle: defaultStyle,
}

const normalize = state => ({
  ...state,
  currentStyle: defaultStyle,
  currentText: '',
})
export const initialState = storage('excel-state')
  ? normalize(storage('excel-state'))
  : defaultState