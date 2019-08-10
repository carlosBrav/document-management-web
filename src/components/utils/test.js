import React from 'react';
import {list_dependencies_2} from '../../fakedata/ListDataDocuments';
import filter from 'lodash/filter';

const LIST_CASE = {
  LIST_LEFT: 'list_left',
  LIST_RIGHT: 'list_right'
}

class MenuComponent extends React.Component {

  state ={
    listData: [],
    listDataSelected : []
  }

  componentDidMount(){
    this.setState({listData : list_dependencies_2})
  }

  onAddAll = () => {
    let {listData, listDataSelected} = this.state
    listData.forEach((data) => {
      let newData = {...data, check: false}
      listDataSelected.push(newData)
    });
    this.setState({listData: [], listDataSelected})
  }

  onReturnAll=()=>{
    let {listData, listDataSelected} = this.state
    listDataSelected.forEach((data) => {
      let newData = {...data, check: false}
      listData.push(newData)
    });
    this.setState({listData, listDataSelected:[]})
  }

  onAddSelected = () => {
    let {listData, listDataSelected} = this.state
    listData.forEach((data) => {
      if(data.check){
        let newData = {...data, check: false}
        listDataSelected.push(newData)
      }
    });
    const listDataUpdate = filter(listData, (data) => !data.check)
    this.setState({listData: listDataUpdate, listDataSelected})
  }

  onReturnSelected=()=>{
    let {listData, listDataSelected} = this.state
    listDataSelected.forEach((data) => {
      if(data.check){
        let newData = {...data, check: false}
        listData.push(newData)
      }
    });
    const listDataSelectedUpdate = filter(listDataSelected, (data) => !data.check)
    this.setState({listData, listDataSelected: listDataSelectedUpdate})
  }

  onChangeToCheck=(index, caseList) => {
    let {listData, listDataSelected} = this.state
    switch(caseList){
      case LIST_CASE.LIST_LEFT:
        listData[index].check = !listData[index].check
        break;
      case LIST_CASE.LIST_RIGHT:
        listDataSelected[index].check = !listDataSelected[index].check
        break;
    }
    this.setState({listData, listDataSelected})
  }

  render(){
    const {listData, listDataSelected} = this.state
    return(
      <div className='pick-list-container'>
        <div className='pick-data-container'>
          {
            listData && listData.length>0 ?
              listData.map((dependency, index)=>{
                return <div className={'data-container-style '+(dependency.check ? 'selected':'')}>
                  <div onClick={(e)=> {e.stopPropagation();this.onChangeToCheck(index, LIST_CASE.LIST_LEFT)}} className='data-style'>
                    <input type='checkbox' checked={dependency.check} onClick={(e)=>{e.stopPropagation();this.onChangeToCheck(index, LIST_CASE.LIST_LEFT)}}/>
                    {dependency.value}</div>
                </div>
              })
              :null
          }
        </div>
        <div className='buttons-container'>
          <div className='buttons-sub-container'>
            <button type='button' className='btn btn-dark button-style' onClick={(listData && listData.length>0) ? this.onAddAll : ()=>console.log('no hace nada 1')}>
              {'>>'}
            </button>
            <button type='button' className='btn btn-dark button-style' onClick={this.onAddSelected}>
              {'>'}
            </button>
            <button type='button' className='btn btn-dark button-style' onClick={this.onReturnSelected}>
              {'<'}
            </button>
            <button type='button' className='btn btn-dark button-style' onClick={(listDataSelected && listDataSelected.length>0) ? this.onReturnAll :()=>console.log('no hace nada 2')}>
              {'<<'}
            </button>
          </div>
        </div>
        <div className='pick-data-container'>
          {
            listDataSelected && listDataSelected.length>0 ?
              listDataSelected.map((dependency, index)=>{
                return <div className='data-container-style'>
                  <label className='data-style'><input type='checkbox' checked={dependency.check}/>{dependency.value}</label>
                </div>
              })
              :null
          }
        </div>
      </div>
    )
  }
}

export default MenuComponent