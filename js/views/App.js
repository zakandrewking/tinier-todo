'use strict'

import { createView, createReducer, createAsyncActionCreators, addressAction,
         addressRelTo, } from 'tinier'
import { h, render, binding } from 'tinier-dom'

import { TodoList, ADD_TODO } from './TodoList'

const KEY_UP = '@KEY_UP'

export const App = createView({
  name: 'App',

  model: {
    todoList: TodoList,
  },

  init: function () {
    return {
      todoList: TodoList.init()
    }
  },

  actionCreators: createAsyncActionCreators({
    [KEY_UP]: (event) => {
      if (event.keyCode === 13)
        return (actions, actionWithAddress, state) => {
          // TODO clean this up. maybe like:
          // findAction(ADD_TODO, [ 'todoList' ], null)('')
          const add = actionWithAddress(addressAction(ADD_TODO, addressRelTo([ 'todoList' ])))
          // work on debugging hints. lodash makes things very hard to follow
          add('') // should error that action was not found
        }
    }
  }),

  update: function (el, state, appState, actions) {
    const mainFooterStyle = {
      display: state.todoList.todos.length > 0 ? 'block' : 'none'
    }
    return render(
      el,
      <section class="todoapp">
        <header class="header">
          <h1>todos</h1>
          <input class="new-todo" placeholder="What needs to be done?" autofocus
                 onKeyUp={ actions[KEY_UP] } />
        </header>
        <section class="main" style={ mainFooterStyle } >
          { binding([ 'todoList' ]) }
        </section>
        <footer class="footer" style={ mainFooterStyle }>
          <span class="todo-count"><strong>0</strong> item left</span>
          <ul class="filters">
            <li>
              <a class="selected" href="#/">All</a>
            </li>
            <li>
              <a href="#/active">Active</a>
            </li>
            <li>
              <a href="#/completed">Completed</a>
            </li>
          </ul>
          <button class="clear-completed">Clear completed</button>
        </footer>
      </section>,
      <footer class="info">
        <p>Double-click to edit a todo</p>
        <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
        <p>Created by <a href="http://github.com/zakandrewking">Zak King</a></p>
        <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
      </footer>
    )
  },
})

export { App as default }
