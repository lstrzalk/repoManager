import { connect } from 'react-redux'
import { toggleMenu, setMenuItem } from '../../../components/Main/modules/main'

import DashboardView from '../components/DashboardView'

const mapDispatchToProps = {
  toggleMenu    : () => toggleMenu(),
  setMenuItem   : setMenuItem
}

const mapStateToProps = (state) => ({
  menuOpened      : state.main.menuOpened,
  activeMenuItem  : state.main.activeMenuItem
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardView)
