import React from 'react'
import PropTypes from 'prop-types'
import './SettingsView.scss'
import translate from 'redux-polyglot/translate'
import Main from '../../../components/Main/Main'

export const SettingsView = ({ p }) => (
  <Main>
    <h1>{ p.t('app.menu.settings') }</h1>
  </Main>
)

SettingsView.propTypes = {
  p: PropTypes.shape({ t: PropTypes.func.isRequired }).isRequired,
}

export default translate(SettingsView)
