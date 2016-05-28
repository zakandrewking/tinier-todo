import { createComponent, arrayWith } from 'tinier'
import { h, bind } from 'tinier-dom'

import Todo from './Todo'
import ShowHide from './ShowHide'

export const TodoList = createComponent({
  mixins: [ ShowHide ],

  model: {
    todos: arrayWith(
      Todo,
      null,
      { delete: (methods, i) => () => methods.deleteTodo(i) }
    ),
  },

  init: (labels=[]) => {
    return { todos: labels.map(Todo.init) }
  },

  reducers: {
    addTodo: (state, label='') => {
      return {
          ...state,
        todos: [ ...state.todos, Todo.init(label) ],
      }
    },
    deleteTodo: (state, index) => {
      return {
          ...state,
        todos: [ ...state.todos.slice(0, index), ...state.todos.slice(index + 1) ],
      }
    },
  },

  render: function (el, state, methods) {
    const todos = state.todos.map((todo, i) => {
      return <li>{ bind([ 'todos', i ]) }</li>
    })
    return render(
      el,
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
