import {Component, Fragment} from "react";
import {getUserMovementsByOffice} from "../../../actions/actions"
import {getParseObj} from "../../../utils/Utils";
import {BUTTON_TYPE} from "../../../constants/Constants";
import map from "lodash/map";
import CommonTableManage from "../../commons/CommonTableManage";
import React from "react";
import { connect } from 'react-redux';

const currentUser = getParseObj('CURRENT_USER');

class DocumentsReceived extends Component{

  state = {
    listDataSelected: [],
    isModalOpen: false
  };

  async componentDidMount(){
    const {getUserMovementsByOffice} = this.props
    getUserMovementsByOffice(currentUser.dependencyId)
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
      {text: 'Confirmar', action: () => {}},
      {text: 'Derivar', action: () => {}},
    ])
  };

  render(){

    const {data, errors} = this.props
    return(
      <Fragment>
        {
          <CommonTableManage
            tableStructure={this.getTableStructure}
            title={'DOCUMENTOS RECIBIDOS: '+currentUser.dependencyName}
            listData={data}
            getFooterTableStructure={this.getFooterTableStructure}
            onSetSelected={this.onSetSelectDocuments}
          />
        }
      </Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  getUserMovementsByOffice: (officeId) => dispatch(getUserMovementsByOffice(officeId))
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
    data: listDocuments(state.user.movements),
    errors: state.user.errors
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DocumentsReceived)