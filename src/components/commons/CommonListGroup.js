import React, {Component} from 'react';
import map from "lodash/map";

class CommonListGroup extends Component{

  render(){
    const {idSection,numDocument, listDestinations} = this.props
    return(
      <div className='form-group'>
        <div className='form-group section-form'>
          <label className='label-form edit-circular-label'>{'Documento:'}</label>
          <input readOnly value={numDocument} type='text' className={`form-control`}/>
        </div>
        <div className='form-group section-form'>
          <label className='label-form edit-circular-list' htmlFor={idSection}>{'Dirigido a:'}</label>
          <ul className="list-group custom-list-group">
            {
              listDestinations && listDestinations.length>0?
                map(listDestinations, destination =>{
                  return <li className="list-group-item">{destination.value}</li>
                }) : null
            }
          </ul>
        </div>
      </div>
    )
  }
}
export default CommonListGroup