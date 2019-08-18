import React, {Component} from 'react';
import map from 'lodash/map';
import CommonElement from '../components/commons/CommonElement';

class FormRender extends Component{

  render(){
    const {formTemplate, onChange, valueMap} = this.props

    const rows = map(formTemplate, (section)=>{
      return (<CommonElement valueMap={valueMap} onChange={onChange} {...section}/>)
    })
    return(
      <form>
        {rows}
      </form>
    )
  }
}

export default FormRender