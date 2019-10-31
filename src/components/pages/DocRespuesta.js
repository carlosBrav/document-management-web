import React, {Component, Fragment} from 'react';
import CommonTab from '../commons/CommonTab';
import CommonTableManage from '../commons/CommonTableManage';
import {listData_1, listData_2} from "../../fakedata/ListDataDocuments";
import FormRender from "../../forms/FormRender";
import {formOficiosToExp, formOficios} from '../../forms/templates/TemplateCreateOficios';
import map from "lodash/map";
import CommonModal from '../commons/CommonModal';
import {connect} from 'react-redux';
import {getDocuments} from "../../actions/actions";
import {getParseObj} from "../../utils/Utils";

const currentUser = getParseObj('CURRENT_USER');

class DocRespuesta extends Component{

  state = {
    search: '',
    listDataSelectedToDelete: [],
    listDataSelectedDocInt: [],
    showDeleteModal: false,
    showCreateModal: false,
    showCreateSecondModal: false,
    valueMapCreateOficio: {},
    valueMapCreateOnlyOficio: {}
  }

  onChangeValueOficio=(prop, value)=>{
    this.setState({valueMapCreateOficio: {...this.state.valueMapCreateOficio, [prop]: value}})
  }

  onChangeValueOnlyOficio=(prop, value)=>{
    this.setState({valueMapCreateOnlyOficio: {...this.state.valueMapCreateOnlyOficio, [prop]: value}})
  }

  onSetSelectedToDeleteOficio=(listDataSelectedToDelete)=>{
    this.setState({listDataSelectedToDelete})
  }

  onSetSelectToCreateOficio=(listDataSelectedDocInt)=>{
  this.setState({listDataSelectedDocInt})
}

  getTableStructure = (onToggleAddDocSelect) => {
    return ([
      {
        columnHeader: '',
        actions: [{
          actionType: 'button',
          action: (index) => onToggleAddDocSelect(index)
        }]
      },
      {
        columnHeader: 'Num. Tram.',
        rowProp: 'num_tram',
        classSearchRow: 'container-search-field normal-size',
        filterHeader: true
      },
      {
        columnHeader: 'Mov.',
        rowProp: 'movimiento'
      },
      {
        columnHeader: 'Destino',
        rowProp: 'destino',
        classSearchRow: 'container-search-field long-size',
        filterHeader: true
      },
      {
        columnHeader: 'F. Envio',
        rowProp: 'fech_envio',
        classSearchRow: 'container-search-field medium-size',
        filterHeader: true
      },
      {
        columnHeader: 'Indicador',
        rowProp: 'indic'
      },
      {
        columnHeader: 'Observación',
        rowProp: 'observacion'
      },
      {
        columnHeader: 'Doc. Nombre',
        rowProp: 'docum_nomb'
      },
      {
        columnHeader: 'Estado',
        rowProp: 'estado'
      }
    ])
  }

  onToggleDeleteDocuments = () => {
    this.setState({showDeleteModal: !this.state.showDeleteModal})
  }

  onToggleCreateOficio = () => {
    this.setState({showCreateModal: !this.state.showCreateModal})
  }

  onToggleCreateOnlyOficio = () => {
    this.setState({showCreateSecondModal: !this.state.showCreateSecondModal})
  }

  onDeleteDocuments = () => {
    this.setState({showDeleteModal: !this.state.showDeleteModal})
  }

  getFooterTableStructureOficios = () => {
    return([
      {text: 'Crear', action: this.onToggleCreateOnlyOficio},
      {text: 'Eliminar', action: this.onToggleDeleteDocuments}
    ])
  }

  getFooterTableStructureDocInt = () => {
    return([
      {text: 'Oficios', action: this.onToggleCreateOficio}
    ])
  }

  onCreateOficio=()=>{
    const {valueMapCreateOficio} = this.state
    console.log('VALUE MAP TO CREATE OFICIO ', valueMapCreateOficio)
    this.onToggleCreateOficio()
  }

  onCreateOnlyOficio=()=>{
    const {valueMapCreateOnlyOficio} = this.state
    console.log('VALUE MAP TO CREATE ONLY OFICIO ', valueMapCreateOnlyOficio)
    this.onToggleCreateOnlyOficio()
  }

  render(){

    const {showDeleteModal,
      listDataSelectedToDelete,
      showCreateModal,
      listDataSelectedDocInt,
      showCreateSecondModal,
      valueMapCreateOficio,
      valueMapCreateOnlyOficio} = this.state

    const modalProps = [
      {
        showModal: showCreateSecondModal,
        title: 'Crear Oficio',
        yesFunction: this.onCreateOnlyOficio,
        yesText: 'Crear Oficio',
        noFunction: this.onToggleCreateOnlyOficio,
        noText: 'Cancelar',
        content: <FormRender formTemplate={formOficios}
                             onChange={this.onChangeValueOnlyOficio}
                             valueMap={valueMapCreateOnlyOficio}/>
      },
      {
        showModal: showCreateModal,
        title: 'Crear Oficio',
        message: (listDataSelectedDocInt.length === 1)? null: 'Debe seleccionar 1 documento',
        yesFunction: (listDataSelectedDocInt.length === 1) ? this.onCreateOficio:this.onToggleCreateOficio,
        yesText: (listDataSelectedDocInt.length === 1) ? 'Crear Oficio':'Ok',
        noFunction: (listDataSelectedDocInt.length === 1) ? this.onToggleCreateOficio:null,
        noText: (listDataSelectedDocInt.length === 1) ? 'Cancelar':null,
        content: <FormRender formTemplate={formOficiosToExp}
                             onChange={this.onChangeValueOficio}
                             valueMap={valueMapCreateOficio}/>
      },
      {
        showModal: showDeleteModal,
        title: 'Eliminar Documentos',
        message: (listDataSelectedToDelete.length>0)?`¿Desea eliminar ${listDataSelectedToDelete.length} documento(s) ?`:`Debe seleccionar al menos un documento`,
        yesFunction: (listDataSelectedToDelete.length>0)?this.onDeleteDocuments:this.onToggleDeleteDocuments,
        yesText: (listDataSelectedToDelete.length>0)?'Sí':'Ok',
        noFunction: (listDataSelectedToDelete.length>0)?this.onToggleDeleteDocuments:null
      }
    ]

    const tableDocumentInt = () =>{
      return (<CommonTableManage
        tableStructure={this.getTableStructure}
        title={'DOCUMENTOS INTERNOS'}
        listData={listData_1}
        getFooterTableStructure={this.getFooterTableStructureDocInt}
        onSetSelected={this.onSetSelectToCreateOficio}
      />)
    }

    const tableOficios =()=> {
      return (
        <CommonTableManage
          tableStructure={this.getTableStructure}
          title={'OFICIOS'}
          listData={listData_2}
          getFooterTableStructure={this.getFooterTableStructureOficios}
          onSetSelected={this.onSetSelectedToDeleteOficio}
        />
      )
    }

    const tabs =
      [ {title: 'Doc. Internos', id: 'docuInt', action: tableDocumentInt},
        {title: 'Oficios', id: 'oficios', action: tableOficios}
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
  getOficios: (typeDocuments, userId) => dispatch(getDocuments(typeDocuments, userId))
});


export default DocRespuesta