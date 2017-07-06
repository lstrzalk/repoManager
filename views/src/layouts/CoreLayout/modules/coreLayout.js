// ------------------------------------
// Constants
// ------------------------------------
export const LOGOUT = 'LOGOUT'
export const LOGIN = 'LOGIN'

// ------------------------------------
// Actions
// ------------------------------------

export function logout () {
  return {
    type  : LOGOUT
  }
}

export function login () {
  return {
    type  : LOGOUT
  }
}

export const actions = {
  logout,
  login
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [LOGOUT]  : (state, action) => Object.assign({}, state, { logged : false }),
  [LOGIN]   : (state, action) => Object.assign({}, state, { logged : true })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  logged  : false
}

export default function coreLayoutReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
