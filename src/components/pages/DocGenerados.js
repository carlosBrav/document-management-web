import React, {Component, Fragment} from 'react';
import {ICON_TYPE} from "../commons/CommonIcon";
import CommonTableManage from "../commons/CommonTableManage";
import {exportPDF} from "../utils/ExportPDF";
import map from "lodash/map";
import CommonModal from '../commons/CommonModal';
import {formDocumGenerado, formEditDocument} from "../../forms/templates/TemplateDocumentGen";
import FormRender from "../../forms/FormRender";
import {getInternDocuments, getTypeDocuments, getCorrelativeMax, createInternDocument,deleteDocuments, editDocuments} from "../../actions/actions";
import isEmpty from "lodash/isEmpty";
import {getParseObj} from "../../utils/Utils";
import { connect } from 'react-redux';
import filter from "lodash/filter";
import parseInt from "lodash/parseInt";
import find from "lodash/find";
import {DOCUMENT_INTERN, getFormattedDate, getFormattedOnlyDate, getFormattedOnlyTime} from "../../utils/Constants";
import {getUsersOfCurrentOffice} from "../../constants/Constants";
import {getStructureForDocGenerados} from '../../components/utils/StructureTables';

class DocGenerados extends Component{

  state = {
    search: '',
    listDataToDeleteSelected: [],
    showDeleteModal: false,
    showCreateModal: false,
    showEditModal: false,
    valueMap: {},
    data: [],
    destinations: []
  };

  async componentDidMount(){
    const currentUser = await getParseObj('CURRENT_USER');
    const {getInternDocuments} = this.props
    getInternDocuments(currentUser.id).then(()=>{
      this.setState({data: this.props.internDocument})
    })
  }

  componentDidUpdate(){
    if(this.state.data.length !== this.props.internDocument.length){
      this.setState({data: this.props.internDocument})
    }
  }

  onChangeValueMap=(prop, value) => {
    this.setState({valueMap: {...this.state.valueMap, [prop]: value}});
  };

  toggleViewDocumentGenerado=(data)=>{
    console.log('DOCUMENT GENERADO VIEW ', data)
  };

  toggleEditDocumentGenerado=(data)=>{
    this.setState({showEditModal: !this.state.showEditModal, valueMap: data})
  };

  onToggleCloseEditDocument=()=>{
    this.setState({showEditModal: false})
  };

  onEditDocument=()=>{
    const {valueMap} = this.state;
    const {editDocuments,getInternDocuments} = this.props
    const currentUser = getParseObj('CURRENT_USER');
    this.setState({showEditModal: !this.state.showEditModal})
    editDocuments(valueMap.id, valueMap).then((response)=>{
      if(response.responseCode === 0){
        getInternDocuments(currentUser.id).then(()=>{
          this.setState({data: this.props.internDocument})
        })
      }
    })
  };

  onSetListDataToDelete=(listDataToDeleteSelected)=>{
    this.setState({listDataToDeleteSelected})
  };

  /*getTableStructure = (onToggleAddDocSelect) => {
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
        columnHeader: 'Fech. Reg.',
        rowProp: 'fechaCreacion'
      },
      {
        columnHeader: 'Asunto',
        rowProp: 'asunto',
      },
      {
        columnHeader: 'Origen',
        rowProp: 'origenName'
      },
      {
        columnHeader: 'Destino',
        rowProp: 'destinoName',
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
            action: data => this.toggleViewDocumentGenerado(data)
          },
          {
            actionType: ICON_TYPE.EDIT,
            action: data => this.toggleEditDocumentGenerado(data)
          }
        ]
      }
    ])
  }*/

  onToggleDeleteDocuments = () => {
    this.setState({showDeleteModal: !this.state.showDeleteModal})
  }

  onToggleCreateDocumentGen=()=>{
    this.setState({valueMap: {}});
    const currentUser = getParseObj('CURRENT_USER');
    const {getTypeDocuments}= this.props;
    getTypeDocuments().then(()=> {
      this.onChangeValueMap('currentDate', getFormattedDate());
      this.onChangeValueMap('fecha', getFormattedOnlyDate());
      this.onChangeValueMap('hora', getFormattedOnlyTime());
      this.onChangeValueMap('origen', currentUser.dependencyName);
      this.onChangeValueMap('origenId', currentUser.dependencyId);
      this.onChangeValueMap('userId', currentUser.id);
      this.setState({showCreateModal: !this.state.showCreateModal})
    })
  };

