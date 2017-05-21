import { connect } from 'react-redux'
import { toggleMenu, logout, setMenuItem } from '../modules/pageLayout'
import { setLanguage } from 'redux-polyglot'
import en from '../../../lang/en.json'
import pl from '../../../lang/pl.json'

import PageLayout from '../components/PageLayout'

const mapDispatchToProps = {
  toggleMenu    : () => toggleMenu(),
  setLanguageEn : () => setLanguage('en', { app : en }),
  setLanguagePl : () => setLanguage('pl', { app : pl }),
  logout        : () => logout(),
  setMenuItem   : setMenuItem
}

const mapStateToProps = (state) => ({
  logged          : state.pageLayout.logged,
  menuOpened      : state.pageLayout.menuOpened,
  activeMenuItem  : state.pageLayout.activeMenuItem
})

export default connect(mapStateToProps, mapDispatchToProps)(PageLayout)
