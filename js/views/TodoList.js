'use strict'

import { createView, arrayOf, methodRef, } from 'tinier'
import { h, render, bind } from 'tinier-dom'

import Todo from './Todo'

export const ADD_TODO = '@ADD_TODO'
export const DESTROY = '@DESTROY'

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

  reducers: {
    [ADD_TODO]: (state, label) => {
      const destroyMethod = methodRef(DESTROY, [], [ state.todos.length ])
      return { ...state, todos: [ ...state.todos, Todo.init(label, destroyMethod) ] }
    },
    [DESTROY]: (state, index) => {
      const todos = state.todos.slice(0, index)
              .concat(state.todos.slice(index + 1))
              .map((todo, i) => Todo.init(todo.label, methodRef(DESTROY, [], [ i ])))
      return { ...state, todos }
    },
  },

  update: function (el, state, appState, methods) {
    console.log('update')
    const todos = state.todos.map((todo, i) => {
      return <li>{ bind([ 'todos', i ]) }</li>
    })
    return render(
      el,
        <input class="toggle-all" type="checkbox" />,
        <label for="toggle-all">Mark all as complete</label>,
        <ul class="todo-list">{ todos }</ul>
    )
  }
})

export { TodoList as default }