  onToggleCloseCreateDocument=()=>{
    this.setState({showCreateModal: !this.state.showCreateModal})
  }


  onDeleteDocuments = () => {
    const {listDataToDeleteSelected} = this.state;
    const {deleteDocuments,getInternDocuments} = this.props;
    const movementsIds = map(listDataToDeleteSelected, data => data.id);
    deleteDocuments(movementsIds).then(()=>{
      const currentUser = getParseObj('CURRENT_USER');
      getInternDocuments(currentUser.id).then(()=>{
        this.setState({data: this.props.internDocument})
        this.setState({showDeleteModal: !this.state.showDeleteModal})
      })
    });

  }

  onCreateDocument=()=>{
    const {createInternDocument} = this.props
    const internDocument = this.generateObjectInternDocument()
    createInternDocument(internDocument).then(()=>{
      const currentUser = getParseObj('CURRENT_USER');
      const {getInternDocuments} = this.props
      getInternDocuments(currentUser.id).then(()=>{
        this.setState({data: this.props.internDocument})
        this.onToggleCloseCreateDocument()
      })
    })
  }

  getFooterTableStructureGenerados=()=>{
    return [
      {text: 'Crear',  action: this.onToggleCreateDocumentGen},
      {text: 'Eliminar', action: this.onToggleDeleteDocuments}
    ]
  }

  onGetMaxCorrelative = (typeDocumentId) => {
    const {getCorrelativeMax, listTypeDocuments} = this.props;
    const currentUser = getParseObj('CURRENT_USER');
    getCorrelativeMax(currentUser.dependencyId, typeDocumentId, currentUser.dependencySiglas).then(() => {
      const {documentNumber, documentSiglas, documentYear} = this.props
      const {nombreTipo,id} = find(listTypeDocuments, {'id': typeDocumentId});
      this.onChangeValueMap('tipoDocuId', id)
      this.onChangeValueMap('numDocumento', parseInt(documentNumber));
      this.onChangeValueMap('siglas', documentSiglas);
      this.onChangeValueMap('anio', documentYear);
      this.onChangeValueMap("document", nombreTipo + " N° " + documentNumber + "-" + documentSiglas + "-" + documentYear)
    })
  };

  onChangeTypeDestination=(type)=>{
    const {dependencies} = this.props;
    const destinations = map(filter(dependencies, dependency => dependency.tipo === type), value =>({
      ...value,
      value: value.nombre
    }));
    this.setState({destinations})
  };

  generateObjectInternDocument=()=>{
    const {valueMap} = this.state;
    return({
      [DOCUMENT_INTERN.DOCUMENT_STATE]: 'GENERADO',
      [DOCUMENT_INTERN.TYPE_DOCUMENT_ID]: valueMap[DOCUMENT_INTERN.TYPE_DOCUMENT_ID],
      [DOCUMENT_INTERN.DOCUMENT_NUMBER]: valueMap[DOCUMENT_INTERN.DOCUMENT_NUMBER],
      [DOCUMENT_INTERN.SIGLAS]: valueMap[DOCUMENT_INTERN.SIGLAS],
      [DOCUMENT_INTERN.YEAR]: valueMap[DOCUMENT_INTERN.YEAR],
      [DOCUMENT_INTERN.OBSERVATION]: '',
      [DOCUMENT_INTERN.ASUNTO]: valueMap[DOCUMENT_INTERN.ASUNTO],
      [DOCUMENT_INTERN.ORIGIN_ID]: valueMap[DOCUMENT_INTERN.ORIGIN_ID],
      [DOCUMENT_INTERN.DESTINY_ID]: valueMap[DOCUMENT_INTERN.DESTINY_ID],
      [DOCUMENT_INTERN.USER_ID]: valueMap[DOCUMENT_INTERN.USER_ID],
      [DOCUMENT_INTERN.FIRM]: '',
      [DOCUMENT_INTERN.CURRENT_DATE]: valueMap[DOCUMENT_INTERN.CURRENT_DATE],
      [DOCUMENT_INTERN.RESPONSABLE_AREA]: '',
      [DOCUMENT_INTERN.REFERENCE_DOCUMENT]: valueMap[DOCUMENT_INTERN.REFERENCE_DOCUMENT],
    })
  };

