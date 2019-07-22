import React, {Component} from 'react';

class CommonPagination extends Component{

  render(){

    const {totalPages, currentPage, onChangeCurrentPage, onChangeCurrentPageSubtract, onChangeCurrentPageAdd} = this.props
    let buttons = []

    for(let i=0; i<totalPages; i++){
      const button = (
        <button key={'button'+i} className='btn-basic btn-pagination'
                onClick={() => onChangeCurrentPage(i+1)}
                style={(currentPage === (i+1)) ? {color:'#d3f1fe',backgroundColor:'#3b85fe'}:null}>
          {i+1}
        </button>
      )
      buttons.push(button)
    }

    return(
      <div className="container-pagination">
        <button className='btn-basic btn-pagination btn-pag-first'
                onClick={() => onChangeCurrentPage(1)}
                style={(currentPage === 1) ? {color:'#7da2d9'}:null}>
          {'<<'}
        </button>
        <button className='btn-basic btn-pagination btn-pag-first'
                onClick={onChangeCurrentPageSubtract}
                style={(currentPage === 1) ? {color:'#7da2d9'}:null}>
          {'<'}
        </button>
        {buttons}
        <button className='btn-basic btn-pagination btn-pag-last'
                onClick={onChangeCurrentPageAdd}
                style={(currentPage === totalPages) ? {color:'#7da2d9'}:null}>
          {'>'}
        </button>
        <button className='btn-basic btn-pagination btn-pag-ultimate'
                onClick={() => onChangeCurrentPage(totalPages)}
                style={(currentPage === 1) ? {color:'#7da2d9'}:null}>
          {'>>'}
        </button>
      </div>
    )
  }
}

export default CommonPagination