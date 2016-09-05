import { createComponent } from 'tinier'
import { h, bind, render } from 'tinier-dom'

import Button from './Button'

export const Todo = createComponent({
  model: {
    deleteButton: Button,
  },

  init: ({ label, isCompleted = false }) => ({
    label,
    isCompleted,
    deleteButton: Button.init({ label: 'X' }),
  }),

  signalNames: [ 'delete' ],

  reducers: {
    markCompleted: ({ state, isCompleted }) => ({
      ...state,
      isCompleted,
    }),
  },

  methods: {
    onChangeCompleted: ({ reducer, target }) => {
      reducer.markCompleted(target.checked)
    },
  },

  render: ({ state, methods, el }) => {
    return render(el,
      <div class="view">
        <input class="toggle" type="checkbox" checked={ state.isCompleted }
               onchange={ methods.onChangeCompleted }/>
        <label>{ state.label }</label>
        { bind([ 'deleteButton' ]) }
      </div>
    )
  }
})

export { Todo as default }
