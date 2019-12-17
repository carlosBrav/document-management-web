import React, {Component, Fragment} from 'react';
import CommonTab from '../commons/CommonTab';
import CommonTableManage from '../commons/CommonTableManage';
import FormRender from "../../forms/FormRender";
import {formOficiosToExp, formOficios} from '../../forms/templates/TemplateCreateOficios';
import map from "lodash/map";
import find from "lodash/find";
import CommonModal from '../commons/CommonModal';
import {
  getInternDocumentsByOffice,
  getTypeDocuments,
  getAdminMovementsByOffice,
  getCorrelativeMax,
  generateResponseToMovementAdmin,
  createInternDocument,
  deleteDocuments
} from "../../actions/actions";
import {getParseObj} from "../../utils/Utils";
import {connect} from 'react-redux';
import {DOCUMENT_INTERN, getFormattedDate, MOVEMENT, TYPE_DOCUMENT} from "../../utils/Constants";
import filter from "lodash/filter";
import parseInt from "lodash/parseInt";
import isEmpty from 'lodash/isEmpty';
import {ClipLoader} from "react-spinners";

class DocRespuesta extends Component {

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

  async componentDidMount() {
    const currentUser = await getParseObj('CURRENT_USER');
    this.setState({currentUser});
    const {getTypeDocuments} = this.props;
    await getTypeDocuments();
    await this.fillMovementsByOffice()
  }

  fillMovementsByOffice = () => {
    const {currentUser} = this.state
    const {getAdminMovementsByOffice} = this.props
    getAdminMovementsByOffice(currentUser.dependencyId)
  };

  fillInternDocumentsByOffice = () => {
    const {currentUser} = this.state;
    const {getOficios} = this.props;
    getOficios(TYPE_DOCUMENT.oficios, currentUser.dependencyId)
  };

  onChangeValueMap = (prop, value) => {
    this.setState({valueMap: {...this.state.valueMap, [prop]: value}})
  };

  onSetSelectedToDeleteOficio = (listDataSelectedToDelete) => {
    this.setState({listDataSelectedToDelete})
  };

  onSetSelectToCreateOficio = (listDataSelectedDocInt) => {
    this.setState({listDataSelectedDocInt})
  };

  onChangeTypeDestination = (type) => {
    const {dependencies} = this.props;
    const destinations = map(filter(dependencies, dependency => dependency.tipo === type), value => ({
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
        columnHeader: 'Doc. Rpta.',
        rowProp: 'internDocument'
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
      }
    ])
  };

  getTableStructureOficios = (onToggleAddDocSelect) => {
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
        rowProp: 'document',
        classSearchRow: 'container-search-field normal-size',
        filterHeader: true
      },
      {
        columnHeader: 'Num. Tram.',
        rowProp: 'numTram',
        classSearchRow: 'container-search-field normal-size',
        filterHeader: true
      },
      {
        columnHeader: 'Destino',
        rowProp: 'destinoName',
        classSearchRow: 'container-search-field long-size',
        filterHeader: true
      },
      {
        columnHeader: 'F. Envio',
        rowProp: 'fechaCreacion',
        classSearchRow: 'container-search-field medium-size',
        filterHeader: true
      },
      {
        columnHeader: 'Observación',
        rowProp: 'observacion'
      },
      {
        columnHeader: 'Asunto',
        rowProp: 'asunto'
      },
      {
        columnHeader: 'Estado',
        rowProp: 'estado'
      }
    ])
  }

  onToggleDeleteDocuments = () => {
    this.setState({showDeleteModal: !this.state.showDeleteModal})
  }

  onToggleOpenCreateOficio = () => {
    const {listDataSelectedDocInt, currentUser} = this.state;
    const {getTypeDocuments, getCorrelativeMax} = this.props;
    const documentValue = {...listDataSelectedDocInt[0]}
    getTypeDocuments().then(() => {
      const {typeDocuments} = this.props;
      const typeOficio = find(typeDocuments, value => value.nombreTipo === 'OFICIO')
      getCorrelativeMax(currentUser.dependencyId, typeOficio.id, currentUser.dependencySiglas).then(() => {
        const {documentNumber, documentSiglas, documentYear} = this.props;
        this.setState({correlativeOficio: `${documentNumber}-${documentSiglas}-${documentYear}`});
        this.onChangeValueMap('numTram', documentValue['numTram']);
        this.onChangeValueMap('asunto', documentValue['observacion']);
        this.onChangeValueMap('fecha', getFormattedDate());
        this.onChangeValueMap('origen', documentValue.origenNombre);
        this.onChangeValueMap('responsable', currentUser.dependencyName);
        this.onChangeValueMap('currentDate', getFormattedDate());
        this.setState({showCreateModal: !this.state.showCreateModal})
      })
    });
  };

  onToggleCloseCreateOficio = () => {
    this.setState({valueMap: {}})
    this.setState({showCreateModal: !this.state.showCreateModal})
  }

  onToggleOpenCreateOnlyOficio = () => {
    this.setState({valueMap: {}})
    const {currentUser} = this.state;
    const {getCorrelativeMax} = this.props;
    getCorrelativeMax(currentUser.dependencyId, TYPE_DOCUMENT.oficios, currentUser.dependencySiglas).then(() => {
      const {documentNumber, documentSiglas, documentYear} = this.props;
      this.onChangeValueMap('document', `OFICIO Nº ${documentNumber}-${documentSiglas}-${documentYear}`);
      this.onChangeValueMap('currentDate', getFormattedDate());
      this.onChangeValueMap('origen', currentUser.dependencyName);
      this.setState({showCreateSecondModal: !this.state.showCreateSecondModal})
    });
  };

  onToggleCloseCreateOnlyOficio = () => {
    this.setState({valueMap: {}});
    this.setState({showCreateSecondModal: !this.state.showCreateSecondModal})
  };

  onDeleteDocuments = () => {
    const {listDataSelectedToDelete} = this.state;
    const {deleteDocuments} = this.props;
    const documentsIds = map(listDataSelectedToDelete, data => data.id);
    deleteDocuments(documentsIds).then(() => {
      this.fillInternDocumentsByOffice();
      this.setState({showDeleteModal: !this.state.showDeleteModal})
    });
  };

  getFooterTableStructureOficios = () => {
    return ([
      {text: 'Crear', action: this.onToggleOpenCreateOnlyOficio},
      {text: 'Eliminar', action: this.onToggleDeleteDocuments}
    ])
  }

  getFooterTableStructureDocInt = () => {
    return ([
      {text: 'Oficios', action: this.onToggleOpenCreateOficio}
    ])
  };

  generateObjectMovement = () => {
    const {listDataSelectedDocInt, valueMap} = this.state;
    const movement = {...listDataSelectedDocInt[0]};
    return ({
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
      [MOVEMENT.SENT_DATE]: '',
      [MOVEMENT.PREVIOUS_MOVEMENT]: ''
    });
  };

  generateObjectInternDocument = () => {
    const {documentNumber, documentSiglas, documentYear} = this.props;
    const {valueMap, currentUser} = this.state;
    return ({
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
      [DOCUMENT_INTERN.CURRENT_DATE]: valueMap[DOCUMENT_INTERN.CURRENT_DATE],
      [DOCUMENT_INTERN.REFERENCE_DOCUMENT]: '',
      [DOCUMENT_INTERN.RESPONSABLE_AREA]: ''
    })
  };

  onCreateOficio = () => {
    const {currentUser} = this.state;
    const {generateResponseToMovementAdmin} = this.props;
    const movementObject = this.generateObjectMovement();
    const documentObject = this.generateObjectInternDocument();
    generateResponseToMovementAdmin(currentUser.id, currentUser.dependencyId, documentObject, movementObject).then(() => {
      this.fillMovementsByOffice()
      this.onToggleCloseCreateOficio()
    })
  }

  onCreateOnlyOficio = () => {
    const {createInternDocument} = this.props
    const internDocument = this.generateObjectInternDocument();
    createInternDocument(internDocument).then(() => {
      this.fillInternDocumentsByOffice();
      this.onToggleCloseCreateOnlyOficio()
    })
  };

  render() {

    const {
      showDeleteModal,
      listDataSelectedToDelete,
      showCreateModal,
      listDataSelectedDocInt,
      showCreateSecondModal,
      valueMap,
      correlativeOficio,
      destinations
    } = this.state

    const {movements, internDocument, isLoadingUser, isLoadingInternDoc} = this.props


    const modalProps = [
      {
        showModal: showCreateSecondModal,
        title: 'Crear Oficio',
        yesFunction: this.onCreateOnlyOficio,
        yesText: 'Crear Oficio',
        noFunction: this.onToggleCloseCreateOnlyOficio,
        noText: 'Cancelar',
        content: <FormRender formTemplate={formOficios(this.onChangeTypeDestination, destinations)}
                             onChange={this.onChangeValueMap}
                             valueMap={valueMap}/>
      },
      {
        showModal: showCreateModal,
        title: `Crear Oficio Nº ${correlativeOficio}`,
        message: (listDataSelectedDocInt.length === 1) ? null : 'Debe seleccionar 1 documento',
        yesFunction: (listDataSelectedDocInt.length === 1) ? this.onCreateOficio : this.onToggleCloseCreateOficio,
        yesText: (listDataSelectedDocInt.length === 1) ? 'Crear Oficio' : 'Ok',
        noFunction: (listDataSelectedDocInt.length === 1) ? this.onToggleCloseCreateOficio : null,
        noText: (listDataSelectedDocInt.length === 1) ? 'Cancelar' : null,
        content: <FormRender formTemplate={formOficiosToExp(this.onChangeTypeDestination, destinations)}
                             onChange={this.onChangeValueMap}
                             valueMap={valueMap}/>
      },
      {
        showModal: showDeleteModal,
        title: 'Eliminar Documentos',
        message: (listDataSelectedToDelete.length > 0) ? `¿Desea eliminar ${listDataSelectedToDelete.length} documento(s) ?` : `Debe seleccionar al menos un documento`,
        yesFunction: (listDataSelectedToDelete.length > 0) ? this.onDeleteDocuments : this.onToggleDeleteDocuments,
        yesText: (listDataSelectedToDelete.length > 0) ? 'Sí' : 'Ok',
        noFunction: (listDataSelectedToDelete.length > 0) ? this.onToggleDeleteDocuments : null
      }
    ]

    const tableDocumentInt = () => {
      return (
        isLoadingUser ?
          <div className='spinner-tab'>
            <ClipLoader
              size={150} // or 150px
              color={"#EEE2E0"}
              loading={isLoadingUser}
            />
          </div> :
          <CommonTableManage
            tableStructure={this.getTableStructure}
            title={'DOCUMENTOS INTERNOS'}
            listData={movements}
            getFooterTableStructure={this.getFooterTableStructureDocInt}
            onSetSelected={this.onSetSelectToCreateOficio}
          />
      )
    };

    const tableOficios = () => {
      return (
        isLoadingInternDoc ?
          <div className='spinner-tab'>
            <ClipLoader
              size={150} // or 150px
              color={"#EEE2E0"}
              loading={isLoadingInternDoc}
            />
          </div> :
          <CommonTableManage
            tableStructure={this.getTableStructureOficios}
            title={'OFICIOS'}
            listData={internDocument}
            getFooterTableStructure={this.getFooterTableStructureOficios}
            onSetSelected={this.onSetSelectedToDeleteOficio}
          />
      )
    };

    const tabs =
      [{title: 'Doc. Internos', id: 'docuInt', action: tableDocumentInt, onClick: this.fillMovementsByOffice},
        {title: 'Oficios', id: 'oficios', action: tableOficios, onClick: this.fillInternDocumentsByOffice}
      ];


    return (
      <Fragment>
        {
          modalProps && modalProps.length > 0 ?
            map(modalProps, (modal, index) => {
              return <CommonModal key={'modal' + index} {...modal}/>
            }) : null
        }
        <CommonTab tabList={tabs}/>
      </Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  deleteDocuments: (documentsIds) => dispatch(deleteDocuments(documentsIds)),
  getOficios: (typeDocumentId, officeId) => dispatch(getInternDocumentsByOffice(typeDocumentId, officeId)),
  getAdminMovementsByOffice: (officeId) => dispatch(getAdminMovementsByOffice(officeId)),
  getTypeDocuments: () => dispatch(getTypeDocuments()),
  getCorrelativeMax: (officeId, typeDocumentId, siglas) => dispatch(getCorrelativeMax(officeId, typeDocumentId, siglas)),
  generateResponseToMovementAdmin: (userId, officeId, documentIntern, movement) => dispatch(generateResponseToMovementAdmin(userId, officeId, documentIntern, movement)),
  createInternDocument: (internDocument) => dispatch(createInternDocument(internDocument))
});

