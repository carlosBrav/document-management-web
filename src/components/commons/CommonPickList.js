import React from 'react';
import filter from 'lodash/filter';
import map from 'lodash/map';
import some from "lodash/some";
import { connect } from 'react-redux';

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
    const {typeDestinations} = this.props
    this.setState({listDestinations : typeDestinations})
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

  onChangeTypeDestination=(value)=>{
    const {dependencies} = this.props
    const {listDataSelected} = this.state
    const destinations = filter(dependencies, {tipo: value});
    const newDestinations = (listDataSelected.length>0) ?
      filter([...destinations], data => {
      return some(listDataSelected, dataSelected => {
        return dataSelected.id !== data.id
      })
    }) : [...destinations]
    this.setState({listData: newDestinations})
  };

  render(){
    const {listData, listDataSelected, listDestinations} = this.state
    return(
      <div className='pick-list-container'>
        <div className='select-type-destination'>
          <select id={'selectId'} className='form-control' style={{fontSize: 13, width: '80%'}}
                  onChange={(e)=> this.onChangeTypeDestination(e.target.value)} required>
            <option selected value={' '}>Seleccione destino</option>
            {
              listDestinations && listDestinations.length>0 ?
                listDestinations.map((item)=>{
                  return <option key={'option'+item.id} value={item.id}>{item.value}</option>
                }) : null
            }

          </select>
        </div>
        <div className='container-pick-list'>
          <div className='pick-data-container'>
            {
              listData && listData.length>0 ?
                listData.map((dependency, index)=>{
                  return <div key={'optionSelected'+index}  className={'data-container-style '+(dependency.check ? 'selected':'')}>
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

function mapStateToProps(state){
  const updateDependencies =(listData)=>{
    return map(listData, data =>({
      ...data,
        value: data.nombre
    }))
  }
  return{
    dependencies: updateDependencies(state.initialData.dependencies)
  }
}

export default connect(mapStateToProps, null)(CommonPickList)