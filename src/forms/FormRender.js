import React, {Component} from 'react';
import map from 'lodash/map';
import CommonElement from '../components/commons/CommonElement';

class FormRender extends Component{

  render(){
    const {formTemplate} = this.props

    const rows = map(formTemplate, (section)=>{
      return (<CommonElement {...section}/>)
    })
    return(
      <form>
        {rows}
      </form>
    )
  }
}

export default FormRender