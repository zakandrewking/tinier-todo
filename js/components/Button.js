import { createComponent } from 'tinier'
import { h } from 'tinier-dom'

export const Button = createComponent({
  signals: [ 'buttonClick' ],

  init: ({ label }) => ({ label }),

  render: ({ state, signals }) => {
    return (
      <button onclick={ signals.buttonClick.dispatch }>
        { state.label }
      </button>
    )
  },
})

export { Button as default }
