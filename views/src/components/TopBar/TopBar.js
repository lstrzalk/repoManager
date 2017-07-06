import React from 'react'
import PropTypes from 'prop-types'
import AppBar from 'material-ui/AppBar'
import { IndexLink } from 'react-router'

const appBarStyle = {
  borderBottom: '1px solid #695231'
}

export const TopBar = ({ children, p, setMenuItem }) => (
  <AppBar style={appBarStyle} zDepth={0}
    title={
      <div>
        <IndexLink to='/'>
          <img className='small-logo' src='img/small-logo.png' onClick={setMenuItem.bind(null, 1)} />
        </IndexLink>
        <span className='app-title-header'>{p.t('app.title')}</span>
      </div>
    }
    showMenuIconButton={false}
  />
)

TopBar.propTypes = {
  children: PropTypes.node,
  p: PropTypes.shape({ t: PropTypes.func.isRequired }).isRequired,
  setMenuItem: PropTypes.func,
}

export default TopBar
