import React, { Component } from 'react';
import Login from '../../src/components/Login'

class ContainerLogin extends Component {

  render(){

    return(
      <div className='container-login'>
        <div className='container-login-header'>
          <p>Sistema de Trámite Documentario v3.0</p>
        </div>
        <div className='container-login-form'>
          <Login />
        </div>
      </div>
    )
  }
}

export default ContainerLogin