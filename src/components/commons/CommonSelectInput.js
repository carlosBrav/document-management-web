import React, {Component} from 'react';

class CommonSelectInput extends Component{

  onChange=(idSection, e)=>{
    const {onChange,onChangeInputSelect,useOnChange} = this.props
    onChange(idSection, e.target.value)
    if(useOnChange && onChangeInputSelect){
      onChangeInputSelect(e.target.value)
    }
  };

  render(){
    const {idSection, isFormCircular, listItems, label , classContainer, classInput, isRequired, value} = this.props
    return(
      <div className={`form-group section-form ${(classContainer) ? classContainer : ''}`}>
        <label className={'label-form '+(isFormCircular ? 'circular':'')} htmlFor={idSection}>{label}</label>
        <select id={idSection+'select'}
                className={`form-control ${classInput}`}
                style={(isFormCircular)? {width: '40%'}: {}}
                onChange={(e)=> this.onChange(idSection, e)} required={isRequired} defaultValue={value}>
          <option selected value={'-1'}>Seleccione</option>
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