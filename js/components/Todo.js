import { createComponent } from 'tinier'
import { h, bind, render } from 'tinier-dom'

import Button from './Button'

export const Todo = createComponent({
  displayName: 'Todo',

  model: {
    deleteButton: Button,
  },

  init: ({ label, isCompleted = false, isEditing = false }) => ({
    label,
    isCompleted,
    isEditing,
    deleteButton: Button.init({ className: 'destroy' }),
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
        reducers.updateLabel({ label: target.value })
        reducers.stopEditing()
      }
    }
  },

  render: ({ state, methods, reducers, el }) => {
    const labelStyle = { display: !state.isEditing ? 'block' : 'none' }
    const inputStyle = { display:  state.isEditing ? 'block' : 'none' }
    return render(el,
      <div class="view">
        <input class="toggle" type="checkbox" checked={ state.isCompleted }
                  onchange={ methods.changeCompleted } />
        <label ondblclick={ reducers.startEditing } style={ labelStyle } >
          { state.label }
        </label>
        <input class="edit" value={ state.label } onKeyUp={ methods.inputKeyUp }
                  style={ inputStyle } />
        <div>{ bind('deleteButton') }</div>
      </div>
    )
  }
})

export { Todo as default }
