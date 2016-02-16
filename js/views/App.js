'use strict'

import d3 from 'd3'
import { h, render, binding } from 'd3-dom'
import { createView, createReducer } from 'tinier'

import AddButton from './AddButton'

export const App = createView({
  name: 'App',

  model: {
    addButton: AddButton,
  },

  create: function (state, appState, el) {
    return render(
      el,

      <section class="todoapp">
        <header class="header">
          <h1>todos</h1>
          <input class="new-todo" placeholder="What needs to be done?" autofocus />
        </header>
        <footer class="info">
          <p>Double-click to edit a todo</p>
          <p>Created by <a href="http://github.com/zakandrewking">Zachary King</a></p>
          <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
        </footer>
      </section>
    )
    // TODO what if we really needed to render top-level elements next to each other?
  },
})

export { App as default }
