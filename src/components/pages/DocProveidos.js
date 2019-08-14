import React, {Component} from 'react';
import CommonTableManage from "../commons/CommonTableManage";
import {lista_proveidos_1, lista_proveidos_2} from "../../fakedata/ListDataDocuments";
import CommonTab from "../commons/CommonTab";
import {ICON_TYPE} from "../commons/CommonIcon";
import {exportPDF} from "../utils/ExportPDF";


class DocProveidos extends Component{

  state = {
    search: '',
    listDataSelected: [],
    showDeleteModal: false
  }

  toggleEditDocument=(data)=>{
    console.log('DOCUMENT EDIT PROVEIDO ', data)
  }

  getTableStructure_proveidos_1 = (onToggleAddDocSelect) => {
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
        columnHeader: 'Origen',
        rowProp: 'origen',
        classSearchRow: 'container-search-field long-size',
        filterHeader: true
      },
      {
        columnHeader: 'Fecha Reg.',
        rowProp: 'fech_registro'
      }
    ])
  }

  getTableStructure_proveidos_2 = (onToggleAddDocSelect) => {
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
        columnHeader: 'Num. Doc.',
        rowProp: 'num_doc'
      },
      {
        columnHeader: 'Fech. Reg.',
        rowProp: 'fech_registro'
      },
      {
        columnHeader: 'Asunto',
        rowProp: 'asunto'
      },
      {
        columnHeader: 'Origen',
        rowProp: 'origen',
        classSearchRow: 'container-search-field long-size',
        filterHeader: true
      },
      {
        columnHeader: 'Usuario',
        rowProp: 'usuario'
      },
      {
        columnHeader: '',
        rowStyle: 'container-icons',
        actions: [
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

  getFooterTableStructureProveidos_1=()=>{
    return [
      {text: 'Proveidos Int.',  action: ()=> {}},
      {text: 'Proveidos Ext.', action: ()=> {}}
    ]
  }

  getFooterTableStructureProveidos_2=()=>{
    return [
      {text: 'Eliminar',  action: (listDataFiltered)=> this.onToggleDeleteDocuments(listDataFiltered)},
      {text: 'Imprimir', action: ()=> this.onExportDocuments()}
    ]
  }

  render(){

    const {showDeleteModal,listDataSelected} = this.state

    const modalProps = {
      showModal: showDeleteModal,
      title: 'Eliminar Documentos Proveidos',
      message: (listDataSelected.length>0)?`¿Desea imprimir estos ${listDataSelected.length} documentos ?`:`Debe seleccionar al menos un documento`,
      yesFunction: (listDataSelected.length>0)?this.onDeleteDocuments:this.onToggleDeleteDocuments,
      yesText: (listDataSelected.length>0)?'Sí':'Ok',
      noFunction: (listDataSelected.length>0)?this.onToggleDeleteDocuments:null
    }

    const tableDocumentInt = <CommonTableManage
      tableStructure={this.getTableStructure_proveidos_1}
      title={'DOCUMENTOS INTERNOS'}
      listData={lista_proveidos_1}
      getFooterTableStructure={this.getFooterTableStructureProveidos_1}
    />;

    const tableProveidos = <CommonTableManage
      tableStructure={this.getTableStructure_proveidos_2}
      title={'PROVEIDOS'}
      listData={lista_proveidos_2}
      modalProps={modalProps}
      getFooterTableStructure={this.getFooterTableStructureProveidos_2}
    />;

    const tabs =
      [ {title: 'Doc. Internos', id: 'docuIntProv', component: tableDocumentInt},
        {title: 'Proveidos', id: 'proveidos', component: tableProveidos}
      ];

    return(
      <CommonTab tabTitles={tabs}/>
    )
  }

}
export default DocProveidos