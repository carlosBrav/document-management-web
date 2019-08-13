import React, {Component} from 'react';
import CommonTableManage from '../commons/CommonTableManage';
import {listData_1} from "../../fakedata/ListDataDocuments";

class DocConfirmados extends Component{

  state = {
    search: '',
    listDataSelected: [],
    showDeleteModal: false
  }

  onChangeValue = (e) =>{
    this.setState({search : e.target.value})
  }

  getFooterTableStructure = () => {
    return([
      {text: 'Eliminar', action: (listFiltered)=> this.onToggleDeleteDocuments(listFiltered)}
    ])
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
    console.log('listDataFiltered ',listDataFiltered)
    this.setState({showDeleteModal: !this.state.showDeleteModal, listDataSelected: listDataFiltered})
  }

  onDeleteDocuments = () => {
    const {listDataSelected} = this.state
    console.log('DOCUMENTOS A ELIMINAR ', listDataSelected)
    this.setState({showDeleteModal: !this.state.showDeleteModal})
  }

  getContainHeader=()=>{
    return(
      <div className='buttons-header'>
        <form>
          <div className="form-group"  style={{display: 'flex', flexDirection: 'row', width: '40%', alignItems: 'center'}}>
            <label>Número de trámite: </label>
            <input
              id="searchValue"
              type="text"
              value={this.state.search}
              onChange={this.onChangeValue}
              className="form-control"
              style={{width: '30%', marginLeft: 10, marginRight: 10}}
            />
            <button type='button' className='btn btn-dark' style={{backgroundColor: '#222', height: 35,borderColor: '#222'}}>
              Buscar
            </button>
          </div>
          <div className="form-group" style={{display: 'flex', flexDirection: 'row', width: '40%', alignItems: 'center'}}>
            <label>Documento de hoy: </label>
            <button type='button' className='btn btn-dark' style={{backgroundColor: '#222', height: 35,borderColor: '#222', marginLeft: 10}}>
              Buscar
            </button>
          </div>
        </form>
      </div>
    )
  }

  render(){

    const {showDeleteModal,listDataSelected} = this.state

    const modalProps = {
      showModal: showDeleteModal,
      title: 'Eliminar Documentos',
      message: (listDataSelected.length>0)?`¿Desea imprimir estos ${listDataSelected.length} documentos ?`:`Debe seleccionar al menos un documento`,
      yesFunction: (listDataSelected.length>0)?this.onDeleteDocuments:this.onToggleDeleteDocuments,
      yesText: (listDataSelected.length>0)?null:'Ok',
      noFunction: (listDataSelected.length>0)?this.onToggleDeleteDocuments:null
    }

    return(
      <CommonTableManage
        tableStructure={this.getTableStructure}
        title={'DOCUMENTOS CONFIRMADOS'}
        listData={listData_1}
        containHeader={this.getContainHeader()}
        modalProps={modalProps}
        getFooterTableStructure={this.getFooterTableStructure}
      />
    )
  }
}

export default DocConfirmados