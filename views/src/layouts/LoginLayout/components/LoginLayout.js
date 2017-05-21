import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import './LoginLayout.scss'
import Flag from 'react-flags'

import translate from 'redux-polyglot/translate'
import { Divider, IconButton, RaisedButton } from 'material-ui'

/** Styles [Material UI components] **/
const paperStyle = {
  backgroundColor: '#c02425',
  borderRadius: '5px',
  position: 'absolute',
  top: '5%',
  bottom: '5%',
  left: '35%',
  right: '35%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center'
}

const buttonStyle = {
  cursor: 'pointer',
  height: '50px',
  margin: 10,
  lineHeight: '50px',
}

const labelStyle = {
  color: 'black',
  fontSize: '18px',
  float: 'left',
  padding: '0 10px 0 20px',
  textTransform: 'none'
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
        <img className='logo' src='img/logo.png' />
        <h1>{p.t('app.title')}</h1>
        <Divider />
      </div>
      <div className='login-btns'>
        <RaisedButton label={p.t('app.login.github')} labelStyle={labelStyle} labelPosition='before'
          style={buttonStyle} backgroundColor='snow'>
          <img className='vcs-icon' src='img/vcs-logo/github.png' />
        </RaisedButton>
        <RaisedButton label={p.t('app.login.gitlab')} labelStyle={labelStyle} labelPosition='before'
          style={buttonStyle} backgroundColor='snow'>
          <img className='vcs-icon' src='img/vcs-logo/gitlab.png' />
        </RaisedButton>
        <RaisedButton label={p.t('app.login.bitbucket')} labelStyle={labelStyle} labelPosition='before'
          style={buttonStyle} backgroundColor='snow'>
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
