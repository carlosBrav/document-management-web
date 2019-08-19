import React, {Component} from 'react';
import CommonTableManage from '../commons/CommonTableManage';
import {listData_1} from "../../fakedata/ListDataDocuments";
import {exportPDF} from "../utils/ExportPDF";

class DocRecibidos extends Component{

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

  onExportDocuments=()=>{
    exportPDF()
  }

  getFooterTableStructure = () => {
    return([
      {text: 'Seguimiento', action: ()=>{}},
      {text: 'Imprimir', action: ()=> this.onExportDocuments()}
    ])
  }

  render(){

    return(
      <CommonTableManage
        tableStructure={this.getTableStructure}
        title={'DOCUMENTOS RECIBIDOS'}
        listData={listData_1}
        getFooterTableStructure={this.getFooterTableStructure}
      />
    )
  }
}

export default DocRecibidos