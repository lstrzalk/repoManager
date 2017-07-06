import React from 'react'
import PropTypes from 'prop-types'
import './AccountsView.scss'
import translate from 'redux-polyglot/translate'
import Main from '../../../components/Main/containers/MainContainer'
import { Avatar, List, ListItem } from 'material-ui'
import Person from 'material-ui/svg-icons/social/person'

export const AccountsView = ({ p, accounts }) => {
  let listItems = []

  accounts.map(x => {
    for (var prop in x) {
      for (var prop1 in x[prop]) {
      if (prop1 === 'Github') {
        x[prop][prop1].length > 0 ?  x[prop][prop1].map(xp => {
          listItems.push(
            <ListItem
              primaryText={xp.name}
              secondaryText={xp.username}
              leftAvatar={<Avatar src={xp.avatar_url} />}
              rightIcon={<img className='vcs-icon' src='img/vcs-logo/github.png' />}
            />
          )
        }) : null
      }
      if (prop1 === 'Gitlab') {
        x[prop][prop1].length > 0 ?  x[prop][prop1].map(xp => {
          listItems.push(
            <ListItem
              primaryText={xp.name}
              secondaryText={xp.username}
              leftAvatar={<Avatar src={xp.avatar_url} />}
              rightIcon={<img className='vcs-icon' src='img/vcs-logo/gitlab.png' />}
            />
          )
        }) : null
      }
      if (prop1 === 'Bitbucket') {
        x[prop][prop1].length > 0 ?  x[prop][prop1].map(xp => {
          listItems.push(
            <ListItem
              primaryText={xp.display_name}
              secondaryText={xp.username}
              leftAvatar={<Avatar icon={<Person />} />}
              rightIcon={<img className='vcs-icon' src='img/vcs-logo/bitbucket.png' />}
            />
          )
        }) : null
      }
    }}
  })

  return (
    <Main p={p}>
      <h1>{ p.t('app.menu.vcsAccounts') }</h1>
      <List>
        {
          listItems
        }
      </List>
    </Main>
  )
}

AccountsView.propTypes = {
  p : PropTypes.shape({ t : PropTypes.func.isRequired }).isRequired
}

export default translate(AccountsView)
