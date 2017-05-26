import React from 'react'
import PropTypes from 'prop-types'
import './Main.scss'

import Drawer from 'material-ui/Drawer'
import { List, ListItem } from 'material-ui/List'
import Paper from 'material-ui/Paper'
import Subheader from 'material-ui/Subheader'
import MenuBar from '../MenuBar/MenuBar'
import TopBar from '../TopBar/TopBar'

import translate from 'redux-polyglot/translate'


const sidePanelStyle = {
  borderRight: '1px solid #406729',
  left: '60px',
  top: '65px'
}

const mainContentStyle = {
  backgroundColor: '#fff3bc',
  color: '#5f4420',
  position: 'absolute',
  top: '114px',
  bottom: '50px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px'
}

const mainContentOpenedStyle = {
  left: '424px',
  right: '100px'
}

const mainContentClosedStyle = {
  left: '264px',
  right: '200px'
}

const repoListSubheaderStyle = {
  fontSize : '20px',
  color: '#355A27'
}

export const Main = ({ children, toggleMenu, p, logged, menuOpened, setMenuItem, availableRepositories, repositoriesData }) => {
  let vcsNames = Object.keys(availableRepositories).filter(name => { return availableRepositories[name] === true })
  const reposListItem = vcsNames.map(vcsName =>
    <ListItem
      primaryText={p.t(`app.repositories.${vcsName}`)}
      leftIcon={<img className='vcs-icon' src={`img/vcs-logo/${vcsName}.png`} />}
      nestedItems={[]}
    />
  )
  return (
    <div className='app-container'>
      <TopBar setMenuItem={setMenuItem} p={p} />
      <MenuBar
        p={p}
        toggleMenu={toggleMenu}
        setMenuItem={setMenuItem}
        availableRepositories={availableRepositories}
        repositoriesData={repositoriesData}
      />
      <Drawer containerStyle={sidePanelStyle} open={menuOpened} >
        <List>
          <Subheader style={repoListSubheaderStyle}> {p.t('app.repositories.name')} </Subheader>
          { reposListItem }
        </List>
      </Drawer>

      <Paper style={menuOpened ? Object.assign(mainContentStyle, mainContentOpenedStyle)
        : Object.assign(mainContentStyle, mainContentClosedStyle)} zDepth={2}>
        { children }
      </Paper>
    </div>
  )
}

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
