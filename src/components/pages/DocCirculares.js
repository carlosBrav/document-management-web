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
  getCircularDocuments
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
        columnHeader: 'Correlativo',
        rowProp: 'correlativo',
        classSearchRow: 'container-search-field normal-size',
        filterHeader: true
      },
      {
        columnHeader: 'Asunto',
        rowProp: 'asunto'
      },
      {
        columnHeader: 'Area Resp.',
        rowProp: 'area_resp',
        classSearchRow: 'container-search-field long-size',
        filterHeader: true
      },
      {
        columnHeader: 'Fecha Env.',
        rowProp: 'fech_envio'
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
            action: data => this.onToggleViewDocument(data)
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

  onToggleViewDocument = (data = {}) => {
    console.log('DOCUMENT SELECTED ', data)
    this.setState({showViewCircularModal: !this.state.showViewCircularModal, circularSelected: {...data}})
  }

  onToggleEditDocument = (data = {}) => {
    console.log('DOCUMENT EDIT ', data)
    this.setState({showEditCircularModal: !this.state.showEditCircularModal, valueMapEditCircular: {...data}})
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

  onDeleteDocuments = () => {
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
    const {valueMapCircular} = this.state
    console.log('circular editado ', valueMapCircular)
    this.onToggleEditDocument()
  }

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

    const {formOfficeCircular, documentsIntern} = this.props
    console.log("DOCUMENTS INTERN ", documentsIntern)
    const {
      showDeleteModal,
      listDataSelected,
      showCreateCircularModal,
      valueMapCircular,
      circularSelected,
      showEditCircularModal,
      showViewCircularModal
    } = this.state


    const modalProps = [
      {
        showModal: showDeleteModal,
        title: 'Eliminar documentos circulares',
        message: (listDataSelected.length > 0) ? `¿Desea imprimir estos ${listDataSelected.length} documentos ?` : `Debe seleccionar al menos un documento`,
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
        title: 'Circular 025466-OGPL-2019',
        yesFunction: this.onToggleViewDocument,
        yesText: 'Aceptar',
        content: <CommonListGroup idSection='list-group'
                                  numDocument={circularSelected.correlativo}
                                  listDestinations={circularSelected.destinations}/>
      },
      {
        showModal: showEditCircularModal,
        title: 'Editar circular 025466-OGPL-2019',
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
          documentsIntern && documentsIntern.length > 0 ?
            <CommonTableManage
              tableStructure={this.getTableStructure}
              title={'OFICIOS CIRCULARES - OGPL'}
              listData={documentsIntern}
              getFooterTableStructure={this.getFooterTableStructure}
              onSetSelected={this.onSetSelectOficiosCirculares}
            /> : null
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
  getCircularDocuments: (typeDocuments, userId) => dispatch(getCircularDocuments(typeDocuments, userId))
});

function mapStateToProps(state) {
  const getTypeDocumentsCircular = (listData) => {
    return map(filter(listData, data => data.flag2 === 'NPC'), data => ({
      ...data,
      value: data.nombreTipo
    }))
  };
  const listTypeDocuments = getTypeDocumentsCircular(state.typeDocuments.data)
  return {
    formOfficeCircular: formOficiosCirculares(listTypeDocuments),
    listTypeDocuments,
    documentNumber: state.correlative.documentNumber,
    documentSiglas: state.correlative.documentSiglas,
    documentYear: state.correlative.documentYear,
    bossOffice: state.user.userBossOffice,
    documentsIntern: state.documentIntern.data
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocCirculares)