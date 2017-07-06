import React from 'react'
import PropTypes from 'prop-types'
import './CoreLayout.scss'
import Flag from 'react-flags'
import translate from 'redux-polyglot/translate'
import { IconButton } from 'material-ui'
import { localStorageKeys } from '../../../../data/storage-data'

export const CoreLayout = ({ children, setLanguageEn, setLanguagePl, p }) => {
  let setLangEn = () => {
    localStorage.setItem(localStorageKeys.language, 'en')
    setLanguageEn()
  }

  let setLangPl = () => {
    localStorage.setItem(localStorageKeys.language, 'pl')
    setLanguagePl()
  }

  return (
    <div className='main-container'>
      <div className='languages-container'>
        <IconButton onTouchTap={setLangEn} tooltip='English' tooltipPosition='bottom-center'>
          <Flag name='GB' format='png' pngSize={32} shiny alt='English' />
        </IconButton>
        <IconButton onTouchTap={setLangPl} tooltip='Polish' tooltipPosition='bottom-center'>
          <Flag name='PL' format='png' pngSize={32} shiny alt='Polish' />
        </IconButton>
      </div>
      {children}
    </div>
  )
}

CoreLayout.propTypes = {
  children: PropTypes.node,
  setLanguageEn: PropTypes.func.isRequired,
  setLanguagePl: PropTypes.func.isRequired,
  p: PropTypes.shape({ t: PropTypes.func.isRequired }).isRequired,
}

export default translate(CoreLayout)
