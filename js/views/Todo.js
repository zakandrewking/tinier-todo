'use strict'

import { createView, findMethod } from 'tinier'
import { h, render, binding } from 'tinier-dom'

export const Todo = createView({
  name: 'Todo',

  init: function (label, destroyRef, isCompleted=false) {
    return { label, destroyRef, isCompleted }
  },

  reducers: {
    markCompleted: (state, isCompleted) => {
      return { ...state, isCompleted }
    }
  },

  methods: {
    inputMarkCompleted: (methods) => {
      methods.markCompleted(this.checked)
    },
    clickedDestroy: (methods, state) => {
      findMethod(state.destroyRef)
    },
  },

  shouldUpdate: function (oldState, newState) {
    return (oldState.label       !== newState.label ||
            oldState.isCompleted !== newState.isCompleted)
  },

  update: function (el, state, appState, methods) {
    return render(
      el,
      <div class="view">
        <input class="toggle" type="checkbox" checked onchange={ methods.inputMarkCompleted }/>
        <label>{ state.label }</label>
        <button class="destroy" onclick={ methods.clickedDestroy }></button>
      </div>
    )
  }
})

export { Todo as default }
