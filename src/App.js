import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ContainerLogin from '../src/containers/ContainerLogin'
import ContainerAdmin from '../src/containers/ContainerAdmin'
import ContainerUser from '../src/containers/ContainerUser'
import store from './store';
import AuthorizedRoute from "./components/commons/AuthorizedRoute";
import {loadInitialData} from "./actions/actions";
import { Provider, connect } from 'react-redux';

class AppRouter extends Component {

  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path="/" component={AuthorizedRoute()}/>
            <Route exact path="/login" component={AuthorizedRoute()}/>
            <Route path="/admin" component={AuthorizedRoute(ContainerAdmin)}/>
            <Route path="/usuario" component={AuthorizedRoute(ContainerUser)}/>
          </Switch>
        </Router>
      </Provider>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadInitialData: () => dispatch(loadInitialData())
})

AppRouter = connect(null,mapDispatchToProps)(AppRouter)

const App = () => {
  return (
    <Provider store={store}>
      <AppRouter/>
    </Provider>)

}

export default App;
