'use strict'

import { createView, createReducer } from 'tinier'
import { h, render, binding } from 'tinier-dom'

import TodoList from './TodoList'

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

  update: function (el, state, appState) {
    return render(
      el,
      <section class="todoapp">
        <header class="header">
          <h1>todos</h1>
          <input class="new-todo" placeholder="What needs to be done?" autofocus />
        </header>
        <section class="main">
          { binding([ 'todoList' ]) }
        </section>
        <footer class="footer">
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
