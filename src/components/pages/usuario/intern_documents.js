import React, {Component} from "react";
import {getInternDocuments} from "../../../actions/actions";
import { connect } from 'react-redux';
import {getParseObj} from "../../../utils/Utils";
import CommonTableManage from "../../commons/CommonTableManage";
import map from "lodash/map";

class InternDocuments extends Component{

  state = {
    listDataSelected: [],
    valueMap : {},
    currentUser: {}
  };

  async componentDidMount(){
    const currentUser = getParseObj('CURRENT_USER');
    this.setState({currentUser});
    const {getInternDocuments} = this.props
    getInternDocuments(currentUser.id)
  }

  onSetSelectDocuments=(listDataSelected)=>{
    this.setState({listDataSelected})
  };

  onChangeValueMap=(prop, value) => {
    this.setState({valueMap: {...this.state.valueMap, [prop]: value}});
  };

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
        columnHeader: 'Documento',
        rowProp: 'documento'
      },
      {
        columnHeader: 'Num. Tram.',
        rowProp: 'numTram',
        classSearchRow: 'container-search-field normal-size',
        filterHeader: true
      },
      {
        columnHeader: 'Asunto',
        rowProp: 'asunto',
        classSearchRow: 'container-search-field long-size',
        filterHeader: true
      },
      {
        columnHeader: 'Fech. Reg.',
        rowProp: 'fechaCreacion',
        classSearchRow: 'container-search-field medium-size',
        filterHeader: true
      },
      {
        columnHeader: 'Destino',
        rowProp: 'destino'
      },
      {
        columnHeader: 'Responsable',
        rowProp: 'responsable'
      }
    ])
  }

  getFooterTableStructure = () => {
    return([
      {text: 'Crear Documento', action: ()=>{}},
      {text: 'Eliminar Documento', action: ()=>{}}
    ])
  };

  render(){

    const {documents} = this.props

    return(
      <CommonTableManage
        tableStructure={this.getTableStructure}
        title={'DOCUMENTOS INTERNOS'}
        listData={documents}
        getFooterTableStructure={this.getFooterTableStructure}
        onSetSelected={this.onSetSelectDocuments}
      />)
  }
}

function mapStateToProps(state){
  const listDocuments = (listData) => {
    return map(listData, (data) => ({
      ...data,
      document: `${data.documentName} ${data.numDocumento}-${data.siglas}-${data.anio}`,
      check: false
    }))
  };
  return {
    documents: listDocuments(state.documentIntern.data)
  }
}
const mapDispatchToProps = (dispatch) => ({
  getInternDocuments: (typeDocuments, userId) => dispatch(getInternDocuments(typeDocuments, userId))
});
export default connect (mapStateToProps, mapDispatchToProps)(InternDocuments)