import React, {Component} from 'react';
import FormRender from '../../forms/FormRender';
import {formOficios} from '../../forms/templates/TemplateCreateOficios';

class Test extends Component{

  render(){
    return(
      <FormRender formTemplate={formOficios} />
    )
  }
}

export default Test