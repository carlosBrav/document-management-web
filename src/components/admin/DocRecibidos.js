import React, {Component} from 'react';
import CommonPagination from '../commons/CommonPagination';
import CommonTable from '../commons/CommonTable';
import {listData} from '../../fakedata/ListDocRecibidos'

class DocRecibidos extends Component{

  state = {
    totalPages: 10,
    currentPage: 1,
    docRecibTableStructure: [],
    docRecibDataList: [],
    docRecibSelectList: []
  }

  onToggleAddDocSelect=(value)=>{
    console.log('VALUE ', value)
    let {docRecibSelectList} = this.state
    docRecibSelectList.push(value)
  }

  getDataList=()=>{
    return(
      [...listData]
    )
  }

  getTableStructure = () => {
    return ([
      {
        columnHeader: '',
        cellRenderer: ({value}) => <input type='checkbox' onClick={()=>this.onToggleAddDocSelect(value)}/>
      },
      {
        columnHeader: 'Num. Tram.',
        rowProp: 'num_tram'
      },
      {
        columnHeader: 'Mov.',
        rowProp: 'movimiento'
      },
      {
        columnHeader: 'Destino',
        rowProp: 'destino'
      },
      {
        columnHeader: 'F. Envio',
        rowProp: 'fech_envio'
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

  componentDidMount(){
    this.setState({docRecibTableStructure: this.getTableStructure(), docRecibDataList: this.getDataList()})
  }


  onChangeCurrentPageAdd = () =>{
    let {totalPages, currentPage} = this.state
    if(currentPage < totalPages){
      currentPage++
    }
    this.setState({currentPage})
  }

  onChangeCurrentPageSubtract = () =>{
    let {currentPage} = this.state
    if(currentPage > 1){
      currentPage--
    }
    this.setState({currentPage})
  }

  onChangeCurrentPage = (value) => {
    this.setState({currentPage: value})
  }

  render(){
    const {totalPages, currentPage, docRecibTableStructure, docRecibDataList, docRecibSelectList} = this.state;
    console.log('docRecibSelectList ', docRecibSelectList)
    return(
      <div className='container-doc-recibidos'>
        <div className='container-header'>
          <div className='header-title'>
            <h3>DOCUMENTOS RECIBIDOS</h3>
          </div>
          <div className='container-content'>
            <div className='content-pagination'>
              <CommonPagination totalPages={totalPages}
                                currentPage={currentPage}
                                onChangeCurrentPage={this.onChangeCurrentPage}
                                onChangeCurrentPageSubtract={this.onChangeCurrentPageSubtract}
                                onChangeCurrentPageAdd={this.onChangeCurrentPageAdd}/>
            </div>
            <div>
              <CommonTable tableStructure={docRecibTableStructure} data={docRecibDataList}/>
            </div>
            <div className='content-pagination'>
              <CommonPagination totalPages={totalPages}
                                currentPage={currentPage}
                                onChangeCurrentPage={this.onChangeCurrentPage}
                                onChangeCurrentPageSubtract={this.onChangeCurrentPageSubtract}
                                onChangeCurrentPageAdd={this.onChangeCurrentPageAdd}/>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    )
  }
}

export default DocRecibidos