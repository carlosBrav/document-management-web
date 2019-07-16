import React, { Component } from 'react';
import Icon, {ICON_TYPE} from '../../src/components/commons/Icon'

class Login extends Component {

  render(){
    return(
      <div className='login-form'>
          <div className='login-form-header-container'>
            <div className='login-form-header-title'>
              <p>Oficina General de Planificacion</p>
            </div>
            <div className='login-form-container-icon'>
              <Icon className='login-form-icon-shield' type={ICON_TYPE.SHIELD_UNMSM} />
            </div>
          </div>

          <div className='login-form-labels'>
            <div className='container-form-label'>
              <label>Usuario</label>
              <div className='form-label-content'>
                <Icon type={ICON_TYPE.LOGO_USER}/>
                <input className='input-text' type='text' placeholder={'Usuario'} />
              </div>
            </div>
            <div className='container-form-label'>
              <label>Contraseña</label>
              <div className='form-label-content'>
                <Icon type={ICON_TYPE.PADLOCK}/>
                <input className='input-text' type='password' placeholder={'Contraseña'} />
              </div>
            </div>
          </div>
          <div className='login-form-button-submit'>
            <div style={{width: '40%', height: '40%', borderRadius: '15px', backgroundColor: '#000000',
              display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', color: '#FFFFFF'}}>
              <a className='button'>Ingresar</a>
            </div>
          </div>
      </div>
    )
  }
}

export default Login;