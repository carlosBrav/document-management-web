import React, {Component} from 'react';
import CommonTableManage from '../commons/CommonTableManage';
import {lista_circulares} from "../../fakedata/ListDataDocuments";
import {ICON_TYPE} from "../commons/CommonIcon";
import {exportPDF} from "../utils/ExportPDF";

class DocCirculares extends Component{

  state = {
    search: '',
    listDataSelected: [],
    showDeleteModal: false
  }

  toggleViewDocument=(data)=>{
    console.log('DOCUMENT SELECTED ',data)
  }

  toggleEditDocument=(data)=>{
    console.log('DOCUMENT EDIT ', data)
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
        columnHeader: 'Correlativo',
        rowProp: 'correlativo',
        classSearchRow: 'container-search-field normal-size',
        filterHeader: true
      },
      {
        columnHeader: 'Asunto',
        rowProp: 'asunto'
      },
      {
        columnHeader: 'Area Resp.',
        rowProp: 'area_resp',
        classSearchRow: 'container-search-field long-size',
        filterHeader: true
      },
      {
        columnHeader: 'Fecha Env.',
        rowProp: 'fech_envio'
      },
      {
        columnHeader: 'Firma',
        rowProp: 'firma',
      },
      {
        columnHeader: 'Responsable',
        rowProp: 'responsable'
      },
      {
        columnHeader: '',
        rowStyle: 'container-icons',
        actions: [
          {
           actionType: ICON_TYPE.SEARCH,
           action: data => this.toggleViewDocument(data)
          },
          {
            actionType: ICON_TYPE.EDIT,
            action: data => this.toggleEditDocument(data)
          }
        ]
      }
    ])
  }

  onExportDocuments=()=>{
    exportPDF()
  }

  onToggleDeleteDocuments = (listDataFiltered=[]) => {
    this.setState({showDeleteModal: !this.state.showDeleteModal, listDataSelected: listDataFiltered})
  }

  onDeleteDocuments = () => {
    this.setState({showDeleteModal: !this.state.showDeleteModal})
  }

  getFooterTableStructure=()=>{
    return [
      {text: 'Crear',  action: ()=> {}},
      {text: 'Eliminar', action: (listDataFiltered)=> this.onToggleDeleteDocuments(listDataFiltered)},
      {text: 'Imprimir',  action: ()=> this.onExportDocuments()}
    ]
  }

  render(){

    const {showDeleteModal,listDataSelected} = this.state

    const modalProps = {
      showModal: showDeleteModal,
      title: 'Eliminar Documentos Circulares',
      message: (listDataSelected.length>0)?`¿Desea imprimir estos ${listDataSelected.length} documentos ?`:`Debe seleccionar al menos un documento`,
      yesFunction: (listDataSelected.length>0)?this.onDeleteDocuments:this.onToggleDeleteDocuments,
      yesText: (listDataSelected.length>0)?'Sí':'Ok',
      noFunction: (listDataSelected.length>0)?this.onToggleDeleteDocuments:null
    }

    return(
      <CommonTableManage
        tableStructure={this.getTableStructure}
        title={'OFICIOS CIRCULARES - OGPL'}
        listData={lista_circulares}
        onView={(data)=> console.log('SELECTED TO VIEW ', data)}
        onEdit={(data) => console.log('SELECTED TO EDIT ', data)}
        modalProps={modalProps}
        getFooterTableStructure={this.getFooterTableStructure}
      />
    )
  }
}
export default DocCirculares