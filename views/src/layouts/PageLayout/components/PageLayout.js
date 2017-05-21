/** Styles [Material UI components] **/
import React from 'react'
import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import './PageLayout.scss'

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import IconButton from 'material-ui/IconButton'
import Flag from 'react-flags'

import translate from 'redux-polyglot/translate'

const topBarStyle = {
  height: '64px'
}

const menuStyle = {
  top: '64px',
  width: '60px',
  zIndex: '1301'
}

const sidePanelStyle = {
  left: '60px',
  top: '64px'
}

const menuIcon = {
  marginLeft: '6px',
  marginRight: '6px'
}

export const PageLayout = ({
  children, toggleMenu, setLanguageEn, setLanguagePl, p, logged, menuOpened, setMenuItem
}) => (
  <div>
    <AppBar style={topBarStyle} onLeftIconButtonTouchTap={toggleMenu}
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
      <Link to='/accounts'>
        <IconButton style={menuIcon} tooltip={p.t('app.menu.vcsAccounts')} tooltipPosition='bottom-center'
          iconClassName='material-icons' key={0} onTouchTap={setMenuItem.bind(null, 0)}>
          group
        </IconButton>
      </Link>
      <Link to='/dashboard'>
        <IconButton style={menuIcon} tooltip={p.t('app.menu.dashboard')} tooltipPosition='bottom-center'
          iconClassName='material-icons' key={1} onTouchTap={setMenuItem.bind(null, 1)}>
          dashboard
        </IconButton>
      </Link>
      <Link to='/settings'>
        <IconButton style={menuIcon} tooltip={p.t('app.menu.settings')} tooltipPosition='bottom-center'
          iconClassName='material-icons' key={2} onTouchTap={setMenuItem.bind(null, 2)}>
          settings
        </IconButton>
      </Link>
      <Link to='/logout'>
        <IconButton style={menuIcon} tooltip={p.t('app.menu.logout')} tooltipPosition='bottom-center'
          iconClassName='material-icons' key={3} onTouchTap={setMenuItem.bind(null, 3)}>
          input
        </IconButton>
      </Link>
    </Drawer>
    <Drawer containerStyle={sidePanelStyle} open={menuOpened}>
      {/*<MenuItemContent></MenuItemContent>*/}
    </Drawer>
    <div>
      {children}
    </div>
  </div>
)

PageLayout.propTypes = {
  children: PropTypes.node,
  toggleMenu: PropTypes.func.isRequired,
  setLanguageEn: PropTypes.func.isRequired,
  setLanguagePl: PropTypes.func.isRequired,
  setMenuItem: PropTypes.func.isRequired,
  p: PropTypes.shape({ t: PropTypes.func.isRequired }).isRequired,
  logged: PropTypes.bool,
  menuOpened: PropTypes.bool
}

export default translate(PageLayout)
