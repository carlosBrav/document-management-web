import React, {Component, Fragment} from 'react';
import CommonTab from '../commons/CommonTab';
import CommonTableManage from '../commons/CommonTableManage';
import {listData_1, listData_2} from "../../fakedata/ListDataDocuments";
import FormRender from "../../forms/FormRender";
import {formOficiosToExp, formOficios} from '../../forms/templates/TemplateCreateOficios';
import map from "lodash/map";
import find from "lodash/find";
import CommonModal from '../commons/CommonModal';
import {
  getInternDocumentsByOffice,
  getTypeDocuments,
  getUserMovementsByOffice,
  getCorrelativeMax,
  generateResponseToMovementAdmin
} from "../../actions/actions";
import {getParseObj} from "../../utils/Utils";
import { connect } from 'react-redux';
import {DOCUMENT_INTERN, getFormattedDate, MOVEMENT, TYPE_DOCUMENT} from "../../utils/Constants";
import filter from "lodash/filter";
import parseInt from "lodash/parseInt";

class DocRespuesta extends Component{

  state = {
    search: '',
    listDataSelectedToDelete: [],
    listDataSelectedDocInt: [],
    showDeleteModal: false,
    showCreateModal: false,
    showCreateSecondModal: false,
    valueMap: {},
    currentUser: {},
    correlativeOficio: '',
    destinations: []

  };

  async componentDidMount(){
    const currentUser = await getParseObj('CURRENT_USER');
    this.setState({currentUser});

    this.fillMovementsByOffice()
  }

  fillMovementsByOffice=()=>{
    const {currentUser} = this.state
    const {getUserMovementsByOffice} = this.props
    getUserMovementsByOffice(currentUser.dependencyId)
  };

  fillInternDocumentsByOffice=()=>{
    const {currentUser} = this.state;
    const {getOficios} = this.props;
    getOficios(TYPE_DOCUMENT.oficios, currentUser.dependencyId)
  };

  onChangeValueMap=(prop, value)=>{
    this.setState({valueMap: {...this.state.valueMap, [prop]: value}})
  };

  onSetSelectedToDeleteOficio=(listDataSelectedToDelete)=>{
    this.setState({listDataSelectedToDelete})
  };

  onSetSelectToCreateOficio=(listDataSelectedDocInt)=>{
  this.setState({listDataSelectedDocInt})
  };

