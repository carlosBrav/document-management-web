import React, {Component} from 'react';
import get from "lodash/get";
import {USER} from "../../utils/Constants";
import { connect } from 'react-redux';
import {getUserById, deleteUser, updateUser, createUser, loadAllUsers} from "../../actions/actions";
import FormRender from "../../forms/FormRender";
import {formEditUser, formCreateUser} from "../../forms/templates/TemplateManageUser";
import CommonIcon, {ICON_TYPE} from '../commons/CommonIcon';
import {getParseObj} from "../../utils/Utils";
import map from "lodash/map";
import CommonModal from "../commons/CommonModal";

function newUser(){
  return({
    [USER.STATUS]: true,
    [USER.NOMBRE]: '',
    [USER.APELLIDO]: '',
    [USER.TELEFONO]: '',
    [USER.DEPENDENCIA_ID]: '',
    [USER.ROL]: '',
    [USER.IS_SUB_OFFICE_BOSS]: false,
    [USER.IS_OFFICE_BOSS]: false
  })
}


class ManageUser extends Component{

  state = {
    user: null,
    userName: "",
    showDeleteModal: false
  };

  async componentDidMount(){
    const {match = {}} = this.props
    const {id} = match.params
    if (id) {
      await this.loadUserById(id)
    }else{
      await this.setState({user: newUser(), userName: ''})
    }
  }

  loadUserById(userId){
    const {getUserById} = this.props;
    getUserById(userId).then((response)=>{
      if(response.responseCode === 0){
        const {user} = this.props
        const fullName = `${get(user, USER.NOMBRE)}, ${get(user, USER.APELLIDO)}`;
        this.setState({user: user, userName: fullName})
      }
    })
  }

  onChangeValueMap=(prop,value)=>{
    this.setState({user: {...this.state.user, [prop]: value}})
  };

  goToMaintenance=()=>{
    const {history} = this.props
    history.push('/admin/Maintenance')
  };

  footerForm = (user,currentUser) => {
    return(
      (user && currentUser && user.id === currentUser.id) ?
      [
      {text: 'Grabar', action: this.onSaveUser}
    ]:
    [
      {text: 'Grabar', action: this.onSaveUser},
      {text: (user && user.estado? 'Eliminar':'Activar'), action: this.onToggleDeleteUser}
    ])
  };

  onSaveUser=()=>{
    const {user} = this.state
    const {updateUser, createUser} = this.props
    const {id} = user

    if(id){
      updateUser(user,this.goToMaintenance)
    }else {
      createUser(user, this.goToMaintenance)
    }
  };

  onDeleteUser=()=>{
    const {user} = this.state;
    const {id} = user;
    const {deleteUser, loadAllUsers} = this.props;
    deleteUser(id,null).then((response) => {
      if(response.responseCode === 0){
        loadAllUsers().then(()=>{
          this.onToggleDeleteUser()
          setTimeout(()=>{this.goToMaintenance()}, 2000)
        })
      }
    })
  };

  onToggleDeleteUser=()=>{
    this.setState({showDeleteModal: !this.state.showDeleteModal})
  }

  render(){
    const {user, userName, showDeleteModal} = this.state
    const currentUser = getParseObj('CURRENT_USER');
    const buttonsFooter = this.footerForm(user,currentUser);
    const isReadOnly = user && currentUser && user.id === currentUser.id;
    const userForm = user && user.id ? formEditUser(isReadOnly) : formCreateUser(isReadOnly);

    const modalProps = [{
      showModal: showDeleteModal,
      title: (user && user.estado ? 'Eliminar Usuario' : 'Activar Usuario'),
      message: (user && user.estado ? '¿Desea eliminar al usuario?': '¿Desea reactivar al usuario?'),
      yesFunction: this.onDeleteUser,
      yesText: 'Aceptar',
      noFunction: this.onToggleDeleteUser,
      noText: 'Cancelar'
    }];

    return(
      <div className='container-edit'>
        {
          modalProps && modalProps.length>0 ?
            map(modalProps, (modal, index)=>{
              return <CommonModal key={'modal'+index} {...modal}/>
            }) : null
        }
        <div className='container-title'>
          <div className='title-icon'>
            <CommonIcon type={ICON_TYPE.ARROW} onClick={this.goToMaintenance}/>
          </div>
          <h5>{`Usuario: ${userName}`}</h5>
        </div>
        <div style={{width: '50%'}}>
          <FormRender
            formTemplate={userForm}
            valueMap={user}
            onChange={this.onChangeValueMap}/>
          <div style={{marginTop: 20,width: 170, display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
            {
              buttonsFooter.map((content, index)=>{
                return <button key={'button'+index} className='btn btn-dark' onClick={content.action}>
                  {content.text}
                </button>
              })
            }
          </div>
        </div>
      </div>
    )
  }


}

const mapDispatchToProps = (dispatch) => ({
  getUserById: (userId) => dispatch(getUserById(userId)),
  deleteUser: (userId) => dispatch(deleteUser(userId)),
  updateUser: (user,cb) => dispatch(updateUser(user,cb)),
  createUser: (user,cb) => dispatch(createUser(user,cb)),
  loadAllUsers: () => dispatch(loadAllUsers())
});

function mapStateToProps(state){
  return{
    user: state.user.user
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ManageUser)