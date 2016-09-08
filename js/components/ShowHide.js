import { createComponent } from 'tinier'

const addStyle = state => {
  return {
    ...state,
    style: { display: state.hidden ? 'none' : 'block' }
  }
}

export const ShowHide = createComponent({
  displayName: 'ShowHide',

  signalNames: [ 'show', 'hide', 'toggle' ],

  signalSetup: ({ signals, reducers }) => {
    signals.show.on(reducers.show)
    signals.hide.on(reducers.hide)
    signals.toggle.on(reducers.toggle)
  },

  init: (arg = { hidden: false }) => {
    return addStyle({ hidden: arg.hidden })
  },

  reducers: {
    show: ({ state }) => {
      return addStyle({ ...state, hidden: false })
    },
    hide: ({ state }) => {
      return addStyle({ ...state, hidden: true })
    },
    toggle: ({ state }) => {
      return addStyle({ ...state, hidden: !state.hidden })
    },
  }
})

export { ShowHide as default }
