import {Component, Fragment} from "react";
import {getUserMovementsByOffice,
        confirmDocuments,
        getUserMovementsByAssignedTo,
        deriveDocuments,
        deriveAssignedDocuments,
        getTypeDocuments} from "../../../actions/actions"
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
  }

  onChangeValueMap=(prop, value) => {
    this.setState({valueMap: {...this.state.valueMap, [prop]: value}})
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

  onDeriveDocuments=()=>{
    const {listDataSelected, valueMap, currentUser} = this.state;
    const {deriveDocuments, getUserMovementsByOffice} = this.props;
    deriveDocuments(currentUser.id, valueMap['officeId'], valueMap['currentDate'],listDataSelected).then(()=>{
      this.onToggleDerivedModal();
      getUserMovementsByOffice(currentUser.dependencyId)
    })
  };

  onDeriveAssignedDocuments=()=>{
    const {listDataAssignedSelected, valueMap, currentUser} = this.state;
    const {deriveAssignedDocuments, getUserMovementsByOffice} = this.props;
    deriveAssignedDocuments(currentUser.id, valueMap['officeId'], valueMap['currentDate'],listDataAssignedSelected).then(()=>{
      this.onToggleDerivedAssignedModal();
      getUserMovementsByOffice(currentUser.dependencyId)
    })
  };

  onToggleConfirmModal=()=>{
    this.setState({valueMap: {}});
    this.onChangeValueMap('currentDate',getFormattedDate());
    this.setState({showConfirmationModal: !this.state.showConfirmationModal})
  };

  onToggleDerivedModal=()=>{
    this.setState({valueMap: {}});
    this.onChangeValueMap('currentDate',getFormattedDate());
    this.setState({showDerivedModal: !this.state.showDerivedModal})
  };

  onToggleDerivedAssignedModal=()=>{
    this.setState({valueMap: {}});
    const {listDataAssignedSelected, currentUser} = this.state
    const {getTypeDocuments} = this.props;
    getTypeDocuments().then(()=>{
      this.onChangeValueMap('fecha',getFormattedOnlyDate());
      this.onChangeValueMap('hora',getFormattedOnlyTime());
      this.onChangeValueMap('referencia',listDataAssignedSelected[0].numTram);
      this.onChangeValueMap('user',currentUser.apellido+", "+currentUser.nombre);
      this.setState({showDeriveAssignedModal: !this.state.showDeriveAssignedModal})
    });
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
      {text: 'Responder', action: ()=>{}},
      {text: 'Derivar', action: this.onToggleDerivedAssignedModal},
    ])
  };

  getFooterTableStructure = () => {
    return([
      {text: 'Seguimiento', action: ()=>{}},
      {text: 'Confirmar', action: this.onToggleConfirmModal},
      {text: 'Derivar', action: this.onToggleDerivedModal},
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
    const {showConfirmationModal,showDeriveAssignedModal,showDerivedModal,listDataAssignedSelected,listDataSelected, valueMap,currentUser} = this.state;
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
      {
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
      },
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
                             valueMap={valueMap}/>
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
  getTypeDocuments: () => dispatch(getTypeDocuments())
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
    dataAssigned: listDocuments(state.movements.dataAssigned)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DocumentsReceived)