import { createView, viewWith } from 'tinier'
import { h, render, bind } from 'tinier-dom'

import { Button, BUTTON_CLICK } from './Button'

// public methods
export const DELETE = '@DELETE'

export const Todo = createView({
  name: 'Todo',

  model: {
    // short-hand
    deleteButton: viewWith(Button, { [BUTTON_CLICK]: [DELETE] }),
  },

  signalMethods: [ DELETE ],

  init: (label, isCompleted=false) => ({
    label,
    isCompleted,
    deleteButton: Button.init('X'),
  }),

  reducers: {
    markCompleted: (state, isCompleted) => {
      return Object.assign(state, { isCompleted })
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
