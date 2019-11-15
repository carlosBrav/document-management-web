import React, {Component, Fragment} from "react";
import {getCorrelativeMax, getInternDocuments, getTypeDocuments} from "../../../actions/actions";
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
    });
  };

  toggleCloseModalCreate=()=>{
    this.setState({isShowModalCreate: !this.state.isShowModalCreate,destinations:[],valueMap:{}})
  }

  onSaveInternDocument=()=>{

  };

  onGetMaxCorrelative = (typeDocumentId) => {
    const {getCorrelativeMax, typeDocuments} = this.props;
    const {currentUser}=this.state
    getCorrelativeMax(currentUser.dependencyId, typeDocumentId, currentUser.dependencySiglas).then(() => {
      const {documentNumber, documentSiglas, documentYear} = this.props
      const {nombreTipo,id} = find(typeDocuments, {'id': typeDocumentId});
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

  onToggleDeleteDocuments=()=>{
    this.setState({isShowModalDelete: !this.state.isShowModalDelete})
  };

  onDeleteInternDocuments=()=>{

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
      {text: 'Crear Documento', action: this.toggleOpenModalCreate},
      {text: 'Eliminar Documento', action: this.onToggleDeleteDocuments}
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

    return(
      <Fragment>
        {
          modalProps && modalProps.length > 0 ?
            map(modalProps, (modal, index) => {
              return <CommonModal key={'modal' + index} {...modal}/>
            }) : null
        }
        <CommonTableManage
          tableStructure={this.getTableStructure}
          title={'DOCUMENTOS INTERNOS'}
          listData={documents}
          getFooterTableStructure={this.getFooterTableStructure}
          onSetSelected={this.onSetSelectDocuments}
        />
      </Fragment>)
  }
}

function mapStateToProps(state){
  const currentUser = getParseObj('CURRENT_USER');

  const getUsersOfCurrentOffice=(listData)=>{
    return map(filter(listData, data => data.dependenciaId === currentUser.dependencyId), user =>({
      ...user,
      value: `${user.apellido}, ${user.nombre}`
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
      responsable: `${data.userLastName}, ${data.userName}`,
      check: false
    }))
  };
  return {
    typeDocuments: getTypeDocuments(state.typeDocuments.data),
    documents: listDocuments(state.documentIntern.data),
    dependencies: state.initialData.dependencies,
    users: getUsersOfCurrentOffice(state.initialData.users),
    documentNumber: state.correlative.documentNumber,
    documentSiglas: state.correlative.documentSiglas,
    documentYear: state.correlative.documentYear,
  }
}
const mapDispatchToProps = (dispatch) => ({
  getTypeDocuments: () => dispatch(getTypeDocuments()),
  getCorrelativeMax: (officeId, typeDocumentId, siglas) => dispatch(getCorrelativeMax(officeId, typeDocumentId, siglas)),
  getInternDocuments: (userId) => dispatch(getInternDocuments(userId))
});
export default connect (mapStateToProps, mapDispatchToProps)(InternDocuments)