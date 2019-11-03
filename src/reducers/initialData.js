

import * as Constants from '../actions/Constants';
const initialState =  {dependencies: [], users: []};

export function initialData(state = initialState, action){
  const {initialData} = action
  switch(action.type){
    case Constants.GET_INITIAL_DATA:
      const {dependencies, users} = initialData
      return {
        ...state,
        dependencies,
        users
      };
    default:
      return state
  }
}