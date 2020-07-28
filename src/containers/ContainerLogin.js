import React, { Component } from 'react';
import Login from '../../src/components/Login';
import rectorado_unmsm from '../../src/assets/images/rectorado_unmsm.jpg';

class ContainerLogin extends Component {

  onLogin=(path)=>{
    const {history} = this.props;
    history.push(path)
  }

  /**/

  render(){
    return(
      <div className='container-login'>
        <div className='container-login-form'>
          <img src={rectorado_unmsm} alt={'rectorado'} className='image-login'/>
          <Login onLogin={this.onLogin}/>
        </div>
      </div>
    )
  }
}

export default ContainerLogin