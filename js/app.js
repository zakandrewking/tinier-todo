'use strict'

import { createMiddleware, run } from 'tinier'
import { applyMiddleware, createStore } from 'redux'

import App from './views/App'

const createStoreWithMiddleware = applyMiddleware(
  createMiddleware(App)
)(createStore)

run(App, document.body, createStoreWithMiddleware)
