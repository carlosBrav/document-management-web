import * as Constants from '../actions/Constants';

const initialState =  {office: null};

export function office(state = initialState, action) {
  const {data, errors} = action
  switch (action.type) {
    case Constants.DELETE_OFFICE_REQUEST:
    case Constants.UPDATE_OFFICE_REQUEST:
    case Constants.CREATE_OFFICE_REQUEST:
    case Constants.LOAD_OFFICE_BY_ID_REQUEST:
      return{
        ...state,
        isLoading: true
      };
    case Constants.DELETE_OFFICE_SUCCESS:
    case Constants.UPDATE_OFFICE_SUCCESS:
    case Constants.CREATE_OFFICE_SUCCESS:
      return {
        ...state,
        isLoading: false
      }
    case Constants.LOAD_OFFICE_BY_ID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        office: data
      };
    case Constants.DELETE_OFFICE_FAILURE:
    case Constants.UPDATE_OFFICE_FAILURE:
    case Constants.CREATE_OFFICE_FAILURE:
    case Constants.LOAD_OFFICE_BY_ID_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors
      };
    default:
      return state
  }
}