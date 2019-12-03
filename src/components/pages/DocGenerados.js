import React, {Component, Fragment} from 'react';
import {ICON_TYPE} from "../commons/CommonIcon";
import CommonTableManage from "../commons/CommonTableManage";
import {lista_generados} from "../../fakedata/ListDataDocuments";
import {exportPDF} from "../utils/ExportPDF";
import map from "lodash/map";
import CommonModal from '../commons/CommonModal';
import {formDocumGenerado} from "../../forms/templates/TemplateDocumentGen";
import FormRender from "../../forms/FormRender";
import {getInternDocuments} from "../../actions/actions";
import isEmpty from "lodash/isEmpty";
import {getParseObj} from "../../utils/Utils";
import { connect } from 'react-redux';

class DocGenerados extends Component{

  state = {
    search: '',
    listDataToDeleteSelected: [],
    showDeleteModal: false,
    showCreateModal: false,
    valueMapCreateDocument: {},
    data: []
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

  toggleViewDocumentGenerado=(data)=>{
    console.log('DOCUMENT GENERADO VIEW ', data)
  }

  toggleEditDocumentGenerado=(data)=>{
    console.log('DOCUMENT GENERADO EDIT ', data)
  }

  onSetListDataToDelete=(listDataToDeleteSelected)=>{
    this.setState({listDataToDeleteSelected})
  }

  onChangeValueCreateDocument=(prop, value)=>{
    this.setState({valueMapCreateDocument: {...this.state.valueMapCreateDocument, [prop]: value}})
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
  }

  onToggleDeleteDocuments = () => {
    this.setState({showDeleteModal: !this.state.showDeleteModal})
  }

  onToggleCreateDocumentGen=()=>{
    this.setState({showCreateModal: !this.state.showCreateModal})
  }

  onDeleteDocuments = () => {
    this.setState({showDeleteModal: !this.state.showDeleteModal})
  }

  onCreateDocument=()=>{
    const {valueMapCreateDocument} = this.state
    console.log('VALUE MAP CREATE ', valueMapCreateDocument)
    this.onToggleCreateDocumentGen()
  }

  getFooterTableStructureGenerados=()=>{
    return [
      {text: 'Crear',  action: this.onToggleCreateDocumentGen},
      {text: 'Eliminar', action: this.onToggleDeleteDocuments}
    ]
  }

  render(){

    const {showDeleteModal, showCreateModal,listDataToDeleteSelected,valueMapCreateDocument,data} = this.state

    const modalProps = [{
      showModal: showDeleteModal,
      title: 'Eliminar Documentos Generados',
      message: (listDataToDeleteSelected.length>0)?`¿Desea imprimir estos ${listDataToDeleteSelected.length} documentos ?`:`Debe seleccionar al menos un documento`,
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
      noFunction: this.onToggleCreateDocumentGen,
      content: <FormRender formTemplate={formDocumGenerado}
                           onChange={this.onChangeValueCreateDocument}
                           valueMap={valueMapCreateDocument}/>
    }]

    return(
      <Fragment>
        {
          modalProps && modalProps.length>0 ?
            map(modalProps, (modal, index)=>{
              return <CommonModal key={'modal'+index} {...modal}/>
            }) : null
        }
      <CommonTableManage
        tableStructure={this.getTableStructure}
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
  getInternDocuments: (userId)=> dispatch(getInternDocuments(userId))
});

function mapStateToProps(state){
  const listInternDocuments = (listData) => {
    return map(listData, data => ({
      ...data,
      document: (!isEmpty(data.documentName)) ? `${data.documentName} Nº ${data.numDocumento}-${data.siglas}-${data.anio}` : 'SIN DOCUMENTO',
      responsable: `${data.userName}, ${data.userLastName}`,
      check: false
    }))
  }

  return {
    internDocument: listInternDocuments(state.documentIntern.data)
  }
}
export default connect (mapStateToProps, mapDispatchToProps)(DocGenerados)