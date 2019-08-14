import React, {Component} from 'react';
import CommonTab from '../commons/CommonTab';
import CommonTableManage from '../commons/CommonTableManage';
import {listData_1, listData_2} from "../../fakedata/ListDataDocuments";



class DocRespuesta extends Component{

  state = {
    search: '',
    listDataSelected: [],
    showDeleteModal: false
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

  onToggleDeleteDocuments = (listDataFiltered=[]) => {
    this.setState({showDeleteModal: !this.state.showDeleteModal, listDataSelected: listDataFiltered})
  }

  onDeleteDocuments = () => {
    this.setState({showDeleteModal: !this.state.showDeleteModal})
  }

  getFooterTableStructureOficios = () => {
    return([
      {text: 'Crear', action: ()=>{}},
      {text: 'Eliminar', action: (listFiltered)=> this.onToggleDeleteDocuments(listFiltered)}
    ])
  }

  getFooterTableStructureDocInt = () => {
    return([
      {text: 'Oficios', action: ()=> {}}
    ])
  }

  render(){

    const {showDeleteModal,listDataSelected} = this.state

    const modalProps = {
      showModal: showDeleteModal,
      title: 'Eliminar Documentos',
      message: (listDataSelected.length>0)?`¿Desea eliminar ${listDataSelected.length} documento(s) ?`:`Debe seleccionar al menos un documento`,
      yesFunction: (listDataSelected.length>0)?this.onDeleteDocuments:this.onToggleDeleteDocuments,
      yesText: (listDataSelected.length>0)?'Sí':'Ok',
      noFunction: (listDataSelected.length>0)?this.onToggleDeleteDocuments:null
    }

    const tableDocumentInt = <CommonTableManage
      tableStructure={this.getTableStructure}
      title={'DOCUMENTOS INTERNOS'}
      listData={listData_1}
      getFooterTableStructure={this.getFooterTableStructureDocInt}
    />;

    const tableOficios = <CommonTableManage
      tableStructure={this.getTableStructure}
      title={'OFICIOS'}
      listData={listData_2}
      modalProps={modalProps}
      getFooterTableStructure={this.getFooterTableStructureOficios}
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