import { createComponent, forceRenderReducer, } from 'tinier'
import { h, bind, render } from 'tinier-dom'

import TodoList from './TodoList'
import Button from './Button'

export const App = createComponent({
  displayName: 'App',

  model: {
    todoList: TodoList,
  },

  init: () => ({
    todoList: TodoList.init(),
    value: '',
  }),

  signalNames: [ 'addTodo', 'clearCompleted' ],

  signalSetup: ({ signals, childSignals, methods, reducers }) => {
    signals.addTodo.on(childSignals.todoList.addTodo.call)

    childSignals.todoList.updatedTodoCount.on(reducers.forceRender)

    signals.clearCompleted.on(childSignals.todoList.clearCompleted.call)
  },

  // TODO add something async with a promise here
  methods: {
    inputKeyUp: ({ signals, event, target }) => {
      if (event.keyCode === 13) {
        const label = target.value.trim()
        if (label !== '') {
          signals.addTodo.call({ label })
          target.value = ''
        }
      }
    },
    currentVal: ({ state }) => {
      return state.value
    },
  },

  reducers: {
    forceRender: forceRenderReducer,
  },

  render: ({ el, state, methods, signals }) => {
    const mainFooterStyle = {
      display: state.todoList.todos.length > 0 ? 'block' : 'none'
    }
    const left = state.todoList.todos.filter(t => !t.isCompleted).length
    const s = left > 1 ? 's' : ''
    const showClearButton = left !== state.todoList.todos.length
    const clearButton = (<button class="clear-completed"
                                 onclick={ signals.clearCompleted.call }>
                         Clear completed
                         </button>)
    return render(
      el,
      <section class="todoapp">
        <header class="header">
          <h1>todos</h1>
          <input class="new-todo" placeholder="What needs to be done?" autofocus
                 onKeyUp={ methods.inputKeyUp } />
        </header>
        <section class="main" >
          { bind('todoList') }
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
          { showClearButton ? clearButton : null }
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
