import React, {Component} from 'react';
import {list_busqueda_avanzada, list_dependencies} from "../../fakedata/ListDataDocuments";
import CommonTableManage from "../commons/CommonTableManage";
import {loadAdvancedSearch,cleanDataMovements} from "../../actions/actions";
import map from "lodash/map";
import {connect} from 'react-redux';

class Busqueda_avanzada extends Component{

  state={
    valueMap:{},
    data: []
  };

  componentDidMount(){
    const {cleanDataMovements}=this.props
    cleanDataMovements()
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
        rowProp: 'numTram',
        classSearchRow: 'container-search-field normal-size',
        filterHeader: true
      },
      {
        columnHeader: 'Fech. Ingreso.',
        rowProp: 'fechaIngreso'
      },
      {
        columnHeader: 'Fech. Envio',
        rowProp: 'fechaEnvio',
      },
      {
        columnHeader: 'Observacion',
        rowProp: 'observacion'
      },
      {
        columnHeader: 'Derivado a',
        rowProp: 'destinoNombre',
      }
    ])
  }

  onChangeValueMap=(prop,value)=>{
    this.setState({valueMap: {...this.state.valueMap, [prop]: value}})
  }

  onSearch=()=>{
    const {valueMap}= this.state
    const {loadAdvancedSearch} = this.props
    loadAdvancedSearch(valueMap['inputNumTram'],valueMap['inputObservation'],valueMap['inputState'])
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
              <label htmlFor="inputAsunto">Observacion:</label>
              <textarea rows="2"
                        className={`form-control`}
                        style={{width: 280}}
                        id={"inputObservation"}
                        onChange={(e)=> this.onChangeValueMap('inputObservation',e.target.value)}/>
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
            <div className="form-group" style={{width: 290,paddingTop: 35}}>
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
    const {data} = this.props
    console.log('data' , data)
    return(
      <CommonTableManage
        tableStructure={this.getTableStructure}
        title={'BUSQUEDA AVANZADA'}
        listData={data}
        getFooterTableStructure={this.getFooterTableStructureBusqAvanz}
        containHeader={this.getContainHeaderBusqAvanz()}
      />
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  loadAdvancedSearch: (numTram, observation, officeId)=> dispatch(loadAdvancedSearch(numTram, observation, officeId)),
  cleanDataMovements: ()=>dispatch(cleanDataMovements())
});
function mapStateToProps(state) {
  const getMovements = (listData) => {
    return map(listData, data => ({
      ...data,
      document: data.docuNum ? `${data.docuNombre} Nº ${data.docuNum}-${data.docuSiglas}-${data.docuAnio}`:'SIN DOCUMENTO'
    }))
  };
  return {
    data: getMovements(state.movements.dataAdvancedSearch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Busqueda_avanzada)