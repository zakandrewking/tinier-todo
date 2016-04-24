import { createView,
         arrayWith,
       } from 'tinier'
import { h, render, bind } from 'tinier-dom'

import { Todo, DELETE } from './Todo'
import ShowHide from './ShowHide'

// public methods
export const ADD_TODO = '@ADD_TODO'

export const TodoList = createView({
  name: 'TodoList',

  model: {
    todos: arrayWith(
      Todo,
      (methods, i) => ({ [DELETE]: () => { methods.deleteTodo(i) } })
    ),
  },

  init: (labels=[]) => {
    return Object.assign(
      { todos: labels.map(Todo.init) },
      ShowHide.init()
    )
  },

  reducers: Object.assign(
    {
      [ADD_TODO]: (state, label='') => {
        return Object.assign(state, {
          todos: [ ...state.todos, Todo.init(label) ]
        })
      },
      deleteTodo: (state, index) => {
        return Object.assign(state, {
          todos: [ ...state.todos.slice(0, index), ...state.todos.slice(index + 1) ]
        })
      },
    },
    ShowHide.reducers
  ),

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
