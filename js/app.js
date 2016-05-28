import { createMiddleware, run } from 'tinier'
import { applyMiddleware, createStore } from 'redux'
import createLogger from 'redux-logger'

import App from './views/App'

const createStoreWithMiddleware = applyMiddleware(
  createMiddleware(App),
  createLogger()
)(createStore)

run(App, document.body, createStoreWithMiddleware)

// or just:

// run(App, document.body)
