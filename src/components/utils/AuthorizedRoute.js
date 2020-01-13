import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import {getParseObj, getDecodedToken} from '../../utils/Utils'

function isExpired(token) {
  if (!token)
    return true;
  const now = parseInt(Date.now())/1000;
  return token.exp < now;
}

const AuthorizedRoute = InnerComponent => class extends Component {

  render() {
    const currentUser = getParseObj('CURRENT_USER');
    const token = getDecodedToken()

    if(isExpired(token))
      return <Redirect to="/login"/>
    return (<InnerComponent {...this.props} currentUser={currentUser} />);
  }

};

export default AuthorizedRoute;