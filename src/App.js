import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ContainerLogin from '../src/containers/ContainerLogin'
import Admin from '../src/components/admin/Admin'

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={ContainerLogin}/>
        <Route exact path="/login" component={ContainerLogin}/>
        <Route exact path="/admin" component={Admin}/>
      </Switch>
    </Router>
  );
}

export default App;
