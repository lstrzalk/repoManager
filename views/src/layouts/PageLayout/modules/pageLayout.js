// ------------------------------------
// Constants
// ------------------------------------
export const SIDE_PANEL_TOGGLE = 'SIDE_PANEL_TOGGLE'
export const LOGOUT = 'LOGOUT'
export const SET_MENU_ITEM = 'SET_MENU_ITEM'

// ------------------------------------
// Actions
// ------------------------------------
export function toggleMenu () {
  return {
    type  : SIDE_PANEL_TOGGLE
  }
}

export function logout () {
  return {
    type  : LOGOUT
  }
}

export function setMenuItem (item) {
  return {
    type            : SET_MENU_ITEM,
    activeMenuItem  : item
  }
}

export const actions = {
  toggleMenu,
  logout,
  setMenuItem
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SIDE_PANEL_TOGGLE]   : (state, action) => Object.assign({}, state, { menuOpened : !state.menuOpened }),
  [LOGOUT]              : (state, action) => Object.assign({}, state, { logged : !state.logged }),
  [SET_MENU_ITEM]       : (state, action) => Object.assign({}, state, { activeMenuItem : action.activeMenuItem })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  menuOpened      : false,
  logged          : true,
  activeMenuItem  : 0
}

export default function pageLayoutReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
