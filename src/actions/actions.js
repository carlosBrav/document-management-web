
import Services from "../services/Services";
import * as Constants   from './Constants'
import {saveObj, proceedLogout, getDecodedToken, getCurrentUser} from "../utils/Utils";


export function isLogged() {
  return dispatch => {
    dispatch(validate({ token: getDecodedToken(), loggedInUser: getCurrentUser() }));
  };

  function validate() { return { type: Constants.VALIDATE_ACCESS } }
}

export function login(username, password) {
  return dispatch => {
    dispatch(request());

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

export function getView2Data(){
  return async dispatch => {
    dispatch(request())
    const {responseCode, responseMessage, data} = await Services.getView2Data()
    if(responseCode === 0){
      dispatch(success(data))
    }else{
      dispatch(failure(responseMessage))
    }
  };

  function request() { return { type: Constants.GET_VIEW2_DATA_REQUEST } }
  function success(data) { return { type: Constants.GET_VIEW2_DATA_SUCCESS, data  } }
  function failure(responseMessage) { return { type: Constants.GET_VIEW2_DATA_FAILURE, responseMessage } }
}

export function loadInitialData(){
  return async dispatch => {
    const {data} = await Services.getInitialData()
    dispatch(success(data))
  };

  function success(data) { return { type: Constants.GET_INITIAL_DATA, data}}
}