import { createComponent } from 'tinier'
import { h, bind } from 'tinier-dom'

import Button from './Button'

export const Todo = createComponent({
  signals: [ 'delete' ],

  model: {
    deleteButton: Button,
  },

  init: ({ label, isCompleted = false }) => ({
    label,
    isCompleted,
    deleteButton: Button.init({ label: 'X' }),
  }),

  reducers: {
    markCompleted: ({ state, isCompleted }) => ({
      ...state,
      isCompleted,
    }),
  },

  methods: {
    onChangeCompleted: ({ reducerFns, target }) => {
      reducerFns.markCompleted(target.checked)
    },
  },

  render: ({ state, methods }) => {
    return (
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
