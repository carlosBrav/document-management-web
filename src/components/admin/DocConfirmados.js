import React, {Component} from 'react';
import CommonTableManage from '../commons/CommonTableManage';
import {listData_1} from "../../fakedata/ListDocRecibidos";
import {Button, FormGroup, ControlLabel, FormControl} from 'react-bootstrap'

class DocConfirmados extends Component{

  state = {
    search: ''
  }

  onChangeValue = (e) =>{
    this.setState({search : e.target.value})
  }

  getTableStructure = (onToggleAddDocSelect) => {
    return ([
      {
        columnHeader: '',
        actions: [{
          action: (index) => onToggleAddDocSelect(index)
        }]
      },
      {
        columnHeader: 'Num. Tram.',
        rowProp: 'num_tram',
        classSearchRow: 'container-search-field normal-size',
        filterHeader: true
      },
      {
        columnHeader: 'Mov.',
        rowProp: 'movimiento'
      },
      {
        columnHeader: 'Destino',
        rowProp: 'destino',
        classSearchRow: 'container-search-field long-size',
        filterHeader: true
      },
      {
        columnHeader: 'F. Envio',
        rowProp: 'fech_envio',
        classSearchRow: 'container-search-field medium-size',
        filterHeader: true
      },
      {
        columnHeader: 'Indicador',
        rowProp: 'indic'
      },
      {
        columnHeader: 'Observación',
        rowProp: 'observacion'
      },
      {
        columnHeader: 'Doc. Nombre',
        rowProp: 'docum_nomb'
      },
      {
        columnHeader: 'Estado',
        rowProp: 'estado'
      }
    ])
  }

  getButtonsFooter=()=>{
    return [
      {text: 'Eliminar', style: {backgroundColor: '#222', height: 40, borderColor: '#222'}, onClick: ()=> {}}
      ]
  }

  getButtonsHeader=()=>{
    return(
      <div className='buttons-header'>
        <form>
          <FormGroup controlId="formBasicText1" style={{display: 'flex', flexDirection: 'row', width: '40%', alignItems: 'center'}}>
            <ControlLabel>Número de trámite: </ControlLabel>
            <FormControl
              type="text"
              value={this.state.search}
              onChange={this.onChangeValue}
              style={{width: '30%', marginLeft: 10, marginRight: 10}}
            />
            <Button bsStyle="primary" style={{backgroundColor: '#222', height: 35,borderColor: '#222'}}>
              Buscar
            </Button>
          </FormGroup>
          <FormGroup controlId="formBasicText2" style={{display: 'flex', flexDirection: 'row', width: '40%', alignItems: 'center'}}>
            <ControlLabel>Documento de hoy: </ControlLabel>
            <Button bsStyle="primary" style={{backgroundColor: '#222', height: 35,borderColor: '#222', marginLeft: 10}}>
              Buscar
            </Button>
          </FormGroup>
        </form>
      </div>
    )
  }

  render(){
    return(
      <CommonTableManage
        tableStructure={this.getTableStructure}
        title={'DOCUMENTOS CONFIRMADOS'}
        listData={listData_1}
        buttonsFooter={this.getButtonsFooter()}
        buttonsHeader={this.getButtonsHeader()}
      />
    )
  }
}

export default DocConfirmados