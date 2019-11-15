import React, {Component} from 'react';
import {TYPE_INPUT} from '../../constants/Constants';
import CommonTextInput from "./CommonTextInput";
import CommonTextArea from "./CommonTextArea";
import CommonSelectInput from "./CommonSelectInput";
import get from 'lodash/get';
import CommonPickList from "./CommonPickList";

const InputTextElement=(props)=>(
  <CommonTextInput idSection={props.id}
                   label={props.label}
                   onChange={props.onChange}
                   classContainer={props.classContainer}
                   classInput={props.classInput}
                   isRequired={props.required}
                   isReadOnly={props.readOnly}
                   value={get(props.valueMap,props.id,'')}
                   isFormCircular={props.isFormCircular}/>
);

const InputTextAreaElements=(props)=>(
  <CommonTextArea idSection={props.id}
                  label={props.label}
                  onChange={props.onChange}
                  classContainer={props.classContainer}
                  classInput={props.classInput}
                  isRequired={props.required}
                  isReadOnly={props.readOnly}
                  value={get(props.valueMap,props.id,'')}
                  isFormCircular={props.isFormCircular}/>
)

const InputSelect=(props)=>(
  <CommonSelectInput idSection={props.id}
                     label={props.label}
                     onChange={props.onChange}
                     classContainer={props.classContainer}
                     classInput={props.classInput}
                     isRequired={props.required}
                     isReadOnly={props.readOnly}
                     listItems={props.listItems}
                     value={get(props.valueMap,props.id,'')}
                     isFormCircular={props.isFormCircular}
                     useOnChange={props.useOnChange}
                     onChangeCustom={props.onChangeCustom}/>
);

class CommonElement extends Component{

  getElementComponent = (type) =>{

    switch(type){
      case TYPE_INPUT.INPUT_TEXT:
        return <InputTextElement {...this.props} />;
      case TYPE_INPUT.INPUT_TEXT_AREA:
        return <InputTextAreaElements {...this.props} />;
      case TYPE_INPUT.INPUT_SELECT:
        return <InputSelect  {...this.props} />;
      case TYPE_INPUT.INPUT_CIRCULAR:
        return <CommonPickList {...this.props}/>;
      default:
        return null
    }
  };

  render(){
    const {type} = this.props
    return(
      this.getElementComponent(type)
    )
  }
}
export default CommonElement