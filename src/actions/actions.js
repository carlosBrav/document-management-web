
import Services from "../services/Services";
import * as Constants   from './constants'
import {saveObj, proceedLogout, getDecodedToken, getCurrentUser} from "../utils/Utils";


export function isLogged() {
  return dispatch => {
    dispatch(validate({ token: getDecodedToken(), loggedInUser: getCurrentUser() }));
  };

  function validate() { return { type: Constants.VALIDATE_ACCESS } }
}

export function login(username, password) {
  return dispatch => {
    dispatch(request({ username }));

    return Services.login(username, password)
      .then(
        response => {
          const { responseCode = 0, errors, responseMessage} = response
          if(responseCode === 0) {
            saveObj('CURRENT_USER', {...response.data});
            dispatch(success(response.data));
          } else {
            dispatch(failure(errors, responseMessage))
          }
          return response;
        },
        error => {
          dispatch(failure(error.toString()));
          return error;
        }
      );
  };

  function request() { return { type: Constants.LOGIN_REQUEST } }
  function success(user) { return { type: Constants.LOGIN_SUCCESS, user  } }
  function failure(errors, responseMessage) { return { type: Constants.LOGIN_FAILURE, errors, responseMessage } }
}

export function logout() {
  return dispatch => {
    proceedLogout();
    dispatch(callLogout());
  };

  function callLogout() { return { type: Constants.LOGOUT_SUCCESS } }
}