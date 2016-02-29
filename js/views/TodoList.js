'use strict'

import { createView, createReducer, arrayOf } from 'tinier'
import { h, render, binding } from 'tinier-dom'

import Todo from './Todo'

export const TodoList = createView({
  name: 'TodoList',

  model: {
    todos: arrayOf(Todo)
  },

  init: function () {
    return {
      todos: [ Todo.init('go wild'), Todo.init('again!') ],
    }
  },

  update: function (el, state) {
    const todos = state.todos.map((todo, i) => {
      return <li>{ binding([ 'todos', i ]) }</li>
    })
    const res = render(
      el,
        <input class="toggle-all" type="checkbox" />,
        <label for="toggle-all">Mark all as complete</label>,
        <ul class="todo-list">{ todos }</ul>
    )
    return res
  }
})

export { TodoList as default }
