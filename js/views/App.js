import { createView, viewWith } from 'tinier'
import { h, bind } from 'tinier-dom'

import { TodoList, ADD_TODO } from './TodoList'
import { Button, BUTTON_CLICK } from './Button'

// public methods
export ADD_TODO

const randomString = () => { Math.random().toString(36) }

export const App = createView({
  name: 'App',

  model: {
    todoList: viewWith(
      TodoList,
      // signals in
      null,
      // signals out
      (childMethods) => ({
        [ADD_TODO]: childMethods[ADD_TODO],
      })
    ),
    randomButton: viewWith(
      Button,
      // signals in
      (methods) => ({
        [BUTTON_CLICK]: () => { methods[ADD_TODO](randomString()) }
      })
    ),
    addButton: viewWith(
      Button,
      // signals in
      (methods) => ({ [BUTTON_CLICK]: methods[ADD_TODO] })
    ),
  },

  // must define a method to pass an action through
  signalMethods: [ ADD_TODO ],

  init: () => ({
    todoList: TodoList.init(),
    randomButton: Button.init('Add random todo'),
    addButton: Button.init('+'),
  }),

  actionCreators: {
    'Just for fun': (msg) => {
      return { type: 'Just for fun', msg }
    },
  },

  // TODO add something async with a promise here
  asyncMethods: {
    inputKeyUp: ({ methods, state, appState, event, target, dispatch, actionCreators }) => {
      if (event.keyCode === 13)
        methods.addTodo(target.value.trim())
      dispatch(actionCreators['Just for fun'](' :) '))
    },
  },

  render: (state, methods, el) => {
    const mainFooterStyle = {
      display: state.todoList.todos.length > 0 ? 'block' : 'none'
    }
    return (
      <section class="todoapp">
        <header class="header">
          <h1>todos</h1>
          <input class="new-todo" placeholder="What needs to be done?" autofocus
                 onKeyUp={ methods.inputKeyUp } />
        </header>
        <section class="main" style={ mainFooterStyle } >
          { bind('todoList') }
        </section>
        <footer class="footer" style={ mainFooterStyle }>
          <span class="todo-count"><strong>0</strong> item left</span>
          <ul class="filters">
            <li><a class="selected" href="#/">All</a></li>
            <li><a href="#/active">Active</a></li>
            <li><a href="#/completed">Completed</a></li>
          </ul>
          <button class="clear-completed">Clear completed</button>
          { bind('addButton') }
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
