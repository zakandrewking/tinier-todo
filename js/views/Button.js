import { createComponent } from 'tinier'
import { h } from 'tinier-dom'

export const Button = createComponent({
  init: (label) => ({ label }),

  hooks: [ 'buttonClick' ],

  render: (state, methods) => {
    return <button onclick={ methods.buttonClick }>{ state.label }</button>
  },
})

export { Button as default }
