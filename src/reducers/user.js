import * as Constants from '../actions/Constants';

const initialState =  {userBossOffice: {}, isLoading: false, movements: [], adminMovements:[]};

export function user(state = initialState, action) {
  const {data, errors} = action
  switch (action.type) {
    case Constants.USER_BOSS_OFFICE_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case Constants.USER_BOSS_OFFICE_SUCCESS:
      return {
        ...state,
        userBossOffice: data,
        isLoading: false
      };
    case Constants.GET_USER_MOVEMENTS_BY_OFFICE_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case Constants.GET_USER_MOVEMENTS_BY_OFFICE_SUCCESS:
      return {
        ...state,
        movements: data,
        isLoading: false
      };
    case Constants.GET_USER_MOVEMENTS_BY_OFFICE_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors
      };
    case Constants.GET_ADMIN_MOVEMENTS_BY_OFFICE_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case Constants.GET_ADMIN_MOVEMENTS_BY_OFFICE_SUCCESS:
      return {
        ...state,
        adminMovements: data,
        isLoading: false
      };
    case Constants.GET_ADMIN_MOVEMENTS_BY_OFFICE_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors
      };
    default:
      return state
  }
}