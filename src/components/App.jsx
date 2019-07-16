import React from 'react'
import { connect } from 'react-redux'

import AppHeader from './AppHeader'
import AppContent from './AppContent'
import AppLoading from './AppLoading'
import AppFooter from './AppFooter'

import HelperRegistry from 'core/HelperRegistry'

import './_app.scss'

class App extends React.Component {
  componentWillMount () {
    this.props.onLoadData()
  }
  render () {
    return (
      <main className='app'>
        <AppHeader />
        { this.props.dataLoaded ? <AppContent /> : <AppLoading /> }

        <AppFooter />
      </main>
    )
  }
}

export const mapStateToProps = (state) => {
  const props = {
    dataLoaded: state.data.loaded,
    dataLoading: state.data.loading,
    dataLoadingError: state.data.loadingError
  }
  return props
}

export const mapDispatchToProps = dispatch => ({
  onLoadData: () => HelperRegistry.Action.loadData(dispatch)
})

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

export default AppContainer
