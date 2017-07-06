export default (store) => ({
  path : '/auth',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Login = require('./containers/LoginViewContainer').default

      /*  Return getComponent   */
      cb(null, Login)

      /* Webpack named bundle   */
    }, 'auth')
  }
})
