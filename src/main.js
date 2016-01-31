/** redux-my-d3 test */

import { createMiddleware, run } from 'tinier'
import { TodoList } from './TodoList'

import { applyMiddleware, createStore } from 'redux'
import createLogger from 'redux-logger'

const app = TodoList

const createStoreWithMiddleware = applyMiddleware(
  createMiddleware(app),
  createLogger()
)(createStore)

const api = app.run(document.body, {
  todos: {
    123: {
      text: 'foobar',
      completed: false,
      subtasks: ['a', 'b']
    }
  },
  add: {}
}, createStoreWithMiddleware)


api.addTodo({ text: 'new' })
