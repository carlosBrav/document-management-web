import {
  GET_CORRELATIVE_MAX_REQUEST,GET_CORRELATIVE_MAX_SUCCESS
} from "../actions/Constants";

const initialState =  {documentNumber: "",documentSiglas: "", documentYear: "", isLoading: false};

export function correlative(state = initialState, action){
  const {data} = action;
  switch(action.type){
    case GET_CORRELATIVE_MAX_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case GET_CORRELATIVE_MAX_SUCCESS:
      const {documentNumber, documentSiglas, documentYear} = data
      return {
        ...state,
        documentNumber,
        documentSiglas,
        documentYear,
        isLoading: false
      };
    default: return state
  }
}