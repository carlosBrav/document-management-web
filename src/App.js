import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ContainerLogin from '../src/containers/ContainerLogin'
import ContainerAdmin from '../src/containers/ContainerAdmin'
import ContainerUser from '../src/containers/ContainerUser'
import { Provider } from 'react-redux';
import store from './store';
import AuthorizedRoute from "./components/commons/AuthorizedRoute";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={AuthorizedRoute()}/>
          <Route exact path="/login" component={AuthorizedRoute()}/>
          <Route path="/admin" component={AuthorizedRoute(ContainerAdmin)}/>
          <Route path="/user" component={AuthorizedRoute(ContainerUser)}/>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
