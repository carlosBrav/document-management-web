import React, {Component} from 'react';

class CommonTextArea extends Component{

  render(){
    const {idSection, label, onChange, classContainer, classInput, isRequired, isReadonly} = this.props
    return(
      <div className={`form-group ${(classContainer) ? classContainer : ''}`}>
        <label htmlFor={idSection}>{label}</label>
        <textarea rows="3"
                  className={`form-control ${(classInput)?classInput:''}`}
                  id={idSection}
                  onChange={onChange}
                  required={isRequired}
                  readOnly={isReadonly}/>
      </div>
    )
  }
}
export default CommonTextArea