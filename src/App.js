import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ContainerLogin from '../src/containers/ContainerLogin'
import ContainerAdmin from '../src/containers/ContainerAdmin'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ContainerLogin}/>
        <Route exact path="/login" component={ContainerLogin}/>
        <Route path="/admin" component={ContainerAdmin}/>
      </Switch>
    </Router>
  );
}

export default App;
