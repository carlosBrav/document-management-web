import React, {Component} from 'react';
import CommonTableManage from '../commons/CommonTableManage';
import {lista_circulares} from "../../fakedata/ListDataDocuments";
import {ICON_TYPE} from "../commons/CommonIcon";

class DocCirculares extends Component{

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

  getContainFooterCirculares=()=>{
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
        containFooter={this.getContainFooterCirculares()}
        onView={(data)=> console.log('SELECTED TO VIEW ', data)}
        onEdit={(data) => console.log('SELECTED TO EDIT ', data)}
      />
    )
  }
}
export default DocCirculares