import { connect } from 'react-redux'
import { toggleMenu, setMenuItem } from '../modules/main'
import Main from '../components/Main'

function getAvailableRepositories (setAvailableRepositories, availableRepositories, repositoriesData) {
  const xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      setAvailableRepositories(JSON.parse(xhttp.responseText), availableRepositories, repositoriesData)
    }
    // TODO CHECK AUTH ON 401
  }
  xhttp.open('GET', 'accounts/', true)
  xhttp.send()
}

let availableRepositories = {}
let repositoriesData = {}
const setAvailableRepositories = (data, availableRepositories, repositoriesData) => {
  data.map(accounts => {
    for (var vcs in accounts) {
      var propertyLower = vcs.toLowerCase()
      console.log(propertyLower)
      accounts[vcs].length > 0 ? availableRepositories[propertyLower] = true : availableRepositories[propertyLower] = false
      accounts[vcs].length > 0 ? repositoriesData[propertyLower] = accounts[propertyLower][0] : repositoriesData[propertyLower] = {}

      for (var x in accounts[propertyLower][0]) {
        console.log(x)
      }
    }
  })
}
getAvailableRepositories(setAvailableRepositories, availableRepositories, repositoriesData)

const mapDispatchToProps = {
  toggleMenu  : () => toggleMenu(),
  setMenuItem : setMenuItem,
}

const mapStateToProps = (state) => ({
  menuOpened            : state.main.menuOpened,
  activeMenuItem        : state.main.activeMenuItem,
  availableRepositories : availableRepositories || state.main.availableRepositories,
  repositoriesData      : repositoriesData || state.main.repositoriesData
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)
