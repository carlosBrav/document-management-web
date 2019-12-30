import React, {Component, Fragment} from 'react';
import {loadAllUsers, loadAllOffices, getTypeDocuments, deleteUser} from "../../actions/actions";
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

class Maintenance extends Component{

  state = {
    listUsers: [],
    listDependencies: [],
    listTypeUsers: [],
    showDeleteModal: false,
    showDeleteOffice: false,
    userSelected: null,
    officeSelected: null
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

  getTableStructureOffices = () => {
    return ([
      {
        columnHeader: 'Código',
        rowProp: 'codigo',
        classSearchRow: 'container-search-field normal-size',
        filterHeader: true
      },
      {
        columnHeader: 'Nombre',
        rowProp: 'nombre',
        classSearchRow: 'container-search-field long-size',
        filterHeader: true
      },
      {
        columnHeader: 'Siglas',
        rowProp: 'siglas'
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
            action: this.onToggleDeleteOffice
          }
        ]
      }
    ])
  }

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

  fillOffices=()=>{
    if(!isEqual(this.state.listDependencies, this.props.dependencies)){
      this.setState({listDependencies: this.props.dependencies})
    }
  };

  goToManageUser=(id)=>{
    const {history} = this.props
    if(id){
      history.push(`/admin/user/${id}`)
    }else{
      history.push(`/admin/user`)
    }
  };

  goToManageOffice=(id)=>{
    const {history} = this.props
    if(id){
      history.push(`/admin/office/${id}`)
    }else{
      history.push(`/admin/office`)
    }
  };

  onToggleDeleteUser=(user)=>{
    this.setState({showDeleteModal: !this.state.showDeleteModal, userSelected: user})
  };

  onToggleDeleteOffice=(office)=>{
    this.setState({showDeleteOffice: !this.state.showDeleteOffice, officeSelected: office})
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

  footerTableOffices=()=>{
    return [
      {text: 'Crear Dependencia', action: ()=> this.goToManageOffice()}
    ]
  }

  render(){

    const {listUsers,listDependencies,listTypeUsers, showDeleteModal} = this.state

    const modalProps = [{
      showModal: showDeleteModal,
      title: 'Eliminar Usuario',
      message: '¿Desea eliminar al usuario?',
      yesFunction: this.onDeleteUser,
      yesText: 'Aceptar',
      noFunction: this.onToggleDeleteUser,
      noText: 'Cancelar'
    }];

    const tableUsers = () => {
      return (
          <CommonTableManage
            tableStructure={this.getTableStructureUsers}
            title={'USUARIOS'}
            listData={listUsers}
            getFooterTableStructure={this.footerTable}
            onClick={this.goToManageUser}
          />
      )
    };

    const tableOffices=()=>{
      return (
        <CommonTableManage
          tableStructure={this.getTableStructureOffices}
          title={'DEPENDENCIAS'}
          listData={listDependencies}
          getFooterTableStructure={this.footerTableOffices}
          onClick={this.goToManageOffice}
          className={'offices-table'}
        />
      )
    }

    const tabs =
      [{title: 'Usuarios', id: 'usersId', action: tableUsers, onClick: this.fillUsers},
        {title: 'Oficinas', id: 'officesId', action: tableOffices, onClick: this.fillOffices}
      ];

    return(
      <Fragment>
        {
          modalProps && modalProps.length>0 ?
            map(modalProps, (modal, index)=>{
              return <CommonModal key={'modal'+index} {...modal}/>
            }) : null
        }
        <CommonTab tabList={tabs}/>
      </Fragment>

    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadAllUsers: () => dispatch(loadAllUsers()),
  loadAllOffices: () => dispatch(loadAllOffices()),
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

  const getOffices=(listData)=>{
    return map(listData, office =>({
      ...office,
      status: office.estado? 'Activo': 'Inactivo'
    }))
  };

  return {
    dependencies: getOffices(state.initialData.dependencies),
    users: getUsers(state.initialData.users),
    typesDocument: state.typeDocuments.data
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Maintenance)