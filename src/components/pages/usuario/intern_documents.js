import React, {Component, Fragment} from "react";
import {
  getCorrelativeMax,
  getInternDocuments,
  getTypeDocuments,
  createInternDocument,
  deleteDocuments,
  editCircularDocuments, getCircularDetails, getUserBossOffice,
  getCircularDocuments, createCircularDocuments
} from "../../../actions/actions";
import { connect } from 'react-redux';
import {getParseObj} from "../../../utils/Utils";
import CommonTableManage from "../../commons/CommonTableManage";
import map from "lodash/map";
import FormRender from "../../../forms/FormRender";
import {formCreateInternDocument} from "../../../forms/templates/TemplateInternDocument";
import filter from "lodash/filter";
import CommonModal from "../../commons/CommonModal";
import find from "lodash/find";
import parseInt from "lodash/parseInt";
import {getFormattedDate, getFormattedOnlyDate, getFormattedOnlyTime} from "../../../utils/Constants";
import CommonCircularDocuments from "../../commons/CommonCircularDocuments";
import CommonTab from "../../commons/CommonTab";
import {getUsersOfCurrentOffice} from "../../../constants/Constants";

class InternDocuments extends Component{

  state = {
    listDataSelected: [],
    valueMap : {},
    currentUser: {},
    destinations: [],
    isShowModalCreate: false,
    isShowModalDelete: false
  };

  async componentDidMount(){
    this.onGetRegularDocuments()
  }

  onGetRegularDocuments=()=>{
    const currentUser = getParseObj('CURRENT_USER');
    this.setState({currentUser});
    const {getInternDocuments} = this.props
    getInternDocuments(currentUser.id)
  }

  onSetSelectDocuments=(listDataSelected)=>{
    this.setState({listDataSelected})
  };

  onChangeValueMap=(prop, value) => {
    this.setState({valueMap: {...this.state.valueMap, [prop]: value}});
  };

  toggleOpenModalCreate=()=>{
    const {getTypeDocuments} = this.props;
    const currentUser = getParseObj('CURRENT_USER');
    getTypeDocuments().then(()=>{
      this.setState({isShowModalCreate: !this.state.isShowModalCreate,destinations:[]})
      this.onChangeValueMap('currentDate',getFormattedDate());
      this.onChangeValueMap('fechaCreacion',getFormattedOnlyDate());
      this.onChangeValueMap('horaCreacion',getFormattedOnlyTime());
      this.onChangeValueMap('origenName',currentUser.dependencyName);
      this.onChangeValueMap('userAssignedId',currentUser.apellido+", "+currentUser.nombre);
      this.onChangeValueMap('responsableArea','');
    });
  };

  onGetMaxCorrelative = (typeDocumentId) => {
    const {getCorrelativeMax, typeDocuments} = this.props;
    const {currentUser}=this.state;
    getCorrelativeMax(currentUser.dependencyId, typeDocumentId, currentUser.dependencySiglas).then(() => {
      const {documentNumber, documentSiglas, documentYear} = this.props;
      const {nombreTipo,id} = find(typeDocuments, {'id': typeDocumentId});
      this.onChangeValueMap('tipoDocuId', id);
      this.onChangeValueMap('numDocumento', parseInt(documentNumber));
      this.onChangeValueMap('siglas', documentSiglas);
      this.onChangeValueMap('anio', documentYear);
      this.onChangeValueMap('origenId',currentUser.dependencyId);
      this.onChangeValueMap('userId',currentUser.id);
      this.onChangeValueMap('firma',"");
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

  onToggleDeleteDocuments=()=>{
    this.setState({isShowModalDelete: !this.state.isShowModalDelete})
  };

  onDeleteInternDocuments=()=>{
    const currentUser = getParseObj('CURRENT_USER');
    const {listDataSelected} = this.state;
    const {deleteDocuments,getInternDocuments} = this.props;
    const documentsIds = map(listDataSelected, data => data.id);
    deleteDocuments(documentsIds).then(()=>{
      getInternDocuments(currentUser.id);
      this.setState({isShowModalDelete: !this.state.isShowModalDelete})
    })
  };

  toggleCloseModalCreate=()=>{
    this.setState({isShowModalCreate: !this.state.isShowModalCreate,destinations:[],valueMap:{}})
  }

  onSaveInternDocument=()=>{
    const {valueMap} = this.state;
    const currentUser = getParseObj('CURRENT_USER');
    const {createInternDocument,getInternDocuments} = this.props;
    createInternDocument(valueMap).then(()=>{
      this.toggleCloseModalCreate();
      getInternDocuments(currentUser.id)
    })
  };

  onGetCircularDocuments=()=>{
    const {getTypeDocuments, getCircularDocuments} = this.props
    const currentUser = getParseObj('CURRENT_USER');
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
        rowProp: 'document'
      },
      {
        columnHeader: 'Num. Tram.',
        rowProp: 'numTram',
        classSearchRow: 'container-search-field normal-size',
        filterHeader: true
      },
      {
        columnHeader: 'Asunto',
        rowProp: 'asunto',
        classSearchRow: 'container-search-field long-size',
        filterHeader: true
      },
      {
        columnHeader: 'Fech. Reg.',
        rowProp: 'fechaCreacion',
        classSearchRow: 'container-search-field medium-size',
        filterHeader: true
      },
      {
        columnHeader: 'Destino',
        rowProp: 'destinoName'
      },
      {
        columnHeader: 'Responsable',
        rowProp: 'responsable'
      }
    ])
  }

