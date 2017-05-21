import { connect } from 'react-redux'
import { toggleMenu, setMenuItem } from '../modules/main'

import Main from '../components/Main'

const mapDispatchToProps = {
  toggleMenu    : () => toggleMenu(),
  setMenuItem   : setMenuItem
}

const mapStateToProps = (state) => ({
  menuOpened      : state.main.menuOpened,
  activeMenuItem  : state.main.activeMenuItem
})

export default connect(mapStateToProps, mapDispatchToProps)(Main)
