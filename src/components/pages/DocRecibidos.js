import React, {Component} from 'react';
import CommonTableManage from '../commons/CommonTableManage';
import {listData_1} from "../../fakedata/ListDataDocuments";
import {exportPDF} from "../utils/ExportPDF";
import {BUTTON_TYPE} from '../../constants/Constants';

class DocRecibidos extends Component{

  state = {
    listDataSelected: [],

  }

  onSetSelectDocuments=(listDataSelected)=>{
    this.setState({listDataSelected})
  }

  getTableStructure = (onChangeCheck,onToggleAddDocSelect) => {
    return ([
      {
        columnHeader: '',
        elementHeader: BUTTON_TYPE.CHECKBOX,
        actionHeader: onChangeCheck,
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
        columnHeader: 'Movimiento',
        rowProp: 'movimiento'
      },
      {
        columnHeader: 'Destino',
        rowProp: 'destino',
        classSearchRow: 'container-search-field long-size',
        filterHeader: true,
        rowStyle: 'custom-td'
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
      }
    ])
  }

  onExportDocuments=()=>{
    exportPDF()
  }

  getFooterTableStructure = () => {
    return([
      {text: 'Seguimiento', action: ()=>{}},
      {text: 'Imprimir', action: this.onExportDocuments}
    ])
  }

  render(){

    return(
      <CommonTableManage
        tableStructure={this.getTableStructure}
        title={'DOCUMENTOS RECIBIDOS'}
        listData={listData_1}
        getFooterTableStructure={this.getFooterTableStructure}
        onSetSelected={this.onSetSelectDocuments}
        onAdd={this.onChangeInitialIndex}
        onSubtract={this.onChangeInitialIndex}
      />
    )
  }
}

export default DocRecibidos