  getFooterTableStructure = () => {
    return([
      {text: 'Crear', action: this.toggleOpenModalCreate},
      {text: 'Eliminar', action: this.onToggleDeleteDocuments}
    ])
  };

  render(){

    const {isShowModalCreate,valueMap,destinations,isShowModalDelete,listDataSelected} = this.state;
    const {documents,typeDocuments,users} = this.props;
    const modalProps = [
      {
        showModal: isShowModalCreate,
        title: 'Crear Documento Interno',
        yesFunction: this.onSaveInternDocument,
        yesText: 'Aceptar',
        noText: 'Cancelar',
        noFunction: this.toggleCloseModalCreate,
        content: <FormRender formTemplate={formCreateInternDocument(typeDocuments,
                                                                    users,
                                                                    destinations,
                                                                    (typeDocumentId)=>this.onGetMaxCorrelative(typeDocumentId),
                                                                    (type)=>this.onChangeTypeDestination(type))}
                             onChange={this.onChangeValueMap}
                             valueMap={valueMap}/>
      },
      {
        showModal: isShowModalDelete,
        title: 'Eliminar Documento(s) Interno(s)',
        message: (listDataSelected.length > 0) ? `¿Desea eliminar estos ${listDataSelected.length} documentos ?` : `Debe seleccionar al menos un documento`,
        yesFunction: (listDataSelected.length > 0) ? this.onDeleteInternDocuments : this.onToggleDeleteDocuments,
        yesText: (listDataSelected.length > 0) ? 'Sí' : 'Ok',
        noFunction: (listDataSelected.length > 0) ? this.onToggleDeleteDocuments : null
      }
    ];

    const tableRegularDocuments =()=>{
      return (
        <CommonTableManage
          tableStructure={this.getTableStructure}
          title={'DOCUMENTOS INTERNOS'}
          listData={documents}
          getFooterTableStructure={this.getFooterTableStructure}
          onSetSelected={this.onSetSelectDocuments}
        />
      )
    };

    const tableCircularDocuments =()=>{
      const currentUser = getParseObj('CURRENT_USER');

      return (
        <CommonCircularDocuments
          currentUser={currentUser}
          {...this.props}
        />
      )
    };

    const tabs =
      [ {title: 'Doc. Internos', id: 'docuInt', content: tableRegularDocuments, onClick: this.onGetRegularDocuments},
        {title: 'Doc. Circulares', id: 'docCirculares', content: tableCircularDocuments, onClick: this.onGetCircularDocuments}
      ];

    return(
      <Fragment>
        {
          modalProps && modalProps.length > 0 ?
            map(modalProps, (modal, index) => {
              return <CommonModal key={'modal' + index} {...modal}/>
            }) : null
        }
        <CommonTab tabList={tabs}/>
      </Fragment>)
  }
}

function mapStateToProps(state){
  const currentUser = getParseObj('CURRENT_USER');

  const getTypeDocumentsCircular = (listData) => {
    return map(filter(listData, data => data.flag2 === 'NPC'), data => ({
      ...data,
      value: data.nombreTipo
    }))
  };

  const getTypeDocuments = (listData) => {
    return map(filter(listData, data => data.flag2 !== 'NPC'), data => ({
      ...data,
      value: data.nombreTipo
    }))
  };
  const listDocuments = (listData) => {
    return map(listData, (data) => ({
      ...data,
      document: `${data.documentName} ${data.numDocumento}-${data.siglas}-${data.anio}`,
      correlative: `${data.documentName} ${data.numDocumento}-${data.siglas}-${data.anio}`,
      responsable: `${data.userLastName}, ${data.userName}`,
      check: false
    }))
  };

  const getCircularDetails = (listData) => {
    return map(listData, data => ({value : data.destinoNombre}))
  };
  return {
    listTypeDocuments: getTypeDocumentsCircular(state.typeDocuments.data),
    circularDocuments: listDocuments(state.documentIntern.circularData),
    typeDocuments: getTypeDocuments(state.typeDocuments.data),
    documents: listDocuments(state.documentIntern.data),
    dependencies: state.initialData.dependencies,
    users: getUsersOfCurrentOffice(state.initialData.users,currentUser.dependencyId),
    documentNumber: state.correlative.documentNumber,
    documentSiglas: state.correlative.documentSiglas,
    documentYear: state.correlative.documentYear,
    bossOffice: state.user.userBossOffice,
    detailsCircular: getCircularDetails(state.documentIntern.circularDetails)
  }
}
const mapDispatchToProps = (dispatch) => ({
  getTypeDocuments: () => dispatch(getTypeDocuments()),
  getCorrelativeMax: (officeId, typeDocumentId, siglas) => dispatch(getCorrelativeMax(officeId, typeDocumentId, siglas)),
  getInternDocuments: (userId) => dispatch(getInternDocuments(userId)),
  createInternDocument: (internDocument) => dispatch(createInternDocument(internDocument)),
  deleteDocuments: (documentsIds) => dispatch(deleteDocuments(documentsIds)),
  editCircularDocuments: (id, asunto, dependencyId) => dispatch(editCircularDocuments(id, asunto, dependencyId)),
  getCircularDetails: (documentId) => dispatch(getCircularDetails(documentId)),
  getUserBossOffice: () => dispatch(getUserBossOffice()),
  getCircularDocuments: (typeDocuments, userId) => dispatch(getCircularDocuments(typeDocuments, userId)),
  createCircularDocuments: (documentIntern, destinations, officeId, userId) =>
    dispatch(createCircularDocuments(documentIntern, destinations, officeId, userId)),
});
export default connect (mapStateToProps, mapDispatchToProps)(InternDocuments)