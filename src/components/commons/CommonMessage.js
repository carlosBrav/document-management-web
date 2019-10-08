import React from 'react';
import isArray from 'lodash/isArray'

export const MESSAGE_TYPE = {
  SUCCESS : 0,
  DANGER : 1
}

function getList(text){
  if(isArray(text))
    return text.join(', ');
  else
    return text;
}

const Message = ({ type, text}) => {
  if(type === MESSAGE_TYPE.SUCCESS){
    return (<div className="alert-own alert-success" role="alert">
        <h5>{getList(text)}</h5>
      </div>)
  } else if (type === MESSAGE_TYPE.DANGER){
    return(
      <div className="alert-own alert-danger" role="alert">
        <h5>{getList(text)}</h5>
      </div>
    )
  }
};

export default Message