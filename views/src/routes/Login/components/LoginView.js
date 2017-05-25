import React from 'react'
import PropTypes from 'prop-types'
import Paper from 'material-ui/Paper'
import { Divider, RaisedButton } from 'material-ui'
import translate from 'redux-polyglot/translate'
import './LoginView.scss'
import { browserHistory } from 'react-router'

/** Styles [Material UI components] **/
const paperStyle = {
  backgroundColor: '#95bf5a',
  borderRadius: '10px',
  position: 'absolute',
  top: '5%',
  bottom: '5%',
  left: 0,
  right: 0,
  margin: '0 auto',
  width: '500px',
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
  width: 'auto'
}

const labelStyle = {
  color: 'black',
  fontSize: '18px',
  float: 'left',
  padding: '0 10px 0 20px',
  textTransform: 'none',
  width: '250px',
  textAlign: 'left'
}

export const LoginView = ({ p }) => (
  <Paper style={paperStyle} zDepth={5}>
    <div className='login-header'>
      <img className='logo' src='img/logo.png' />
      <h1>{p.t('app.title')}</h1>
      <Divider />
    </div>
    <div className='login-btns'>
      <RaisedButton label={p.t('app.login.github')} labelStyle={labelStyle} labelPosition='before'
        style={buttonStyle} backgroundColor='snow' onTouchTap={login.bind(null, 'github')}>
        <img className='vcs-icon' src='img/vcs-logo/github.png' />
      </RaisedButton>
      <RaisedButton label={p.t('app.login.gitlab')} labelStyle={labelStyle} labelPosition='before'
        style={buttonStyle} backgroundColor='snow' onTouchTap={login.bind(null, 'gitlab')}>
        <img className='vcs-icon' src='img/vcs-logo/gitlab.png' />
      </RaisedButton>
      <RaisedButton label={p.t('app.login.bitbucket')} labelStyle={labelStyle} labelPosition='before'
        style={buttonStyle} backgroundColor='snow' onTouchTap={login.bind(null, 'bitbucket')}>
        <img className='vcs-icon' src='img/vcs-logo/bitbucket.png' />
      </RaisedButton>
    </div>
  </Paper>
)

function login (vcsName) {
  browserHistory.push('/auth/' + vcsName)
  window.location.reload()
}

LoginView.propTypes = {
  p: PropTypes.shape({ t: PropTypes.func.isRequired }).isRequired
}

export default translate(LoginView)
