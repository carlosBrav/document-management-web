import React, {Component} from 'react';
import findIndex from "lodash/findIndex";
import CommonPagination from '../commons/CommonPagination';
import CommonTable from '../commons/CommonTable';
import CommonModal from '../commons/CommonModal';
import filter from 'lodash/filter';

class CommonTableManage extends Component{

  state = {
    totalPages: 10,
    currentPage: 1,
    documentsTableStructure: [],
    documentsDataList: [],
  }

  onToggleAddDocSelect=(id)=>{
    let {documentsDataList} = this.state;
    const index = findIndex(documentsDataList, {id: id});
    documentsDataList[index].check = !documentsDataList[index].check;
    this.setState({documentsDataList})
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

  componentDidMount(){
    const {tableStructure, listData} = this.props
    this.setState({documentsTableStructure: tableStructure(this.onToggleAddDocSelect), documentsDataList: listData})
  }

  onGetCheckRows = () => {
    const {documentsDataList} = this.state
    return filter(documentsDataList, (data)=> data.check)
  }

  render(){
    const {title, containHeader, modalProps, getFooterTableStructure} = this.props
    const {totalPages, currentPage, documentsTableStructure, documentsDataList} = this.state;
    const contentFooterTable = (getFooterTableStructure) ? getFooterTableStructure() : []
    return(
      <div className='container-documents'>
        <CommonModal {...modalProps}/>
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
                                onChangeCurrentPage={this.onChangeCurrentPage}
                                onChangeCurrentPageSubtract={this.onChangeCurrentPageSubtract}
                                onChangeCurrentPageAdd={this.onChangeCurrentPageAdd}/>
            </div>
            <div className='container-table'>
              {(documentsTableStructure && documentsTableStructure.length > 0) ?
                <CommonTable tableStructure={documentsTableStructure} data={documentsDataList}
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
            {
              contentFooterTable && contentFooterTable.length>0 ?
                <div className='container-buttons-footer'>
                  {
                    contentFooterTable.map((content, index)=>{
                      return <button key={'button'+index} className='btn btn-dark' style={content.style} onClick={()=>content.action(this.onGetCheckRows())}>
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