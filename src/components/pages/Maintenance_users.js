import React, {Component, Fragment} from 'react';
import {loadAllUsers, loadAllOffices, getTypeDocuments, deleteUser, deleteOffice} from "../../actions/actions";
import { connect } from 'react-redux';
import map from "lodash/map";
import isEqual from "lodash/isEqual";
import get from "lodash/get";
import {ClipLoader} from "react-spinners";
import CommonTableManage from "../commons/CommonTableManage";
import CommonTab from "../commons/CommonTab";
import {USER} from "../../utils/Constants";
import {ICON_TYPE} from "../commons/CommonIcon";
import CommonModal from "../commons/CommonModal";

class Maintenance_users extends Component{

  state = {
    listUsers: [],
    showDeleteModal: false,
    userSelected: null
  };

  getTableStructureUsers = () => {
    return ([
      {
        columnHeader: 'Nombre',
        rowProp: 'nombre',
        classSearchRow: 'container-search-field normal-size',
        filterHeader: true
      },
      {
        columnHeader: 'Apellido',
        rowProp: 'apellido',
        classSearchRow: 'container-search-field normal-size',
        filterHeader: true
      },
      {
        columnHeader: 'Teléfono',
        rowProp: 'telefono',
      },
      {
        columnHeader: 'Correo',
        rowProp: 'email',
      },
      {
        columnHeader: 'Rol',
        rowProp: 'rolName',
      },
      {
        columnHeader: 'Oficina',
        rowProp: 'officeName'
      },
      {
        columnHeader: 'Usuario',
        rowProp: 'usuario'
      },
      {
        columnHeader: 'Estado',
        rowProp: 'status'
      },
      {
        columnHeader: '',
        rowStyle: 'container-icons',
        actions: [
          {
            actionType: ICON_TYPE.TRASH,
            action: this.onToggleDeleteUser
          }
        ]
      }
    ])
  };

  componentDidMount(){
    const {loadAllUsers} = this.props
    loadAllUsers().then(()=>{
      this.setState({listUsers: this.props.users})
    })
  }

  componentDidUpdate(){
    if(!isEqual(this.state.listUsers, this.props.users)){
      this.setState({listUsers: this.props.users})
    }
  }

  goToManageUser=(id)=>{
    const {history} = this.props
    if(id){
      history.push(`/admin/user/${id}`)
    }else{
      history.push(`/admin/user`)
    }
  };

  onToggleDeleteUser=(user)=>{
    this.setState({showDeleteModal: !this.state.showDeleteModal, userSelected: user})
  };

  onDeleteUser=()=>{
    const {userSelected} = this.state;
    const {deleteUser, loadAllUsers} = this.props;
    const {id} = userSelected;
    deleteUser(id, null).then((response)=>{
      if(response.responseCode === 0){
        loadAllUsers().then(()=>{
          this.setState({showDeleteModal: !this.state.showDeleteModal, userSelected: null})
        })
      }
    });
  };

  footerTable=()=>{
    return [
      {text: 'Crear Usuario', action: ()=> this.goToManageUser()}
    ]
  };

  setRefToTabs = (r) => { this.refToTabs = r};

  goToSelectTab=(tabId)=>{
    if(this.refToTabs ) {
      this.refToTabs.toggle(tabId)
    }
  }

  render(){

    const {listUsers, showDeleteModal} = this.state

    const modalProps = [{
      showModal: showDeleteModal,
      title: 'Eliminar Usuario',
      message: '¿Desea eliminar al usuario?',
      yesFunction: this.onDeleteUser,
      yesText: 'Aceptar',
      noFunction: this.onToggleDeleteUser,
      noText: 'Cancelar'
      }];

    return(
      <Fragment>
        {
          modalProps && modalProps.length>0 ?
            map(modalProps, (modal, index)=>{
              return <CommonModal key={'modal'+index} {...modal}/>
            }) : null
        }
        <CommonTableManage
          tableStructure={this.getTableStructureUsers}
          title={'USUARIOS'}
          listData={listUsers}
          getFooterTableStructure={this.footerTable}
          onClick={this.goToManageUser}
        />
      </Fragment>

    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadAllUsers: () => dispatch(loadAllUsers()),
  getTypeDocuments: () => dispatch(getTypeDocuments()),
  deleteUser: (userId,cb) => dispatch(deleteUser(userId,cb))
});

function mapStateToProps(state){

  const getUsers=(listData)=>{
    return map(listData, user =>({
      ...user,
      status: user.estado? 'Activo': 'Inactivo'
    }))
  };

  return {
    users: getUsers(state.initialData.users),
    typesDocument: state.typeDocuments.data
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Maintenance_users)