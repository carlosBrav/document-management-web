import React, {Component} from 'react';

export const STATUS_LEVEL={
  BASIC: 'basic',
  WARNING: 'warning',
  DANGER: 'danger'
}

class CommonCircle extends Component{

  render(){
    const {type} = this.props
    return(
      <div className={'circle '+type}/>
    )
  }
}

export default CommonCircle;