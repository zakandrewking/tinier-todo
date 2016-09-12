import { createComponent, arrayOf, forceRenderReducer } from 'tinier'
import { h, bind, render } from 'tinier-dom'

import Todo from './Todo'
import ShowHide from './ShowHide'

function all (ar) {
  return ar.reduce((accum, val) => accum && val, true)
}

export const TodoList = createComponent({
  displayName: 'TodoList',

  model: {
    todos: arrayOf(Todo),
    showHide: ShowHide,
  },

  init: (arg = { labels: [] }) => ({
    todos: arg.labels.map(label => Todo.init({ label })),
    showHide: ShowHide.init(),
  }),

  signalNames: [ 'addTodo', 'updatedTodoCount', 'clearCompleted' ],

  signalSetup: ({ childSignals, reducers, signals }) => {
    childSignals.todos.delete.onEach(({ i }) => {
      reducers.deleteTodo({ index: i })
    })

    signals.addTodo.on((arg) => {
      reducers.addTodo(arg)
    })

    signals.clearCompleted.on(() => {
      reducers.clearCompleted({})
    })

    childSignals.todos.changedCompleted.onEach(() => {
      signals.updatedTodoCount.call({})
      reducers.forceRender()
    })
  },

  reducers: {
    addTodo: ({ state, label = '' }) => ({
      ...state,
      todos: [ ...state.todos, Todo.init({ label }) ],
    }),
    deleteTodo: ({ state, index }) => ({
      ...state,
      todos: [ ...state.todos.slice(0, index), ...state.todos.slice(index + 1) ],
    }),
    clearCompleted: ({ state }) => ({
      ...state,
      todos: state.todos.filter(t => !t.isCompleted),
    }),
    toggleAll: ({ state }) => {
      const isCompleted = !all(state.todos.map(t => t.isCompleted))
      return {
        ...state,
        todos: state.todos.map(t => ({ ...t, isCompleted })),
      }
    },
    forceRender: forceRenderReducer,
  },

  render: ({ state, el, reducers }) => {
    const todos = state.todos.map((todo, i) => {
      return <li>{ bind([ 'todos', i ]) }</li>
    })
    const allChecked = all(state.todos.map(t => t.isCompleted))
    return render(el,
      <div style={ state.showHide.style }>
      <input class="toggle-all" type="checkbox"
             checked={ allChecked } onclick={ reducers.toggleAll }/>
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">{ todos }</ul>
      </div>
    )
  },

  didUpdate: ({ signals }) => {
    signals.updatedTodoCount.call({})
  },
})

export { TodoList as default }
