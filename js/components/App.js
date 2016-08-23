import { createComponent } from 'tinier'
import { h, bind } from 'tinier-dom'

import TodoList from './TodoList'
import Button from './Button'

const randomString = () => Math.random().toString(36)

export const App = createComponent({
  model: {
    todoList: TodoList,
    randomButton: Button,
    addButton: Button,
  },

  init: () => ({
    todoList: TodoList.init(),
    randomButton: Button.init({ label: 'Add random todo' }),
    addButton: Button.init({ label: '+' }),
    value: '',
  }),

  signalNames: [ 'addTodo' ],

  signalSetup: ({ methods, signals, childSignals }) => {
    // consider basing this on https://github.com/Hypercubed/mini-signals
    signals.addTodo.on(childSignals.todoList.addTodo.call)

    childSignals.randomButton.buttonClick.on(
      () => signals.addTodo.call({ label: randomString() })
    )

    childSignals.addButton.buttonClick.on(
      () => signals.addTodo.call({ label: methods.currentVal() })
    )
  },

  // TODO add something async with a promise here
  // TODO provide an alternative using signals in setup()
  methods: {
    inputKeyUp: ({ signals, event, target }) => {
      if (event.keyCode === 13) {
        signals.addTodo.dispatch(target.value.trim())
      }
    },
    currentVal: ({ state }) => {
      return state.value
    },
  },

  render: ({ state, methods }) => { // also el, signals
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

if (App.displayName !== 'App') {
  throw new Error('Missing displayName')
}

export { App as default }
