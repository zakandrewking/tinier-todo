import { createComponent } from 'tinier'
import { h, render } from 'tinier-dom'

export const Button = createComponent({
  displayName: 'Button',

  init: ({ label = '', classStr = '' }) => ({ label, classStr }),

  signalNames: [ 'buttonClick' ],

  render: ({ state, signals, el }) => {
    return render(el,
      <button onclick={ signals.buttonClick.call } class={ state.classStr }>
        { state.label }
      </button>
    )
  },
})

export { Button as default }
