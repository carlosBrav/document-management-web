import {Component, Fragment} from "react";
import {getUserMovementsByOffice,
        confirmDocuments,
        getUserMovementsByAssignedTo,
        deriveDocuments,
        deriveAssignedDocuments,
        getTypeDocuments,
        getCorrelativeMax,
        generateResponseToMovement} from "../../../actions/actions"
import {getParseObj} from "../../../utils/Utils";
import {BUTTON_TYPE} from "../../../constants/Constants";
import map from "lodash/map";
import filter from "lodash/filter";
import CommonTableManage from "../../commons/CommonTableManage";
import React from "react";
import { connect } from 'react-redux';
import CommonModal from '../../commons/CommonModal';
import FormRender from "../../../forms/FormRender";
import {formConfirmDocuments} from "../../../forms/templates/TemplateConfirmDocument";
import {formDeriveDocuments} from "../../../forms/templates/TemplateDeriveDocuments";
import {getFormattedDate, getFormattedOnlyDate, getFormattedOnlyTime} from "../../../utils/Constants";
import CommonTab from '../../commons/CommonTab';
import find from "lodash/find";
import parseInt from "lodash/parseInt";
import {DOCUMENT_INTERN,MOVEMENT} from '../../../utils/Constants';

class DocumentsReceived extends Component{

  state = {
    listDataSelected: [],
    listDataAssignedSelected: [],
    isModalOpen: false,
    showConfirmationModal: false,
    showDerivedModal: false,
    showDeriveAssignedModal: false,
    valueMap : {},
    currentUser: {}
  };

  async componentDidMount(){
    const currentUser = getParseObj('CURRENT_USER');
    this.setState({currentUser});
    const {getUserMovementsByOffice} = this.props;
    getUserMovementsByOffice(currentUser.dependencyId)
  };

  onGetMaxCorrelative = (typeDocumentId) => {
    const {getCorrelativeMax, typeDocuments} = this.props;
    const {currentUser}=this.state
    getCorrelativeMax(currentUser.dependencyId, typeDocumentId, currentUser.dependencySiglas).then(() => {
      const {documentNumber, documentSiglas, documentYear} = this.props
      const {nombreTipo,id} = find(typeDocuments, {'id': typeDocumentId});
      this.onChangeValueMap('tipoDocuId', id)
      this.onChangeValueMap('numDocumento', parseInt(documentNumber));
      this.onChangeValueMap('siglas', documentSiglas);
      this.onChangeValueMap('anio', documentYear);
      this.onChangeValueMap("document", nombreTipo + " N° " + documentNumber + "-" + documentSiglas + "-" + documentYear)
    })
  };

  onChangeValueMap=(prop, value) => {
    this.setState({valueMap: {...this.state.valueMap, [prop]: value}});
  };

  onSetSelectDocuments=(listDataSelected)=>{
    this.setState({listDataSelected})
  };

  onSetSelectAssignedDocuments=(listDataAssignedSelected) => {
    this.setState({listDataAssignedSelected})
  };

  onConfirmDocuments=()=>{
    const {listDataSelected, valueMap, currentUser} = this.state;
    const {confirmDocuments, getUserMovementsByOffice} = this.props;

    const documentsIds = map(listDataSelected, data => data.id);
    confirmDocuments(currentUser.id,documentsIds, valueMap['currentDate'],valueMap['asignadoA']).then(()=>{
      this.onToggleConfirmModal();
      getUserMovementsByOffice(currentUser.dependencyId)
    })
  };

  generateObjectMovement=()=>{
    const {listDataAssignedSelected, valueMap} = this.state;
    const movement = {...listDataAssignedSelected[0]}
    return({
      [MOVEMENT.ID]: valueMap['movementId'],
      [MOVEMENT.MOVEMENT]: movement[MOVEMENT.MOVEMENT],
      [MOVEMENT.NUM_TRAM]: movement[MOVEMENT.NUM_TRAM],
      [MOVEMENT.DOCUMENT_STATE]: movement[MOVEMENT.DOCUMENT_STATE],
      [MOVEMENT.DESTINY]: valueMap['destinyId'],
      [MOVEMENT.OBSERVATION]: movement[MOVEMENT.OBSERVATION],
      [MOVEMENT.NAME_INDICATOR]: movement[MOVEMENT.NAME_INDICATOR],
      [MOVEMENT.CODE_INDICATOR]: movement[MOVEMENT.CODE_INDICATOR],
      [MOVEMENT.DOCUMENT_NAME]: movement[MOVEMENT.DOCUMENT_NAME],
      [MOVEMENT.DOCUMENT_NUMBER]: movement[MOVEMENT.DOCUMENT_NUMBER],
      [MOVEMENT.DOCUMENT_SIGLAS]: movement[MOVEMENT.DOCUMENT_SIGLAS],
      [MOVEMENT.DOCUMENT_YEAR]: movement[MOVEMENT.DOCUMENT_YEAR],
      [MOVEMENT.CURRENT_DATE]: valueMap[MOVEMENT.CURRENT_DATE]
    });
  };