function mapStateToProps(state) {
  const listDocuments = (listData) => {
    return map(listData, (data) => {
        const document = data.tipoDocuId && find(state.typeDocuments.data, x => x.id === data.tipoDocuId)
        return ({
          ...data,
          document: (!isEmpty(data.docuNombre)) ? `${data.docuNombre} Nº ${data.docuNum}-${data.docuSiglas}-${data.docuAnio}` : 'SIN DOCUMENTO',
          responsable: `${data.userLastName}, ${data.userName}`,
          internDocument: data.tipoDocuId ? `${document.nombreTipo} Nº ${data.numDocumentIntern}-${data.siglasDocumentIntern}-${data.anioDocumentIntern}`
            : 'SIN DOC. RPTA.',
          check: false
        })
      }
    )
  };

  const listInternDocuments = (listData) => {
    return map(listData, data => ({
      ...data,
      document: (!isEmpty(data.documentName)) ? `${data.documentName} Nº ${data.numDocumento}-${data.siglas}-${data.anio}` : 'SIN DOCUMENTO',
      check: false
    }))
  }

  return {
    movements: listDocuments(state.user.adminMovements),
    isLoadingUser: state.user.isLoading,
    typeDocuments: state.typeDocuments.data,
    documentNumber: state.correlative.documentNumber,
    documentSiglas: state.correlative.documentSiglas,
    documentYear: state.correlative.documentYear,
    dependencies: state.initialData.dependencies,
    internDocument: listInternDocuments(state.documentIntern.data),
    isLoadingInternDoc: state.documentIntern.isLoading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocRespuesta)