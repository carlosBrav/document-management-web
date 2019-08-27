import React, {Component} from 'react';
import {TYPE_ACTION} from "../../constants/Constants";

class CommonPagination extends Component{

  render(){

    const {onChangeCurrentPageSubtract, onChangeCurrentPageAdd} = this.props

    return(
      <div className="container-pagination">

        <button className='btn-basic btn-pagination btn-pag-last'
                onClick={()=>onChangeCurrentPageSubtract(TYPE_ACTION.SUBTRACT)}
        >
          {'<'}
        </button>
        <button className='btn-basic btn-pagination btn-pag-last'
                onClick={()=>onChangeCurrentPageAdd(TYPE_ACTION.ADD)}
        >
          {'>'}
        </button>
      </div>
    )
  }
}

export default CommonPagination