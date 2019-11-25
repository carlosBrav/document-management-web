import React, {Component, Fragment} from "react";
import FormRender from "../../forms/FormRender";
import {formDeriveDocuments} from "../../forms/templates/TemplateDeriveDocuments";
import CommonTableManage from "./CommonTableManage";
import {BUTTON_TYPE} from "../../constants/Constants";
import {
  DOCUMENT_INTERN,
  getFormattedDate,
  getFormattedOnlyDate,
  getFormattedOnlyTime,
  MOVEMENT
} from "../../utils/Constants";
import map from "lodash/map";
import CommonModal from "./CommonModal";
import find from "lodash/find";
import parseInt from "lodash/parseInt";

class CommonAssignedDocuments extends Component{

  state = {
    listDataAssignedSelected: [],
    isModalOpen: false,
    showDeriveAssignedModal: false,
    valueMap : {}
  };

  fillMovementsByAssigned=()=>{
    const {getUserMovementsByAssignedTo,currentUser} = this.props;
    if(currentUser.id){
      getUserMovementsByAssignedTo(currentUser.id)
    }
  };

  async componentDidMount(){
    this.fillMovementsByAssigned()
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

  getFooterTableAssignedStructure = () => {
    return([
      {text: 'Seguimiento', action: ()=>{}},
      {text: 'Derivar', action: this.onToggleDerivedAssignedModal},
    ])
  };

  onChangeValueMap=(prop, value) => {
    this.setState({valueMap: {...this.state.valueMap, [prop]: value}});
  };

  onSetSelectAssignedDocuments=(listDataAssignedSelected) => {
    this.setState({listDataAssignedSelected})
  };

  generateObjectMovement=()=>{
    const {listDataAssignedSelected, valueMap} = this.state;
    const movement = {...listDataAssignedSelected[0]}
    return({
      [MOVEMENT.ID]: movement[MOVEMENT.ID],
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
    const {valueMap} = this.state;
    const {currentUser} = this.props
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
      [DOCUMENT_INTERN.CURRENT_DATE]: valueMap[DOCUMENT_INTERN.CURRENT_DATE],
      [DOCUMENT_INTERN.RESPONSABLE_AREA]: ''
    })
  };

  onDeriveAssignedDocuments=()=>{
    const movement = this.generateObjectMovement();
    const intern_document = this.generateObjectInternDocument();
    const {generateResponseToMovement, getUserMovementsByAssignedTo, currentUser} = this.props;
    generateResponseToMovement(currentUser.id, currentUser.dependencyId, intern_document,movement).then(()=>{
      this.onToggleCloseDerived();
      getUserMovementsByAssignedTo(currentUser.id)
    })
  };

  onGetMaxCorrelative = (typeDocumentId) => {
    const {getCorrelativeMax, typeDocuments,currentUser} = this.props;
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

  onToggleDerivedAssignedModal=()=>{
    this.setState({valueMap: {}});
    const {listDataAssignedSelected} = this.state;
    const {getTypeDocuments, currentUser} = this.props;
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
  };

  render(){
    const {dataAssigned,typeDocuments} = this.props;
    const {showDeriveAssignedModal,listDataAssignedSelected,valueMap} = this.state;
    const modalProps = [
      {
        showModal: showDeriveAssignedModal,
        title: 'Derivar Documentos',
        message: (listDataAssignedSelected.length === 0) ? `Debe por lo menos seleccionar un documento` : null,
        yesFunction: (listDataAssignedSelected.length > 0) ? this.onDeriveAssignedDocuments : this.onToggleDerivedAssignedModal,
        yesText: (listDataAssignedSelected.length > 0) ? 'Confirmar' : 'Aceptar',
        noFunction: this.onToggleCloseDerived,
        noText: "Cancelar",
        content: <FormRender formTemplate={formDeriveDocuments(typeDocuments,(typeDocumentId) => this.onGetMaxCorrelative(typeDocumentId))}
                             onChange={this.onChangeValueMap}
                             valueMap={valueMap}
                             onChangeInputSelect={(typeDocumentId) => this.onGetMaxCorrelative(typeDocumentId)}/>
      }
    ];

    return(
      <Fragment>
        {
          modalProps && modalProps.length > 0 ?
            map(modalProps, (modal, index) => {
              return <CommonModal key={'modalAssigned' + index} {...modal}/>
            }) : null
        }
        <CommonTableManage
          tableStructure={this.getTableStructureAssigned}
          title={'DOCUMENTOS ASIGNADOS'}
          listData={dataAssigned}
          getFooterTableStructure={this.getFooterTableAssignedStructure}
          onSetSelected={this.onSetSelectAssignedDocuments}
        />
      </Fragment>
      )
  }
}

export default CommonAssignedDocuments