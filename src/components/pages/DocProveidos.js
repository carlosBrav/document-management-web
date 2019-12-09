import React, {Component, Fragment} from 'react';
import CommonTableManage from "../commons/CommonTableManage";
import CommonTab from "../commons/CommonTab";
import {ICON_TYPE} from "../commons/CommonIcon";
import {exportPDF} from "../utils/ExportPDF";
import FormRender from "../../forms/FormRender";
import {formProveidosInternos, formProveidosExternos} from "../../forms/templates/TemplateCreateProveido";
import {formEditProveido} from "../../forms/templates/TemplateEditProveido";
import map from "lodash/map";
import CommonModal from '../commons/CommonModal';
import {
  createInternDocument,
  deleteDocuments,
  getCorrelativeMax,
  getAdminInternDocuments,
  getTypeDocuments,
  getInternDocumentsByTypeDocument
} from "../../actions/actions";
import filter from "lodash/filter";
import {getParseObj} from "../../utils/Utils";
import { connect } from 'react-redux';
import find from "lodash/find";
import parseInt from "lodash/parseInt";
import {DOCUMENT_INTERN, getFormattedDate, TYPE_DOCUMENT} from "../../utils/Constants";

class DocProveidos extends Component{

  state = {
    search: '',
    listDataSelected: [],
    showDeleteModal: false,
    showInternModal: false,
    showExternalModal: false,
    showEditModal: false,
    valueMap: {},
    data:[],
    dataProveido: [],
    destinationsOrigin: [],
    destinationsFinal: [],
  };

  async componentDidMount(){
    const currentUser = await getParseObj('CURRENT_USER');
    const {getAdminInternDocuments} = this.props
    getAdminInternDocuments(currentUser.dependencyId).then(()=>{
      this.setState({data: this.props.internDocuments})
    })
  }

  componentDidUpdate(){
    if(this.state.data.length !== this.props.internDocuments.length){
      this.setState({data: this.props.internDocuments})
    }
  }

