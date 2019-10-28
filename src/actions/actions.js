
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

export function insertMovements(movements, userId){
  return async dispatch => {
    dispatch(request());
    const {responseCode, data} = await Services.insertMovements(movements,userId)
    if(responseCode === 0){
      dispatch(success(data))
    }else{
      dispatch(failure(data))
    }
  };

  function request() { return { type: Constants.INSERT_MOVEMENTS_REQUEST}}
  function success(data) { return { type: Constants.INSERT_MOVEMENTS_SUCCESS, data}}
  function failure(error) { return { type: Constants.INSERT_MOVEMENTS_FAILURE, error}}
}

export function getMovements(numTram, officeId){
  return async dispatch => {
    dispatch(request());
    const {responseCode, responseMessage, data} = await Services.getMovements(numTram, officeId)
    if(responseCode === 0){
      dispatch(success(data))
    }else{
      dispatch(failure(responseMessage))
    }
  };

  function request() { return { type: Constants.GET_MOVEMENTS_REQUEST}}
  function success(data) { return { type: Constants.GET_MOVEMENTS_SUCCESS, data}}
  function failure(error) { return { type: Constants.GET_MOVEMENTS_FAILURE, error}}
}

export function cleanMovementsList(){
  return { type: Constants.CLEAN_MOVEMENTS_LIST}
}

export function deleteMovement(movementsIds, numTram, officeId){

  return async dispatch => {
    dispatch(request());
    const {responseCode, responseMessage} = await Services.deleteMovement(movementsIds)
    if(responseCode === 0){
      dispatch(success())
      dispatch(getMovements(numTram, officeId))
    }else{
      dispatch(failure(responseMessage))
    }
  };

  function request() { return { type: Constants.DELETE_MOVEMENT_REQUEST}}
  function success() { return { type: Constants.DELETE_MOVEMENT_SUCCESS}}
  function failure(error) { return { type: Constants.DELETE_MOVEMENT_FAILURE, error}}
}

export function getTypeDocuments(){
  return async dispatch => {
    dispatch(request())
    const {responseCode,responseMessage, data} = await Services.getTypeDocuments()
    if(responseCode === 0){
      dispatch(success(data))
    }else{
      dispatch(failure(responseMessage))
    }
  };

  function request() { return { type: Constants.GET_TYPE_DOCUMENTS_REQUEST}}
  function success(data) { return { type: Constants.GET_TYPE_DOCUMENTS_SUCCESS, data}}
  function failure(error) { return { type: Constants.GET_TYPE_DOCUMENTS_FAILURE, error}}
}

export function getCorrelativeMax(officeId, typeDocumentId, siglas){
  return async dispatch => {
    dispatch(request())
    const {responseCode, data} = await Services.getCorrelativeMax(officeId, typeDocumentId, siglas)
    if(responseCode === 0){
      dispatch(success(data))
    }
  }
  function request() { return { type: Constants.GET_CORRELATIVE_MAX_REQUEST}}
  function success(data) { return { type: Constants.GET_CORRELATIVE_MAX_SUCCESS, data}}
}

export function getUserBossOffice(){
  return async dispatch => {
    dispatch(request())
    const {responseCode, data} = await Services.getUserBossOffice()
    if(responseCode === 0){
      dispatch(success(data))
    }
  }
  function request() { return { type: Constants.USER_BOSS_OFFICE_REQUEST}}
  function success(data) { return { type: Constants.USER_BOSS_OFFICE_SUCCESS, data}}
}

export function createCircularDocuments(documentIntern, destinations, officeId, userId){
  return async dispatch => {
    dispatch(request());
    const {responseCode, data, responseMessage} = await Services.createCircularDocuments(documentIntern, destinations, officeId, userId)
    if(responseCode === 0){
      dispatch(success(data))
    }else{
      dispatch(failure(responseMessage))
    }
  };

  function request() { return { type: Constants.CREATE_CIRCULAR_DOCUMENTS_REQUEST}}
  function success(message) { return { type: Constants.CREATE_CIRCULAR_DOCUMENTS_SUCCESS, message}}
  function failure(errors) { return {type: Constants.CREATE_CIRCULAR_DOCUMENTS_FAILURE, errors}}
}

export function getCircularDocuments(typeDocuments, userId){
  return async dispatch => {
    dispatch(request());
    const {responseCode, data, responseMessage} = await Services.getInternDocuments(userId)
    if(responseCode === 0){
      dispatch(success(typeDocuments, data))
    }else{
      dispatch(failure(responseMessage))
    }
  };

  function request() { return { type: Constants.GET_CIRCULAR_DOCUMENTS_REQUEST}}
  function success(typeDocuments, data) { return { type: Constants.GET_CIRCULAR_DOCUMENTS_SUCCESS, typeDocuments, data}}
  function failure(errors) { return { type: Constants.GET_CIRCULAR_DOCUMENTS_FAILURE, errors}}
}

