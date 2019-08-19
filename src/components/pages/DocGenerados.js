import React, {Component, Fragment} from 'react';
import {ICON_TYPE} from "../commons/CommonIcon";
import CommonTableManage from "../commons/CommonTableManage";
import {lista_generados} from "../../fakedata/ListDataDocuments";
import {exportPDF} from "../utils/ExportPDF";
import map from "lodash/map";
import CommonModal from '../commons/CommonModal';
import {formDocumGenerado} from "../../forms/templates/TemplateDocumentGen";
import FormRender from "../../forms/FormRender";

class DocGenerados extends Component{

  state = {
    search: '',
    listDataToDeleteSelected: [],
    showDeleteModal: false,
    showCreateModal: false,
    valueMapCreateDocument: {}
  }

  toggleViewDocumentGenerado=(data)=>{
    console.log('DOCUMENT GENERADO VIEW ', data)
  }

  toggleEditDocumentGenerado=(data)=>{
    console.log('DOCUMENT GENERADO EDIT ', data)
  }

  onSetListDataToDelete=(listDataToDeleteSelected)=>{
    this.setState({listDataToDeleteSelected})
  }

  onChangeValueCreateDocument=(prop, value)=>{
    this.setState({valueMapCreateDocument: {...this.state.valueMapCreateDocument, [prop]: value}})
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
        columnHeader: 'Documento',
        rowProp: 'documento',
        classSearchRow: 'container-search-field normal-size',
        filterHeader: true
      },
      {
        columnHeader: 'Fech. Reg.',
        rowProp: 'fech_reg'
      },
      {
        columnHeader: 'Asunto',
        rowProp: 'asunto',
      },
      {
        columnHeader: 'Origen',
        rowProp: 'origen'
      },
      {
        columnHeader: 'Destino',
        rowProp: 'destino',
      },
      {
        columnHeader: 'Responsable',
        rowProp: 'responsable'
      },
      {
        columnHeader: '#',
        rowProp: 'numero'
      },
      {
        columnHeader: '',
        rowStyle: 'container-icons',
        actions: [
          {
            actionType: ICON_TYPE.SEARCH,
            action: data => this.toggleViewDocumentGenerado(data)
          },
          {
            actionType: ICON_TYPE.EDIT,
            action: data => this.toggleEditDocumentGenerado(data)
          }
        ]
      }
    ])
  }

  onToggleDeleteDocuments = () => {
    this.setState({showDeleteModal: !this.state.showDeleteModal})
  }

  onToggleCreateDocumentGen=()=>{
    this.setState({showCreateModal: !this.state.showCreateModal})
  }

  onDeleteDocuments = () => {
    this.setState({showDeleteModal: !this.state.showDeleteModal})
  }

  onCreateDocument=()=>{
    const {valueMapCreateDocument} = this.state
    console.log('VALUE MAP CREATE ', valueMapCreateDocument)
    this.onToggleCreateDocumentGen()
  }

  getFooterTableStructureGenerados=()=>{
    return [
      {text: 'Crear',  action: this.onToggleCreateDocumentGen},
      {text: 'Eliminar', action: this.onToggleDeleteDocuments}
    ]
  }

  render(){

    const {showDeleteModal, showCreateModal,listDataToDeleteSelected,valueMapCreateDocument} = this.state

    const modalProps = [{
      showModal: showDeleteModal,
      title: 'Eliminar Documentos Generados',
      message: (listDataToDeleteSelected.length>0)?`¿Desea imprimir estos ${listDataToDeleteSelected.length} documentos ?`:`Debe seleccionar al menos un documento`,
      yesFunction: (listDataToDeleteSelected.length>0)?this.onDeleteDocuments:this.onToggleDeleteDocuments,
      yesText: (listDataToDeleteSelected.length>0)?'Sí':'Ok',
      noFunction: (listDataToDeleteSelected.length>0)?this.onToggleDeleteDocuments:null
    },
    {
      showModal: showCreateModal,
      title: 'Crear documento',
      yesFunction: this.onCreateDocument,
      yesText: 'Crear documento',
      noText: 'Cancelar',
      noFunction: this.onToggleCreateDocumentGen,
      content: <FormRender formTemplate={formDocumGenerado}
                           onChange={this.onChangeValueCreateDocument}
                           valueMap={valueMapCreateDocument}/>
    }]

    return(
      <Fragment>
        {
          modalProps && modalProps.length>0 ?
            map(modalProps, (modal, index)=>{
              return <CommonModal key={'modal'+index} {...modal}/>
            }) : null
        }
      <CommonTableManage
        tableStructure={this.getTableStructure}
        title={'DOCUMENTOS GENERADOS INTERNOS'}
        listData={lista_generados}
        modalProps={modalProps}
        getFooterTableStructure={this.getFooterTableStructureGenerados}
        onSetSelected={this.onSetListDataToDelete}
      />
      </Fragment>
    )
  }
}
export default DocGenerados