import React from 'react'
import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import './Main.scss'

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import IconButton from 'material-ui/IconButton'
import { Paper } from 'material-ui'

import translate from 'redux-polyglot/translate'

const appBarStyle = {
  borderBottom: '1px solid #695231'
}

const menuStyle = {
  borderRight: '1px solid #406729',
  top: '65px',
  width: '60px',
  zIndex: '1301',
  overflow: 'none'
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

const mainContentOpenedStyle = {
  position: 'absolute',
  top: '114px',
  bottom: '50px',
  right: '200px',
  left: '524px'
}

const mainContentClosedStyle = {
  position: 'absolute',
  top: '114px',
  bottom: '50px',
  right: '200px',
  left: '264px'
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
      <Link to='/login'>
        <IconButton style={menuIcon} tooltip={p.t('app.menu.logout')} tooltipPosition='bottom-center'
          iconClassName='material-icons' key={3} onTouchTap={setMenuItem.bind(null, 3)}>
          input
        </IconButton>
      </Link>
    </Drawer>
    <Drawer containerStyle={sidePanelStyle} open={menuOpened} />
    <Paper style={menuOpened ? mainContentOpenedStyle : mainContentClosedStyle} zDepth={5}>
      { children }
    </Paper>
  </div>
)

Main.propTypes = {
  children: PropTypes.node,
  toggleMenu: PropTypes.func,
  setMenuItem: PropTypes.func,
  p: PropTypes.shape({ t: PropTypes.func.isRequired }).isRequired,
  logged: PropTypes.bool,
  menuOpened: PropTypes.bool
}

export default translate(Main)
