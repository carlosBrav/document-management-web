import React, {Component} from 'react';
import PropTypes from 'prop-types';

const getButton = (actions, rowData, index) => {
  return actions.map((action, iterator) =>
    <input key={iterator + 'checkbox'} type="checkbox" checked={rowData['check']}
           onChange={() => action.action(index)}/>
  )
}

const Rows = ({data, tableStructure, onClick}) => {
  return (
    data.map((value, index) => {
      const columns = tableStructure.map(column => {
        const {actions, rowProp} = column;
        return (
          <td key={value['id'] + rowProp}>
            {actions ? getButton(actions, value, index) : value[rowProp]}
          </td>
        )
      });

      return (
        <tr key={value['id']} onClick={() => onClick(index)}
            className={(value['check'] ? 'selected-row' : 'unselected-row '+(index%2 === 0 ? 'row-par' : 'row-impar'))}>
          {columns}
        </tr>
      )
    })
  )
}

class CommonTable extends Component {

  render() {

    const {tableStructure, data, onClick} = this.props
    return (
        <table>
          <thead>
          <tr>
            {
              tableStructure.map((value, i) =>
                <th key={'th-' + i}>
                  {value.searchRow ?
                    <span className={value.classSearchRow}>
                    {value.columnHeader}
                      {value.searchRow}
                  </span>
                    : value.columnHeader}
                </th>
              )
            }
          </tr>
          </thead>
          <tbody>
          <Rows data={data} tableStructure={tableStructure} onClick={onClick}/>
          </tbody>
        </table>
    )
  }
}

CommonTable.propTypes = {
  tableStructure: PropTypes.arrayOf(
    PropTypes.shape({
      columnHeader: PropTypes.string,
      rowProp: PropTypes.string
    })),
  data: PropTypes.arrayOf(PropTypes.object),
  onClick: PropTypes.func
}

CommonTable.defaultProps = {
  data: []
};
export default CommonTable