import React, {Component, Fragment} from 'react';
import { connect } from 'react-redux';
import {ICON_TYPE} from "../commons/CommonIcon";
import CommonTableManage from "../commons/CommonTableManage";
import map from "lodash/map";
import {deleteOffice, loadAllOffices} from "../../actions/actions";
import isEqual from "lodash/isEqual";
import CommonModal from "../commons/CommonModal";

class Maintenance_offices extends Component{

  state = {
    listOffices: [],
    showDeleteModal: false,
    officeSelected: null
  };

  componentDidMount(){
    const {loadAllOffices} = this.props;
    loadAllOffices().then(()=>{
      this.setState({listOffices: this.props.dependencies})
    })
  }

  componentDidUpdate(){
    if(!isEqual(this.state.listOffices, this.props.dependencies)){
      this.setState({listOffices: this.props.dependencies})
    }
  }

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

  goToManageOffice=(id)=>{
    const {history} = this.props
    if(id){
      history.push(`/admin/office/${id}`)
    }else{
      history.push(`/admin/office`)
    }
  };

  onToggleDeleteOffice=(office)=>{
    this.setState({showDeleteModal: !this.state.showDeleteModal, officeSelected: office})
  };

  onDeleteOffice=()=>{
    const {officeSelected} = this.state;
    const {deleteOffice, loadAllOffices} = this.props;
    const {id} = officeSelected;
    deleteOffice(id, null).then((response)=>{
      if(response.responseCode === 0){
        loadAllOffices().then(()=>{
          this.setState({showDeleteModal: !this.state.showDeleteModal, officeSelected: null})
        })
      }
    })
  };

  footerTableOffices=()=>{
    return [
      {text: 'Crear Dependencia', action: ()=> this.goToManageOffice()}
    ]
  };

  render(){

    const {listOffices, showDeleteModal} = this.state
    const modalProps = [
      {
        showModal: showDeleteModal,
        title: 'Eliminar Oficina',
        message: '¿Desea eliminar la Oficina?',
        yesFunction: this.onDeleteOffice,
        yesText: 'Aceptar',
        noFunction: this.onToggleDeleteOffice,
        noText: 'Cancelar'
      }
    ];

    return (
      <Fragment>
        {
          modalProps && modalProps.length>0 ?
            map(modalProps, (modal, index)=>{
              return <CommonModal key={'modal'+index} {...modal}/>
            }) : null
        }
        <CommonTableManage
          tableStructure={this.getTableStructureOffices}
          title={'DEPENDENCIAS'}
          listData={listOffices}
          getFooterTableStructure={this.footerTableOffices}
          onClick={this.goToManageOffice}
          className={'offices-table'}
        />
      </Fragment>
    )
  }

}

const mapDispatchToProps = (dispatch) => ({
  loadAllOffices: () => dispatch(loadAllOffices()),
  deleteOffice: (officeId,cb) => dispatch(deleteOffice(officeId,cb))
});

function mapStateToProps(state){

  const getOffices=(listData)=>{
    return map(listData, office =>({
      ...office,
      status: office.estado? 'Activo': 'Inactivo'
    }))
  };

  return {
    dependencies: getOffices(state.initialData.dependencies)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Maintenance_offices)