'use strict'

import d3 from 'd3'
import { h, render } from 'd3-dom'
import { createView, createReducer } from 'tinier'

const ADD_TODO = '@ADD_TODO'

export const AddButton = createView({
  name: 'AddButton',

  update: (state, appState, el, actions) => {
    return render(
      el,
      <span onClick={ actions[ADD_TODO] }>+</span>
    )
  },
})

export { AddButton as default }
