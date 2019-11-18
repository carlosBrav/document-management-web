import React, {Component} from 'react';

class CommonTextArea extends Component{

  render(){
    const {idSection, value, isFormCircular, label, onChange, classContainer, classInput, isRequired, isReadOnly} = this.props;
    return(
      <div className={`form-group section-form ${(classContainer) ? classContainer : ''}`}>
        <label className={'label-form '+(isFormCircular ? 'circular':'')} htmlFor={idSection}>{label}</label>
        <textarea rows="3"
                  className={`form-control ${(classInput)?classInput:''}`}
                  style={(isFormCircular)? {width: '40%'}: {}}
                  id={idSection}
                  onChange={(e)=>onChange(idSection, e.target.value)}
                  required={isRequired}
                  readOnly={isReadOnly}
                  value={value}/>
      </div>
    )
  }
}
export default CommonTextArea