import React, {Component} from 'react';
import CommonPagination from '../commons/CommonPagination'

class DocRecibidos extends Component{

  state = {
    totalPages: 10,
    currentPage: 1
  }

  onChangeCurrentPageAdd = (value) =>{
    let {totalPages, currentPage} = this.state
    if(currentPage < totalPages){
      currentPage++
    }
    this.setState({currentPage})
  }

  onChangeCurrentPageSubtract = (value) =>{
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
    const {totalPages, currentPage} = this.state
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
            <div></div>
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    )
  }
}

export default DocRecibidos