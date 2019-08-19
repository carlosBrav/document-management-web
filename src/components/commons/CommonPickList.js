import React from 'react';
import {list_dependencies_2, list_dependencies} from '../../fakedata/ListDataDocuments';
import filter from 'lodash/filter';
import map from 'lodash/map';

const LIST_CASE = {
  LIST_LEFT: 'list_left',
  LIST_RIGHT: 'list_right'
}

class CommonPickList extends React.Component {

  state ={
    listData: [],
    listDataSelected : [],
    listDestinations: []
  }

  componentDidMount(){
    const {typeDestinations, destinations} = this.props
    this.setState({listData : typeDestinations, listDestinations: destinations })
  }

  onChangeDestinations=()=>{
    const {idDestinations, onChange} = this.props;
    onChange(idDestinations, map(this.state.listDataSelected, (data)=> data.id))
  }

  onAddAll = () => {
    let {listData, listDataSelected} = this.state;
    listData.forEach((data) => {
      let newData = {...data, check: false};
      listDataSelected.push(newData)
    });
    this.setState({listData: [], listDataSelected});
    this.onChangeDestinations()
  }

  onReturnAll=()=>{
    let {listData, listDataSelected} = this.state;
    listDataSelected.forEach((data) => {
      let newData = {...data, check: false}
      listData.push(newData)
    });
    this.setState({listData, listDataSelected:[]});
    this.onChangeDestinations()
  }

  onAddSelected = () => {
    let {listData, listDataSelected} = this.state;
    listData.forEach((data) => {
      if(data.check){
        let newData = {...data, check: false};
        listDataSelected.push(newData)
      }
    });
    const listDataUpdate = filter(listData, (data) => !data.check)
    this.setState({listData: listDataUpdate, listDataSelected})
    this.onChangeDestinations()
  }

  onReturnSelected=()=>{
    let {listData, listDataSelected} = this.state
    listDataSelected.forEach((data) => {
      if(data.check){
        let newData = {...data, check: false};
        listData.push(newData)
      }
    });
    const listDataSelectedUpdate = filter(listDataSelected, (data) => !data.check)
    this.setState({listData, listDataSelected: listDataSelectedUpdate})
    this.onChangeDestinations()
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
    const {listData, listDataSelected, listDestinations} = this.state
    const {onChange, idTypeDestinations} = this.props
    return(
      <div className='pick-list-container'>
        <div className='select-type-destination'>
          <select id={'selectId'} className={`form-control`}
                  onChange={(e)=> onChange(idTypeDestinations, e.target.value)} required>
            <option selected value={'0'}>Seleccione destino</option>
            {
              listDestinations && listDestinations.length>0 ?
                listDestinations.map((item, index)=>{
                  return <option key={'option'+index} value={item.id}>{item.value}</option>
                }) : null
            }

          </select>
        </div>
        <div className='container-pick-list'>
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
                  return <div className={'data-container-style '+(dependency.check ? 'selected':'')}>
                    <div onClick={(e)=> {e.stopPropagation();this.onChangeToCheck(index, LIST_CASE.LIST_RIGHT)}}  className='data-style'>
                      <input type='checkbox' checked={dependency.check} onClick={(e)=>{e.stopPropagation();this.onChangeToCheck(index, LIST_CASE.LIST_RIGHT)}}/>{dependency.value}</div>
                  </div>
                })
                :null
            }
          </div>
        </div>
      </div>
    )
  }
}

export default CommonPickList