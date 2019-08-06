import React, {Component} from 'react';
import CommonTab from '../commons/CommonTab';
import CommonTableManage from '../commons/CommonTableManage';
import {listData_1, listData_2} from "../../fakedata/ListDocRecibidos";



class DocRespuesta extends Component{

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

  getButtonsFooterDocInt=()=>{
    return [
      {text: 'Oficios', onClick: ()=> {}}
    ]
  }

  getButtonsFooterOficios=()=>{
    return [
      {text: 'Crear',  onClick: ()=> {}},
      {text: 'Eliminar', onClick: ()=> {}}
    ]
  }

  render(){

    const tableDocumentInt = <CommonTableManage
      tableStructure={this.getTableStructure}
      title={'DOCUMENTOS INTERNOS'}
      listData={listData_1}
      buttonsFooter={this.getButtonsFooterDocInt()}
    />;

    const tableOficios = <CommonTableManage
      tableStructure={this.getTableStructure}
      title={'OFICIOS'}
      listData={listData_2}
      buttonsFooter={this.getButtonsFooterOficios()}
    />;

    const tabs =
      [ {title: 'Doc. Internos', id: 'docuInt', component: tableDocumentInt},
        {title: 'Oficios', id: 'oficios', component: tableOficios}
      ];

    return(
      <CommonTab tabTitles={tabs}/>
    )
  }
}
export default DocRespuesta