  generateObjectInternDocument=()=>{
    const {valueMap, currentUser} = this.state;
    return({
      [DOCUMENT_INTERN.DOCUMENT_STATE]: 'EN PROCESO',
      [DOCUMENT_INTERN.TYPE_DOCUMENT_ID]: valueMap[DOCUMENT_INTERN.TYPE_DOCUMENT_ID],
      [DOCUMENT_INTERN.DOCUMENT_NUMBER]: valueMap[DOCUMENT_INTERN.DOCUMENT_NUMBER],
      [DOCUMENT_INTERN.SIGLAS]: valueMap[DOCUMENT_INTERN.SIGLAS],
      [DOCUMENT_INTERN.YEAR]: valueMap[DOCUMENT_INTERN.YEAR],
      [DOCUMENT_INTERN.OBSERVATION]: '',
      [DOCUMENT_INTERN.ASUNTO]: valueMap[DOCUMENT_INTERN.ASUNTO],
      [DOCUMENT_INTERN.ORIGIN_ID]: currentUser.dependencyId,
      [DOCUMENT_INTERN.DESTINY_ID]: valueMap['destinyId'],
      [DOCUMENT_INTERN.USER_ID]: valueMap[DOCUMENT_INTERN.USER_ID],
      [DOCUMENT_INTERN.FIRM]: '',
      [DOCUMENT_INTERN.ACTIVE]: true,
      [DOCUMENT_INTERN.CURRENT_DATE]: valueMap[DOCUMENT_INTERN.CURRENT_DATE]

    })
  };

  /*onDeriveDocuments=()=>{
    const {listDataSelected, valueMap, currentUser} = this.state;
    const {deriveDocuments, getUserMovementsByOffice} = this.props;
    deriveDocuments(currentUser.id, valueMap['officeId'], valueMap['currentDate'],listDataSelected).then(()=>{
      this.onToggleDerivedModal();
      getUserMovementsByOffice(currentUser.dependencyId)
    })
  };*/

  onDeriveAssignedDocuments=()=>{
    const {currentUser} = this.state;
    const movement = this.generateObjectMovement();
    const intern_document = this.generateObjectInternDocument();
    const {generateResponseToMovement, getUserMovementsByAssignedTo} = this.props;
    generateResponseToMovement(currentUser.id, currentUser.dependencyId, intern_document,movement).then(()=>{
      this.onToggleCloseDerived();
      getUserMovementsByAssignedTo(currentUser.id)
    })
  };

  onToggleConfirmModal=()=>{
    this.setState({valueMap: {}});
    this.onChangeValueMap('currentDate',getFormattedDate());
    this.setState({showConfirmationModal: !this.state.showConfirmationModal})
  };

  /*onToggleDerivedModal=()=>{
    this.setState({valueMap: {}});
    this.onChangeValueMap('currentDate',getFormattedDate());
    this.setState({showDerivedModal: !this.state.showDerivedModal})
  };*/

  onToggleDerivedAssignedModal=()=>{
    this.setState({valueMap: {}});
    const {listDataAssignedSelected, currentUser} = this.state;
    const {getTypeDocuments} = this.props;
    getTypeDocuments().then(()=>{
      this.onChangeValueMap('currentDate',getFormattedDate());
      this.onChangeValueMap('fecha',getFormattedOnlyDate());
      this.onChangeValueMap('hora',getFormattedOnlyTime());
      this.onChangeValueMap('referencia',listDataAssignedSelected[0].numTram);
      this.onChangeValueMap('movementId', listDataAssignedSelected[0].id);
      this.onChangeValueMap('user',currentUser.apellido+", "+currentUser.nombre);
      this.onChangeValueMap('motivo', listDataAssignedSelected[0].observacion);
      this.onChangeValueMap('userId', currentUser.id)
      this.setState({showDeriveAssignedModal: !this.state.showDeriveAssignedModal})
    });
  };

  onToggleCloseDerived=()=>{
    this.setState({showDeriveAssignedModal: !this.state.showDeriveAssignedModal})
  }

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

