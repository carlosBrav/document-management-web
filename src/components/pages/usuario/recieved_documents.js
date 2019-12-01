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
import {getFormattedDate} from "../../../utils/Constants";
import CommonTab from '../../commons/CommonTab';
import CommonAssignedDocuments from "../../commons/CommonAssignedDocuments";

class DocumentsReceived extends Component{

  state = {
    listDataSelected: [],
    listDataAssignedSelected: [],
    isModalOpen: false,
    showConfirmationModal: false,
    showDerivedModal: false,
    showDeriveAssignedModal: false,
    valueMap : {},
    currentUser: {},
    dataReceived: []
  };

  async componentDidMount(){
    const currentUser = getParseObj('CURRENT_USER');
    this.setState({currentUser});
    const {getUserMovementsByOffice} = this.props;
    getUserMovementsByOffice(currentUser.dependencyId).then(()=>{
      this.setState({dataReceived: this.props.data})
    })
  };

  componentDidUpdate(){
    if(this.state.dataReceived.length !== this.props.data.length){
      this.setState({dataReceived: this.props.data})
    }
  }

  onChangeValueMap=(prop, value) => {
    this.setState({valueMap: {...this.state.valueMap, [prop]: value}});
  };

  onSetSelectDocuments=(listDataSelected)=>{
    this.setState({listDataSelected})
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

  onToggleConfirmModal=()=>{
    this.setState({valueMap: {}});
    this.onChangeValueMap('currentDate',getFormattedDate());
    this.setState({showConfirmationModal: !this.state.showConfirmationModal})
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
        columnHeader: 'Origen',
        rowProp: 'origenNombre',
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
    const {users} = this.props;
    const {showConfirmationModal,listDataSelected, valueMap,currentUser,dataReceived} = this.state;
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
      }
    ];

    const tableDocumentsReceived = () =>{
      return(<CommonTableManage
        tableStructure={this.getTableStructureReceived}
        title={'DOCUMENTOS RECIBIDOS: '+dependencyName}
        listData={dataReceived}
        getFooterTableStructure={this.getFooterTableStructure}
        onSetSelected={this.onSetSelectDocuments}
      />)
    };

    const tableDocumentsAssigned=()=>{
      return(<CommonAssignedDocuments currentUser={currentUser}
                                      {...this.props}/>)
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