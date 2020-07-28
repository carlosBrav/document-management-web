import React, {Component, Fragment} from "react";
import {getFormattedDate} from "../../utils/Constants";
import find from "lodash/find";
import parseInt from "lodash/parseInt";
import map from "lodash/map";
import FormRender from "../../forms/FormRender";
import CommonModal from "./CommonModal";
import CommonTableManage from "./CommonTableManage";
import {ICON_TYPE} from "./CommonIcon";
import {exportCircularDocuments} from "../utils/ExportPDF";
import formOficiosCirculares from "../../forms/templates/TemplateOficiosCirculares";
import {TYPE_CONTENT_MODAL} from "../../constants/Constants";
import CommonListGroup from "./CommonListGroup";
import {formEditOficioCircular} from "../../forms/templates/TemplateEditCircular";
import isEqual from "lodash/isEqual";
import {getStructureForCircular} from '../../components/utils/StructureTables';

class CommonCircularDocuments extends Component{

  state = {
    search: '',
    listDataSelected: [],
    listCircularDocuments: [],
    showDeleteModal: false,
    showCreateCircularModal: false,
    valueMapCircular: {},
    valueMapEditCircular: {},
    showViewCircularModal: false,
    circularSelected: {},
    showEditCircularModal: false
  }

  async componentDidMount() {
    const {getTypeDocuments, getCircularDocuments,currentUser} = this.props
    await getTypeDocuments()
    const {listTypeDocuments} = this.props
    const typeDocuments = map(listTypeDocuments, document => document.id);
    await getCircularDocuments(typeDocuments, currentUser.id)
    const {circularDocuments} = this.props
    this.setState({listCircularDocuments: circularDocuments})
  }

  componentDidUpdate(){
    if(!isEqual(this.state.listCircularDocuments.length, this.props.circularDocuments.length)){
      this.setState({listCircularDocuments: this.props.circularDocuments})
    }
  }

  onChangeValueCircular = (prop, value) => {
    this.setState({valueMapCircular: {...this.state.valueMapCircular, [prop]: value}})
  };

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
    exportCircularDocuments()
  }

  onToggleDeleteDocuments = () => {
    this.setState({showDeleteModal: !this.state.showDeleteModal})
  }

  onToggleCreateCircular = () => {
    this.setState({valueMapCircular: {}});
    const {getTypeDocuments, getUserBossOffice,currentUser} = this.props;
    getUserBossOffice().then(() => {
      getTypeDocuments().then(() => {
        const {dependencyName, apellido, nombre} = currentUser;
        const {bossOffice} = this.props
        this.onChangeValueCircular('fechaCreacion', getFormattedDate());
        this.onChangeValueCircular('areaResponsable', dependencyName);
        this.onChangeValueCircular('responsable', apellido.toUpperCase() + ", " + nombre.toUpperCase());
        this.onChangeValueCircular('firma', bossOffice.apellido.toUpperCase() + ", " + bossOffice.nombre.toUpperCase());
        this.onChangeValueCircular('origenId', currentUser.dependencyId);
        this.onChangeValueCircular('destinoId', "");
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
    const {createCircularDocuments, listTypeDocuments, getCircularDocuments,currentUser} = this.props
    createCircularDocuments(valueMapCircular, valueMapCircular.destinationsId, currentUser.dependencyId, currentUser.id).then(() => {
      this.setState({valueMapCircular: {}});
      const typeDocuments = map(listTypeDocuments, document => document.id);
      getCircularDocuments(typeDocuments, currentUser.id)
      this.onToggleCreateCircular()
    });
  };

  onEditCircular = () => {
    const {valueMapCircular} = this.state;
    const {editCircularDocuments, getCircularDocuments, listTypeDocuments,currentUser} = this.props;
    editCircularDocuments(valueMapCircular.id,valueMapCircular).then(()=>{
      const typeDocuments = map(listTypeDocuments, document => document.id);
      getCircularDocuments(typeDocuments, currentUser.id)
      this.onToggleEditDocument()
    })
  };

  onDeleteDocuments = () => {
    const {listDataSelected} = this.state;
    const {deleteDocuments, listTypeDocuments, getCircularDocuments,currentUser} = this.props
    const documentsIds = map(listDataSelected, data => data.id);
    deleteDocuments(documentsIds).then(()=>{
      const typeDocuments = map(listTypeDocuments, document => document.id);
      getCircularDocuments(typeDocuments, currentUser.id)
      this.setState({showDeleteModal: !this.state.showDeleteModal})
    });
  };

  onGetMaxCorrelative = (typeDocumentId) => {
    const {getCorrelativeMax, listTypeDocuments,currentUser} = this.props;
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

    const {circularDocuments, detailsCircular, listTypeDocuments} = this.props;
    const {
      showDeleteModal,
      listDataSelected,
      showCreateCircularModal,
      valueMapCircular,
      showEditCircularModal,
      showViewCircularModal,
      listCircularDocuments
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
        content: <FormRender formTemplate={formOficiosCirculares(listTypeDocuments, (typeDocumentId) => this.onGetMaxCorrelative(typeDocumentId))}
                             onChange={this.onChangeValueCircular}
                             valueMap={valueMapCircular}
                             isFormCircular={true}/>,
        typeContent: TYPE_CONTENT_MODAL.TYPE_CIRCULAR
      },
      {
        showModal: showViewCircularModal,
        title: 'Detalle de oficio circular',
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
            tableStructure={getStructureForCircular}
            title={'OFICIOS CIRCULARES - OGPL'}
            listData={listCircularDocuments}
            getFooterTableStructure={this.getFooterTableStructure}
            onSetSelected={this.onSetSelectOficiosCirculares}
          />
        }

      </Fragment>
    )
  }
}


export default CommonCircularDocuments