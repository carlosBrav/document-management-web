import React, { Component } from 'react';
import Icon, {ICON_TYPE} from '../../src/components/commons/Icon'

class Login extends Component {

  render(){
    return(
      <div className='login-form'>
        <div className='login-form-container-icon'>
          <Icon styleIcon={{width: '150px', height: '150px'}} type={ICON_TYPE.SHIELD_UNMSM} />
        </div>
        <div className='login-form-content'>
          <div>
            <label>Usuario</label>
            <input type='text' placeholder={'Usuario'} />
          </div>
          <div>
            <label>Contraseña</label>
            <input type='password' placeholder={'Contraseña'} />
          </div>
          <div>
            <div>
              <a>Enter</a>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;