import React, {Component} from 'react';
import CommonPagination from '../commons/CommonPagination';
import CommonTable from '../commons/CommonTable';
import {listData} from '../../fakedata/ListDocRecibidos'

class DocRecibidos extends Component{

  state = {
    totalPages: 10,
    currentPage: 1,
    docRecibTableStructure: [],
    docRecibDataList: []
  }

  onToggleAddDocSelect=(index)=>{
    let {docRecibDataList} = this.state
    let docuRow = docRecibDataList[index]
    docuRow.check = !docuRow.check
    this.setState({docRecibDataList})
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
        actions: [{
          action: (index) => this.onToggleAddDocSelect(index)
        }]
      },
      {
        columnHeader: 'Num. Tram.',
        rowProp: 'num_tram',
        searchRow: <input type="text" />,
        classSearchRow: 'container-search-field normal-size'
      },
      {
        columnHeader: 'Mov.',
        rowProp: 'movimiento'
      },
      {
        columnHeader: 'Destino',
        rowProp: 'destino',
        searchRow: <input type="text" />,
        classSearchRow: 'container-search-field long-size'
      },
      {
        columnHeader: 'F. Envio',
        rowProp: 'fech_envio',
        searchRow: <input type="text" />,
        classSearchRow: 'container-search-field medium-size'
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
    const {totalPages, currentPage, docRecibTableStructure, docRecibDataList} = this.state;
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
            <div className='container-table'>
              <CommonTable tableStructure={docRecibTableStructure} data={docRecibDataList} onClick={this.onToggleAddDocSelect}/>
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