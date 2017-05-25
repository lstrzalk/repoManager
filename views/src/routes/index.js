// We only need to import the modules necessary for initial render
import CoreLayout from '../layouts/CoreLayout/containers/CoreLayoutContainer'
import Login from './Login'
import Dashboard from './Dashboard'
import Settings from './Settings'
import Accounts from './Accounts'

import en from '../lang/en.json'
import { setLanguage } from 'redux-polyglot'

/*  Note: Instead of using JSX, we recommend using react-router
    PlainRoute objects to build route definitions.   */

function initLang (store) {
  store.dispatch(setLanguage('en', { app : en }))
}

export const createRoutes = (store) => ({
  path: '#',
  component: CoreLayout,
  indexRoute: Dashboard,
  onEnter : initLang.bind(null, store),
  childRoutes: [
    Accounts(store),
    Dashboard(store),
    Login(store),
    Settings(store)
  ]
})

/*  Note: childRoutes can be chunked or otherwise loaded programmatically
    using getChildRoutes with the following signature:

    getChildRoutes (location, cb) {
      require.ensure([], (require) => {
        cb(null, [
          // Remove imports!
          require('./Counter').default(store)
        ])
      })
    }

    However, this is not necessary for code-splitting! It simply provides
    an API for async route definitions. Your code splitting should occur
    inside the route `getComponent` function, since it is only invoked
    when the route exists and matches.
*/

export default createRoutes
