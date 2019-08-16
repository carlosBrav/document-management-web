import React, {Component} from 'react';
import {TYPE_INPUT} from '../../constants/Constants';
import CommonTextInput from "./CommonTextInput";
import CommonTextArea from "./CommonTextArea";
import CommonSelectInput from "./CommonSelectInput";


const inputTextElement=(props)=>(
  <CommonTextInput idSection={props.id}
                   label={props.label}
                   onChange={props.onChange}
                   classContainer={props.classContainer}
                   classInput={props.classInput}
                   isRequired={props.required}
                   isReadOnly={props.readOnly}/>
)

const inputTextAreaElements=(props)=>(
  <CommonTextArea idSection={props.id}
                  label={props.label}
                  onChange={props.onChange}
                  classContainer={props.classContainer}
                  classInput={props.classInput}
                  isRequired={props.required}
                  isReadOnly={props.readOnly}/>
)

const inputSelect=(props)=>(
  <CommonSelectInput idSection={props.id}
                     label={props.label}
                     onChange={props.onChange}
                     classContainer={props.classContainer}
                     classInput={props.classInput}
                     isRequired={props.required}
                     isReadOnly={props.readOnly}
                     listItems={props.listItems}/>
)


class CommonElement extends Component{

  getElementComponent = (type) =>{

    switch(type){
      case TYPE_INPUT.INPUT_TEXT:
        return inputTextElement(...this.props);
      case TYPE_INPUT.INPUT_TEXT_AREA:
        return inputTextAreaElements(...this.props);
      case TYPE_INPUT.INPUT_SELECT:
        return inputSelect(...this.props);
      default:
        return null
    }
  }

  render(){
    const {type} = this.props
    return(
      this.getElementComponent(type)
    )
  }
}
export default CommonElement