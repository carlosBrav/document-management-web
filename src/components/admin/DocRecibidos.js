import React, {Component} from 'react';
import CommonTableManage from '../commons/CommonTableManage';
import {listData_1} from "../../fakedata/ListDocRecibidos";
import {exportPDF} from "../utils/ExportPDF";

class DocRecibidos extends Component{

  getTableStructure = (onToggleAddDocSelect) => {
    return ([
      {
        columnHeader: '',
        actions: [{
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

  onExportDocuments=()=>{
    exportPDF()
  }

  getButtonsFooter=()=>{
    return [
      {text: 'Seguimiento', style: {backgroundColor: '#222', height: 40, marginRight: 20, borderColor: '#222'}, onClick: ()=> {}},
      {text: 'Imprimir', style: {backgroundColor: '#222', height: 40, marginRight: 20, borderColor: '#222'}, onClick: ()=> this.onExportDocuments()}]
    }

  render(){

    return(
      <CommonTableManage
        tableStructure={this.getTableStructure}
        title={'DOCUMENTOS RECIBIDOS'}
        listData={listData_1}
        buttonsFooter={this.getButtonsFooter()}
      />
    )
  }
}

export default DocRecibidos