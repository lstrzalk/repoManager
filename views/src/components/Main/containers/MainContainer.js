import { connect } from 'react-redux'
import { toggleMenu, setMenuItem } from '../modules/main'
import Main from '../Main'
import makeRequest from '../../../../utils/Rest'

function getAvailableRepositories (setAvailableRepositories, availableRepositories, repositoriesData) {
  makeRequest('GET', '/accounts').then(
    (data) => setAvailableRepositories(JSON.parse(data), availableRepositories, repositoriesData)
  )
}

let availableRepositories = {}
let repositoriesData = {}
const setAvailableRepositories = (response, availableRepositories, repositoriesData) => {
  response.map(accounts => {
    for (var vcs in accounts) {
      var propertyLower = vcs.toLowerCase()
      if (accounts[vcs].length > 0) {
        availableRepositories[propertyLower] = true
        repositoriesData[propertyLower] = accounts[vcs]
      } else {
        availableRepositories[propertyLower] = false
        repositoriesData[propertyLower] = {}
      }
    }
  })
}
getAvailableRepositories(setAvailableRepositories, availableRepositories, repositoriesData)

const mapDispatchToProps = {
  toggleMenu  : () => toggleMenu(),
  setMenuItem : setMenuItem
}

const mapStateToProps = (state) => ({
  menuOpened            : state.main.menuOpened,
  activeMenuItem        : state.main.activeMenuItem,
  availableRepositories : availableRepositories || state.main.availableRepositories,
  repositoriesData      : repositoriesData || state.main.repositoriesData
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)
