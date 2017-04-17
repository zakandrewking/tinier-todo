import tinier from 'tinier'

export const Button = tinier.createComponent({
  displayName: 'Button',

  init: ({ label = '', classStr = '' }) => ({ label, classStr }),

  signalNames: [ 'buttonClick' ],

  render: ({ state, signals, el }) => {
    return (
      <button onclick={ signals.buttonClick.call } class={ state.classStr }>
        { state.label }
      </button>
    )
  },
})

export { Button as default }
