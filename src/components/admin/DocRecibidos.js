import React, {Component} from 'react';
import CommonPagination from '../commons/CommonPagination';
import CommonTable from '../commons/CommonTable';
import {listData} from '../../fakedata/ListDocRecibidos'
import findIndex from 'lodash/findIndex';
import {Button} from 'react-bootstrap'
import {exportPDF} from '../utils/ExportPDF'

class DocRecibidos extends Component{

  state = {
    totalPages: 10,
    currentPage: 1,
    docRecibTableStructure: [],
    docRecibDataList: []
  }

  onToggleAddDocSelect=(id)=>{
    let {docRecibDataList} = this.state;
    const index = findIndex(docRecibDataList, {id: id});
    docRecibDataList[index].check = !docRecibDataList[index].check;
    this.setState({docRecibDataList})
  }

  onExportDocumentsConfirms=()=>{
    exportPDF()
  }

  getDataList=()=>{
    return(
      [...listData]
    )
  };

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

  componentDidMount(){
    this.setState({docRecibTableStructure: this.getTableStructure(), docRecibDataList: this.getDataList()})
  }


  onChangeCurrentPageAdd = () =>{
    let {totalPages, currentPage} = this.state
    if(currentPage < totalPages){
      currentPage++
    }
    this.setState({currentPage})
  };

  onChangeCurrentPageSubtract = () =>{
    let {currentPage} = this.state
    if(currentPage > 1){
      currentPage--
    }
    this.setState({currentPage})
  };

  onChangeCurrentPage = (value) => {
    this.setState({currentPage: value})
  };

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
              {(docRecibTableStructure && docRecibTableStructure.length > 0) ?
                <CommonTable tableStructure={docRecibTableStructure} data={docRecibDataList}
                             onClick={this.onToggleAddDocSelect}/> : null
              }
            </div>
            <div className='content-pagination'>
              <CommonPagination totalPages={totalPages}
                                currentPage={currentPage}
                                onChangeCurrentPage={this.onChangeCurrentPage}
                                onChangeCurrentPageSubtract={this.onChangeCurrentPageSubtract}
                                onChangeCurrentPageAdd={this.onChangeCurrentPageAdd}/>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '20%', height: 50}}>
              <Button bsStyle="primary" style={{backgroundColor: '#222', height: 40, borderColor: '#222'}}>
                Seguimiento
              </Button>
              <Button bsStyle="primary" style={{backgroundColor: '#222', height: 40, borderColor: '#222'}} onClick={()=> this.onExportDocumentsConfirms()}>
                Imprimir
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DocRecibidos