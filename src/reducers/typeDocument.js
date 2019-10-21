import {
  GET_TYPE_DOCUMENTS_REQUEST, GET_TYPE_DOCUMENTS_SUCCESS, GET_TYPE_DOCUMENTS_FAILURE
} from "../actions/Constants";

const initialState =  {errors: [], data: [], isLoading: false};

export function typeDocuments(state = initialState, action){
  const {error, data} = action;
  switch(action.type){
    case GET_TYPE_DOCUMENTS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case GET_TYPE_DOCUMENTS_SUCCESS:
      return {
        ...state,
        data,
        isLoading: false
      };
    case GET_TYPE_DOCUMENTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: error
      };
    default: return state
  }
}