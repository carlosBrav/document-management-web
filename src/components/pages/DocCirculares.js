import React, {Component, Fragment} from 'react';
import CommonTableManage from '../commons/CommonTableManage';
import {lista_circulares} from "../../fakedata/ListDataDocuments";
import {ICON_TYPE} from "../commons/CommonIcon";
import {exportPDF} from "../utils/ExportPDF";
import map from "lodash/map";
import CommonModal from '../commons/CommonModal';
import {formOficiosCirculares} from "../../forms/templates/TemplateOficiosCIrculares";
import FormRender from "../../forms/FormRender";
import {TYPE_CONTENT_MODAL} from '../../constants/Constants'

class DocCirculares extends Component{

  state = {
    search: '',
    listDataSelected: [],
    showDeleteModal: false,
    showCreateCircularModal: false,
    valueMapCreateCircular: {}
  }

  onChangeValueCircular=(prop, value)=>{
    this.setState({valueMapCreateCircular: {...this.state.valueMapCreateCircular, [prop]: value}})
  }

  toggleViewDocument=(data)=>{
    console.log('DOCUMENT SELECTED ',data)
  }

  toggleEditDocument=(data)=>{
    console.log('DOCUMENT EDIT ', data)
  }

  onSetSelectOficiosCirculares=(listDataSelected)=>{
    this.setState({listDataSelected})
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
           action: data => this.toggleViewDocument(data)
          },
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

  onToggleCreateCircular=()=>{
    this.setState({showCreateCircularModal: !this.state.showCreateCircularModal})
  }

  getFooterTableStructure=()=>{
    return [
      {text: 'Crear',  action: this.onToggleCreateCircular},
      {text: 'Eliminar', action: this.onToggleDeleteDocuments},
      {text: 'Imprimir',  action: this.onExportDocuments}
    ]
  }

  onCreateCircular=()=>{
    const {valueMapCreateCircular} = this.state
    console.log('valueMapCreateCircular ', valueMapCreateCircular)
    this.onToggleCreateCircular()
  }

  render(){

    const {showDeleteModal,
      listDataSelected,
      showCreateCircularModal,
      valueMapCreateCircular} = this.state

    const modalProps = [
      {
        showModal: showDeleteModal,
        title: 'Eliminar documentos circulares',
        message: (listDataSelected.length>0)?`¿Desea imprimir estos ${listDataSelected.length} documentos ?`:`Debe seleccionar al menos un documento`,
        yesFunction: (listDataSelected.length>0)?this.onDeleteDocuments:this.onToggleDeleteDocuments,
        yesText: (listDataSelected.length>0)?'Sí':'Ok',
        noFunction: (listDataSelected.length>0)?this.onToggleDeleteDocuments:null
      },
      {
        showModal: showCreateCircularModal,
        title: 'Crear documento circular',
        yesFunction: this.onCreateCircular,
        yesText: 'Crear circular',
        noFunction: this.onToggleCreateCircular,
        noText: 'Cancelar',
        content: <FormRender formTemplate={formOficiosCirculares}
                             onChange={this.onChangeValueCircular}
                             valueMap={valueMapCreateCircular}
                             isFormCircular={true}/>,
        typeContent: TYPE_CONTENT_MODAL.TYPE_CIRCULAR
      }
    ]


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
          title={'OFICIOS CIRCULARES - OGPL'}
          listData={lista_circulares}
          onView={(data)=> console.log('SELECTED TO VIEW ', data)}
          onEdit={(data) => console.log('SELECTED TO EDIT ', data)}
          getFooterTableStructure={this.getFooterTableStructure}
          onSetSelected={this.onSetSelectOficiosCirculares}
        />
      </Fragment>
    )
  }
}
export default DocCirculares