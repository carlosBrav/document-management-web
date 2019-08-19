import React, {Component, Fragment} from 'react';
import CommonTableManage from "../commons/CommonTableManage";
import {lista_proveidos_1, lista_proveidos_2} from "../../fakedata/ListDataDocuments";
import CommonTab from "../commons/CommonTab";
import {ICON_TYPE} from "../commons/CommonIcon";
import {exportPDF} from "../utils/ExportPDF";
import FormRender from "../../forms/FormRender";
import {formProveidosInternos, formProveidosExternos} from "../../forms/templates/TemplateCreateProveido";
import map from "lodash/map";
import CommonModal from '../commons/CommonModal';

class DocProveidos extends Component{

  state = {
    search: '',
    listDataToDeleteSelected: [],
    listDataProvIntSelected:[],
    showDeleteModal: false,
    showProveidoInternoModal: false,
    showProveidoExternoModal: false,
    valueMapProveidoInterno: {},
    valueMapProveidoExterno: {}
  }

  toggleEditDocument=(data)=>{
    console.log('DOCUMENT EDIT PROVEIDO ', data)
  }

  onSetListDataToDeleteSelected=(listDataToDeleteSelected)=>{
    this.setState({listDataToDeleteSelected})
  }

  onSetListDataProvIntSelected=(listDataProvIntSelected)=>{
    this.setState({listDataProvIntSelected})
  }

  onChangeValueProvInt=(prop, value)=>{
    this.setState({valueMapProveidoInterno: {...this.state.valueMapProveidoInterno, [prop]: value}})
  }

  onChangeValueProvExt=(prop,value)=>{
    this.setState({valueMapProveidoExterno: {...this.state.valueMapProveidoExterno, [prop]: value}})
  }

  getTableStructure_proveidos_1 = (onToggleAddDocSelect) => {
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
        columnHeader: 'Origen',
        rowProp: 'origen',
        classSearchRow: 'container-search-field long-size',
        filterHeader: true
      },
      {
        columnHeader: 'Fecha Reg.',
        rowProp: 'fech_registro'
      }
    ])
  }

  getTableStructure_proveidos_2 = (onToggleAddDocSelect) => {
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
        rowProp: 'documento',
        classSearchRow: 'container-search-field normal-size',
        filterHeader: true
      },
      {
        columnHeader: 'Num. Doc.',
        rowProp: 'num_doc'
      },
      {
        columnHeader: 'Fech. Reg.',
        rowProp: 'fech_registro'
      },
      {
        columnHeader: 'Asunto',
        rowProp: 'asunto'
      },
      {
        columnHeader: 'Origen',
        rowProp: 'origen',
        classSearchRow: 'container-search-field long-size',
        filterHeader: true
      },
      {
        columnHeader: 'Usuario',
        rowProp: 'usuario'
      },
      {
        columnHeader: '',
        rowStyle: 'container-icons',
        actions: [
          {
            actionType: ICON_TYPE.EDIT,
            action: data => this.toggleEditDocument(data)
          }
        ]
      }
    ])
  }

  onExportDocuments=()=>{
    exportPDF()
  }

  onToggleDeleteDocuments = () => {
    this.setState({showDeleteModal: !this.state.showDeleteModal})
  }

  onDeleteDocuments = () => {
    this.setState({showDeleteModal: !this.state.showDeleteModal})
  }

  onCreateProveidoInterno=()=>{
    const {valueMapProveidoInterno} = this.state
    console.log('PROVEIDO INTERNO CREACION ', valueMapProveidoInterno)
    this.onToggleCreateProveidoInterno()
  }

  onCreateProveidoExterno=()=>{
    const {valueMapProveidoExterno} = this.state
    console.log('PROVEIDO EXTERNO CREACION ', valueMapProveidoExterno)
    this.onToggleCreateProveidoExterno()
  }

  onToggleCreateProveidoInterno=()=>{
    this.setState({showProveidoInternoModal: !this.state.showProveidoInternoModal})
  }

  onToggleCreateProveidoExterno=()=>{
    this.setState({showProveidoExternoModal: !this.state.showProveidoExternoModal})
  }

  getFooterTableStructureProveidos_1=()=>{
    return [
      {text: 'Proveidos Int.',  action: this.onToggleCreateProveidoInterno},
      {text: 'Proveidos Ext.', action: this.onToggleCreateProveidoExterno}
    ]
  }

  getFooterTableStructureProveidos_2=()=>{
    return [
      {text: 'Eliminar',  action: this.onToggleDeleteDocuments},
      {text: 'Imprimir', action: this.onExportDocuments}
    ]
  }

  render(){

    const {showDeleteModal,
      listDataToDeleteSelected,
      showProveidoInternoModal,
      showProveidoExternoModal,
      listDataProvIntSelected,
      valueMapProveidoInterno,
      valueMapProveidoExterno} = this.state

    const modalProps = [
      {
        showModal: showDeleteModal,
        title: 'Eliminar Documentos Proveidos',
        message: (listDataToDeleteSelected.length>0)?`¿Desea imprimir estos ${listDataToDeleteSelected.length} documentos ?`:`Debe seleccionar al menos un documento`,
        yesFunction: (listDataToDeleteSelected.length>0)?this.onDeleteDocuments:this.onToggleDeleteDocuments,
        yesText: (listDataToDeleteSelected.length>0)?'Sí':'Ok',
        noFunction: (listDataToDeleteSelected.length>0)?this.onToggleDeleteDocuments:null
      },
      {
        showModal: showProveidoInternoModal,
        title: 'Proveido Interno N° 00481-OGPL-2019',
        message: (listDataProvIntSelected.length === 1)?null:'Debe seleccionar 1 proveido',
        yesFunction: (listDataProvIntSelected.length === 1)?this.onCreateProveidoInterno:this.onToggleCreateProveidoInterno,
        yesText: (listDataProvIntSelected.length === 1)?'Crear proveido':'Ok',
        noFunction: (listDataProvIntSelected.length === 1)?this.onToggleCreateProveidoInterno:null,
        noText: (listDataProvIntSelected.length === 1)?'Cancelar':null,
        content: <FormRender formTemplate={formProveidosInternos}
                             onChange={this.onChangeValueProvInt}
                             valueMap={valueMapProveidoInterno}/>
      },
      {
        showModal: showProveidoExternoModal,
        title: 'Proveido Interno N° 00481-OGPL-2019',
        yesFunction: this.onCreateProveidoExterno,
        yesText: 'Crear proveido',
        noFunction: this.onToggleCreateProveidoExterno,
        noText: 'Cancelar',
        content: <FormRender formTemplate={formProveidosExternos}
                             onChange={this.onChangeValueProvExt}
                             valueMap={valueMapProveidoExterno}/>
      }]

    const tableDocumentInt =()=>{
      return(
        <CommonTableManage
          tableStructure={this.getTableStructure_proveidos_1}
          title={'DOCUMENTOS INTERNOS'}
          listData={lista_proveidos_1}
          getFooterTableStructure={this.getFooterTableStructureProveidos_1}
          onSetSelected={this.onSetListDataProvIntSelected}
        />
      )
    }

    const tableProveidos =()=>{
      return(
        <CommonTableManage
          tableStructure={this.getTableStructure_proveidos_2}
          title={'PROVEIDOS'}
          listData={lista_proveidos_2}
          modalProps={modalProps}
          getFooterTableStructure={this.getFooterTableStructureProveidos_2}
          onSetSelected={this.onSetListDataToDeleteSelected}
        />
      )
    }

    const tabs =
      [ {title: 'Doc. Internos', id: 'docuIntProv', action: tableDocumentInt},
        {title: 'Proveidos', id: 'proveidos', action: tableProveidos}
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
export default DocProveidos