import { createComponent } from 'tinier'
import { h, render } from 'tinier-dom'

export const Button = createComponent({
  init: ({ label }) => ({ label }),

  signalNames: [ 'buttonClick' ],

  render: ({ state, signals, el }) => {
    return render(el,
      <button onclick={ signals.buttonClick.dispatch }>
        { state.label }
      </button>
    )
  },
})

export { Button as default }
