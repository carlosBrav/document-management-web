import React, {Component, Fragment} from 'react';
import CommonTableManage from '../commons/CommonTableManage';
import CommonModal from "../commons/CommonModal";
import { connect } from 'react-redux';
import {getMovements, cleanMovementsList, deleteMovement} from "../../actions/actions"
import isEmpty from "lodash/isEmpty";
import map from "lodash/map";
import {getStructureForDocConfirmados} from '../../components/utils/StructureTables';
import { ClipLoader } from "react-spinners";

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
    if(!isEmpty(search)){
      const {getMovements} = this.props
      getMovements(search, '')
    }
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
  
  onToggleDeleteDocuments = () => {
    this.setState({showDeleteModal: !this.state.showDeleteModal})
  }

  onDeleteDocuments = () => {
    const {listDataSelected} = this.state;
    const {deleteMovement} = this.props;
    const movementsIds = map(listDataSelected, data => data.id);
    deleteMovement(movementsIds);
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
    const {data, isLoading} = this.props
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
        {
          isLoading ?
            <div className='spinner'>
              <ClipLoader
                size={150} // or 150px
                color={"#EEE2E0"}
                loading={isLoading}
              />
            </div> :
            <CommonTableManage
              tableStructure={getStructureForDocConfirmados}
              title={'DOCUMENTOS CONFIRMADOS'}
              listData={data}
              containHeader={this.getContainHeader}
              modalProps={modalProps}
              getFooterTableStructure={this.getFooterTableStructure}
              onSetSelected={this.onSetSelectDocuments}
            />
        }
      </Fragment>

    )
  }
}


const mapDispatchToProps = (dispatch) => ({
  getMovements: (numTram, officeId)=>dispatch(getMovements(numTram, officeId)),
  cleanMovementsList: ()=> dispatch(cleanMovementsList()),
  deleteMovement: (movementsIds)=> dispatch(deleteMovement(movementsIds))
});

function mapStateToProps(state){
  const listDocuments = (listData) => {
    return map(listData, (data,index) => ({
      ...data,
      document: `${data.docuNombre} ${data.docuNum}-${data.docuSiglas}-${data.docuAnio}`,
      check: false
    }))
  };
  return {
    data: listDocuments(state.movements.data),
    isLoading: state.movements.isLoading,
    dependencies: state.initialData.dependencies,
    errors: state.movements.errors
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocConfirmados)