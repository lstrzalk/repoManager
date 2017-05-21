import React from 'react'
import PropTypes from 'prop-types'
import './CoreLayout.scss'
import Flag from 'react-flags'
import translate from 'redux-polyglot/translate'
import { IconButton } from 'material-ui'

export const CoreLayout = ({ children, setLanguageEn, setLanguagePl, p }) => (
  <div className='main-container'>
    <div className='languages-container'>
      <IconButton onTouchTap={setLanguageEn} tooltip='English' tooltipPosition='bottom-center'>
        <Flag name='GB' format='png' pngSize={32} shiny alt='English' />
      </IconButton>
      <IconButton onTouchTap={setLanguagePl} tooltip='Polish' tooltipPosition='bottom-center'>
        <Flag name='PL' format='png' pngSize={32} shiny alt='Polish' />
      </IconButton>
    </div>
    {React.cloneElement(children, { p : p })}
  </div>
)

CoreLayout.propTypes = {
  children: PropTypes.node,
  setLanguageEn: PropTypes.func.isRequired,
  setLanguagePl: PropTypes.func.isRequired,
  p: PropTypes.shape({ t: PropTypes.func.isRequired }).isRequired,
}

export default translate(CoreLayout)
