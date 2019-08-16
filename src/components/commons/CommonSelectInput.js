import React, {Component} from 'react';

class CommonSelectInput extends Component{

  render(){
    const {idSection, listItems, label, onChange, classContainer, classInput, isRequired} = this.props
    return(
      <div className={`form-group ${(classContainer) ? classContainer : ''}`}>
        <label htmlFor={idSection}>{label}</label>
        <select id={idSection+'select'} className={`form-control ${classInput}`} onChange={onChange} required={isRequired}>
          <option selected value={'0'}>Seleccione</option>
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