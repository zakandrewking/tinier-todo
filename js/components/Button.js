import { createComponent } from 'tinier'
import { h } from 'tinier-dom'

export const Button = createComponent({
  init: ({ label }) => ({ label }),

  signalNames: [ 'buttonClick' ],

  render: ({ state, signals }) => {
    return (
      <button onclick={ signals.buttonClick.dispatch }>
        { state.label }
      </button>
    )
  },
})

export { Button as default }
