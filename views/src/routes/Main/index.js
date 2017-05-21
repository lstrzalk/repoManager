import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : '/',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Main = require('./containers/MainContainer').default
      const reducer = require('./modules/main').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'main', reducer })

      /*  Return getComponent   */
      cb(null, Main)

      /* Webpack named bundle   */
    }, 'main')
  }
})
