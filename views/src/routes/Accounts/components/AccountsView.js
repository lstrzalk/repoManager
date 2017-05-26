import React from 'react'
import PropTypes from 'prop-types'
import './AccountsView.scss'
import translate from 'redux-polyglot/translate'
import Main from '../../../components/Main/containers/MainContainer'

export const AccountsView = ({ p }) => (
  <Main>
    <h1>{ p.t('app.menu.vcsAccounts') }</h1>
  </Main>
)

AccountsView.propTypes = {
  p: PropTypes.shape({ t: PropTypes.func.isRequired }).isRequired,
}

export default translate(AccountsView)
