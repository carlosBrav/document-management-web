import React, {Component} from 'react';
import {ICON_TYPE} from "../commons/CommonIcon";
import CommonTableManage from "../commons/CommonTableManage";
import {lista_generados} from "../../fakedata/ListDataDocuments";
import {exportPDF} from "../utils/ExportPDF";

class DocGenerados extends Component{

  state = {
    search: '',
    listDataSelected: [],
    showDeleteModal: false
  }

  toggleViewDocumentGenerado=(data)=>{
    console.log('DOCUMENT GENERADO VIEW ', data)
  }

  toggleEditDocumentGenerado=(data)=>{
    console.log('DOCUMENT GENERADO EDIT ', data)
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

  onToggleDeleteDocuments = (listDataFiltered=[]) => {
    this.setState({showDeleteModal: !this.state.showDeleteModal, listDataSelected: listDataFiltered})
  }

  onDeleteDocuments = () => {
    this.setState({showDeleteModal: !this.state.showDeleteModal})
  }

  getFooterTableStructureGenerados=()=>{
    return [
      {text: 'Crear',  action: ()=> {}},
      {text: 'Eliminar', action: (listDataFiltered)=> this.onToggleDeleteDocuments(listDataFiltered)}
    ]
  }

  render(){

    const {showDeleteModal,listDataSelected} = this.state

    const modalProps = {
      showModal: showDeleteModal,
      title: 'Eliminar Documentos Generados',
      message: (listDataSelected.length>0)?`¿Desea imprimir estos ${listDataSelected.length} documentos ?`:`Debe seleccionar al menos un documento`,
      yesFunction: (listDataSelected.length>0)?this.onDeleteDocuments:this.onToggleDeleteDocuments,
      yesText: (listDataSelected.length>0)?'Sí':'Ok',
      noFunction: (listDataSelected.length>0)?this.onToggleDeleteDocuments:null
    }

    return(
      <CommonTableManage
        tableStructure={this.getTableStructure}
        title={'DOCUMENTOS GENERADOS INTERNOS'}
        listData={lista_generados}
        modalProps={modalProps}
        getFooterTableStructure={this.getFooterTableStructureGenerados}
      />
    )
  }
}
export default DocGenerados