  render(){

    const {listTypeDocuments,users} = this.props;
    const {showDeleteModal, showCreateModal, showEditModal,listDataToDeleteSelected,valueMap,data,destinations} = this.state

    const modalProps = [{
      showModal: showDeleteModal,
      title: 'Eliminar Documento Generado',
      message: (listDataToDeleteSelected.length>0)?`¿Desea eliminar el documento?`:`Debe seleccionar al menos un documento`,
      yesFunction: (listDataToDeleteSelected.length>0)?this.onDeleteDocuments:this.onToggleDeleteDocuments,
      yesText: (listDataToDeleteSelected.length>0)?'Sí':'Ok',
      noFunction: (listDataToDeleteSelected.length>0)?this.onToggleDeleteDocuments:null
    },
    {
      showModal: showCreateModal,
      title: 'Crear documento',
      yesFunction: this.onCreateDocument,
      yesText: 'Crear documento',
      noText: 'Cancelar',
      noFunction: this.onToggleCloseCreateDocument,
      content: <FormRender formTemplate={formDocumGenerado(listTypeDocuments,
                                                          (typeDocumentId) => this.onGetMaxCorrelative(typeDocumentId),
                                                          destinations,
                                                          (type) => this.onChangeTypeDestination(type))}
                           onChange={this.onChangeValueMap}
                           valueMap={valueMap}/>
    },
    {
      showModal: showEditModal,
      title: 'Editar Documento Interno',
      yesFunction: this.onEditDocument,
      yesText: 'Editar documento',
      noText: 'Cancelar',
      noFunction: this.onToggleCloseEditDocument,
      content: <FormRender formTemplate={formEditDocument(users)}
                           onChange={this.onChangeValueMap}
                           valueMap={valueMap}/>
    }];

    return(
      <Fragment>
        {
          modalProps && modalProps.length>0 ?
            map(modalProps, (modal, index)=>{
              return <CommonModal key={'modal'+index} {...modal}/>
            }) : null
        }
      <CommonTableManage
        tableStructure={getStructureForDocGenerados}
        listFunctions={[this.toggleViewDocumentGenerado,this.toggleEditDocumentGenerado]}
        title={'DOCUMENTOS GENERADOS INTERNOS'}
        listData={data}
        modalProps={modalProps}
        getFooterTableStructure={this.getFooterTableStructureGenerados}
        onSetSelected={this.onSetListDataToDelete}
      />
      </Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  getTypeDocuments: () => dispatch(getTypeDocuments()),
  getInternDocuments: (userId)=> dispatch(getInternDocuments(userId)),
  getCorrelativeMax: (officeId, typeDocumentId, siglas) => dispatch(getCorrelativeMax(officeId, typeDocumentId, siglas)),
  deleteDocuments: (documentsIds) => dispatch(deleteDocuments(documentsIds)),
  createInternDocument: (internDocument) => dispatch(createInternDocument(internDocument)),
  editDocuments: (id, userId, asunto) => dispatch(editDocuments(id, userId, asunto))
});

function mapStateToProps(state){
  const currentUser = getParseObj('CURRENT_USER');

  const listInternDocuments = (listData) => {
    return map(listData, data => ({
      ...data,
      document: (!isEmpty(data.documentName)) ? `${data.documentName} Nº ${data.numDocumento}-${data.siglas}-${data.anio}` : 'SIN DOCUMENTO',
      responsable: `${data.userName}, ${data.userLastName}`,
      check: false
    }))
  };

  const getTypeDocuments = (listData) => {
    return map(filter(listData, data => data.flag2 !== 'NPC'), data => ({
      ...data,
      value: data.nombreTipo
    }))
  };

  return {
    listTypeDocuments: getTypeDocuments(state.typeDocuments.data),
    internDocument: listInternDocuments(state.documentIntern.data),
    documentNumber: state.correlative.documentNumber,
    documentSiglas: state.correlative.documentSiglas,
    documentYear: state.correlative.documentYear,
    dependencies: state.initialData.dependencies,
    users: getUsersOfCurrentOffice(state.initialData.users,currentUser.dependencyId)
  }
}
export default connect (mapStateToProps, mapDispatchToProps)(DocGenerados)