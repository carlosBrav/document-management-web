import map from "lodash/map";
import * as Constants from '../actions/Constants';
import {getDecodedToken, getCurrentUser} from '../utils/Utils';

const initialState =  {errors: []};

export function authentication(state = initialState, action) {

  switch (action.type) {
    case Constants.VALIDATE_ACCESS:
      return {
        loggedIn: true,
        token : getDecodedToken(),
        loggedInUser: getCurrentUser()
      };
    case Constants.LOGIN_REQUEST:
      return {
        loggingIn: true,
      };
    case Constants.LOGIN_SUCCESS:
      const {user} = action;
      return {
        token : getDecodedToken(),
        loggedIn: true,
        loggedInUser: user
      };
    case Constants.LOGIN_FAILURE:
      const {errors, responseMessage} = action;
      const _errors = errors && errors.length > 0 ? map(errors, (error, i) => ( error.message || error)) : [responseMessage];
      return {
        ...state,
        isLoading:false,
        errors: _errors
      };
    case Constants.LOGOUT_SUCCESS:
      return {
        loggedIn: false,
        token : null,
        loggedInUser: null
      };
    default:
      return state
  }
}