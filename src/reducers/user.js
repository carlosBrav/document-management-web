import * as Constants from '../actions/Constants';

const initialState =  {userBossOffice: {}, isLoading: false};

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
    default:
      return state
  }
}