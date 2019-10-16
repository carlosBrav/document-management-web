import React, {Component, Fragment} from 'react';
import CommonTableManage from '../commons/CommonTableManage';
import {listData_1} from "../../fakedata/ListDataDocuments";
import map from "lodash/map";
import CommonModal from "../commons/CommonModal";
import { connect } from 'react-redux';
import {getMovements, cleanMovementsList, deleteMovement} from "../../actions/actions"

class DocConfirmados extends Component{

  state = {
    search: '',
    listDataSelected: [],
    showDeleteModal: false
  }

  componentDidMount(){
    const {cleanMovementsList} = this.props
    cleanMovementsList()
  }

  onChangeValue = (e) =>{
    this.setState({search : e.target.value})
  };

  onSearchByTramNum=()=>{
    const {search} = this.state
    const {getMovements} = this.props
    getMovements(search, '')
  };

  onSearchByCurrentDate=()=>{
    const {getMovements} = this.props
    getMovements()
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
        rowProp: 'numTram',
        classSearchRow: 'container-search-field normal-size',
        filterHeader: true
      },
      {
        columnHeader: 'Mov.',
        rowProp: 'movimiento'
      },
      {
        columnHeader: 'Destino',
        rowProp: 'destinoNombre',
        classSearchRow: 'container-search-field long-size',
        filterHeader: true
      },
      {
        columnHeader: 'F. Envio',
        rowProp: 'fechaEnvio',
        classSearchRow: 'container-search-field medium-size',
        filterHeader: true
      },
      {
        columnHeader: 'Indicador',
        rowProp: 'indiNombre'
      },
      {
        columnHeader: 'Observación',
        rowProp: 'observacion'
      },
      {
        columnHeader: 'Doc. Nombre',
        rowProp: 'document'
      },
      {
        columnHeader: 'Estado',
        rowProp: 'estadoDocumento'
      }
    ])
  }

  onToggleDeleteDocuments = () => {
    this.setState({showDeleteModal: !this.state.showDeleteModal})
  }

  onDeleteDocuments = () => {
    this.setState({showDeleteModal: !this.state.showDeleteModal})
  }

  onSetSelectDocuments=(listDataSelected)=>{
    this.setState({listDataSelected})
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
            <button onClick={this.onSearchByTramNum} type='button' className='btn btn-dark' style={{backgroundColor: '#222', height: 35,borderColor: '#222'}}>
              Buscar
            </button>
          </div>
          <div className="form-group" style={{display: 'flex', flexDirection: 'row', width: '40%', alignItems: 'center'}}>
            <label>Documento de hoy: </label>
            <button onClick={this.onSearchByCurrentDate} type='button' className='btn btn-dark' style={{backgroundColor: '#222', height: 35,borderColor: '#222', marginLeft: 10}}>
              Buscar
            </button>
          </div>
        </form>
      </div>
    )
  }

  render(){

    const {showDeleteModal,listDataSelected} = this.state
    const {data} = this.props
    const modalProps = [{
      showModal: showDeleteModal,
      title: 'Eliminar Documentos',
      message: (listDataSelected.length>0)?`¿Desea eliminar este(os) ${listDataSelected.length} documento(s) ?`:`Debe seleccionar al menos un documento`,
      yesFunction: (listDataSelected.length>0)?this.onDeleteDocuments:this.onToggleDeleteDocuments,
      yesText: (listDataSelected.length>0)?'Si':'Ok',
      noFunction: (listDataSelected.length>0)?this.onToggleDeleteDocuments:null
    }];

    return(
      <Fragment>
        {
          modalProps && modalProps.length>0 ?
            map(modalProps, (modal, index)=>{
              return <CommonModal key={'modal'+index} {...modal}/>
            }) : null
        }
        <CommonTableManage
          tableStructure={this.getTableStructure}
          title={'DOCUMENTOS CONFIRMADOS'}
          listData={data}
          containHeader={this.getContainHeader()}
          modalProps={modalProps}
          getFooterTableStructure={this.getFooterTableStructure}
          onSetSelected={this.onSetSelectDocuments}
        />
      </Fragment>

    )
  }
}


const mapDispatchToProps = (dispatch) => ({
  getMovements: (numTram, officeId)=>dispatch(getMovements(numTram, officeId)),
  cleanMovementsList: ()=> dispatch(cleanMovementsList()),
  deleteMovement: (id)=> dispatch(deleteMovement(id))
});

function mapStateToProps(state){
  const listDocuments = (listData) => {
    return map(listData, (data,index) => ({
      ...data,
      document: `${data.docuNombre} ${data.docuNum}-${data.docuSiglas}-${data.docuAnio}`,
      check: false,
      id: index
    }))
  };
  return {
    data: listDocuments(state.movements.data),
    dependencies: state.initialData.dependencies,
    errors: state.movements.errors
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocConfirmados)