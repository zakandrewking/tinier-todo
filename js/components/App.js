import tinier from 'tinier'

import TodoList from './TodoList'
import Button from './Button'

export const App = tinier.createComponent({
  displayName: 'App',

  init: () => ({
    todoList: TodoList,
    clearButton: Button({
      classStr: 'clear-completed',
      label: 'Clear completed',
    }),
    value: '',
  }),

  signalNames: [ 'addTodo' ],

  signalSetup: ({ signals, childSignals, methods, reducers }) => {
    // add todo
    signals.addTodo.on(
      childSignals.todoList.addTodo.call
    )

    // clear todos
    childSignals.clearButton.buttonClick.on(
      childSignals.todoList.clearCompleted.call
    )
  },

  // TODO add something async with a promise here
  methods: {
    inputKeyUp: ({ signals, event, target }) => {
      if (event.keyCode === 13) {
        const label = target.value.trim()
        if (label !== '') {
          signals.addTodo.call(label)
          target.value = ''
        }
      }
    },
    currentVal: ({ state }) => {
      return state.value
    },
  },

  didMount: ({ el }) => {
    el.getElementsByClassName('new-todo')[0].focus()
  },

  render: ({ el, state, methods, signals }) => {
    const mainFooterStyle = {
      display: state.todoList.todos.length > 0 ? 'block' : 'none'
    }
    const left = state.todoList.todos.filter(t => !t.isCompleted).length
    const s = left > 1 ? 's' : ''
    const showClearButton = left !== state.todoList.todos.length

    return [
      <section class="todoapp">
        <header class="header">
          <h1>todos</h1>
        <input class="new-todo" placeholder="What needs to be done?"
               onKeyUp={ methods.inputKeyUp } />
        </header>
        <section class="main" >
          { tinier.bind('todoList') }
        </section>
        <footer class="footer" style={ mainFooterStyle }>
          <span class="todo-count">
            <strong>{ left }</strong> item{ s } left
          </span>
          <ul class="filters">
            <li><a class="selected" href="#/">All</a></li>
            <li><a href="#/active">Active</a></li>
            <li><a href="#/completed">Completed</a></li>
          </ul>
          <div style={{ display: showClearButton ? 'block': 'none'}}>
            { tinier.bind('clearButton') }
          </div>
        </footer>
      </section>,
      <footer class="info">
        <p>Double-click to edit a todo</p>
        <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
        <p>Created by <a href="http://github.com/zakandrewking">Zak King</a></p>
        <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
      </footer>
    ]
  },
})

export { App as default }
