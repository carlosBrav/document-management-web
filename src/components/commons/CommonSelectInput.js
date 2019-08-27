import React, {Component} from 'react';

class CommonSelectInput extends Component{

  render(){
    const {idSection, isFormCircular, listItems, label, onChange, classContainer, classInput, isRequired, value} = this.props
    return(
      <div className={`form-group section-form ${(classContainer) ? classContainer : ''}`}>
        <label className={'label-form '+(isFormCircular ? 'circular':'')} htmlFor={idSection}>{label}</label>
        <select id={idSection+'select'} className={`form-control ${classInput}`} style={{fontSize: 13}}
                onChange={(e)=> onChange(idSection, e.target.value)} required={isRequired} defaultValue={value}>
          <option selected value={''}>Seleccione</option>
          {
            listItems && listItems.length>0 ?
              listItems.map((item, index)=>{
                return <option key={'option'+index} value={item.id}>{item.value}</option>
              }) : null
          }

        </select>
      </div>
    )
  }
}
export default CommonSelectInput