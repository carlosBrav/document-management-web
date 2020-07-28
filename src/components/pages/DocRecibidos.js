import React, { Component, Fragment } from 'react';
import CommonTableManage from '../commons/CommonTableManage';
import { BUTTON_TYPE } from '../../constants/Constants';
import { getView2Data, insertMovements } from "../../actions/actions"
import { connect } from 'react-redux';
import map from "lodash/map";
import { getParseObj } from "../../utils/Utils";
import CommonModal from "../commons/CommonModal";
import { exportConfirmDocuments } from "../utils/ExportPDF";
import { dataViewTransformed } from '../../selectores/dataViewsSelector';
import SeguimientoDocument from '../../components/commons/SeguimientoDocument';
import {getStructureForDocRecibidos} from '../../components/utils/StructureTables';

class DocRecibidos extends Component {

  state = {
    listDataSelected: [],
    isModalOpen: false,
    isModalQuestionOpen: false,
    isModalSeguimientoOpen: false
  };

  async componentDidMount() {
    const { getView2Data } = this.props
    getView2Data()
  }

  onSetSelectDocuments = (listDataSelected) => {
    this.setState({ listDataSelected })
  }

  onConfirmDocuments = async () => {
    const { listDataSelected } = this.state
    const { insertMovements, getView2Data } = this.props
    const currentUser = getParseObj('CURRENT_USER');
    this.toggleModalQuestion();
    await insertMovements(listDataSelected, currentUser.id).then(() => {
      getView2Data()
    });
    this.toggleModal()
  };

  onAcceptConfirmation = async () => {
    let { listDataSelected } = this.state;
    const currentUser = getParseObj('CURRENT_USER');
    exportConfirmDocuments(listDataSelected, currentUser.apellido + ", " + currentUser.nombre);
    this.setState({ listDataSelected: [] });
    this.toggleModal()
  };

  getFooterTableStructure = () => {
    return ([
      { text: 'Seguimiento', action: this.toggleModalSeguimiento },
      { text: 'Imprimir', action: this.toggleModalQuestion }
    ])
  };

  toggleModal = () => {
    this.setState({ isModalOpen: !this.state.isModalOpen })
  };

  toggleModalSeguimiento = () => {
    this.setState({ isModalSeguimientoOpen: !this.state.isModalSeguimientoOpen })
  };

  toggleModalQuestion = () => {
    this.setState({isModalQuestionOpen: !this.state.isModalQuestionOpen})
  }

  render() {

    const { errors, message, isLoading, data } = this.props;
    const { isModalOpen, isModalSeguimientoOpen, listDataSelected, isModalQuestionOpen } = this.state;

    const modalProps = [
      {
        showModal: isModalQuestionOpen,
        title: 'Confirmación',
        yesFunction: this.onConfirmDocuments,
        yesText: 'Aceptar',
        noFunction: this.toggleModalQuestion,
        noText: "Cancelar",
        content: (listDataSelected && listDataSelected.length>0) ?
          <div><h5 style={{ fontSize: 15 }}>{`¿Está seguro de confirmar estos ${listDataSelected.length} documentos?`}</h5></div> :
          <div><h5 style={{ fontSize: 15 }}>{`Debe seleccionar al menos un documento`}</h5></div>
      },
      {
        showModal: isModalOpen,
        title: (errors && errors.length > 0) ? 'Error al confirmar' : 'Confirmados correctamente',
        yesFunction: this.onAcceptConfirmation,
        yesText: 'Aceptar',
        content: <div><h5 style={{ fontSize: 15 }}>{message}</h5></div>
      },
      {
        showModal: isModalSeguimientoOpen,
        title: 'Seguimiento de Documentos',
        yesFunction: this.toggleModalSeguimiento,
        yesText: 'Aceptar',
        content: (listDataSelected && listDataSelected.length === 1) ?
          <SeguimientoDocument tramNum={listDataSelected[0].tramNum}/>
          : <div><h5 style={{ fontSize: 15 }}>{'Se debe seleccionar sólo 1 documento para visualizar su seguimiento'}</h5></div>,
        styleCustom: {maxWidth: "90%"}
      }];

    return (
      <Fragment>
        {
          modalProps && modalProps.length > 0 ?
            map(modalProps, (modal, index) => {
              return <CommonModal key={'modal' + index} {...modal} />
            }) : null
        }
        <CommonTableManage
          tableStructure={getStructureForDocRecibidos}
          title={'DOCUMENTOS RECIBIDOS'}
          listData={data}
          getFooterTableStructure={this.getFooterTableStructure}
          onSetSelected={this.onSetSelectDocuments}
          onAdd={this.onChangeInitialIndex}
          onSubtract={this.onChangeInitialIndex}
          isLoading={isLoading}
        />
      </Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  getView2Data: () => dispatch(getView2Data()),
  insertMovements: (movements, userId) => dispatch(insertMovements(movements, userId))
});

function mapStateToProps(state) {
  return {
    data: dataViewTransformed(state),
    dependencies: state.initialData.dependencies,
    errors: state.movements.errors,
    message: state.movements.data,
    isLoading: state.dataView.isLoading
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DocRecibidos)