import React, {Component} from "react";
import {BUTTON_TYPE} from "../../../constants/Constants";
import CommonTableManage from "../../commons/CommonTableManage";
import {getUserMovementsByAssignedTo} from "../../../actions/actions"
import { connect } from 'react-redux';
import {getParseObj} from "../../../utils/Utils";
import map from "lodash/map";

class DocumentAssigned extends Component{

  state = {
    listDataSelected: [],
    valueMap : {},
    currentUser: {}
  };

  async componentDidMount(){
    const currentUser = getParseObj('CURRENT_USER');
    this.setState({currentUser});
    const {getUserMovementsByAssignedTo} = this.props
    getUserMovementsByAssignedTo(currentUser.id)
  }

  onChangeValueMap=(prop, value) => {
    this.setState({valueMap: {...this.state.valueMap, [prop]: value}})
  };

  onSetSelectDocuments=(listDataSelected)=>{
    this.setState({listDataSelected})
  };

  getTableStructureAssigned = (onChangeCheck,onToggleAddDocSelect) => {
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
        rowProp: 'numTram',
        classSearchRow: 'container-search-field normal-size',
        filterHeader: true
      },
      {
        columnHeader: 'Movimiento',
        rowProp: 'movimiento'
      },
      {
        columnHeader: 'Destino',
        rowProp: 'destinoNombre',
        classSearchRow: 'container-search-field long-size',
        filterHeader: true,
        rowStyle: 'custom-td'
      },
      {
        columnHeader: 'F. Envio',
        rowProp: 'fechaEnvio',
        classSearchRow: 'container-search-field medium-size',
        filterHeader: true
      },
      {
        columnHeader: 'F. Ingreso',
        rowProp: 'fechaIngreso',
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
      }
    ])
  };

  getFooterTableStructure = () => {
    return([
      {text: 'Seguimiento', action: ()=>{}},
      {text: 'Responder', action: ()=>{}},
      {text: 'Derivar', action: () => {}},
    ])
  };

  render(){

    const {data} = this.props

    return(
      <CommonTableManage
      tableStructure={this.getTableStructureAssigned}
      title={'DOCUMENTOS ASIGNADOS'}
      listData={data}
      getFooterTableStructure={this.getFooterTableStructure}
      onSetSelected={this.onSetSelectDocuments}
    />)
  }
}

const mapDispatchToProps = (dispatch) => ({
  getUserMovementsByAssignedTo: (userId) => dispatch(getUserMovementsByAssignedTo(userId))
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
    data: listDocuments(state.movements.dataConfirmed)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentAssigned)