import React, {Component} from 'react';

class CommonTextInput extends Component{

  render(){
    const {idSection, isFormCircular, label, onChange, classContainer, classInput, isRequired, isReadOnly, value, type='text'} = this.props
    return(
      <div className={`form-group section-form ${(classContainer) ? classContainer : ''}`}>
        <label className={'label-form '+(isFormCircular ? 'circular':'')} htmlFor={idSection}>{label}</label>
        <input type={type}
               className={`form-control ${(classInput)?classInput:''}`}
               id={idSection}
               style={(isFormCircular)? {width: '40%'}: {}}
               onChange={(e)=>onChange(idSection, e.target.value)}
               required={isRequired}
               readOnly={isReadOnly}
               value={value}/>
      </div>
    )
  }
}
export default CommonTextInput