import { createComponent } from 'tinier'
import { h, render } from 'tinier-dom'

export const Button = createComponent({
  displayName: 'Button',

  init: ({ label = '', className = '' }) => ({ label, className }),

  signalNames: [ 'buttonClick' ],

  render: ({ state, signals, el }) => {
    return render(el,
      <button onclick={ signals.buttonClick.call } className={ state.className }>
        { state.label }
      </button>
    )
  },
})

export { Button as default }
