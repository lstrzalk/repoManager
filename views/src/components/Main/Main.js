import React from 'react'
import PropTypes from 'prop-types'
import './Main.scss'
import { browserHistory } from 'react-router'
import Drawer from 'material-ui/Drawer'
import { List, ListItem } from 'material-ui/List'
import Paper from 'material-ui/Paper'
import Subheader from 'material-ui/Subheader'
import MenuBar from '../MenuBar/MenuBar'
import TopBar from '../TopBar/TopBar'

import translate from 'redux-polyglot/translate'
import { Checkbox, FlatButton, RaisedButton } from 'material-ui'
import { sessionStorageKeys } from '../../../data/storage-data'

const sidePanelStyle = {
  borderRight : '1px solid #406729',
  left        : '60px',
  top         : '65px'
}

const mainContentStyle = {
  backgroundColor : '#fff3bc',
  position        : 'absolute',
  top             : '114px',
  bottom          : '50px',
  display         : 'flex',
  flexDirection   : 'column',
  alignItems      : 'center',
  padding         : '20px',
  overflowY       : 'auto'
}

const mainContentOpenedStyle = {
  left  : '424px',
  right : '100px'
}

const mainContentClosedStyle = {
  left  : '264px',
  right : '200px'
}

const repoListSubheaderStyle = {
  fontSize : '20px',
  color    : '#355A27'
}

sessionStorage.setItem(sessionStorageKeys.availableRepositories, JSON.stringify({
  'github'    : true,
  'gitlab'    : true,
  'bitbucket' : true
}))

export const Main = ({ children, toggleMenu, p, logged, menuOpened, setMenuItem, availableRepositories, repositoriesData }) => {
  let vcsNames        = Object.keys(availableRepositories)
    .filter(name => { return availableRepositories[name] === true })
  const showRepos     = (vcsName, event, bool) => {
    let repos      = JSON.parse(sessionStorage.getItem(sessionStorageKeys.availableRepositories))
    repos[vcsName] = bool;
    sessionStorage.setItem(sessionStorageKeys.availableRepositories, JSON.stringify(repos))
  }
  const reposListItem = vcsNames.map((vcsName, index) =>
    <ListItem
      primaryText={p.t(`app.repositories.${vcsName}`)}
      leftCheckbox={<Checkbox key={vcsName} defaultChecked={JSON.parse(sessionStorage.getItem(sessionStorageKeys.availableRepositories))[vcsName]} onCheck={showRepos.bind(null, vcsName)} />}
      rightIcon={<img className='vcs-icon' src={`img/vcs-logo/${vcsName}.png`} />}
      nestedItems={[]}
    />
  )

  const addGithub = () => {
    browserHistory.push('/accounts/github')
    location.reload()
  }

  const addGitlab = () => {
    browserHistory.push('/accounts/gitlab')
    location.reload()
  }

  const addBitbucket = () => {
    browserHistory.push('/accounts/bitbucket')
    location.reload()
  }

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
      <Drawer containerStyle={sidePanelStyle} open={menuOpened}>
        <List>
          <Subheader style={repoListSubheaderStyle}> {p.t('app.repositories.name')} </Subheader>
          { reposListItem }

          {
            availableRepositories.github ? null : <FlatButton
              label={p.t('app.repositories.add')}
              labelPosition="before" onTouchTap={addGithub}
              fullWidth style={{marginBottom : 10}}
              icon={<img className='vcs-icon' src='img/vcs-logo/github.png' />}
            />
          }

          {
            availableRepositories.gitlab ? null : <FlatButton
              label={p.t('app.repositories.add')}
              labelPosition="before" onTouchTap={addGitlab}
              fullWidth style={{marginBottom : 10}}
              icon={<img className='vcs-icon' src='img/vcs-logo/gitlab.png' />}
            />
          }

          {
            availableRepositories.bitbucket ? null : <FlatButton
              label={p.t('app.repositories.add')}
              labelPosition="before" onTouchTap={addBitbucket}
              fullWidth style={{marginBottom : 10}}
              icon={<img className='vcs-icon' src='img/vcs-logo/bitbucket.png' />}
            />
          }
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
  children              : PropTypes.node,
  toggleMenu            : PropTypes.func,
  setMenuItem           : PropTypes.func,
  p                     : PropTypes.shape({ t : PropTypes.func.isRequired }).isRequired,
  logged                : PropTypes.bool,
  menuOpened            : PropTypes.bool,
  availableRepositories : PropTypes.object,
  repositoriesData      : PropTypes.object
}

export default translate(Main)
