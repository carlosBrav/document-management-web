import React, {Component, Fragment} from 'react';
import CommonTableManage from '../commons/CommonTableManage';
import {listData_1} from "../../fakedata/ListDataDocuments";
import {exportPDF} from "../utils/ExportPDF";
import {BUTTON_TYPE} from '../../constants/Constants';
import {getView2Data} from "../../actions/actions"
import { connect } from 'react-redux';
import map from "lodash/map";
import {initialData} from "../../reducers/initialData";

class DocRecibidos extends Component{

  state = {
    listDataSelected: []
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

  onExportDocuments=()=>{
    exportPDF()
  }

  getFooterTableStructure = () => {
    return([
      {text: 'Seguimiento', action: ()=>{}},
      {text: 'Imprimir', action: this.onExportDocuments}
    ])
  }

  render(){

    const {data} = this.props
    return(
      <Fragment>
        {
          data && data.length > 0 ?
            <CommonTableManage
              tableStructure={this.getTableStructure}
              title={'DOCUMENTOS RECIBIDOS'}
              listData={data}
              getFooterTableStructure={this.getFooterTableStructure}
              onSetSelected={this.onSetSelectDocuments}
              onAdd={this.onChangeInitialIndex}
              onSubtract={this.onChangeInitialIndex}
            /> :
            null
        }
      </Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  getView2Data: ()=>dispatch(getView2Data())
});

function mapStateToProps(state){

  const listDocuments = (listData) => {
    return map(listData, (data,index) => ({
      ...data,
      document: `${data.docuNombre} ${data.docuNum}-${data.docuSiglas}-${data.docuAnio}`,
      check: false,
      id: index
    }))
  }

  return {
    data: listDocuments(state.dataView.data),
    dependencies: state.initialData.dependencies
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocRecibidos)