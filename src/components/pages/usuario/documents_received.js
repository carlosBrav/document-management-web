import {Component, Fragment} from "react";
import {getUserMovementsByOffice,
        confirmDocuments} from "../../../actions/actions"
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

class DocumentsReceived extends Component{

  state = {
    listDataSelected: [],
    isModalOpen: false,
    showConfirmationModal: false,
    valueMap : {},
    currentUser: {}
  };

  async componentDidMount(){
    const currentUser = getParseObj('CURRENT_USER');
    this.setState({currentUser})
    const {getUserMovementsByOffice} = this.props
    getUserMovementsByOffice(currentUser.dependencyId)
  }

  onChangeValueMap=(prop, value) => {
    this.setState({valueMap: {...this.state.valueMap, [prop]: value}})
  };

  onSetSelectDocuments=(listDataSelected)=>{
    this.setState({listDataSelected})
  };

  onConfirmDocuments=()=>{
    const {listDataSelected, valueMap, currentUser} = this.state
    const {confirmDocuments, getUserMovementsByOffice} = this.props

    const documentsIds = map(listDataSelected, data => data.id)
    confirmDocuments(currentUser.id,documentsIds, valueMap['currentDate'],valueMap['asignadoA']).then(()=>{
      this.onToggleConfirmModal();
      getUserMovementsByOffice(currentUser.dependencyId)
    })
  };

  onToggleConfirmModal=()=>{
    this.onChangeValueMap('currentDate',getFormattedDate());
    this.setState({showConfirmationModal: !this.state.showConfirmationModal})
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

  getFooterTableStructure = () => {
    return([
      {text: 'Seguimiento', action: ()=>{}},
      {text: 'Confirmar', action: this.onToggleConfirmModal},
      {text: 'Derivar', action: () => {}},
    ])
  };

  onClickTabDocumentReceived=()=>{
    const {currentUser}=this.state;
    const {getUserMovementsByOffice} = this.props;
    getUserMovementsByOffice(currentUser.dependencyId)
  };

  render(){
    const {data, errors, users} = this.props;
    const {showConfirmationModal,listDataSelected, valueMap,currentUser} = this.state;
    const {dependencyName} = currentUser
    const modalProps = [
      {
        showModal: showConfirmationModal,
        title: 'Confirmar documentos recibidos',
        message: (listDataSelected.length === 0) ? `Debe por lo menos seleccionar un documento` : null,
        yesFunction: (listDataSelected.length > 0) ? this.onConfirmDocuments : this.onToggleConfirmModal,
        yesText: (listDataSelected.length > 0) ? 'Confirmar' : 'Aceptar',
        content: <FormRender formTemplate={formConfirmDocuments(users)}
                             onChange={this.onChangeValueMap}
                             valueMap={valueMap}/>
      },
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

    const tabs =
      [ {title: 'Doc. Recibidos', id: 'docReceived', action: tableDocumentsReceived,
        onClick: this.onClickTabDocumentReceived},
        {title: 'Doc. Asignados', id: 'docAssigned', action: ()=>{}}
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
  confirmDocuments: (userId, movementsIds, currentDate, asignadoA) => dispatch(confirmDocuments(userId, movementsIds, currentDate, asignadoA))
});

function mapStateToProps(state){
  const listDocuments = (listData) => {
    return map(listData, (data,index) => ({
      ...data,
      document: `${data.docuNombre} ${data.docuNum}-${data.docuSiglas}-${data.docuAnio}`,
      check: false
    }))
  };

  const currentUser = getParseObj('CURRENT_USER');

  const lisUsers = (listData) => {
    return map(filter(listData, value => value.dependenciaId === currentUser.dependencyId), data => ({
      ...data,
      value: `${data.apellido}, ${data.nombre}`
    }))
  };
  return {
    data: listDocuments(state.user.movements),
    errors: state.user.errors,
    users: lisUsers(state.initialData.users)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(DocumentsReceived)