  onChangeTypeDestination=(type)=>{
    const {dependencies} = this.props;
    const destinations = map(filter(dependencies, dependency => dependency.tipo === type), value =>({
      ...value,
      value: value.nombre
    }));
    this.setState({destinations})
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
        columnHeader: 'Num. Tram.',
        rowProp: 'numTram',
        classSearchRow: 'container-search-field normal-size',
        filterHeader: true
      },
      {
        columnHeader: 'Mov.',
        rowProp: 'movimiento'
      },
      {
        columnHeader: 'Origen',
        rowProp: 'origenNombre',
        classSearchRow: 'container-search-field long-size',
        filterHeader: true
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
      },
      {
        columnHeader: 'Estado',
        rowProp: 'estadoDocumento'
      }
    ])
  }

  onToggleDeleteDocuments = () => {
    this.setState({showDeleteModal: !this.state.showDeleteModal})
  }

  onToggleOpenCreateOficio = () => {
    const {listDataSelectedDocInt,currentUser} = this.state;
    const {getTypeDocuments,getCorrelativeMax} = this.props;
    const documentValue = {...listDataSelectedDocInt[0]}
    getTypeDocuments().then(()=>{
      const {typeDocuments} = this.props;
      const typeOficio = find(typeDocuments, value => value.nombreTipo === 'OFICIO')
      getCorrelativeMax(currentUser.dependencyId, typeOficio.id,currentUser.dependencySiglas).then(()=>{
        const {documentNumber,documentSiglas,documentYear} = this.props;
        this.setState({correlativeOficio: `${documentNumber}-${documentSiglas}-${documentYear}`});
        this.onChangeValueMap('numTram', documentValue['numTram']);
        this.onChangeValueMap('asunto', documentValue['observacion']);
        this.onChangeValueMap('fecha',getFormattedDate());
        this.onChangeValueMap('origen',documentValue.origenNombre);
        this.onChangeValueMap('responsable',currentUser.dependencyName);
        this.onChangeValueMap('currentDate',getFormattedDate());
        this.setState({showCreateModal: !this.state.showCreateModal})
      })
    });
  };

  onToggleCloseCreateOficio=()=>{
    this.setState({valueMap: {}})
    this.setState({showCreateModal: !this.state.showCreateModal})
  }

  onToggleCreateOnlyOficio = () => {
    this.setState({showCreateSecondModal: !this.state.showCreateSecondModal})
  }

  onDeleteDocuments = () => {
    this.setState({showDeleteModal: !this.state.showDeleteModal})
  };

  getFooterTableStructureOficios = () => {
    return([
      {text: 'Crear', action: this.onToggleCreateOnlyOficio},
      {text: 'Eliminar', action: this.onToggleDeleteDocuments}
    ])
  }

  getFooterTableStructureDocInt = () => {
    return([
      {text: 'Oficios', action: this.onToggleOpenCreateOficio}
    ])
  };

  generateObjectMovement=()=>{
    const {listDataSelectedDocInt, valueMap} = this.state;
    const movement = {...listDataSelectedDocInt[0]};
    return({
      [MOVEMENT.ID]: movement['id'],
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
      [MOVEMENT.CURRENT_DATE]: valueMap[MOVEMENT.CURRENT_DATE],
      [MOVEMENT.ENTER_DATE]: '',
      [MOVEMENT.SENT_DATE]: ''
    });
  };

  generateObjectInternDocument=()=>{
    const { documentNumber,documentSiglas,documentYear} = this.props;
    const {valueMap, currentUser} = this.state;
    return({
      [DOCUMENT_INTERN.DOCUMENT_STATE]: 'GENERADO',
      [DOCUMENT_INTERN.TYPE_DOCUMENT_ID]: TYPE_DOCUMENT.oficios,
      [DOCUMENT_INTERN.DOCUMENT_NUMBER]: parseInt(documentNumber),
      [DOCUMENT_INTERN.SIGLAS]: documentSiglas,
      [DOCUMENT_INTERN.YEAR]: documentYear,
      [DOCUMENT_INTERN.OBSERVATION]: valueMap[DOCUMENT_INTERN.OBSERVATION],
      [DOCUMENT_INTERN.ASUNTO]: valueMap[DOCUMENT_INTERN.ASUNTO],
      [DOCUMENT_INTERN.ORIGIN_ID]: currentUser.dependencyId,
      [DOCUMENT_INTERN.DESTINY_ID]: valueMap['destinyId'],
      [DOCUMENT_INTERN.USER_ID]: currentUser.id,
      [DOCUMENT_INTERN.FIRM]: '',
      [DOCUMENT_INTERN.ACTIVE]: true,
      [DOCUMENT_INTERN.CURRENT_DATE]: valueMap[DOCUMENT_INTERN.CURRENT_DATE]

    })
  };

  onCreateOficio=()=>{
    const {valueMap,currentUser} = this.state;
    const {generateResponseToMovementAdmin} = this.props
    console.log('VALUE MAP ', valueMap);
    console.log('USER ID ', currentUser.id);
    console.log('USER DEPENDENCY ID ', currentUser.dependencyId)
    const movementObject = this.generateObjectMovement();
    const documentObject = this.generateObjectInternDocument();
    console.log('movement object ', movementObject);
    console.log('document object ', documentObject);
    generateResponseToMovementAdmin(currentUser.id,currentUser.dependencyId,documentObject,movementObject).then(()=>{
      this.onToggleCloseCreateOficio()
    })
  }

  onCreateOnlyOficio=()=>{
    const {valueMapCreateOnlyOficio} = this.state
    console.log('VALUE MAP TO CREATE ONLY OFICIO ', valueMapCreateOnlyOficio)
    this.onToggleCreateOnlyOficio()
  }

  render(){

    const {showDeleteModal,
      listDataSelectedToDelete,
      showCreateModal,
      listDataSelectedDocInt,
      showCreateSecondModal,
      valueMap,
      correlativeOficio,
      destinations} = this.state

    const {movements,internDocument} = this.props


    const modalProps = [
      {
        showModal: showCreateSecondModal,
        title: 'Crear Oficio',
        yesFunction: this.onCreateOnlyOficio,
        yesText: 'Crear Oficio',
        noFunction: this.onToggleCreateOnlyOficio,
        noText: 'Cancelar',
        content: <FormRender formTemplate={formOficios}
                             onChange={this.onChangeValueMap}
                             valueMap={valueMap}/>
      },
      {
        showModal: showCreateModal,
        title: `Crear Oficio Nº ${correlativeOficio}`,
        message: (listDataSelectedDocInt.length === 1)? null: 'Debe seleccionar 1 documento',
        yesFunction: (listDataSelectedDocInt.length === 1) ? this.onCreateOficio:this.onToggleCloseCreateOficio,
        yesText: (listDataSelectedDocInt.length === 1) ? 'Crear Oficio':'Ok',
        noFunction: (listDataSelectedDocInt.length === 1) ? this.onToggleCloseCreateOficio:null,
        noText: (listDataSelectedDocInt.length === 1) ? 'Cancelar':null,
        content: <FormRender formTemplate={formOficiosToExp(this.onChangeTypeDestination,destinations)}
                             onChange={this.onChangeValueMap}
                             valueMap={valueMap}/>
      },
      {
        showModal: showDeleteModal,
        title: 'Eliminar Documentos',
        message: (listDataSelectedToDelete.length>0)?`¿Desea eliminar ${listDataSelectedToDelete.length} documento(s) ?`:`Debe seleccionar al menos un documento`,
        yesFunction: (listDataSelectedToDelete.length>0)?this.onDeleteDocuments:this.onToggleDeleteDocuments,
        yesText: (listDataSelectedToDelete.length>0)?'Sí':'Ok',
        noFunction: (listDataSelectedToDelete.length>0)?this.onToggleDeleteDocuments:null
      }
    ]

    const tableDocumentInt = () =>{
      return (<CommonTableManage
        tableStructure={this.getTableStructure}
        title={'DOCUMENTOS INTERNOS'}
        listData={movements}
        getFooterTableStructure={this.getFooterTableStructureDocInt}
        onSetSelected={this.onSetSelectToCreateOficio}
      />)
    };

    const tableOficios =()=> {
      return (
        <CommonTableManage
          tableStructure={this.getTableStructure}
          title={'OFICIOS'}
          listData={internDocument}
          getFooterTableStructure={this.getFooterTableStructureOficios}
          onSetSelected={this.onSetSelectedToDeleteOficio}
        />
      )
    };

    const tabs =
      [ {title: 'Doc. Internos', id: 'docuInt', action: tableDocumentInt, onClick: this.fillMovementsByOffice},
        {title: 'Oficios', id: 'oficios', action: tableOficios, onClick: this.fillInternDocumentsByOffice}
      ];


    return(
      <Fragment>
        {
          modalProps && modalProps.length>0 ?
            map(modalProps, (modal, index)=>{
              return <CommonModal key={'modal'+index} {...modal}/>
            }) : null
        }
        <CommonTab tabList={tabs}/>
      </Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  getOficios: (typeDocumentId, officeId) => dispatch(getInternDocumentsByOffice(typeDocumentId, officeId)),
  getUserMovementsByOffice: (officeId) => dispatch(getUserMovementsByOffice(officeId)),
  getTypeDocuments: () => dispatch(getTypeDocuments()),
  getCorrelativeMax: (officeId, typeDocumentId, siglas) => dispatch(getCorrelativeMax(officeId, typeDocumentId, siglas)),
  generateResponseToMovementAdmin: (userId, officeId, documentIntern, movement) => dispatch(generateResponseToMovementAdmin(userId, officeId, documentIntern, movement))
});

function mapStateToProps(state){
  const listDocuments = (listData) => {
    return map(listData, (data) => ({
      ...data,
      document: `${data.docuNombre} ${data.docuNum}-${data.docuSiglas}-${data.docuAnio}`,
      responsable: `${data.userLastName}, ${data.userName}`,
      check: false
    }))
  };

  return {
    movements: listDocuments(state.user.movements),
    typeDocuments: state.typeDocuments.data,
    documentNumber: state.correlative.documentNumber,
    documentSiglas: state.correlative.documentSiglas,
    documentYear: state.correlative.documentYear,
    dependencies: state.initialData.dependencies,
    internDocument: state.documentIntern.data
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(DocRespuesta)