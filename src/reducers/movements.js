
import {
  INSERT_MOVEMENTS_REQUEST,
  INSERT_MOVEMENTS_SUCCESS,
  INSERT_MOVEMENTS_FAILURE,
  GET_MOVEMENTS_REQUEST,
  GET_MOVEMENTS_SUCCESS,
  GET_MOVEMENTS_FAILURE,
  CLEAN_MOVEMENTS_LIST,
  DELETE_MOVEMENT_REQUEST,
  DELETE_MOVEMENT_SUCCESS,
  CONFIRM_DOCUMENTS_REQUEST,
  CONFIRM_DOCUMENTS_SUCCESS,
  GET_MOVEMENTS_BY_ASSIGNED_TO_REQUEST,
  GET_MOVEMENTS_BY_ASSIGNED_TO_SUCCESS,
  DERIVE_DOCUMENTS_REQUEST,
  DERIVE_DOCUMENTS_SUCCESS,
  DERIVE_DOCUMENTS_FAILURE
} from "../actions/Constants";

const initialState =  {errors: [], message: [], data: [], dataAssigned: [], isLoading: false};

export function movements(state = initialState, action){
  const {errors, data} = action;
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
        errors
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
        errors
      };
    case CLEAN_MOVEMENTS_LIST:
      return {
        ...state,
        isLoading: false,
        errors: [],
        data: []
      };
    case DELETE_MOVEMENT_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case DELETE_MOVEMENT_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case CONFIRM_DOCUMENTS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case CONFIRM_DOCUMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case GET_MOVEMENTS_BY_ASSIGNED_TO_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case GET_MOVEMENTS_BY_ASSIGNED_TO_SUCCESS:
      return {
        ...state,
        isLoading: false,
        dataAssigned: data
      };
    case DERIVE_DOCUMENTS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case DERIVE_DOCUMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        message: data
      };
    case DERIVE_DOCUMENTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors
      };
    default: return state
  }
}