import React, {Component} from 'react';
import CommonTableManage from '../commons/CommonTableManage';
import {lista_circulares} from "../../fakedata/ListDocRecibidos";

class DocCirculares extends Component{


  getTableStructure = (onToggleAddDocSelect) => {
    return ([
      {
        columnHeader: '',
        actions: [{
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
        classSearchRow: 'container-search-field normal-size',
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
      }
    ])
  }

  getButtonsFooterCirculares=()=>{
    return [
      {text: 'Crear',  onClick: ()=> {}},
      {text: 'Eliminar', onClick: ()=> {}},
      {text: 'Imprimir',  onClick: ()=> {}}
    ]
  }

  render(){
    return(
      <CommonTableManage
        tableStructure={this.getTableStructure}
        title={'OFICIOS CIRCULARES - OGPL'}
        listData={lista_circulares}
        buttonsFooter={this.getButtonsFooterCirculares()}
        onView={(data)=> console.log('SELECTED TO VIEW ', data)}
        onEdit={(data) => console.log('SELECTED TO EDIT ', data)}
      />
    )
  }
}
export default DocCirculares