import React from 'react'
import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import './PageLayout.scss'

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import Flag from 'react-flags'

import translate from 'redux-polyglot/translate'

/** Styles [Material UI components] **/
const navBarStyle = {
  height: '64px'
}

const menuStyle = {
  top: '64px'
}

export const PageLayout = ({ children, toggleMenu, setLanguageEn, setLanguagePl, p, logged, menuOpened }) => (
  <div>
    <AppBar style={navBarStyle} title={p.t('app.title')} onLeftIconButtonTouchTap={toggleMenu}
      iconElementRight={
        <div>
          <IconButton onTouchTap={setLanguageEn} tooltip='English' tooltipPosition='bottom-center'>
            <Flag name='GB' format='png' pngSize={32} shiny alt='English' />
          </IconButton>
          <IconButton onTouchTap={setLanguagePl} tooltip='Polish' tooltipPosition='bottom-center'>
            <Flag name='PL' format='png' pngSize={32} shiny alt='Polish' />
          </IconButton>
        </div>
      } />
    <Drawer containerStyle={menuStyle} open={menuOpened}>
      <MenuItem>{p.t('app.menu.vcsAccounts')}</MenuItem>
      <MenuItem>{p.t('app.menu.dashboard')}</MenuItem>
      <MenuItem>{p.t('app.menu.settings')}</MenuItem>
      <MenuItem>{p.t('app.menu.logout')}</MenuItem>
    </Drawer>

    <IndexLink to='/' activeClassName='page-layout__nav-item--active'>Home</IndexLink>
    {' · '}
    <Link to='/counter' activeClassName='page-layout__nav-item--active'>Counter</Link>
    <div className='page-layout__viewport'>
      {children}
    </div>
  </div>
)

PageLayout.propTypes = {
  children: PropTypes.node,
  toggleMenu: PropTypes.func.isRequired,
  setLanguageEn: PropTypes.func.isRequired,
  setLanguagePl: PropTypes.func.isRequired,
  p: PropTypes.shape({ t: PropTypes.func.isRequired }).isRequired,
  logged: PropTypes.bool,
  menuOpened: PropTypes.bool
}

export default translate(PageLayout)
