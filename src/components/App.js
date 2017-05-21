import React from 'react'
import { browserHistory, Router } from 'react-router'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'
import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'

injectTapEventPlugin()

class App extends React.Component {
  static propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
  }

  shouldComponentUpdate () {
    return false
  }

  render () {
    return (
      <Provider store={this.props.store}>
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <div style={{ height: '100%' }}>
            <Router history={browserHistory} children={this.props.routes} />
          </div>
        </MuiThemeProvider>
      </Provider>
    )
  }
}

export default App
