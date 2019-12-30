import React, {Component} from 'react';

class CommonSelectInput extends Component{

  onChange=(idSection, e)=>{
    const {onChange,onChangeCustom} = this.props
    onChange(idSection, e.target.value)
    if(onChangeCustom){
      onChangeCustom(e.target.value)
    }
  };

  render(){
    const {idSection, isFormCircular, listItems, label , classContainer, classInput, isRequired, value, isReadOnly} = this.props
    return(
      <div className={`form-group section-form ${(classContainer) ? classContainer : ''}`}>
        <label className={'label-form '+(isFormCircular ? 'circular':'')} htmlFor={idSection}>{label}</label>
        <select id={idSection+'select'}
                className={`form-control ${classInput}`}
                style={(isFormCircular)? {width: '40%'}: {}}
                onChange={(e)=> this.onChange(idSection, e)}
                required={isRequired}
                value={value}
                disabled={isReadOnly}>
          <option value={' '}>Seleccione</option>
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