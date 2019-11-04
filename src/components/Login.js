import React, { Component } from 'react';
import CommonIcon, {ICON_TYPE} from './commons/CommonIcon'
import escudo_unmsm from '../assets/images/escudo_san_marcos.png';
import { connect } from 'react-redux';
import {login} from '../actions/actions';
import Message, {MESSAGE_TYPE} from "./commons/CommonMessage";
import isEmpty from "lodash/isEmpty";
import {getPath} from "../utils/Utils";

class Login extends Component {

  state = {
    user: '',
    password: ''
  }

  onChange=(value, prop) => {
    this.setState({[prop]: value})
  }

  onLogin=()=>{
    const {user, password} = this.state
    const {login, onLogin} = this.props
    login(user, password).then(response => {
      const {responseCode} = response
      if(responseCode === 0){
        if(response.data.rolName === 'asignador'){
          onLogin(`/${getPath('usuario')}`)
        }else{
          onLogin(`/${getPath(response.data.rolName)}`)
        }

      }
    })
  };

  render(){

    const {errors} = this.props

    return(
      <div className='login-form'>
          <div className='login-form-header-container'>
            <div className='login-form-header-title'>
              <p>Oficina General de Planificacion</p>
            </div>
            <div className='login-form-container-icon'>
              <img src={escudo_unmsm} alt={'escudo_san_marcos'} className='image-escudo-san-marcos'/>
            </div>
          </div>

          <div className='login-form-labels'>
            {
              !isEmpty(errors) ? <div style={{width: "65%", height: "auto" }}>
                <Message type={MESSAGE_TYPE.DANGER} text={errors}/>
              </div> : null
            }
            <div className='container-form-label'>
              <label>Usuario</label>
              <div className='form-label-content'>
                <CommonIcon type={ICON_TYPE.LOGO_USER}/>
                <input className='input-text' type='text' placeholder={'Usuario'}
                onChange={(e) => this.onChange(e.target.value, 'user')} onKeyUp={ e => {if (e.keyCode === 13) this.onLogin()}}/>
              </div>
            </div>
            <div className='container-form-label'>
              <label>Contraseña</label>
              <div className='form-label-content'>
                <CommonIcon type={ICON_TYPE.PADLOCK}/>
                <input className='input-text' type='password' placeholder={'Contraseña'}
                       onChange={(e) => this.onChange(e.target.value, 'password')} onKeyUp={ e => {if (e.keyCode === 13) this.onLogin()}}/>
              </div>
            </div>
          </div>
          <div className='login-form-button-submit'>
            <button className='btn btn-dark button-submit' onClick={this.onLogin}>Ingresar</button>
          </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { loggedIn, loggedInUser, errors } = state.authentication;
  return {
    loggedIn,
    loggedInUser,
    errors
  };
}

const mapDispatchToProps = (dispatch) => ({
  login: (user, password) => dispatch(login(user,password))
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);