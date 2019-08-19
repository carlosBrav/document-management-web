import React, {Component} from 'react';
import {list_busqueda_avanzada, list_dependencies} from "../../fakedata/ListDataDocuments";
import CommonTableManage from "../commons/CommonTableManage";

class Busqueda_avanzada extends Component{

  state={
    valueMap:{}
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
        rowProp: 'documento',
        classSearchRow: 'container-search-field normal-size',
        filterHeader: true
      },
      {
        columnHeader: 'Fech. Tram.',
        rowProp: 'fech_tram'
      },
      {
        columnHeader: 'Fech. Ingreso',
        rowProp: 'fech_ingreso',
      },
      {
        columnHeader: 'Asunto',
        rowProp: 'asunto'
      },
      {
        columnHeader: 'Derivado a',
        rowProp: 'derivado_a',
      }
    ])
  }

  onChangeValueMap=(prop,value)=>{
    this.setState({valueMap: {...this.state.valueMap, [prop]: value}})
  }

  onSearch=()=>{
    const {valueMap}= this.state
    console.log('VALUE MAP ', valueMap)
  }

  getContainHeaderBusqAvanz=()=>{
    return(
      <div style={{display: 'flex', justifyContent: 'row', paddingLeft: 25, paddingTop: 20}}>
        <form style={{width: '45%'}}>
          <div className="form-row" style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: 0, marginLeft: 0}}>
            <div className="form-group">
              <label htmlFor="inputNumTram">Numero de tramite:</label>
              <input type="text" className="form-control" id="inputNumTram" onChange={(e)=> this.onChangeValueMap('inputNumTram',e.target.value)}/>
            </div>
            <div className="form-group">
              <label htmlFor="inputAsunto">Asunto:</label>
              <input type="text" className="form-control" id="inputAsunto" onChange={(e)=> this.onChangeValueMap('inputAsunto',e.target.value)}/>
            </div>
          </div>
          <div className="form-row"  style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: 0, marginLeft: 0}}>
            <div className="form-group">
              <label htmlFor="inputPassword4">Derivado a:</label>
                <select id="inputState" className="form-control" onChange={(e)=> this.onChangeValueMap('inputState',e.target.value)}>
                  <option selected value={'0'} >Seleccione</option>
                  {
                    list_dependencies && list_dependencies.length>0 ?
                      list_dependencies.map((dependencie)=>{
                        return <option value={dependencie.id}>{dependencie.value}</option>
                      }) : null
                  }

                </select>
            </div>
            <div className="form-group" style={{width: 210,paddingTop: 35}}>
              <button type='button' className='btn btn-dark' style={{backgroundColor: '#222', height: 35,borderColor: '#222', marginLeft: 10}} onClick={()=> this.onSearch()}>
                Buscar
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }


  getFooterTableStructureBusqAvanz=()=>{
    return [
      {text: 'Detalle', action: ()=> {}},
      {text: 'Imprimir', action: ()=> this.onExportDocuments()}
    ]
  }

  render(){
    return(
      <CommonTableManage
        tableStructure={this.getTableStructure}
        title={'BUSQUEDA AVANZADA'}
        listData={list_busqueda_avanzada}
        getFooterTableStructure={this.getFooterTableStructureBusqAvanz}
        containHeader={this.getContainHeaderBusqAvanz()}
      />
    )
  }
}

export default Busqueda_avanzada