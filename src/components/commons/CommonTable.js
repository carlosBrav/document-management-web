import React, {Component} from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import keys from 'lodash/keys';
import filter from 'lodash/filter';
import CommonIcon from '../commons/CommonIcon';

const getButton = (actions, rowData) => {
  return actions.map((action, iterator) =>
    (action.actionType === 'button') ?
    <input key={iterator + 'checkbox'} type="checkbox" checked={rowData['check']}
           onClick={(e) => {e.stopPropagation(); action.action(rowData['id'])}}/>
      : <CommonIcon key={iterator + 'icon'} type={action.actionType}
                    onClick={e => {
                      e.stopPropagation();
                      action.action(rowData)
                    }}/>
  )
};

const getInputFilter = (key, onChangeValue) => {
  const onChange = (e) => onChangeValue(key, e.target.value);
  return <input type='text' onChange={onChange}/>
};

const Rows = ({data, tableStructure, onClick}) => {
  return (
    data.map((value, index) => {
      const columns = tableStructure.map((column, index) => {
        const {actions, rowProp} = column;
        return (
          <td key={index + 'td'} className={column.rowStyle}>
            {actions ? getButton(actions, value) : value[rowProp]}
          </td>
        )
      });

      return (
        <tr key={value['id']+'tr'} onClick={() => onClick(value['id'])}
            className={(value['check'] ? 'selected-row' : 'unselected-row ' + (index % 2 === 0 ? 'row-par' : 'row-impar'))}>
          {columns}
        </tr>
      )
    })
  )
}

class CommonTable extends Component {

  constructor() {
    super();
    this.state = {
      searchList: [],
      filteredList: []
    }
  }

  changeSearchColumn = (key, value) => {
    let {searchList} = this.state;
    searchList[key] = value;
    this.setState({searchList});
    this.filterData()
  }

  filterData = () => {
    const {searchList} = this.state;
    const {data} = this.props;
    const keysList = keys(searchList);
    let keysEmpty = true
    let filterData = data
    keysList.map((key)=>{
      if(searchList[key].length>0) {
        filterData = filter(filterData, filter => {
          return filter[key].toLowerCase().includes(searchList[key].toLowerCase())
        });
        keysEmpty=false
      }
    });
    if(keysEmpty) {
      this.setState({filteredList: data})
    } else  this.setState({filteredList: filterData})
  }

  componentDidMount() {
    const {filteredList} = this.state;
    const {data} = this.props;
    if (!isEqual(data, filteredList)) {
      this.setState({filteredList: data})
    }
  }

  render() {
    const {tableStructure, onClick} = this.props;
    const {filteredList} = this.state;
    return (
      <table>
        <thead>
        <tr>
          {
            tableStructure.map((value, i) =>
              <th key={'th-' + i}>
                {(value.filterHeader) ?
                  <span className={value.classSearchRow}>
                    {value.columnHeader}
                    {getInputFilter(value.rowProp, this.changeSearchColumn)}
                    </span>
                  : value.columnHeader
                }
              </th>
            )
          }
        </tr>
        </thead>
        <tbody>
        <Rows data={filteredList} tableStructure={tableStructure} onClick={onClick}/>
        </tbody>
      </table>
    )
  }
}

CommonTable.propTypes = {
  tableStructure: PropTypes.arrayOf(
    PropTypes.shape({
      columnHeader: PropTypes.string,
      rowProp: PropTypes.string,
      classSearchRow: PropTypes.string,
      filterHeader: PropTypes.bool
    })),
  data: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func
}

export default CommonTable