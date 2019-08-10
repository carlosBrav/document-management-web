import React, {Component} from 'react';
import {list_busqueda_avanzada} from "../fakedata/ListDataDocuments";
import CommonTableManage from "./commons/CommonTableManage";

class Busqueda_avanzada extends Component{

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
        columnHeader: 'Fech. Tram.',
        rowProp: 'fech_tram'
      },
      {
        columnHeader: 'Fech. Ingreso',
        rowProp: 'fech_ingreso',
      },
      {
        columnHeader: 'Asunto',
        rowProp: 'asunto'
      },
      {
        columnHeader: 'Derivado a',
        rowProp: 'derivado_a',
      }
    ])
  }

  render(){
    return(
      <CommonTableManage
        tableStructure={this.getTableStructure}
        title={'BUSQUEDA AVANZADA'}
        listData={list_busqueda_avanzada}
        containFooter={this.getButtonsFooterGenerados()}
      />
    )
  }
}

export default Busqueda_avanzada