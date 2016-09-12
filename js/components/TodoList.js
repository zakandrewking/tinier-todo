import { createComponent, arrayOf } from 'tinier'
import { h, bind, render } from 'tinier-dom'

import Todo from './Todo'
import ShowHide from './ShowHide'

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
      signals.updatedTodoCount.call({})
    })

    signals.addTodo.on((arg) => {
      reducers.addTodo(arg)
      signals.updatedTodoCount.call({})
    })

    childSignals.todos.changedCompleted.onEach(signals.updatedTodoCount.call)

    signals.clearCompleted.on(() => {
      reducers.clearCompleted({})
      signals.updatedTodoCount.call({})
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
    })
  },

  render: ({ state, el }) => {
    const todos = state.todos.map((todo, i) => {
      return <li>{ bind([ 'todos', i ]) }</li>
    })
    return render(el,
      <div style={ state.showHide.style }>
        <input class="toggle-all" type="checkbox" />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">{ todos }</ul>
      </div>
    )
  }
})

export { TodoList as default }
