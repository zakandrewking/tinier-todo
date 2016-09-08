import { createComponent } from 'tinier'
import { h, bind, render } from 'tinier-dom'

import Button from './Button'

export const Todo = createComponent({
  displayName: 'Todo',

  model: {
    deleteButton: Button,
  },

  init: ({ label, isCompleted = false }) => ({
    label,
    isCompleted,
    deleteButton: Button.init({ className: 'destroy' }),
  }),

  signalNames: [ 'delete' ],

  signalSetup: ({ childSignals, signals }) => {
    childSignals.deleteButton.buttonClick.on(signals.delete.call)
  },

  reducers: {
    markCompleted: ({ state, isCompleted }) => ({
      ...state,
      isCompleted,
    }),
  },

  methods: {
    onChangeCompleted: ({ reducers, target }) => {
      reducers.markCompleted(target.checked)
    },
  },

  render: ({ state, methods, el }) => {
    return render(el,
      <div class="view">
        <input class="toggle" type="checkbox" checked={ state.isCompleted }
               onchange={ methods.onChangeCompleted }/>
        <label>{ state.label }</label>
        <div>{ bind('deleteButton') }</div>
      </div>
    )
  }
})

export { Todo as default }
