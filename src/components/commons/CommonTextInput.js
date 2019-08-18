import React, {Component} from 'react';

class CommonTextInput extends Component{

  render(){
    const {idSection, label, onChange, classContainer, classInput, isRequired, isReadOnly, value} = this.props
    return(
      <div className={`form-group section-form ${(classContainer) ? classContainer : ''}`}>
        <label className='label-form' htmlFor={idSection}>{label}</label>
        <input type="text"
               className={`form-control ${(classInput)?classInput:''}`}
               id={idSection}
               onChange={(e)=>onChange(idSection, e.target.value)}
               required={isRequired}
               readOnly={isReadOnly}
               value={value}/>
      </div>
    )
  }
}
export default CommonTextInput