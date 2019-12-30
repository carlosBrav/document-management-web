

import * as Constants from '../actions/Constants';
const initialState =  {dependencies: [], users: []};

export function initialData(state = initialState, action){
  const {initialData, data,users, errors} = action
  switch(action.type){
    case Constants.GET_INITIAL_DATA:
      const {dependencies, users} = initialData
      return {
        ...state,
        dependencies,
        users
      };
    case Constants.LOAD_ALL_USERS_REQUEST:
    case Constants.LOAD_ALL_OFFICES_REQUEST:
      return{
        ...state,
        isLoading: true
      };
    case Constants.LOAD_ALL_USERS_SUCCESS:
    case Constants.LOAD_ALL_OFFICES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        users: data
      };
    case Constants.LOAD_ALL_USERS_FAILURE:
    case Constants.LOAD_ALL_OFFICES_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors
      };
    default:
      return state
  }
}