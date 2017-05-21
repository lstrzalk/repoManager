// ------------------------------------
// Constants
// ------------------------------------
export const LOGOUT = 'LOGOUT'

// ------------------------------------
// Actions
// ------------------------------------

export function logout () {
  return {
    type  : LOGOUT
  }
}

export const actions = {
  logout
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGOUT]  : (state, action) => Object.assign({}, state, { logged : !state.logged })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  logged          : false
}

export default function coreLayoutReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
