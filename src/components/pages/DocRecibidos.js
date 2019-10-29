import React, {Component, Fragment} from 'react';
import CommonTableManage from '../commons/CommonTableManage';
import {listData_1} from "../../fakedata/ListDataDocuments";
import {exportPDF} from "../utils/ExportPDF";
import {BUTTON_TYPE} from '../../constants/Constants';
import {getView2Data, insertMovements} from "../../actions/actions"
import { connect } from 'react-redux';
import map from "lodash/map";
import {getParseObj} from "../../utils/Utils";
import CommonModal from "../commons/CommonModal";

class DocRecibidos extends Component{

  state = {
    listDataSelected: [],
    isModalOpen: false
  };

  async componentDidMount(){
    const {getView2Data} = this.props
    getView2Data()
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
        rowProp: 'tramNum',
        classSearchRow: 'container-search-field normal-size',
        filterHeader: true
      },
      {
        columnHeader: 'Movimiento',
        rowProp: 'moviNum'
      },
      {
        columnHeader: 'Destino',
        rowProp: 'moviDestino',
        classSearchRow: 'container-search-field long-size',
        filterHeader: true,
        rowStyle: 'custom-td'
      },
      {
        columnHeader: 'F. Envio',
        rowProp: 'moviFecEnv',
        classSearchRow: 'container-search-field medium-size',
        filterHeader: true
      },
      {
        columnHeader: 'Indicador',
        rowProp: 'indiNombre'
      },
      {
        columnHeader: 'Observación',
        rowProp: 'moviObs'
      },
      {
        columnHeader: 'Doc. Nombre',
        rowProp: 'document'
      }
    ])
  }

  onConfirmDocuments= async ()=>{
    const {listDataSelected} = this.state
    const {insertMovements, getView2Data} = this.props
    const currentUser = getParseObj('CURRENT_USER')
    await insertMovements(listDataSelected, currentUser.id).then(()=>{
      getView2Data()
    });
    this.toggleModal()
  };

  onAcceptConfirmation= async ()=>{
    this.setState({listDataSelected: []})
    this.toggleModal()
    //exportPDF()
  };

  getFooterTableStructure = () => {
    return([
      {text: 'Seguimiento', action: ()=>{}},
      {text: 'Imprimir', action: this.onConfirmDocuments}
    ])
  };

  toggleModal = ()=>{
    this.setState({isModalOpen : !this.state.isModalOpen})
  };

  render(){

    const {data, errors, message} = this.props
    const {isModalOpen} = this.state
    const modalProps =
      {
        showModal: isModalOpen,
        title: (errors && errors.length>0) ? 'Error al confirmar' : 'Confirmados correctamente',
        yesFunction: this.onAcceptConfirmation,
        yesText: 'Aceptar',
        content: <div><h5>{message}</h5></div>
      };

    return(
      <Fragment>
        {
            <CommonTableManage
              tableStructure={this.getTableStructure}
              title={'DOCUMENTOS RECIBIDOS'}
              listData={data}
              getFooterTableStructure={this.getFooterTableStructure}
              onSetSelected={this.onSetSelectDocuments}
              onAdd={this.onChangeInitialIndex}
              onSubtract={this.onChangeInitialIndex}
            />
        }
        <CommonModal key={'modalView'} {...modalProps}/>
      </Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  getView2Data: ()=>dispatch(getView2Data()),
  insertMovements: (movements, userId) => dispatch(insertMovements(movements, userId))
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
    data: listDocuments(state.dataView.data),
    dependencies: state.initialData.dependencies,
    errors: state.movements.errors,
    message: state.movements.data
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocRecibidos)