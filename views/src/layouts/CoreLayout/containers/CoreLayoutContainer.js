import { connect } from 'react-redux'
import { setLanguage } from 'redux-polyglot'
import en from '../../../lang/en.json'
import pl from '../../../lang/pl.json'

import CoreLayout from '../components/CoreLayout'

const mapDispatchToProps = {
  setLanguageEn : () => setLanguage('en', { app : en }),
  setLanguagePl : () => setLanguage('pl', { app : pl }),
}

export default connect(null, mapDispatchToProps)(CoreLayout)
