import { injectReducer } from '../../store/reducers'
import { browserHistory } from 'react-router'

export default (store) => ({
  path : '/',
  onEnter: isAuthorized.bind(null, store),
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Main = require('../Dashboard/containers/DashboardViewContainer').default
      const reducer = require('../../components/Main/modules/main').default
      injectReducer(store, { key: 'main', reducer })
      cb(null, Main)
    }, 'main')
  }
})

function isAuthorized (store) {
  const xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      console.log('authorized')
    }
    if (this.status === 401) {
      console.log('redirecting to auth...')
      browserHistory.push('/auth')
    }
  }
  xhttp.open('GET', '/auth', true)
  xhttp.send()
}
