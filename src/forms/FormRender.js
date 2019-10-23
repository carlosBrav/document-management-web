import React, {Component} from 'react';
import map from 'lodash/map';
import CommonElement from '../components/commons/CommonElement';

class FormRender extends Component{

  render(){
    const {formTemplate, onChange, isFormCircular, valueMap, onChangeInputSelect} = this.props

    const rows = map(formTemplate, (section)=>{
      return (<CommonElement onChangeInputSelect={onChangeInputSelect}
                             isFormCircular={isFormCircular}
                             valueMap={valueMap} onChange={onChange}
                             {...section}/>)
    })
    return(
      <form>
        {rows}
      </form>
    )
  }
}

export default FormRender