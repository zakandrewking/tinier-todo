import tinier from 'tinier'

import Button from './Button'

export const Todo = tinier.createComponent({
  displayName: 'Todo',

  model: {
    deleteButton: Button,
  },

  init: ({ label, isCompleted = false, isEditing = false }) => ({
    label,
    isCompleted,
    isEditing,
    deleteButton: Button.init({ classStr: 'destroy' }),
  }),

  signalNames: [ 'delete', 'changedCompleted' ],

  signalSetup: ({ childSignals, signals }) => {
    childSignals.deleteButton.buttonClick.on(signals.delete.call)
  },

  reducers: {
    updateLabel: ({ state, label }) => ({ ...state, label }),
    markCompleted: ({ state, isCompleted }) => ({ ...state, isCompleted }),
    startEditing: ({ state }) => ({ ...state, isEditing: true }),
    stopEditing: ({ state }) => ({ ...state, isEditing: false }),
  },

  methods: {
    changeCompleted: ({ reducers, signals, target }) => {
      reducers.markCompleted({ isCompleted: target.checked })
      signals.changedCompleted.call({})
    },
    inputKeyUp: ({ reducers, target, event }) => {
      if (event.keyCode === 13) {
        reducers.updateLabel({ label: target.value.trim() })
        reducers.stopEditing()
      }
    }
  },

  render: ({ state, methods, reducers, el }) => {
    const labelStyle = { display: !state.isEditing ? 'block' : 'none' }
    const inputStyle = { display:  state.isEditing ? 'block' : 'none' }
    const focusFn = state.isEditing ? el => el.focus() : null
    return tinier.render(el,
      <input class="toggle" type="checkbox" checked={ state.isCompleted }
             onchange={ methods.changeCompleted } />,
      <label ondblclick={ reducers.startEditing } style={ labelStyle } >
          { state.label }
      </label>,
      <input class="edit" value={ state.label } onKeyUp={ methods.inputKeyUp }
             style={ inputStyle } then={ focusFn } />,
      <div>{ tinier.bind('deleteButton') }</div>
    )
  }
})

export { Todo as default }
