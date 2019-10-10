

import * as Constants from '../actions/Constants';
const initialState =  {dependencies: []};

export function initialData(state = initialState, action){
  const {data} = action
  switch(action.type){
    case Constants.GET_INITIAL_DATA:
      return {
        ...data
      };
    default:
      return state
  }
}