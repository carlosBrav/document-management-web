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

const currentUser = getParseObj('CURRENT_USER');

class DocCirculares extends Component {

  state = {
    search: '',
    listDataSelected: [],
    showDeleteModal: false,
    showCreateCircularModal: false,
    valueMapCircular: {},
    valueMapEditCircular: {},
    showViewCircularModal: false,
    circularSelected: {},
    showEditCircularModal: false
  }

  async componentDidMount() {
    const {getTypeDocuments, getCircularDocuments} = this.props
    getTypeDocuments().then(()=>{
      const {listTypeDocuments} = this.props
      const typeDocuments = map(listTypeDocuments, document => document.id);
      getCircularDocuments(typeDocuments, currentUser.id)
    });
  }

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
        columnHeader: 'Documento',
        rowProp: 'correlative',
        classSearchRow: 'container-search-field normal-size',
        filterHeader: true
      },
      {
        columnHeader: 'Asunto',
        rowProp: 'asunto'
      },
      {
        columnHeader: 'Area Resp.',
        rowProp: 'dependencyName',
        classSearchRow: 'container-search-field long-size',
        filterHeader: true
      },
      {
        columnHeader: 'Fecha Env.',
        rowProp: 'fechaCreacion'
      },
      {
        columnHeader: 'Firma',
        rowProp: 'firma',
      },
      {
        columnHeader: 'Responsable',
        rowProp: 'responsable'
      },
      {
        columnHeader: '',
        rowStyle: 'container-icons',
        actions: [
          {
            actionType: ICON_TYPE.SEARCH,
            action: data => this.onToggleViewDocumentDetails(data, true)
          },
          {
            actionType: ICON_TYPE.EDIT,
            action: data => this.onToggleEditDocument(data)
          }
        ]
      }
    ])
  }

  onChangeValueCircular = (prop, value) => {
    this.setState({valueMapCircular: {...this.state.valueMapCircular, [prop]: value}})
  }

  onToggleViewDocumentDetails = (data = {}, isToOpen) => {
    if(isToOpen){
      const {getCircularDetails} = this.props
      getCircularDetails(data.id).then(()=> {
        this.setState({showViewCircularModal: !this.state.showViewCircularModal, valueMapCircular: {...data}})
      })
    }else{
      this.setState({showViewCircularModal: !this.state.showViewCircularModal, valueMapCircular: {}})
    }
  }

  onToggleEditDocument = (data = {}) => {
    this.setState({showEditCircularModal: !this.state.showEditCircularModal, valueMapCircular: {...data}})
  }

  onSetSelectOficiosCirculares = (listDataSelected) => {
    this.setState({listDataSelected})
  }

  onExportDocuments = () => {
    exportPDF()
  }

  onToggleDeleteDocuments = () => {
    this.setState({showDeleteModal: !this.state.showDeleteModal})
  }

  onToggleCreateCircular = () => {
    this.setState({valueMapCircular: {}})
    const {getTypeDocuments, getUserBossOffice} = this.props;
    getUserBossOffice().then(() => {
      getTypeDocuments().then(() => {
        const {dependencyName, apellido, nombre} = currentUser;
        const {bossOffice} = this.props
        this.onChangeValueCircular('fechaCreacion', getFormattedDate());
        this.onChangeValueCircular('areaResponsable', dependencyName);
        this.onChangeValueCircular('responsable', apellido.toUpperCase() + ", " + nombre.toUpperCase());
        this.onChangeValueCircular('firma', bossOffice.apellido.toUpperCase() + ", " + bossOffice.nombre.toUpperCase());
        this.onChangeValueCircular('dependenciaId', currentUser.dependencyId);
        this.onChangeValueCircular('userId', currentUser.id);
        this.setState({showCreateCircularModal: !this.state.showCreateCircularModal})
      })
    });

  }

  getFooterTableStructure = () => {
    return [
      {text: 'Crear', action: this.onToggleCreateCircular},
      {text: 'Eliminar', action: this.onToggleDeleteDocuments},
      {text: 'Imprimir', action: this.onExportDocuments}
    ]
  }

  onCreateCircular = () => {
    const {valueMapCircular} = this.state
    const {createCircularDocuments, listTypeDocuments, getCircularDocuments} = this.props
    createCircularDocuments(valueMapCircular, valueMapCircular.destinationsId, currentUser.dependencyId, currentUser.id).then(() => {
      this.setState({valueMapCircular: {}});
      const typeDocuments = map(listTypeDocuments, document => document.id);
      getCircularDocuments(typeDocuments, currentUser.id)
      this.onToggleCreateCircular()
    });
  };

  onEditCircular = () => {
    const {valueMapCircular} = this.state;
    const {editCircularDocuments, getCircularDocuments, listTypeDocuments} = this.props;
    editCircularDocuments(valueMapCircular.id,valueMapCircular.asunto,valueMapCircular.dependenciaId).then(()=>{
      const typeDocuments = map(listTypeDocuments, document => document.id);
      getCircularDocuments(typeDocuments, currentUser.id)
      this.onToggleEditDocument()
    })
  };

  onDeleteDocuments = () => {
    const {listDataSelected} = this.state;
    const {deleteDocuments, listTypeDocuments, getCircularDocuments} = this.props
    const documentsIds = map(listDataSelected, data => data.id);
    deleteDocuments(documentsIds).then(()=>{
      const typeDocuments = map(listTypeDocuments, document => document.id);
      getCircularDocuments(typeDocuments, currentUser.id)
      this.setState({showDeleteModal: !this.state.showDeleteModal})
    });
  };

  onGetMaxCorrelative = (typeDocumentId) => {
    const {getCorrelativeMax, listTypeDocuments} = this.props
    getCorrelativeMax(currentUser.dependencyId, typeDocumentId, currentUser.dependencySiglas).then(() => {
      const {documentNumber, documentSiglas, documentYear} = this.props
      const {nombreTipo} = find(listTypeDocuments, {'id': typeDocumentId});
      this.onChangeValueCircular('numDocumento', parseInt(documentNumber));
      this.onChangeValueCircular('siglas', documentSiglas);
      this.onChangeValueCircular('anio', documentYear);
      this.onChangeValueCircular("document", nombreTipo + " N° " + documentNumber + "-" + documentSiglas + "-" + documentYear)
    })
  };

  render() {

    const {formOfficeCircular, documentsIntern, detailsCircular} = this.props;
    const {
      showDeleteModal,
      listDataSelected,
      showCreateCircularModal,
      valueMapCircular,
      circularSelected,
      showEditCircularModal,
      showViewCircularModal
    } = this.state

    const titleEdit = showEditCircularModal? valueMapCircular.correlative : null


    const modalProps = [
      {
        showModal: showDeleteModal,
        title: 'Eliminar documento(s) circular(es)',
        message: (listDataSelected.length > 0) ? `¿Desea eliminar estos ${listDataSelected.length} documentos ?` : `Debe seleccionar al menos un documento`,
        yesFunction: (listDataSelected.length > 0) ? this.onDeleteDocuments : this.onToggleDeleteDocuments,
        yesText: (listDataSelected.length > 0) ? 'Sí' : 'Ok',
        noFunction: (listDataSelected.length > 0) ? this.onToggleDeleteDocuments : null
      },
      {
        showModal: showCreateCircularModal,
        title: 'Crear documento circular',
        yesFunction: this.onCreateCircular,
        yesText: 'Crear circular',
        noFunction: this.onToggleCreateCircular,
        noText: 'Cancelar',
        content: <FormRender formTemplate={formOfficeCircular}
                             onChange={this.onChangeValueCircular}
                             valueMap={valueMapCircular}
                             onChangeInputSelect={(typeDocumentId) => this.onGetMaxCorrelative(typeDocumentId)}
                             isFormCircular={true}/>,
        typeContent: TYPE_CONTENT_MODAL.TYPE_CIRCULAR
      },
      {
        showModal: showViewCircularModal,
        title: 'Circular Details',
        yesFunction: ()=>this.onToggleViewDocumentDetails(false),
        yesText: 'Aceptar',
        content: <CommonListGroup idSection='list-group'
                                  numDocument={valueMapCircular.correlative}
                                  listDestinations={detailsCircular}/>
      },
      {
        showModal: showEditCircularModal,
        title: 'Editar '+titleEdit,
        yesFunction: this.onEditCircular,
        yesText: 'Editar',
        noFunction: this.onToggleEditDocument,
        noText: 'Cancelar',
        content: <FormRender formTemplate={formEditOficioCircular}
                             onChange={this.onChangeValueCircular}
                             valueMap={valueMapCircular}/>
      }
    ];


    return (
      <Fragment>
        {
          modalProps && modalProps.length > 0 ?
            map(modalProps, (modal, index) => {
              return <CommonModal key={'modal' + index} {...modal}/>
            }) : null
        }
        {

            <CommonTableManage
              tableStructure={this.getTableStructure}
              title={'OFICIOS CIRCULARES - OGPL'}
              listData={documentsIntern}
              getFooterTableStructure={this.getFooterTableStructure}
              onSetSelected={this.onSetSelectOficiosCirculares}
            />
        }

      </Fragment>
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
    formOfficeCircular: formOficiosCirculares(listTypeDocuments),
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