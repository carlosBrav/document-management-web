import React, {Component} from 'react';

class CommonTextInput extends Component{

  render(){
    const {idSection, label, onChange, classContainer, classInput, isRequired, isReadOnly} = this.props
    return(
      <div className={`form-group ${(classContainer) ? classContainer : ''}`}>
        <label htmlFor={idSection}>{label}</label>
        <input type="text"
               className={`form-control ${(classInput)?classInput:''}`}
               id={idSection}
               onChange={onChange}
               required={isRequired}
               readOnly={isReadOnly}/>
      </div>
    )
  }
}
export default CommonTextInput