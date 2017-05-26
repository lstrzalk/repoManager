import React from 'react'
import PropTypes from 'prop-types'
import Avatar from 'material-ui/Avatar'
import Drawer from 'material-ui/Drawer'
import IconButton from 'material-ui/IconButton'
import { Link } from 'react-router'

const menuStyle = {
  borderRight: '1px solid #406729',
  top: '65px',
  width: '60px',
  zIndex: '1301',
  overflow: 'none',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  height: 'calc(100% - 65px)'
}

const menuIconStyle = {
  marginLeft: '6px',
  marginRight: '6px'
}

const avatarStyle = {
  margin: '10px'
}

export const MenuBar = ({ children, p, toggleMenu, setMenuItem, availableRepositories, repositoriesData }) => (
  <Drawer containerStyle={menuStyle} zDepth={0} open>
    <div>
      <IconButton style={menuIconStyle} tooltip={p.t('app.repositories.name')} tooltipPosition='bottom-right'
        iconClassName='material-icons' key={0} onTouchTap={toggleMenu}>
        library_books
      </IconButton>
      <Link to='/accounts'>
        <IconButton style={menuIconStyle} tooltip={p.t('app.menu.vcsAccounts')} tooltipPosition='bottom-right'
          iconClassName='material-icons' key={1} onTouchTap={setMenuItem.bind(null, 2)}>
          group
        </IconButton>
      </Link>
      <Link to='/auth'>
        <IconButton style={menuIconStyle} tooltip={p.t('app.menu.logout')} tooltipPosition='bottom-right'
          iconClassName='material-icons' key={2} >
          input
        </IconButton>
      </Link>
    </div>
    { availableRepositories.github ? <Avatar src={repositoriesData.github[0]['avatar_url']} style={avatarStyle} /> : null }
  </Drawer>
)

MenuBar.propTypes = {
  children: PropTypes.node,
  toggleMenu: PropTypes.func,
  setMenuItem: PropTypes.func,
  p: PropTypes.shape({ t: PropTypes.func.isRequired }).isRequired,
  availableRepositories: PropTypes.object,
  repositoriesData : PropTypes.object
}

export default MenuBar
