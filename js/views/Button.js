import { createView } from 'tinier'
import { h } from 'tinier-dom'

// public methods
export const BUTTON_CLICK = '@BUTTON_CLICK'

export const Button = createView({
  name: 'Button',

  init: (label) => ({ label }),

  signalMethods: [ BUTTON_CLICK ],

  render: (state, methods) => {
    return <button onclick={ methods[BUTTON_CLICK] }>{ state.label }</button>
  },
})

export { Button as default }
