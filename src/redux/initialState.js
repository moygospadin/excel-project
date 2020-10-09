import { defaultStyles, defaultTitle } from '@/constants'
import { clone } from '@core/utils'
const defaultState = {
  rowState: {},
  colState: {},
  dataState: {},
  stylesState: {},
  currentText: '',
  title: defaultTitle,
  currentStyles: defaultStyles,
  openDate: new Date().toJSON(),
}
const normalize = (state) => ({
  ...state,
  currentStyles: defaultStyles,
  currentText: '',
})

export function normalizeInitiaState(state) {
  return state ? normalize(state) : clone(defaultState)
}
