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
      // getGitHubRepositories(store)
      // getGitLabRepositories(store)
      // getBitbucketRepositories(store)
    }
    if (this.status === 401) {
      console.log('redirecting to auth...')
      browserHistory.push('/auth')
    }
  }
  xhttp.open('GET', '/auth', true)
  xhttp.send()
}

function getGitHubRepositories (store) {
  /** GitHub **/
  const xhttpGitHub = new XMLHttpRequest()
  xhttpGitHub.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      console.log(xhttpGitHub.responseText.toJSON)
    }
    if (this.status === 401) {
      console.log('redirecting to auth...')
      browserHistory.push('/auth')
    }
  }
  xhttpGitHub.open('GET', 'repos/github', true)
  xhttpGitHub.send()
}

function getGitLabRepositories (store) {
  /** GitLab **/
  const xhttpGitLab = new XMLHttpRequest()
  xhttpGitLab.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      console.log(xhttpGitLab.responseText.toJSON)
    }
    if (this.status === 401) {
      console.log('redirecting to auth...')
      browserHistory.push('/auth')
    }
  }
  xhttpGitLab.open('GET', 'repos/gitlab', true)
  xhttpGitLab.send()
}

function getBitbucketRepositories (store) {
  /** Bitbucket **/
  const xhttpBitbucket = new XMLHttpRequest()
  xhttpBitbucket.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      console.log(xhttpBitbucket.responseText.toJSON)
    }
    if (this.status === 401) {
      console.log('redirecting to auth...')
      browserHistory.push('/auth')
    }
  }
  xhttpBitbucket.open('GET', 'repos/bitbucket', true)
  xhttpBitbucket.send()
}
