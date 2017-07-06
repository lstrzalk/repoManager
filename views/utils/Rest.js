import axios from 'axios'
import { sessionStorageKeys, localStorageKeys } from '../data/storage-data'
import { browserHistory } from 'react-router'

export const getAccountsRequest = (setAvailableRepositories, availableRepositories, repositoriesData) => {
  axios.get('/accounts')
    .then(function (response) {
      setAvailableRepositories(response.data, availableRepositories, repositoriesData)
    }).catch(function (error) {
    console.log(error)
  });
}

export const getRepositories = (vcsName, setData, data) => {
  axios.get('/repos/' + vcsName)
    .then(function (response) {
      setData(response.data, data)
    }).catch(function (error) {
    console.log(error)
  });
}

export const getAccounts = (setData, data) => {
  axios.get('/accounts')
    .then(function (response) {
      setData(response.data, data)
    }).catch(function (error) {
    console.log(error)
  });
}
