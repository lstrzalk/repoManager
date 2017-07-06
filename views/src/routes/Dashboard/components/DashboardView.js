import React from 'react'
import PropTypes from 'prop-types'
import './DashboardView.scss'
import translate from 'redux-polyglot/translate'
import Main from '../../../components/Main/containers/MainContainer'
import { Card, CardActions, CardHeader, CardText, CardTitle, FlatButton } from 'material-ui'
import { sessionStorageKeys } from '../../../../data/storage-data'

let availableRepos = JSON.parse(sessionStorage.getItem(sessionStorageKeys.availableRepositories))
import { getRepositories } from '../../../../utils/Rest'

let reposData = []

const setGithubData = (responseData, reposData) => {
  reposData.push({'github' : responseData})
}
getRepositories('github', setGithubData, reposData)

const setGitlabData = (responseData, reposData) => {
  reposData.push({'gitlab' : responseData})
}
getRepositories('gitlab', setGitlabData, reposData)

const setBitbucketData = (responseData, reposData) => {
  reposData.push({'bitbucket' : responseData})
}
getRepositories('bitbucket', setBitbucketData, reposData)

export class DashboardView extends React.Component {
  componentWillMount(){
    this.setState({reposData : reposData})
  }

  render () {
    const { p } = this.props
    const { reposData } = this.state
    let cards = []

    reposData.map(x => {
      for (var prop in x) {
        if (availableRepos.github) {
          if (prop === 'github') {
            x[prop].map(xp => {
              cards.push(
                <Card style={{ width : '90%', marginBottom : 20, backgroundColor : '#c7f289' }}>
                  <CardHeader title={'GitHub'} avatar={<img className='vcs-icon' src='img/vcs-logo/github.png'/>}/>
                  <CardTitle title={xp.repo.name} subtitle={xp.repo.description}/>
                  <CardActions>
                    <FlatButton href={xp.repo.html} label={p.t('app.repositories.goto')}/>
                  </CardActions>
                </Card>)
            })
          }
        }

        if (availableRepos.gitlab) {
          if (prop === 'gitlab') {
            x[prop].map(xp => {
              cards.push(
                <Card style={{ width : '90%', marginBottom : 20, backgroundColor : '#c7f289' }}>
                  <CardHeader title={'GitLab'} avatar={<img className='vcs-icon' src='img/vcs-logo/gitlab.png'/>}/>
                  <CardTitle title={xp.repo.name} subtitle={xp.repo.description}/>
                  <CardActions>
                    <FlatButton href={xp.repo.html} label={p.t('app.repositories.goto')}/>
                  </CardActions>
                </Card>)
            })
          }
        }

        if (availableRepos.bitbucket) {
          if (prop === 'bitbucket') {
            x[prop].map(xp => {
              cards.push(
                <Card style={{ width : '90%', marginBottom : 20, backgroundColor : '#c7f289' }}>
                  <CardHeader title={'Bitbucket'}
                              avatar={<img className='vcs-icon' src='img/vcs-logo/bitbucket.png'/>}/>
                  <CardTitle title={xp.repo.name} subtitle={xp.repo.description}/>
                  <CardActions>
                    <FlatButton href={xp.repo.html} label={p.t('app.repositories.goto')}/>
                  </CardActions>
                </Card>)
            })
          }
        }
      }
    })

    return (
      <Main p={p}>
        <h1>{p.t('app.menu.dashboard')}</h1>
        { cards }
      </Main>
    )
  }
}

DashboardView.propTypes = {
  p : PropTypes.shape({ t : PropTypes.func.isRequired }).isRequired
}

export default translate(DashboardView)
