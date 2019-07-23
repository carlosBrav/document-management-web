import React, {Component} from 'react';
import {Table} from 'react-bootstrap';
import PropTypes from 'prop-types';


const Rows = ({data, tableStructure}) => {
  return(
    data.map((value) => {
      const columns = tableStructure.map(column => {
        const {rowProp, cellRenderer} = column;
        return(
          <td key={value['id']+rowProp}>
            { cellRenderer ? cellRenderer(value) : value[rowProp]}
          </td>
        )
      });

      return(
        <tr key={value['id']}>
          {columns}
        </tr>
      )
    })
  )
}

class CommonTable extends Component{

  render(){

    const {tableStructure, data} = this.props
    return(
      <Table striped hover>
        <thead>
        <tr>
          {
            tableStructure.map((value,i)=>
              <th key={'th-'+i}>
                {value.columnHeader}
              </th>
            )
          }
        </tr>
        </thead>
        <tbody>
        <Rows data={data} tableStructure={tableStructure} />
        </tbody>
      </Table>
    )
  }
}

CommonTable.propTypes = {
  tableStructure : PropTypes.arrayOf(
    PropTypes.shape({
      columnHeader: PropTypes.string,
      rowProp: PropTypes.string
    })),
  data: PropTypes.arrayOf(PropTypes.object)
}

CommonTable.defaultProps = {
  data: []
};
export default CommonTable