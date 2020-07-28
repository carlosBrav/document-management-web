import React, {Component} from 'react';
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import CommonIcon from '../commons/CommonIcon';
import CommonButton from "./CommonButton";
import {BUTTON_TYPE} from "../../constants/Constants";

const getButton = (actions, rowData) => {
  return actions.map((action, iterator) =>
    (action.actionType === 'button') ?
      <input key={iterator + 'checkbox'} type="checkbox" checked={rowData['check']}
             onClick={(e) => {
               action.action(rowData['id'])
               e.stopPropagation();
             }}/>
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
        const {actions, rowProp, cellRenderer} = column;
        return (
          <td key={index + 'td'} className={column.rowStyle}>
            {actions ? getButton(actions, value) : cellRenderer ? cellRenderer({value}) : value[rowProp]}
          </td>
        )
      });

      return (
        <tr key={value['id'] + 'tr'} onClick={() => onClick(value['id'])}
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
      filteredList: []
    }
  }

  componentDidMount() {
    const {filteredList} = this.state;
    const {data} = this.props;
    if (!isEqual(data, filteredList)) {
      this.setState({filteredList: data})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!isEqual(this.props.data, this.state.filteredList)) {
      this.setState({filteredList: this.props.data})
    }
  }

  render() {
    const {tableStructure, onClick, onChange} = this.props;
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
                    {getInputFilter(value.rowProp, onChange)}
                    </span>
                  : (value.elementHeader) ?
                    <span>
                      <CommonButton onClick={value.actionHeader} type={BUTTON_TYPE.CHECKBOX}/>
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
  onClick: PropTypes.func,
  onChange: PropTypes.func
}

export default CommonTable