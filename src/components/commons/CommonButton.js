import React, {Component} from 'react';
import {BUTTON_TYPE} from "../../constants/Constants";

class CommonButton extends Component{

   getCheckboxButton=()=>{
     const {onClick} = this.props
    return(
      <div>
        <input type="checkbox" value="first_checkbox" onChange={onClick}/>
      </div>

    )
  }

  getButton =(type)=>{
    if(type === BUTTON_TYPE.CHECKBOX){
      return this.getCheckboxButton()
    }
  }

  render(){
    const {type} = this.props
    return(
      <span>
      {this.getButton(type)}
    </span>
    )
  }
}

export default CommonButton;