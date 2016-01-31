'use strict'

import * as d3 from 'd3'
import { createClass, createReducer, arrayOf, } from 'tinier'
import { Subtask } from './Subtask'

const MARK_COMPLETED = '@MARK_COMPLETED'
const CHANGE_TASK_TEXT = '@CHANGE_TASK_TEXT'
const ADD_SUBTASK = '@ADD_SUBTASK'

export const Todo = createClass({

  model: function () {
    return {
      subtasks: arrayOf(Subtask()),
      text: '',
      completed: false,
    }
  },

  actionCreators: {
    [MARK_COMPLETED]: data => {
      return { type: MARK_COMPLETED, completed: data.completed, key: data.key }
    }
  },

  reducer: function () {
    return createReducer({
      [CHANGE_TASK_TEXT]: (state, action) => {
        return Object.assign({}, state, {
          text: action.text
        })
      },
      [MARK_COMPLETED]: (state, action) => {
        return Object.assign({}, state, {
          completed: action.completed
        })
      },
      [ADD_SUBTASK]: (state, action) => {
        return Object.assign({}, state, {
          subtasks: [...state.subtasks, action.text]
        })
      },
    })
  },

  create: (localState, appState, el) => {
    const sel = d3.select(el)
    sel.append('span').attr('class', 'check')
    sel.append('span').attr('class', 'text')
    sel.append('div').attr('class', 'subtasks')
  },

  update: (localState, appState, el, actions) => {
    // TODO instead of passing in a key to be added below, pass in a function
    // call localAction to be called on the action,
    // e.g. localAction(actions[MY_ACTION])({ data })
    const sel = d3.select(el)
    sel.on('click', () => {
      actions[MARK_COMPLETED]({ completed: !localState.completed })
    })
    sel.select('.check').text(localState.completed ? '✓' : '✗')
    sel.select('.text').text(localState.text)
    const subtask_sel = sel.select('.subtasks')
    // bind data
    const sels = subtask_sel.selectAll('.subtask')
            .data(localState.subtasks)
    // on enter append divs
    sels.enter().append('div').attr('class', 'subtask')
    sels.exit().remove()
    const bindings = []
    sels.each(function() { bindings.push(this) })
    return {
      subtasks: bindings
    }
  },

  destroy: (localState, appState, el) => {
    el.selectAll('.check,.text.subtasks').remove()
  }

})
