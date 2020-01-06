import React, {Component} from 'react';
import findIndex from "lodash/findIndex";
import CommonPagination from '../commons/CommonPagination';
import CommonTable from '../commons/CommonTable';
import filter from 'lodash/filter';
import {TYPE_ACTION} from "../../constants/Constants";
import keys from "lodash/keys";
import isEqual from "lodash/isEqual";
import isEmpty from "lodash/isEmpty";

class CommonTableManage extends Component{

  state = {
    documentsTableStructure: [],
    documentsDataList: [],
    initialIndex: 1,
    quantity: 15,
    searchList: [],
    filteredList: []
  }

  filterData = () => {
    const {searchList} = this.state;
    const {listData} = this.props;
    const keysList = keys(searchList);
    let keysEmpty = true
    let filterData = [...listData]
    keysList.forEach((key)=>{
      if(searchList[key].length>0) {
        filterData = filter(filterData, filter => {
          return filter[key].toLowerCase().includes(searchList[key].toLowerCase())
        });
        keysEmpty=false
      }
    });
    if(keysEmpty) {
      this.setState({documentsDataList: listData})
    } else  this.setState({documentsDataList: filterData})
  }

  changeSearchColumn = (key, value) => {
    let {searchList} = this.state;
    searchList[key] = value;
    this.setState({searchList});
    this.filterData()
  }

  onToggleAddDocSelect=(id)=>{
    const {onSetSelected,onClick} = this.props;
    if(onClick){
      onClick(id)
    }else{
      let {documentsDataList} = this.state;
      const index = findIndex(documentsDataList, {id: id});
      documentsDataList[index].check = !documentsDataList[index].check;
      this.setState({documentsDataList});
      onSetSelected(filter(this.state.documentsDataList, (data)=> data.check))
    }

  };

  renderRowsChecked=()=>{
    let {documentsDataList} = this.state;
    for (let index = 0; index < documentsDataList.length; index++) {
      documentsDataList[index].check = !documentsDataList[index].check;
    }
    this.setState({documentsDataList})
  };

  componentDidMount(){
    const {tableStructure, listData} = this.props
    this.setState({documentsTableStructure: tableStructure(this.renderRowsChecked,this.onToggleAddDocSelect), documentsDataList: listData})
  }

  componentDidUpdate(prevProps){
    const keysList = keys(this.state.searchList);
    if(isEmpty(keysList)){
      if(!isEqual(this.state.documentsDataList, this.props.listData)){
        this.setState({documentsDataList: this.props.listData})
      }
    }
  }

  onChangeInitialIndex=(typeAction)=>{
    const {initialIndex, quantity, documentsDataList} = this.state
    if(typeAction === TYPE_ACTION.ADD){
      if(initialIndex*quantity<=documentsDataList.length){
        this.setState({initialIndex: initialIndex+1})
      }
    }else {
      if((initialIndex-1)*quantity>1){
        this.setState({initialIndex: initialIndex-1})
      }
    }
  }

  renderRows=()=>{
    const {initialIndex,quantity,documentsDataList} = this.state

    let list = []
    const top = (initialIndex*quantity>documentsDataList.length)?documentsDataList.length:initialIndex*quantity

    for (let i = (initialIndex-1)*quantity; i < top; i++) {
      list.push(documentsDataList[i])
    }
    return list
  }

  render(){
    const {title, containHeader, getFooterTableStructure,className} = this.props
    const {totalPages, currentPage, documentsTableStructure} = this.state;
    const contentFooterTable = (getFooterTableStructure) ? getFooterTableStructure() : []
    return(
      <div className='container-documents'>
        <div className='container-header'>
          <div className='header-title'>
            <h3>{title}</h3>
          </div>
          <div className='container-content'>
            {
              (containHeader) ? containHeader : null
            }
            <div className='content-pagination'>
              <CommonPagination totalPages={totalPages}
                                currentPage={currentPage}
                                onChangeCurrentPageSubtract={this.onChangeInitialIndex}
                                onChangeCurrentPageAdd={this.onChangeInitialIndex}/>
            </div>
            <div className={'container-table '+(className? className: '')}>
              {(documentsTableStructure && documentsTableStructure.length > 0) ?
                <CommonTable tableStructure={documentsTableStructure} data={this.renderRows()}
                             onClick={(index) => this.onToggleAddDocSelect(index)} onChange={this.changeSearchColumn}/> : null
              }
            </div>
            <div className='content-pagination'>
              <CommonPagination totalPages={totalPages}
                                currentPage={currentPage}
                                onChangeCurrentPageSubtract={this.onChangeInitialIndex}
                                onChangeCurrentPageAdd={this.onChangeInitialIndex}/>
            </div>
            {
              contentFooterTable && contentFooterTable.length>0 ?
                <div className='container-buttons-footer'>
                  {
                    contentFooterTable.map((content, index)=>{
                      return <button key={'button'+index} className='btn btn-dark' style={content.style} onClick={content.action}>
                        {content.text}
                      </button>
                    })
                  }
                </div> : null
            }
          </div>
        </div>
      </div>
    )
  }
}

export default CommonTableManage