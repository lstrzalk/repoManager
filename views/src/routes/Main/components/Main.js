/** Functions **/
import React from 'react'
import { IndexLink, Link, browserHistory } from 'react-router'
import PropTypes from 'prop-types'
import './Main.scss'

import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import IconButton from 'material-ui/IconButton'
import { Avatar, List, ListItem, Paper, Subheader } from 'material-ui'

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

const mainContentStyle = {
  backgroundColor: '#fff3bc',
  color: '#5f4420',
  position: 'absolute',
  top: '114px',
  bottom: '50px',
  right: '200px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px'
}

const mainContentOpenedStyle = {
  left: '524px'
}

const mainContentClosedStyle = {
  left: '264px'
}

const repoListSubheaderStyle = {
  fontSize : '20px',
  color: '#355A27'
}

export const Main = ({ children, toggleMenu, p, logged, menuOpened, setMenuItem, availableRepositories, repositoriesData }) => (
  <div className='app-container' >
    <AppBar style={appBarStyle} zDepth={0}
      title={
        <div>
          <IndexLink to='/'>
            <img className='small-logo' src='img/small-logo.png' onClick={setMenuItem.bind(null, 1)} />
          </IndexLink>
          <span className='app-title-header'>{p.t('app.title')}</span>
        </div>
      }
      showMenuIconButton={false}
    />
    <Drawer containerStyle={menuStyle} zDepth={0} open>
      <IconButton style={menuIcon} tooltip={p.t('app.repositories.name')} tooltipPosition='bottom-right'
        iconClassName='material-icons' key={0} onTouchTap={toggleMenu}>
        library_books
      </IconButton>
      <Link to='/accounts'>
        <IconButton style={menuIcon} tooltip={p.t('app.menu.vcsAccounts')} tooltipPosition='bottom-right'
          iconClassName='material-icons' key={1} onTouchTap={setMenuItem.bind(null, 2)}>
          group
        </IconButton>
      </Link>
      <Link to='/auth'>
        <IconButton style={menuIcon} tooltip={p.t('app.menu.logout')} tooltipPosition='bottom-right'
          iconClassName='material-icons' key={2} >
          input
        </IconButton>
      </Link>
      <Avatar src={repositoriesData.github.avatar_url} />
    </Drawer>
    <Drawer containerStyle={sidePanelStyle} open={menuOpened} >
      <List>
        <Subheader style={repoListSubheaderStyle}>{p.t('app.repositories.name')}</Subheader>
        {
          availableRepositories.github ? <ListItem primaryText={p.t('app.repositories.github')}
            leftIcon={<img className='vcs-icon' src='img/vcs-logo/github.png'
              nestedItems={[]}
            />} /> : null
        }
        {
          availableRepositories.gitlab ? <ListItem primaryText={p.t('app.repositories.gitlab')}
            leftIcon={<img className='vcs-icon' src='img/vcs-logo/gitlab.png'
              nestedItems={[]}
            />} /> : null
        }
        {
          availableRepositories.bitbucket ? <ListItem primaryText={p.t('app.repositories.bitbucket')}
            leftIcon={<img className='vcs-icon' src='img/vcs-logo/bitbucket.png'
              nestedItems={[]}
            />} /> : null
        }
      </List>
    </Drawer>

    <Paper style={menuOpened ? Object.assign(mainContentStyle, mainContentOpenedStyle)
      : Object.assign(mainContentStyle, mainContentClosedStyle)} zDepth={2}>
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
  menuOpened: PropTypes.bool,
  availableRepositories: PropTypes.object,
  repositoriesData : PropTypes.object
}

export default translate(Main)
