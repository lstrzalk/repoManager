import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : '/accounts',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Main = require('../Accounts/containers/AccountsViewContainer').default
      const reducer = require('../../components/Main/modules/main').default
      injectReducer(store, { key: 'main', reducer })
      cb(null, Main)
    }, 'main')
  }
})
