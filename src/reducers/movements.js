
import {
  INSERT_MOVEMENTS_REQUEST,
  INSERT_MOVEMENTS_SUCCESS,
  INSERT_MOVEMENTS_FAILURE,
  GET_MOVEMENTS_REQUEST, GET_MOVEMENTS_SUCCESS, GET_MOVEMENTS_FAILURE, CLEAN_MOVEMENTS_LIST
} from "../actions/Constants";

const initialState =  {errors: [], data: [], isLoading: false};

export function movements(state = initialState, action){
  const {error, data} = action;
  switch(action.type){
    case INSERT_MOVEMENTS_REQUEST:
      return {...state, isLoading: true}
    case INSERT_MOVEMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data,
        errors: []
      };
    case INSERT_MOVEMENTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: error
      };
    case GET_MOVEMENTS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case GET_MOVEMENTS_SUCCESS:
      return {
        ...state,
        data,
        isLoading: false
      };
    case GET_MOVEMENTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: error
      };
    case CLEAN_MOVEMENTS_LIST:
      return {
        ...state,
        isLoading: false,
        errors: [],
        data: []
      }
    default: return state
  }
}