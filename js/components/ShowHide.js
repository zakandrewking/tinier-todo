import { createComponent } from 'tinier'

const addStyle = (state) => {
  return {
      ...state,
    showHideStyle: { display: state.showHideHidden ? 'none' : 'block' }
  }
}

export const ShowHide = createComponent({
  init: (showHideHidden = false) => {
    return addStyle({ showHideHidden })
  },

  reducers: {
    show: (state) => {
      return addStyle({ ...state, showHideHidden: false })
    },
    hide: (state) => {
      return addStyle({ ...state, showHideHidden: true })
    },
    toggleShowHide: (state) => {
      return addStyle({ ...state, showHideHidden: !state.showHideHidden })
    },
  }
})
