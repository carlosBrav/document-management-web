import React, {Component} from 'react';
import map from "lodash/map";
import filter from "lodash/filter";
import {
  getTypeDocuments,
  getCorrelativeMax,
  getUserBossOffice,
  createCircularDocuments,
  getCircularDocuments,
  editCircularDocuments,
  deleteDocuments,
  getCircularDetails
} from "../../actions/actions";
import {connect} from 'react-redux';
import {getParseObj} from "../../utils/Utils";
import CommonCircularDocuments from "../commons/CommonCircularDocuments";

class DocCirculares extends Component {


  render() {
    const currentUser = getParseObj('CURRENT_USER');

    return (
      <CommonCircularDocuments
        currentUser={currentUser}
        {...this.props}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  getTypeDocuments: () => dispatch(getTypeDocuments()),
  getCorrelativeMax: (officeId, typeDocumentId, siglas) => dispatch(getCorrelativeMax(officeId, typeDocumentId, siglas)),
  getUserBossOffice: () => dispatch(getUserBossOffice()),
  createCircularDocuments: (documentIntern, destinations, officeId, userId) =>
    dispatch(createCircularDocuments(documentIntern, destinations, officeId, userId)),
  getCircularDocuments: (typeDocuments, userId) => dispatch(getCircularDocuments(typeDocuments, userId)),
  editCircularDocuments: (id, asunto, dependencyId) => dispatch(editCircularDocuments(id, asunto, dependencyId)),
  deleteDocuments: (documentsIds) => dispatch(deleteDocuments(documentsIds)),
  getCircularDetails: (documentId) => dispatch(getCircularDetails(documentId))
});

function mapStateToProps(state) {
  const getTypeDocumentsCircular = (listData) => {
    return map(filter(listData, data => data.flag2 === 'NPC'), data => ({
      ...data,
      value: data.nombreTipo
    }))
  };

  const getCircularDocuments = (listData) => {
    return map(listData, data => ({
      ...data,
      correlative: data.documentName + " Nº " + data.numDocumento + "-" + data.siglas + "-" + data.anio,
      responsable: data.userLastName+", "+data.userName,
      check: false
    }))
  };

  const getDetails = (listData) => {
    return map(listData, data => ({value : data.destinoNombre}))
  };

  const listTypeDocuments = getTypeDocumentsCircular(state.typeDocuments.data)
  return {
    listTypeDocuments,
    documentNumber: state.correlative.documentNumber,
    documentSiglas: state.correlative.documentSiglas,
    documentYear: state.correlative.documentYear,
    bossOffice: state.user.userBossOffice,
    circularDocuments: getCircularDocuments(state.documentIntern.circularData),
    detailsCircular: getDetails(state.documentIntern.circularDetails)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocCirculares)