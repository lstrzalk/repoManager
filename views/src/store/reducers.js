import { combineReducers } from 'redux'
import locationReducer from './location'
import { polyglotReducer } from 'redux-polyglot'
import mainReducer from '../routes/Main/modules/main'
import coreLayoutReducer from '../layouts/CoreLayout/modules/coreLayout'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    location: locationReducer,
    polyglot: polyglotReducer,
    coreLayout: coreLayoutReducer,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  if (Object.hasOwnProperty.call(store.asyncReducers, key)) return

  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
