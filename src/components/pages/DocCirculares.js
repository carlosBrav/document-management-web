import React, {Component, Fragment} from 'react';
import CommonTableManage from '../commons/CommonTableManage';
import {ICON_TYPE} from "../commons/CommonIcon";
import {exportPDF} from "../utils/ExportPDF";
import map from "lodash/map";
import filter from "lodash/filter";
import CommonModal from '../commons/CommonModal';
import CommonListGroup from '../commons/CommonListGroup';
import formOficiosCirculares from "../../forms/templates/TemplateOficiosCirculares";
import {formEditOficioCircular} from "../../forms/templates/TemplateEditCircular";
import FormRender from "../../forms/FormRender";
import {TYPE_CONTENT_MODAL} from '../../constants/Constants';
import {
  getTypeDocuments,
  getCorrelativeMax,
  getUserBossOffice,
  createCircularDocuments,
  getDocuments,
  editCircularDocuments,
  deleteDocuments,
  getCircularDetails
} from "../../actions/actions";
import {connect} from 'react-redux';
import {getParseObj} from "../../utils/Utils";
import find from "lodash/find";
import {getFormattedDate} from "../../utils/Constants";
import parseInt from "lodash/parseInt";
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
  getCircularDocuments: (typeDocuments, userId) => dispatch(getDocuments(typeDocuments, userId)),
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
    documentsIntern: getCircularDocuments(state.documentIntern.data),
    detailsCircular: getDetails(state.documentIntern.details)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocCirculares)