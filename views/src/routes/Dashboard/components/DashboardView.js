import React from 'react'
import PropTypes from 'prop-types'
import './DashboardView.scss'
import translate from 'redux-polyglot/translate'
import Main from '../../Main/containers/MainContainer'

export const DashboardView = ({ p }) => (
  <Main p={p} >
    <h1>{p.t('app.menu.dashboard')}</h1>
  </Main>
)

DashboardView.propTypes = {
  p: PropTypes.shape({ t: PropTypes.func.isRequired }).isRequired,
}

export default translate(DashboardView)
