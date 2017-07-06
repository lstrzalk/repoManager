// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout/containers/CoreLayoutContainer'
import Login from './Login'
import Dashboard from './Dashboard'
import Settings from './Settings'
import Accounts from './Accounts'

import pl from '../lang/pl.json'
import en from '../lang/en.json'
import { setLanguage } from 'redux-polyglot'
import { localStorageKeys } from '../../data/storage-data'

function init (store) {
  let lang = localStorage.getItem(localStorageKeys.language)
  if(lang === null) {
    store.dispatch(setLanguage('pl', {app: pl}))
  } else if (lang === 'pl') {
    store.dispatch(setLanguage(lang, {app: pl}))
  } else {
    store.dispatch(setLanguage(lang, {app: en}))
  }
}

export const createRoutes = (store) => ({
  path: '#',
  component: CoreLayout,
  indexRoute: Dashboard,
  onEnter : init.bind(null, store),
  childRoutes: [
    Accounts(store),
    Dashboard(store),
    Login(store),
    Settings(store)
  ]
})

export default createRoutes