  getTableStructureReceived = (onChangeCheck,onToggleAddDocSelect) => {
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

  getFooterTableAssignedStructure = () => {
    return([
      {text: 'Seguimiento', action: ()=>{}},
      {text: 'Derivar', action: this.onToggleDerivedAssignedModal},
    ])
  };

  getFooterTableStructure = () => {
    return([
      {text: 'Seguimiento', action: ()=>{}},
      {text: 'Confirmar', action: this.onToggleConfirmModal}
    ])
  };

  onClickTabDocumentReceived=()=>{
    const {currentUser}=this.state;
    const {getUserMovementsByOffice} = this.props;
    getUserMovementsByOffice(currentUser.dependencyId)
  };

  onClickTabAssignedDocuments=()=>{
    const {currentUser}=this.state;
    const {getUserMovementsByAssignedTo} = this.props;
    getUserMovementsByAssignedTo(currentUser.id)
  };

  render(){
    const {data, users, dataAssigned,typeDocuments} = this.props;
    const {showConfirmationModal,showDeriveAssignedModal,listDataAssignedSelected,listDataSelected, valueMap,currentUser} = this.state;
    const {dependencyName} = currentUser;
    const modalProps = [
      {
        showModal: showConfirmationModal,
        title: 'Confirmar Documentos Recibidos',
        message: (listDataSelected.length === 0) ? `Debe por lo menos seleccionar un documento` : null,
        yesFunction: (listDataSelected.length > 0) ? this.onConfirmDocuments : this.onToggleConfirmModal,
        noFunction: this.onToggleConfirmModal,
        noText: "Cancelar",
        yesText: (listDataSelected.length > 0) ? 'Confirmar' : 'Aceptar',
        content: <FormRender formTemplate={formConfirmDocuments(users)}
                             onChange={this.onChangeValueMap}
                             valueMap={valueMap}/>
      },
      /*{
        showModal: showDerivedModal,
        title: 'Derivar Documentos',
        message: (listDataSelected.length === 0) ? `Debe por lo menos seleccionar un documento` : null,
        yesFunction: (listDataSelected.length > 0) ? this.onDeriveDocuments : this.onToggleDerivedModal,
        noFunction: this.onToggleConfirmModal,
        noText: "Cancelar",
        yesText: (listDataSelected.length > 0) ? 'Confirmar' : 'Aceptar',
        content: <FormRender formTemplate={formDeriveDocuments(typeDocuments)}
                             onChange={this.onChangeValueMap}
                             valueMap={valueMap}/>
      },*/
      {
        showModal: showDeriveAssignedModal,
        title: 'Derivar Documentos',
        message: (listDataAssignedSelected.length === 0) ? `Debe por lo menos seleccionar un documento` : null,
        yesFunction: (listDataAssignedSelected.length > 0) ? this.onDeriveAssignedDocuments : this.onToggleDerivedAssignedModal,
        yesText: (listDataAssignedSelected.length > 0) ? 'Confirmar' : 'Aceptar',
        noFunction: this.onToggleDerivedAssignedModal,
        noText: "Cancelar",
        content: <FormRender formTemplate={formDeriveDocuments(typeDocuments)}
                             onChange={this.onChangeValueMap}
                             valueMap={valueMap}
                             onChangeInputSelect={(typeDocumentId) => this.onGetMaxCorrelative(typeDocumentId)}/>
      }
    ];

    const tableDocumentsReceived = () =>{
      return(<CommonTableManage
        tableStructure={this.getTableStructureReceived}
        title={'DOCUMENTOS RECIBIDOS: '+dependencyName}
        listData={data}
        getFooterTableStructure={this.getFooterTableStructure}
        onSetSelected={this.onSetSelectDocuments}
      />)
    };

    const tableDocumentsAssigned=()=>{
      return(<CommonTableManage
        tableStructure={this.getTableStructureAssigned}
        title={'DOCUMENTOS ASIGNADOS'}
        listData={dataAssigned}
        getFooterTableStructure={this.getFooterTableAssignedStructure}
        onSetSelected={this.onSetSelectAssignedDocuments}
      />)
    };

    const tabs =
      [ {title: 'Doc. Recibidos', id: 'docReceived', action: tableDocumentsReceived,
        onClick: this.onClickTabDocumentReceived},
        {title: 'Doc. Asignados', id: 'docAssigned', action: tableDocumentsAssigned,
        onClick: this.onClickTabAssignedDocuments}
      ];

    return(
      <Fragment>
        {
          modalProps && modalProps.length > 0 ?
            map(modalProps, (modal, index) => {
              return <CommonModal key={'modal' + index} {...modal}/>
            }) : null
        }
        <CommonTab tabList={tabs} currentUser={currentUser}/>
      </Fragment>
    )
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
export default connect(mapStateToProps, mapDispatchToProps)(DocumentsReceived)