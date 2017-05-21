import React from 'react'
import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import './PageLayout.scss'

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import IconButton from 'material-ui/IconButton'
import Flag from 'react-flags'

import translate from 'redux-polyglot/translate'

/** Styles [Material UI components] **/
const navBarStyle = {
  height: '64px'
}

const menuStyle = {
  top: '64px',
  width: '60px',
  zIndex: '1301'
}

const sidePanel = {
  left: '60px',
  top: '64px'
}

const menuIconStyle = {
  marginLeft: '6px',
  marginRight: '6px'
}

export const PageLayout = ({ children, toggleMenu, setLanguageEn, setLanguagePl, p, logged, menuOpened }) => (
  <div>
    <AppBar style={navBarStyle} onLeftIconButtonTouchTap={toggleMenu}
      title={
        <IndexLink to='/'>
          {p.t('app.title')}
        </IndexLink>
      }
      iconElementRight={
        <div>
          <IconButton onTouchTap={setLanguageEn} tooltip='English' tooltipPosition='bottom-center'>
            <Flag name='GB' format='png' pngSize={32} shiny alt='English' />
          </IconButton>
          <IconButton onTouchTap={setLanguagePl} tooltip='Polish' tooltipPosition='bottom-center'>
            <Flag name='PL' format='png' pngSize={32} shiny alt='Polish' />
          </IconButton>
        </div>
      }
    />
    <Drawer containerStyle={menuStyle} open>
      <Link to='/accounts' activeClassName='page-layout__nav-item--active'>
        <IconButton style={menuIconStyle} tooltip={p.t('app.menu.vcsAccounts')} tooltipPosition='bottom-center'
          iconClassName='material-icons'>
          group
        </IconButton>
      </Link>
      <Link to='/dashboard' activeClassName='page-layout__nav-item--active'>
        <IconButton style={menuIconStyle} tooltip={p.t('app.menu.dashboard')} tooltipPosition='bottom-center'
          iconClassName='material-icons'>
          dashboard
        </IconButton>
      </Link>
      <Link to='/settings' activeClassName='page-layout__nav-item--active'>
        <IconButton style={menuIconStyle} tooltip={p.t('app.menu.settings')} tooltipPosition='bottom-center'
          iconClassName='material-icons'>
          settings
        </IconButton>
      </Link>
      <Link to='/logout' activeClassName='page-layout__nav-item--active'>
        <IconButton style={menuIconStyle} tooltip={p.t('app.menu.logout')} tooltipPosition='bottom-center'
          iconClassName='material-icons'>
          input
        </IconButton>
      </Link>
    </Drawer>

    <Drawer containerStyle={sidePanel} open={menuOpened}></Drawer>

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
