import React, { Component } from 'react';
import Login from '../../src/components/Login'
import image_rectorado from '../../src/assets/images/rectorado-san-marcos.png'

class ContainerLogin extends Component {

  render(){

    return(
      <div className='container-login'>
        <div className='container-login-header'>
          <h5>Sistema de Trámite Documentario v3.0</h5>
        </div>
        <div className='container-login-form'>
          <img src={image_rectorado} alt={'rectorado'} className='image-login'/>
          <Login />
        </div>
      </div>
    )
  }
}

export default ContainerLogin