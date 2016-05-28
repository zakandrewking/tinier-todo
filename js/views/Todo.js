import { createComponent, componentWith } from 'tinier'
import { h, bind } from 'tinier-dom'

import Button from './Button'

export const Todo = createComponent({
  model: {
    // short-hand
    deleteButton: componentWith(
      Button,
      null,
      { delete: (methods) => methods.delete }
    )
  },

  hooks: [ 'delete' ],

  init: (label, isCompleted=false) => ({
    label,
    isCompleted,
    deleteButton: Button.init('X'),
  }),

  reducers: {
    markCompleted: (state, isCompleted) => {
      return { ...state, isCompleted }
    },
  },

  ayncMethods: {
    onChangeCompleted: ({ methods, target }) => {
      methods.markCompleted(target.checked)
    },
  },

  render: (state, methods) => {
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
