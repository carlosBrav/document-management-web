import React, {Component, Fragment} from 'react';
import CommonTableManage from '../commons/CommonTableManage';
import {exportControlDocuments} from "../utils/ExportPDF";
import {loadMovementsToAnalyze} from "../../actions/actions";
import {connect} from 'react-redux';
import map from "lodash/map";
import {transformToDate, subtractDates, getParseObj} from "../../utils/Utils";
import CommonCircle,{STATUS_LEVEL} from "../commons/CommonCircle";

class ControlDocumentos extends Component{

  state = {
    listDataSelected: []
  }

  onSetListDataSelected=(listDataSelected)=>{
    this.setState({listDataSelected})
  }

  async componentDidMount (){
    const {loadMovementsToAnalyze} = this.props
    await loadMovementsToAnalyze()
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
        rowProp: 'fechaEnvio'
      },
      {
        columnHeader: 'F. Ingreso',
        rowProp: 'fechaIngreso'
      },
      {
        columnHeader: 'Indicador',
        rowProp: 'indiNombre',
      },
      {
        columnHeader: 'Observacion',
        rowProp: 'observacion',
      },
      {
        columnHeader: 'Doc. Nombre',
        rowProp: 'document',
      },
      {
        columnHeader: 'Estado',
        cellRenderer: ({value}) => <CommonCircle type={value['status']}/>
      }
    ])
  }

  onExportDocuments=()=>{
    const {listDataSelected} = this.state;
    const currentUser = getParseObj('CURRENT_USER');
    exportControlDocuments(listDataSelected, currentUser.apellido+", "+currentUser.nombre)
  }

  getFooterTableStructure=()=>{
    return [
      {text: 'Imprimir', action: ()=> this.onExportDocuments()}
    ]
  }

  render(){
    const {data} = this.props;
    console.log('DATA', data)
    return(
      <Fragment>
        <CommonTableManage
          tableStructure={this.getTableStructure}
          title={'CONTROL DE MOVIMIENTOS INTERNOS'}
          listData={data}
          getFooterTableStructure={this.getFooterTableStructure}
          onSetSelected={this.onSetListDataSelected}
        />
      </Fragment>

    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadMovementsToAnalyze: ()=> dispatch(loadMovementsToAnalyze())
});

function mapStateToProps(state) {

  const getValidationDays=(days)=>{
    if(days <= 3){
      return STATUS_LEVEL.BASIC
    } else if(days >3 && days <=7){
      return STATUS_LEVEL.WARNING
    } else return STATUS_LEVEL.DANGER
  };

  const getMovements = (listData) => {
    return map(listData, data => ({
      ...data,
      document: data.docuNum ? `${data.docuNombre} Nº ${data.docuNum}-${data.docuSiglas}-${data.docuAnio}`:'SIN DOCUMENTO',
      status: getValidationDays(subtractDates(transformToDate(data.fechaEnvio)))
    }))
  };
  return {
    data: getMovements(state.movements.data)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(ControlDocumentos)