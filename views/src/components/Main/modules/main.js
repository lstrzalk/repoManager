// ------------------------------------
// Constants
// ------------------------------------
export const SIDE_PANEL_TOGGLE = 'SIDE_PANEL_TOGGLE'
export const SET_MENU_ITEM = 'SET_MENU_ITEM'

// ------------------------------------
// Actions
// ------------------------------------
export function toggleMenu () {
  return {
    type  : SIDE_PANEL_TOGGLE
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
  setMenuItem
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SIDE_PANEL_TOGGLE]          : (state, action) => Object.assign({}, state, { menuOpened : !state.menuOpened }),
  [SET_MENU_ITEM]              : (state, action) => Object.assign({}, state, { activeMenuItem : action.activeMenuItem })
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = {
  menuOpened      : false,
  activeMenuItem  : 0,
  availableRepositories : {
    github : false,
    gitlab : false,
    bitbucket : false
  },
  repositoriesData : {
    github : {},
    gitlab : {},
    bitbucket : {}
  }
}

export default function mainReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
