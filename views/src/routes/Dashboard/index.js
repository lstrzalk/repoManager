import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : '/',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Main = require('../Dashboard/containers/DashboardViewContainer').default
      const reducer = require('../Main/modules/main').default
      injectReducer(store, { key: 'main', reducer })
      cb(null, Main)
    }, 'main')
  }
})
