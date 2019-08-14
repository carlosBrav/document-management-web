import React, {Component} from 'react';
import {list_control_documents} from '../../fakedata/ListDataDocuments';
import CommonTableManage from '../commons/CommonTableManage';
import {exportPDF} from "../utils/ExportPDF";

class ControlDocumentos extends Component{

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
        rowProp: 'mov'
      },
      {
        columnHeader: 'Destino',
        rowProp: 'destino',
        classSearchRow: 'container-search-field long-size',
        filterHeader: true
      },
      {
        columnHeader: 'F. Envio',
        rowProp: 'fech_envio'
      },
      {
        columnHeader: 'Indicador',
        rowProp: 'indicador',
      },
      {
        columnHeader: 'Observacion',
        rowProp: 'observacion',
      },
      {
        columnHeader: 'Doc. Nombre',
        rowProp: 'doc_nombre',
      },
      {
        columnHeader: 'Estado',
        rowProp: 'estado',
      }
    ])
  }

  onExportDocuments=()=>{
    exportPDF()
  }

  getFooterTableStructure=()=>{
    return [
      {text: 'Imprimir', action: ()=> this.onExportDocuments()}
    ]
  }

  render(){
    return(
      <CommonTableManage
        tableStructure={this.getTableStructure}
        title={'CONTROL DE DOCUMENTOS INTERNOS'}
        listData={list_control_documents}
        getFooterTableStructure={this.getFooterTableStructure}
      />
    )
  }
}
export default ControlDocumentos