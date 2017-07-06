import { connect } from 'react-redux'
import { toggleMenu, setMenuItem } from '../../../components/Main/modules/main'

import AccountsView from '../components/AccountsView'
import { getAccounts } from '../../../../utils/Rest'

let accounts = []
const setAccounts = (responseData, accounts) => {
  accounts.push(responseData)
}
getAccounts(setAccounts, accounts)

const mapDispatchToProps = {
  toggleMenu    : () => toggleMenu(),
  setMenuItem   : setMenuItem
}

const mapStateToProps = (state) => ({
  menuOpened      : state.main.menuOpened,
  activeMenuItem  : state.main.activeMenuItem,
  accounts : accounts
})

export default connect(mapStateToProps, mapDispatchToProps)(AccountsView)
