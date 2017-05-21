import React from 'react'
import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import './Main.scss'

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import IconButton from 'material-ui/IconButton'

import translate from 'redux-polyglot/translate'

const appBarStyle = {
  borderBottom: '1px solid #695231'
}

const menuStyle = {
  borderRight: '1px solid #406729',
  top: '65px',
  width: '60px',
  zIndex: '1301'
}

const sidePanelStyle = {
  borderRight: '1px solid #406729',
  left: '60px',
  top: '65px'
}

const menuIcon = {
  marginLeft: '6px',
  marginRight: '6px'
}

export const Main = ({ children, toggleMenu, p, logged, menuOpened, setMenuItem }) => (
  <div className='app-container'>
    <AppBar style={appBarStyle} zDepth={0}
      title={
        <div>
          <IndexLink to='/'>
            <img className='small-logo' src='img/small-logo.png' />
          </IndexLink>
          <span className='app-title-header'>{p.t('app.title')}</span>
        </div>
      }
      showMenuIconButton={false}
    />
    <Drawer containerStyle={menuStyle} zDepth={0} open>
      <IconButton style={menuIcon} tooltip={p.t('app.menu.dashboard')} tooltipPosition='bottom-center'
        iconClassName='material-icons' key={1} onTouchTap={() => { setMenuItem.bind(null, 1); toggleMenu() }}>
        dashboard
      </IconButton>
      <Link to='/accounts'>
        <IconButton style={menuIcon} tooltip={p.t('app.menu.vcsAccounts')} tooltipPosition='bottom-center'
          iconClassName='material-icons' key={0} onTouchTap={setMenuItem.bind(null, 0)}>
          group
        </IconButton>
      </Link>
      <Link to='/settings'>
        <IconButton style={menuIcon} tooltip={p.t('app.menu.settings')} tooltipPosition='bottom-center'
          iconClassName='material-icons' key={2} onTouchTap={setMenuItem.bind(null, 2)}>
          settings
        </IconButton>
      </Link>
      <Link to='/login'>
        <IconButton style={menuIcon} tooltip={p.t('app.menu.logout')} tooltipPosition='bottom-center'
          iconClassName='material-icons' key={3} onTouchTap={setMenuItem.bind(null, 3)}>
          input
        </IconButton>
      </Link>
    </Drawer>
    <Drawer containerStyle={sidePanelStyle} open={menuOpened} />
    <div>
      {children}
    </div>
  </div>
)

Main.propTypes = {
  children: PropTypes.node,
  toggleMenu: PropTypes.func.isRequired,
  setMenuItem: PropTypes.func.isRequired,
  p: PropTypes.shape({ t: PropTypes.func.isRequired }).isRequired,
  logged: PropTypes.bool,
  menuOpened: PropTypes.bool
}

export default translate(Main)
