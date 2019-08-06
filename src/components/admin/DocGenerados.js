import React, {Component} from 'react';
import {ICON_TYPE} from "../commons/CommonIcon";
import CommonTableManage from "../commons/CommonTableManage";
import {lista_generados} from "../../fakedata/ListDocRecibidos";

class DocGenerados extends Component{

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

  getButtonsFooterGenerados=()=>{
    return [
      {text: 'Crear',  onClick: ()=> {}},
      {text: 'Eliminar', onClick: ()=> {}}
    ]
  }

  render(){
    return(
      <CommonTableManage
        tableStructure={this.getTableStructure}
        title={'DOCUMENTOS GENERADOS INTERNOS'}
        listData={lista_generados}
        buttonsFooter={this.getButtonsFooterGenerados()}
      />
    )
  }
}
export default DocGenerados