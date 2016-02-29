'use strict'

import { createView, createReducer, arrayOf } from 'tinier'
import { h, render, binding } from 'tinier-dom'

export const Todo = createView({
  name: 'Todo',

  init: function (label) {
    return { label }
  },

  update: function (el, state) {
    return render(
      el,
        <div class="view">
        <input class="toggle" type="checkbox" checked />
        <label>{ state.label }</label>
        <button class="destroy"></button>
        </div>
    )
  }
})

export { Todo as default }
