/** Styles [Material UI components] **/
import React from 'react'
import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import './LoginLayout.scss'
import Flag from 'react-flags'

import translate from 'redux-polyglot/translate'
import { Divider, FontIcon, IconButton, RaisedButton } from 'material-ui'

const paperStyle = {
  backgroundColor: '#4b4b4b',
  position: 'absolute',
  top: '20%',
  bottom: '20%',
  left: '35%',
  right: '35%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
}

const buttonStyle = {
  olor: 'black',
  cursor: 'pointer',
  height: '50px',
  margin: 10,
  width: '300px',
  lineHeight: '50px',
}

export const LoginLayout = ({ p, setLanguageEn, setLanguagePl }) => (
  <div className='login-container'>
    <div className='languages-container'>
      <IconButton onTouchTap={setLanguageEn} tooltip='English' tooltipPosition='bottom-center'>
        <Flag name='GB' format='png' pngSize={32} shiny alt='English' />
      </IconButton>
      <IconButton onTouchTap={setLanguagePl} tooltip='Polish' tooltipPosition='bottom-center'>
        <Flag name='PL' format='png' pngSize={32} shiny alt='Polish' />
      </IconButton>
    </div>
    <Paper style={paperStyle} zDepth={5}>
      <div className='login-header'>
        <h1>{p.t('app.title')}</h1>
        <Divider />
      </div>
      <div className='login-btns'>
        <RaisedButton backgroundColor='gold' label={p.t('app.login.github')} style={buttonStyle} labelPosition='before'>
          <img className='vcs-icon' src='img/vcs-logo/github.png' />
        </RaisedButton>
        <RaisedButton backgroundColor='gold' label={p.t('app.login.gitlab')} style={buttonStyle} labelPosition='before'>
          <img className='vcs-icon' src='img/vcs-logo/gitlab.png' />
        </RaisedButton>
        <RaisedButton backgroundColor='gold' label={p.t('app.login.bitbucket')} style={buttonStyle} labelPosition='before'>
          <img className='vcs-icon' src='img/vcs-logo/bitbucket.png' />
        </RaisedButton>
      </div>
    </Paper>
  </div>
)

LoginLayout.propTypes = {
  setLanguageEn: PropTypes.func.isRequired,
  setLanguagePl: PropTypes.func.isRequired,
  p: PropTypes.shape({ t: PropTypes.func.isRequired }).isRequired
}

export default translate(LoginLayout)
