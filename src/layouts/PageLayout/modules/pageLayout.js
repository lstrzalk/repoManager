// ------------------------------------
// Constants
// ------------------------------------
export const MENU_TOGGLE = 'MENU_TOGGLE'
export const LOGOUT = 'LOGOUT'

// ------------------------------------
// Actions
// ------------------------------------
export function toggleMenu () {
  return {
    type  : MENU_TOGGLE
  }
}

export function logout () {
  return {
    type  : LOGOUT
  }
}

export const actions = {
  toggleMenu,
  logout
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [MENU_TOGGLE]   : (state, action) => Object.assign({}, state, { menuOpened : !state.menuOpened }),
  [LOGOUT]        : (state, action) => Object.assign({}, state, { logged : !state.logged }),
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  menuOpened  : false,
  logged      : true
}

export default function pageLayoutReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
