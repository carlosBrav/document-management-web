import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import {getParseObj, getDecodedToken} from "../../utils/Utils";
import ContainerLogin from "../../containers/ContainerLogin";
import ContainerAdmin from "../../containers/ContainerAdmin";
import ContainerUser from "../../containers/ContainerUser";

function isExpired(token) {
  if (!token)
    return true;
  const now = parseInt(Date.now())/1000;
  return token.exp < now;
}

const AuthorizedRoute = InnerComponent => class extends Component {

  render() {

    const currentUser =   getParseObj('CURRENT_USER');
    if(currentUser){
      const token = getDecodedToken()
      if(isExpired(token)){
        return <ContainerLogin {...this.props}/>
      }else{
        if(InnerComponent){
          return (<InnerComponent {...this.props} currentUser={currentUser} />);
        }else{
          switch(currentUser.rolName){
            case "admin":
              return (<ContainerAdmin {...this.props} currentUser={currentUser} />);
            case "user":
              return (<ContainerUser {...this.props} currentUser={currentUser} />);
            default: return null;
          }
        }
      }
    }else{
      return <ContainerLogin {...this.props}/>
    }
  }

};

export default AuthorizedRoute;