  getTableStructureInternDocuments = (onToggleAddDocSelect) => {
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
        columnHeader: 'Asunto',
        rowProp: 'asunto',
      },
      {
        columnHeader: 'Origen',
        rowProp: 'originName',
        classSearchRow: 'container-search-field long-size',
        filterHeader: true
      },
      {
        columnHeader: 'Fecha Reg.',
        rowProp: 'fechaCreacion'
      }
    ])
  }

  getTableStructureProveido = (onToggleAddDocSelect) => {
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
        columnHeader: 'Num. Doc.',
        rowProp: 'referenceDocument'
      },
      {
        columnHeader: 'Fech. Reg.',
        rowProp: 'fechaCreacion'
      },
      {
        columnHeader: 'Asunto',
        rowProp: 'asunto'
      },
      {
        columnHeader: 'Origen',
        rowProp: 'origenName',
        classSearchRow: 'container-search-field long-size',
        filterHeader: true
      },
      {
        columnHeader: 'Destino',
        rowProp: 'destinoName',
      },
      {
        columnHeader: 'Usuario',
        rowProp: 'user'
      },
      {
        columnHeader: '',
        rowStyle: 'container-icons',
        actions: [
          {
            actionType: ICON_TYPE.EDIT,
            action: data => this.onToggleEditProveido(data)
          }
        ]
      }
    ])
  }

  onSetListDataToDeleteSelected=(listDataSelected)=>{
    this.setState({listDataSelected})
  }

  onSetListDataProvIntSelected=(listDataSelected)=>{
    this.setState({listDataSelected})
  }

  onChangeValueMap=(prop, value) => {
    this.setState({valueMap: {...this.state.valueMap, [prop]: value}});
  };

  onExportDocuments=()=>{
    exportPDF()
  }

  onToggleDeleteDocuments = () => {
    this.setState({showDeleteModal: !this.state.showDeleteModal})
  }

  onDeleteDocuments = () => {
    this.setState({showDeleteModal: !this.state.showDeleteModal})
  }

  onCreateProveido= async (isIntern)=>{
    const currentUser = await getParseObj('CURRENT_USER');
    const {createInternDocument,getAdminInternDocuments} = this.props
    const internDocument = this.generateObjectInternDocument()
    createInternDocument(internDocument).then(()=>{
      getAdminInternDocuments(currentUser.dependencyId).then(()=>{
        this.setState({data: this.props.internDocuments})
        this.setState(isIntern ? {showInternModal: !this.state.showInternModal}: {showExternalModal: !this.state.showExternalModal});
      })
    });
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

  onToggleCreateProveidoInterno = () => {
    const {listDataSelected} = this.state;
    const documentSelected = {...listDataSelected[0]};
    const {getCorrelativeMax, getTypeDocuments} = this.props;
    const currentUser = getParseObj('CURRENT_USER');
    getTypeDocuments().then(()=>{
      getCorrelativeMax(currentUser.dependencyId, TYPE_DOCUMENT.proveidos, currentUser.dependencySiglas).then(() => {
        const {documentNumber, documentSiglas, documentYear,listTypeDocuments} = this.props
        const {nombreTipo,id} = find(listTypeDocuments, {'id': TYPE_DOCUMENT.proveidos});
        this.onChangeValueMap(DOCUMENT_INTERN.TYPE_DOCUMENT_ID, id)
        this.onChangeValueMap(DOCUMENT_INTERN.DOCUMENT_NUMBER, parseInt(documentNumber));
        this.onChangeValueMap(DOCUMENT_INTERN.SIGLAS, documentSiglas);
        this.onChangeValueMap(DOCUMENT_INTERN.YEAR, documentYear);
        this.onChangeValueMap("proveido", nombreTipo + " N° " + documentNumber + "-" + documentSiglas + "-" + documentYear)
        this.onChangeValueMap(DOCUMENT_INTERN.REFERENCE_DOCUMENT, documentSelected['document']);
        this.onChangeValueMap(DOCUMENT_INTERN.ASUNTO, documentSelected[DOCUMENT_INTERN.ASUNTO]);
        this.onChangeValueMap('originName', documentSelected['originName']);
        this.onChangeValueMap(DOCUMENT_INTERN.ORIGIN_ID, documentSelected[DOCUMENT_INTERN.ORIGIN_ID]);
        this.onChangeValueMap('destinyName', documentSelected['destinyName']);
        this.onChangeValueMap(DOCUMENT_INTERN.DESTINY_ID, documentSelected[DOCUMENT_INTERN.DESTINY_ID]);
        this.onChangeValueMap(DOCUMENT_INTERN.USER_ID,documentSelected[DOCUMENT_INTERN.USER_ID])
        this.onChangeValueMap('currentDate',getFormattedDate());
        this.setState({showInternModal: !this.state.showInternModal});
      })
    })
  };

  onToggleEditProveido=(data={})=>{
    console.log('DOCUMENT EDIT PROVEIDO ', data)
    this.setState({showEditModal: !this.state.showEditModal, valueMap: data})
  };

  onEditProveido=()=>{
    const {valueMap} = this.state
    console.log('VALUE MAP EDIT PROVEIDO ', valueMap)
    this.onToggleEditProveido()
  };

  onToggleCloseProveidoExterno=()=>{
    this.setState({valueMap: {}});
    this.setState({showExternalModal: !this.state.showExternalModal})
  }

  onToggleCreateProveidoExterno=()=>{
    const {getCorrelativeMax, getTypeDocuments} = this.props;
    const currentUser = getParseObj('CURRENT_USER');
    getTypeDocuments().then(()=>{
      getCorrelativeMax(currentUser.dependencyId, TYPE_DOCUMENT.proveidos, currentUser.dependencySiglas).then(() => {
        const {documentNumber, documentSiglas, documentYear,listTypeDocuments} = this.props;
        const {nombreTipo,id} = find(listTypeDocuments, {'id': TYPE_DOCUMENT.proveidos});
        this.onChangeValueMap(DOCUMENT_INTERN.TYPE_DOCUMENT_ID, TYPE_DOCUMENT.proveidos)
        this.onChangeValueMap([DOCUMENT_INTERN.CURRENT_DATE], getFormattedDate());
        this.onChangeValueMap([DOCUMENT_INTERN.USER_ID],currentUser.id);
        this.onChangeValueMap(DOCUMENT_INTERN.DOCUMENT_NUMBER, parseInt(documentNumber));
        this.onChangeValueMap(DOCUMENT_INTERN.SIGLAS, documentSiglas);
        this.onChangeValueMap(DOCUMENT_INTERN.YEAR, documentYear);
        this.onChangeValueMap('user', currentUser.apellido+", "+currentUser.nombre);
        this.onChangeValueMap("proveido", nombreTipo + " N° " + documentNumber + "-" + documentSiglas + "-" + documentYear)
        this.setState({showExternalModal: !this.state.showExternalModal})
      })
    });
  };

  getFooterTableInternDocument=()=>{
    return [
      {text: 'Proveidos Int.',  action: this.onToggleCreateProveidoInterno},
      {text: 'Proveidos Ext.', action: this.onToggleCreateProveidoExterno}
    ]
  };

  getFooterTableProveido=()=>{
    return [
      {text: 'Eliminar',  action: this.onToggleDeleteDocuments},
      {text: 'Imprimir', action: this.onExportDocuments}
    ]
  };

  onGetInternDocument=async ()=>{
    const currentUser = await getParseObj('CURRENT_USER');
    const {getAdminInternDocuments} = this.props
    getAdminInternDocuments(currentUser.dependencyId).then(()=>{
      this.setState({data: this.props.internDocuments})
    })
  };

  onGetProveidos= async ()=>{
    const {getInternDocumentsByTypeDocument} = this.props
    getInternDocumentsByTypeDocument(TYPE_DOCUMENT.proveidos).then(()=>{
      this.setState({dataProveido: this.props.proveidos})
    })
  };

  onChangeTypeDestinations=(type, isOrigin)=>{
    const {dependencies} = this.props;
    const newDestinations = map(filter(dependencies, dependency => dependency.tipo === type), value =>({
      ...value,
      value: value.nombre
    }));
    this.setState(isOrigin ? {destinationsOrigin:newDestinations} :{destinationsFinal:newDestinations})
  };

  onGetDocumentName=(typeDocumentId)=>{
    const {listTypeDocuments} = this.props;
    const document = find(listTypeDocuments, doc => doc.id===typeDocumentId);
    this.onChangeValueMap([DOCUMENT_INTERN.REFERENCE_DOCUMENT], `${document.nombreTipo} Nº `);
  }


  render(){

    const {showDeleteModal,
      listDataSelected,
      showInternModal,
      showExternalModal,
      showEditModal,
      valueMap,
      data,
      dataProveido,
      destinationsOrigin,
      destinationsFinal} = this.state;

    const {listTypeDocuments} = this.props;
    const modalProps = [
      {
        showModal: showDeleteModal,
        title: 'Eliminar Documentos Proveidos',
        message: (listDataSelected.length>0)?`¿Desea imprimir estos ${listDataSelected.length} documentos ?`:`Debe seleccionar al menos un documento`,
        yesFunction: (listDataSelected.length>0)?this.onDeleteDocuments:this.onToggleDeleteDocuments,
        yesText: (listDataSelected.length>0)?'Sí':'Ok',
        noFunction: (listDataSelected.length>0)?this.onToggleDeleteDocuments:null
      },
      {
        showModal: showInternModal,
        title: (listDataSelected.length === 1)?valueMap.proveido:'Creación de Proveidos',
        message: (listDataSelected.length === 1)?null:'Debe seleccionar 1 documento',
        yesFunction: (listDataSelected.length === 1)?()=>this.onCreateProveido(true):this.onToggleCreateProveidoInterno,
        yesText: (listDataSelected.length === 1)?'Crear proveido':'Ok',
        noFunction: (listDataSelected.length === 1)?this.onToggleCreateProveidoInterno:null,
        noText: (listDataSelected.length === 1)?'Cancelar':null,
        content: <FormRender formTemplate={formProveidosInternos}
                             onChange={this.onChangeValueMap}
                             valueMap={valueMap}/>
      },
      {
        showModal: showExternalModal,
        title: valueMap.proveido,
        yesFunction: ()=>this.onCreateProveido(false),
        yesText: 'Crear proveido',
        noFunction: this.onToggleCloseProveidoExterno,
        noText: 'Cancelar',
        content:
          <FormRender
            formTemplate={formProveidosExternos(
              listTypeDocuments,
              (typeDocumentId)=>this.onGetDocumentName(typeDocumentId),
              destinationsOrigin,
              (type)=>this.onChangeTypeDestinations(type,true),
              destinationsFinal,
              (type)=>this.onChangeTypeDestinations(type,false)
              )}
            onChange={this.onChangeValueMap}
            valueMap={valueMap}/>
      },
      {
        showModal: showEditModal,
        title: 'Proveido N° 00488-OGPL-2019',
        yesFunction: this.onEditProveido,
        yesText: 'Editar proveido',
        noFunction: this.onToggleEditProveido,
        noText: 'Cancelar',
        content: <FormRender formTemplate={formEditProveido}
                             onChange={this.onChangeValueMap}
                             valueMap={valueMap}/>
      }]

    const tableDocumentInt =()=>{
      return(
        <CommonTableManage
          tableStructure={this.getTableStructureInternDocuments}
          title={'DOCUMENTOS INTERNOS'}
          listData={data}
          getFooterTableStructure={this.getFooterTableInternDocument}
          onSetSelected={this.onSetListDataProvIntSelected}
        />
      )
    }

    const tableProveidos =()=>{
      return(
        <CommonTableManage
          tableStructure={this.getTableStructureProveido}
          title={'PROVEIDOS'}
          listData={dataProveido}
          modalProps={modalProps}
          getFooterTableStructure={this.getFooterTableProveido}
          onSetSelected={this.onSetListDataToDeleteSelected}
        />
      )
    }

    const tabs =
      [ {title: 'Doc. Internos', id: 'docuIntProv', action: tableDocumentInt,onClick: this.onGetInternDocument},
        {title: 'Proveidos', id: 'proveidos', action: tableProveidos,onClick: this.onGetProveidos}
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
  getTypeDocuments: () => dispatch(getTypeDocuments()),
  getAdminInternDocuments: (officeId)=> dispatch(getAdminInternDocuments(officeId)),
  getCorrelativeMax: (officeId, typeDocumentId, siglas) => dispatch(getCorrelativeMax(officeId, typeDocumentId, siglas)),
  deleteDocuments: (documentsIds) => dispatch(deleteDocuments(documentsIds)),
  getInternDocumentsByTypeDocument: (typeDocumentId) => dispatch(getInternDocumentsByTypeDocument(typeDocumentId)),
  createInternDocument: (internDocument) => dispatch(createInternDocument(internDocument))
});

function mapStateToProps(state){
  const listInternDocuments = (listData) => {
    return map(listData, data => ({
      ...data,
      document: `${data.documentName} Nº ${data.numDocumento}-${data.siglas}-${data.anio}`,
      user: `${data.userName}, ${data.userLastName}`,
      check: false
    }))
  };

  const getTypeDocuments = (listData) => {//CAMBIAR EL FLAG2 DE LOS TIPOS DE DOCUMENTOS
    return map(filter(listData, data => data.flag2 !== 'NPC'), data => ({
      ...data,
      value: data.nombreTipo
    }))
  };

  return {
    listTypeDocuments: getTypeDocuments(state.typeDocuments.data),
    internDocuments: listInternDocuments(state.documentIntern.dataAdmin),
    proveidos: listInternDocuments(state.documentIntern.proveidos),
    documentNumber: state.correlative.documentNumber,
    documentSiglas: state.correlative.documentSiglas,
    documentYear: state.correlative.documentYear,
    dependencies: state.initialData.dependencies,
  }
}

export default connect (mapStateToProps, mapDispatchToProps)(DocProveidos)