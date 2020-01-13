import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ContainerAdmin from '../src/containers/ContainerAdmin'
import ContainerUser from '../src/containers/ContainerUser'
import store from './store';
import AuthorizedRoute from "./components/commons/AuthorizedRoute";
import {loadInitialData} from "./actions/actions";
import {Provider, connect} from 'react-redux';
import ContainerLogin from "./containers/ContainerLogin";

class AppRouter extends Component {

  async componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={ContainerLogin}/>
          <Route exact path="/login" component={ContainerLogin}/>
          <Route path="/admin" component={AuthorizedRoute(ContainerAdmin)}/>
          <Route path="/usuario" component={AuthorizedRoute(ContainerUser)}/>
        </Switch>
      </Router>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadInitialData: () => dispatch(loadInitialData())
});

AppRouter = connect(null, mapDispatchToProps)(AppRouter)

const App = () => {
  return (
    <Provider store={store}>
      <AppRouter/>
    </Provider>)

}

export default App;
