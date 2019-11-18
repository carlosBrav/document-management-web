import React, {Component} from "react";
import {
  confirmDocuments, deriveAssignedDocuments,
  deriveDocuments, generateResponseToMovement, getCorrelativeMax, getTypeDocuments,
  getUserMovementsByAssignedTo,
  getUserMovementsByOffice
} from "../../../actions/actions"
import { connect } from 'react-redux';
import {getParseObj} from "../../../utils/Utils";
import map from "lodash/map";
import filter from "lodash/filter";
import CommonAssignedDocuments from "../../commons/CommonAssignedDocuments";

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


  getFooterTableStructure = () => {
    return([
      {text: 'Seguimiento', action: ()=>{}},
      {text: 'Derivar', action: () => {}},
    ])
  };

  render(){
    const {currentUser}= this.state
    return(
      <CommonAssignedDocuments currentUser={currentUser}
                               {...this.props}/>)
  }
}

const mapDispatchToProps = (dispatch) => ({
  getUserMovementsByOffice: (officeId) => dispatch(getUserMovementsByOffice(officeId)),
  getUserMovementsByAssignedTo: (userId) => dispatch(getUserMovementsByAssignedTo(userId)),
  confirmDocuments: (userId, movementsIds, currentDate, asignadoA) => dispatch(confirmDocuments(userId, movementsIds, currentDate, asignadoA)),
  deriveDocuments: (userId, officeId, currentDate, movements) => dispatch(deriveDocuments(userId, officeId, currentDate, movements)),
  deriveAssignedDocuments: (userId, officeId, currentDate, movements) => dispatch(deriveAssignedDocuments(userId, officeId, currentDate, movements)),
  getTypeDocuments: () => dispatch(getTypeDocuments()),
  getCorrelativeMax: (officeId, typeDocumentId, siglas) => dispatch(getCorrelativeMax(officeId, typeDocumentId, siglas)),
  generateResponseToMovement: (userId, officeId, documentIntern, movement) => dispatch(generateResponseToMovement(userId, officeId, documentIntern, movement))
});

function mapStateToProps(state){
  const getTypeDocuments = (listData) => {
    return map(filter(listData, data => data.flag2 !== 'NPC'), data => ({
      ...data,
      value: data.nombreTipo
    }))
  };
  const listDocuments = (listData) => {
    return map(listData, data => ({
      ...data,
      document: `${data.docuNombre} ${data.docuNum}-${data.docuSiglas}-${data.docuAnio}`,
      check: false
    }))
  };

  const currentUser = getParseObj('CURRENT_USER');

  const listUsers = (listData) => {
    return map(filter(listData, value => value.dependenciaId === currentUser.dependencyId), data => ({
      ...data,
      value: `${data.apellido}, ${data.nombre}`
    }))
  };
  return {
    typeDocuments: getTypeDocuments(state.typeDocuments.data),
    data: listDocuments(state.user.movements),
    errors: state.user.errors,
    users: listUsers(state.initialData.users),
    dataAssigned: listDocuments(state.movements.dataAssigned),
    documentNumber: state.correlative.documentNumber,
    documentSiglas: state.correlative.documentSiglas,
    documentYear: state.correlative.documentYear,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentAssigned)