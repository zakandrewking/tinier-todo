'use strict'

import { createView, createReducer, arrayOf, createActionCreators,
         createAsyncActionCreators, } from 'tinier'
import { h, render, binding } from 'tinier-dom'

import Todo from './Todo'

export const ADD_TODO = '@ADD_TODO'

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

  getReducer: (model) => {
    return createReducer({
      [ADD_TODO]: (state, action) => {
        return Object.assign({}, state, {
          todos: [ Todo.init(action.title), ...state.todos ]
        })
      }
    })
  },

  actionCreators: Object.assign(
    createActionCreators([ 'addTodo' ])
  ),

  update: function (el, state, appState, actions) {
    console.log('update')
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
