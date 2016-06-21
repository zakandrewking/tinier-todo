import { createComponent, arrayOf } from 'tinier'
import { h, bind } from 'tinier-dom'

import Todo from './Todo'
import ShowHide from './ShowHide'

export const TodoList = createComponent({
  mixins: [ ShowHide ],

  signals: [ 'addTodo' ],

  model: {
    todos: arrayOf(Todo),
  },

  init: (labels = []) => ({
    todos: labels.map(Todo.init),
  }),

  setup: ({ childSignals, reducers, signals }) => {
    childSignals.todos.addEach((i) => {
      return () => reducers.deleteTodo(i)
    })
    signals.addTodo.add(reducers.addTodo)
  },

  reducers: {
    addTodo: (state, label = '') => ({
      ...state,
      todos: [ ...state.todos, Todo.init(label) ],
    }),
    deleteTodo: (state, index) => ({
      ...state,
      todos: [ ...state.todos.slice(0, index), ...state.todos.slice(index + 1) ],
    }),
  },

  render: ({ state }) => {
    const todos = state.todos.map((todo, i) => {
      return <li>{ bind([ 'todos', i ]) }</li>
    })
    return (
      <div style={ state.showHideStyle }>
        <input class="toggle-all" type="checkbox" />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">{ todos }</ul>
      </div>,
      <span>I'm not hidden</span>
    )
  }
})

export { TodoList as default }
