import { connect } from 'react-redux'
import { toggleMenu, setMenuItem } from '../modules/main'
import Main from '../components/Main'

function getAvailableRepositories (setOwnProps, ownProps) {
  const xhttp = new XMLHttpRequest()
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      setOwnProps(JSON.parse(xhttp.responseText), ownProps)
      console.log(JSON.parse(xhttp.responseText))
    }
    // TODO CHECK AUTH ON 401
  }
  xhttp.open('GET', 'accounts/', true)
  xhttp.send()
}

let ownProps = {}
const setOwnProps = (data, ownProps) => {
  data.map(x => {
    for (var property in x) {
      var propertyLower = property.toLowerCase()
      x[property].length > 0 ? ownProps[propertyLower] = true : ownProps[propertyLower] = false
    }
  })
}
getAvailableRepositories(setOwnProps, ownProps)

const mapDispatchToProps = {
  toggleMenu  : () => toggleMenu(),
  setMenuItem : setMenuItem,
}

const mapStateToProps = (state) => ({
  menuOpened            : state.main.menuOpened,
  activeMenuItem        : state.main.activeMenuItem,
  availableRepositories : ownProps || state.main.availableRepositories
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)
