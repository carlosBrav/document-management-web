
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
  return async dispatch => {
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
    console.log("initial data exec")
    const {data} = await Services.getInitialData()
    dispatch(success(data))
  };

  function success(initialData) { return { type: Constants.GET_INITIAL_DATA, initialData}}
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

export function editCircularDocuments(id, valueMap){
  return async dispatch => {
    dispatch(request());
    const {responseCode,errors, message} = await Services.editDocuments(id, valueMap)
    if(responseCode === 0){
      dispatch(success(message))
    }else{
      dispatch(failure(errors))
    }
  };

  function request(){ return { type: Constants.EDIT_CIRCULAR_DOCUMENTS_REQUEST}}
  function success(message) { return { type: Constants.EDIT_CIRCULAR_DOCUMENTS_SUCCESS, message}}
  function failure(errors){ return { type: Constants.EDIT_CIRCULAR_DOCUMENTS_FAILURE, errors}}
}

export function editDocuments(id, valueMap){
  return async dispatch => {
    dispatch(request());
    const response =  await Services.editDocuments(id, valueMap)
    const {responseCode,errors} = response
    if(responseCode === 0){
      dispatch(success())
    }else{
      dispatch(failure(errors))
    }
    return response
  };

  function request(){ return { type: Constants.UPDATE_INTERN_DOCUMENTS_REQUEST}}
  function success() { return { type: Constants.UPDATE_INTERN_DOCUMENTS_SUCCESS}}
  function failure(errors){ return { type: Constants.UPDATE_INTERN_DOCUMENTS_FAILURE, errors}}
}

export function getInternDocuments(userId){
  return async dispatch => {
    dispatch(request());
    const {responseCode, data, responseMessage} = await Services.getInternDocuments(userId)
    if(responseCode === 0){
      dispatch(success(data))
    }else{
      dispatch(failure(responseMessage))
    }
  };

  function request() { return { type: Constants.GET_INTERN_DOCUMENTS_REQUEST}}
  function success(data) { return { type: Constants.GET_INTERN_DOCUMENTS_SUCCESS, data}}
  function failure(errors) { return { type: Constants.GET_INTERN_DOCUMENTS_FAILURE, errors}}
}

export function getInternDocumentsByOffice(typeDocumentId, officeId){
  return async dispatch => {
    dispatch(request());
    const {responseCode, data, responseMessage} = await Services.getInternDocumentsByOffice(typeDocumentId,officeId)
    if(responseCode === 0){
      dispatch(success(data))
    }else{
      dispatch(failure(responseMessage))
    }
  };

  function request() { return { type: Constants.GET_INTERN_DOCUMENTS_REQUEST}}
  function success(data) { return { type: Constants.GET_INTERN_DOCUMENTS_SUCCESS, data}}
  function failure(errors) { return { type: Constants.GET_INTERN_DOCUMENTS_FAILURE, errors}}
}

export function getInternDocumentsByTypeDocument(typeDocumentId){
  return async dispatch => {
    dispatch(request());
    const {responseCode, data, responseMessage} = await Services.getInternDocumentByTypeDocument(typeDocumentId)
    if(responseCode === 0){
      dispatch(success(data))
    }else{
      dispatch(failure(responseMessage))
    }
  };

  function request() { return { type: Constants.GET_INTERN_DOCUMENTS_BY_TYPE_DOCUMENT_REQUEST}}
  function success(data) { return { type: Constants.GET_INTERN_DOCUMENTS_BY_TYPE_DOCUMENT_SUCCESS, data}}
  function failure(errors) { return { type: Constants.GET_INTERN_DOCUMENTS_BY_TYPE_DOCUMENT_FAILURE, errors}}
}

export function getCircularDocuments(typeDocuments, userId){
  return async dispatch => {
    dispatch(request());
    const {responseCode, data, responseMessage} = await Services.getCircularDocuments(userId)
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


export function getCircularDetails(documentId){
  return async dispatch => {
    dispatch(request());
    const {responseCode, data, responseMessage} = await Services.getCircularDetails(documentId)
    if(responseCode === 0){
      dispatch(success(data))
    }else{
      dispatch(failure(responseMessage))
    }
  };

  function request(){ return { type: Constants.GET_CIRCULAR_DETAILS_REQUEST}}
  function success(data){ return { type: Constants.GET_CIRCULAR_DETAILS_SUCCESS, data}}
  function failure(errors){ return { type: Constants.GET_CIRCULAR_DETAILS_FAILURE, errors}}
}

export function deleteDocuments(documentsIds){
  return async dispatch => {
    dispatch(request());
    const {responseCode, data, responseMessage} = await Services.deleteInternDocuments(documentsIds)
    if(responseCode === 0){
      dispatch(success(data))
    }else{
      dispatch(failure(responseMessage))
    }
  };
  function request(){ return {type: Constants.DELETE_INTERN_DOCUMENT_REQUEST}}
  function success(data) { return {type: Constants.DELETE_INTERN_DOCUMENT_SUCCESS, data}}
  function failure(errors) { return { type: Constants.DELETE_INTERN_DOCUMENT_FAILURE, errors}}
}

export function getAdminMovementsByOffice(officeId){
  return async dispatch => {
    dispatch(request());
    const {responseCode, data, responseMessage} = await Services.getAdminMovemetsByOffice(officeId);
    if(responseCode === 0){
      dispatch(success(data))
    }else{
      dispatch(failure(responseMessage))
    }
  };

  function request(){ return {type: Constants.GET_ADMIN_MOVEMENTS_BY_OFFICE_REQUEST}}
  function success(data) { return {type: Constants.GET_ADMIN_MOVEMENTS_BY_OFFICE_SUCCESS, data}}
  function failure(errors) { return { type: Constants.GET_ADMIN_MOVEMENTS_BY_OFFICE_FAILURE, errors}}
}

export function getAdminInternDocuments(officeId){
  return async dispatch => {
    dispatch(request());
    const {responseCode, data, responseMessage} = await Services.getInternDocumentsAdmin(officeId);
    if(responseCode === 0){
      dispatch(success(data))
    }else{
      dispatch(failure(responseMessage))
    }
  };

  function request(){ return {type: Constants.GET_ADMIN_INTERN_DOCUMENTS_REQUEST}}
  function success(data) { return {type: Constants.GET_ADMIN_INTERN_DOCUMENTS_SUCCESS, data}}
  function failure(errors) { return { type: Constants.GET_ADMIN_INTERN_DOCUMENTS_FAILURE, errors}}
}

export function getUserMovementsByOffice(officeId){
  return async dispatch => {
    dispatch(request());
    const {responseCode, data, responseMessage} = await Services.getUserMovementsByOffice(officeId);
    if(responseCode === 0){
      dispatch(success(data))
    }else{
      dispatch(failure(responseMessage))
    }
  };

  function request(){ return {type: Constants.GET_USER_MOVEMENTS_BY_OFFICE_REQUEST}}
  function success(data) { return {type: Constants.GET_USER_MOVEMENTS_BY_OFFICE_SUCCESS, data}}
  function failure(errors) { return { type: Constants.GET_USER_MOVEMENTS_BY_OFFICE_FAILURE, errors}}
}

export function getUserMovementsByAssignedTo(userId){
  return async dispatch => {
    dispatch(request());
    const {responseCode, data, responseMessage} = await Services.getUserMovementsByAssignedTo(userId);
    if(responseCode === 0){
      dispatch(success(data))
    }else{
      dispatch(failure(responseMessage))
    }
  };

  function request(){ return {type: Constants.GET_MOVEMENTS_BY_ASSIGNED_TO_REQUEST}}
  function success(data) {return {type: Constants.GET_MOVEMENTS_BY_ASSIGNED_TO_SUCCESS, data}}
  function failure(errors) { return { type: Constants.GET_MOVEMENTS_BY_ASSIGNED_TO_FAILURE, errors}}
}

export function confirmDocuments(userId, movementsIds, currentDate, asignadoA){
  return async dispatch => {
    dispatch(request());
    const {responseCode, data, responseMessage} = await Services.confirmDocuments(userId, movementsIds, currentDate, asignadoA);
    if(responseCode === 0){
      dispatch(success(data))
    }else{
      dispatch(failure(responseMessage))
    }
  };

  function request(){ return {type: Constants.CONFIRM_DOCUMENTS_REQUEST}}
  function success(message) { return {type: Constants.CONFIRM_DOCUMENTS_SUCCESS, message}}
  function failure(errors) { return { type: Constants.CONFIRM_DOCUMENTS_FAILURE, errors}}
}


export function deriveDocuments(userId, officeId, currentDate, movements){
  return async dispatch=>{
    dispatch(request());
    const {responseCode, data, responseMessage} = await Services.deriveDocuments(userId, officeId, currentDate, movements);
    if(responseCode === 0){
      dispatch(success(data))
    }else{
      dispatch(failure(responseMessage))
    }
  };

  function request(){ return { type: Constants.DERIVE_DOCUMENTS_REQUEST}}
  function success(message){ return {type: Constants.DERIVE_DOCUMENTS_SUCCESS, message}}
  function failure(errors){ return {type: Constants.DERIVE_DOCUMENTS_FAILURE, errors}}
}

export function deriveAssignedDocuments(userId, officeId, currentDate, movements){
  return async dispatch=>{
    dispatch(request());
    const {responseCode, data, responseMessage} = await Services.deriveAssignedDocuments(userId, officeId, currentDate, movements);
    if(responseCode === 0){
      dispatch(success(data))
    }else{
      dispatch(failure(responseMessage))
    }
  };

  function request(){ return { type: Constants.DERIVE_ASSIGNED_DOCUMENTS_REQUEST}}
  function success(message){ return {type: Constants.DERIVE_ASSIGNED_DOCUMENTS_SUCCESS, message}}
  function failure(errors){ return {type: Constants.DERIVE_ASSIGNED_DOCUMENTS_FAILURE, errors}}
}

export function generateResponseToMovement(userId, officeId, documentIntern, movement){
  return async dispatch => {
    dispatch(request());
    const {responseCode, data, responseMessage} = await Services.generateResponseToMovement(userId, officeId, documentIntern, movement)
    if(responseCode === 0){
      dispatch(success(data))
    }else{
      dispatch(failure(responseMessage))
    }
  };

  function request(){ return { type: Constants.GENERATE_RESPONSE_TO_MOVEMENT_REQUEST}}
  function success(message){ return {type: Constants.GENERATE_RESPONSE_TO_MOVEMENT_SUCCESS, message}}
  function failure(errors){ return {type: Constants.GENERATE_RESPONSE_TO_MOVEMENT_FAILURE, errors}}
}

export function generateResponseToMovementAdmin(userId, officeId, documentIntern, movement){
  return async dispatch => {
    dispatch(request());
    const {responseCode, data, responseMessage} = await Services.generateResponseToMovementAdmin(userId, officeId, documentIntern, movement)
    if(responseCode === 0){
      dispatch(success(data))
    }else{
      dispatch(failure(responseMessage))
    }
  };

  function request(){ return { type: Constants.GENERATE_RESPONSE_TO_MOVEMENT_ADMIN_REQUEST}}
  function success(message){ return {type: Constants.GENERATE_RESPONSE_TO_MOVEMENT_ADMIN_SUCCESS, message}}
  function failure(errors){ return {type: Constants.GENERATE_RESPONSE_TO_MOVEMENT_ADMIN_FAILURE, errors}}
}

export function createInternDocument(internDocument){
  return async dispatch =>{
    dispatch(request());
    const {responseCode, data, responseMessage} = await Services.createInternDocument(internDocument)
    if(responseCode === 0){
      dispatch(success(data))
    }else{
      dispatch(failure(responseMessage))
    }
  };

  function request(){ return { type: Constants.CREATE_INTERN_DOCUMENTS_REQUEST}}
  function success(message){ return {type: Constants.CREATE_INTERN_DOCUMENTS_SUCCESS, message}}
  function failure(errors){ return {type: Constants.CREATE_INTERN_DOCUMENTS_FAILURE, errors}}
}

export function loadMovementsToAnalyze(){
  return async dispatch =>{
    dispatch(request());
    const {responseCode, data, responseMessage} = await Services.getMovementsToAnalyze()
    if(responseCode === 0){
      dispatch(success(data))
    }else{
      dispatch(failure(responseMessage))
    }
  };

  function request(){ return { type: Constants.GET_MOVEMENTS_TO_ANALYZE_REQUEST}}
  function success(data){ return {type: Constants.GET_MOVEMENTS_TO_ANALYZE_SUCCESS, data}}
  function failure(errors){ return {type: Constants.GET_MOVEMENTS_TO_ANALYZE_FAILURE, errors}}
}

export function loadAdvancedSearch(numTram, observation, officeId){
  return async dispatch =>{
    dispatch(request());
    const numTramValue = numTram && numTram.trim().length>0? numTram : null
    const observationValue = observation && observation.trim().length>0? observation : null
    const officeIdValue = officeId && officeId.trim().length>0? officeId : null
    const {responseCode, data, responseMessage} = await Services.getAdvancedSearch(numTramValue, observationValue, officeIdValue)
    if(responseCode === 0){
      dispatch(success(data))
    }else{
      dispatch(failure(responseMessage))
    }

    function request(){ return { type: Constants.GET_MOVEMENTS_ADVANCED_SEARCH_REQUEST}}
    function success(data){ return {type: Constants.GET_MOVEMENTS_ADVANCED_SEARCH_SUCCESS, data}}
    function failure(errors){ return {type: Constants.GET_MOVEMENTS_ADVANCED_SEARCH_FAILURE, errors}}
  };
}

export function cleanDataMovements(){
  return dispatch =>{
    dispatch(cleanData())
  }

  function cleanData(){return {type: Constants.CLEAN_DATA_MOVEMENTS}}
}

export function loadAllUsers(){
  return async dispatch =>{
    dispatch(request());
    const {responseCode, users, responseMessage} = await Services.loadAllUsers()
    if(responseCode === 0){
      dispatch(success(users))
    }else{
      dispatch(failure(responseMessage))
    }
  };

  function request(){ return { type: Constants.LOAD_ALL_USERS_REQUEST}}
  function success(data){ return {type: Constants.LOAD_ALL_USERS_SUCCESS, data}}
  function failure(errors){ return {type: Constants.LOAD_ALL_USERS_FAILURE, errors}}
}

export function updateUser(user, cb){
  return async dispatch =>{
    dispatch(request());
    const response  = await Services.updateUser(user)
    const {responseCode, data, errors} = response
    if(responseCode === 0){
      dispatch(success(data))
      if(cb){
        setTimeout(()=>{cb()}, 2000)
      }
    }else{
      dispatch(failure(errors))
    }
    return response
  };

  function request(){ return { type: Constants.UPDATE_USER_REQUEST}}
  function success(data){ return {type: Constants.UPDATE_USER_SUCCESS, data}}
  function failure(errors){ return {type: Constants.UPDATE_USER_FAILURE, errors}}
}

export function getUserById(userId){
  return async dispatch =>{
    dispatch(request());
    const response  = await Services.getUserById(userId);
    const {responseCode, data, errors} = response;
    if(responseCode === 0){
      dispatch(success(data))
    }else{
      dispatch(failure(errors))
    }
    return response
  };

  function request(){ return { type: Constants.LOAD_USER_BY_ID_REQUEST}}
  function success(data){ return {type: Constants.LOAD_USER_BY_ID_SUCCESS, data}}
  function failure(errors){ return {type: Constants.LOAD_USER_BY_ID_FAILURE, errors}}
}

export function deleteUser(userId, cb){
  return async dispatch =>{
    dispatch(request());
    const response = await Services.deleteUser(userId)
    const {responseCode, data, errors} = response
    if(responseCode === 0){
      dispatch(success(data))
      if(cb){
        setTimeout(()=>{cb()}, 2000)
      }
    }else{
      dispatch(failure(errors))
    }
    return response
  };

  function request(){ return { type: Constants.DELETE_USER_REQUEST}}
  function success(data){ return {type: Constants.DELETE_USER_SUCCESS, data}}
  function failure(errors){ return {type: Constants.DELETE_USER_FAILURE, errors}}
}

export function createUser(user,cb){
  return async dispatch =>{
    dispatch(request());
    const response = await Services.createUser(user)
    const {responseCode, data, errors} = response
    if(responseCode === 0){
      dispatch(success(data))
      if(cb){
        setTimeout(()=>{cb()}, 3000)
      }
    }else{
      dispatch(failure(errors))
    }
    return response
  };

  function request(){ return { type: Constants.CREATE_USER_REQUEST}}
  function success(data){ return {type: Constants.CREATE_USER_SUCCESS, data}}
  function failure(errors){ return {type: Constants.CREATE_USER_FAILURE, errors}}
}

export function loadAllOffices(){
  return async dispatch =>{
    dispatch(request());
    const response = await Services.loadAllOffices();
    const {responseCode, data, responseMessage} = response;
    if(responseCode === 0){
      dispatch(success(data))
    }else{
      dispatch(failure(responseMessage))
    }
    return response;
  };

  function request(){ return { type: Constants.LOAD_ALL_OFFICES_REQUEST}}
  function success(data){ return {type: Constants.LOAD_ALL_OFFICES_SUCCESS, data}}
  function failure(errors){ return {type: Constants.LOAD_ALL_OFFICES_FAILURE, errors}}
}

export function getOfficeById(officeId){
  return async dispatch =>{
    dispatch(request());
    const response  = await Services.getOfficeById(officeId);
    const {responseCode, office, errors} = response;
    if(responseCode === 0){
      dispatch(success(office))
    }else{
      dispatch(failure(errors))
    }
    return response
  };

  function request(){ return { type: Constants.LOAD_OFFICE_BY_ID_REQUEST}}
  function success(data){ return {type: Constants.LOAD_OFFICE_BY_ID_SUCCESS, data}}
  function failure(errors){ return {type: Constants.LOAD_OFFICE_BY_ID_FAILURE, errors}}
}

export function deleteOffice(officeId, cb){
  return async dispatch =>{
    dispatch(request());
    const response = await Services.deleteOffice(officeId)
    const {responseCode, data, errors} = response
    if(responseCode === 0){
      dispatch(success(data))
      if(cb){
        setTimeout(()=>{cb()}, 2000)
      }
    }else{
      dispatch(failure(errors))
    }
    return response
  };

  function request(){ return { type: Constants.DELETE_OFFICE_REQUEST}}
  function success(data){ return {type: Constants.DELETE_OFFICE_SUCCESS, data}}
  function failure(errors){ return {type: Constants.DELETE_OFFICE_FAILURE, errors}}
}

export function createOffice(office,cb){
  return async dispatch =>{
    dispatch(request());
    const response = await Services.createOffice(office)
    const {responseCode, data, errors} = response
    if(responseCode === 0){
      dispatch(success(data))
      if(cb){
        setTimeout(()=>{cb()}, 3000)
      }
    }else{
      dispatch(failure(errors))
    }
    return response
  };

  function request(){ return { type: Constants.CREATE_OFFICE_REQUEST}}
  function success(data){ return {type: Constants.CREATE_OFFICE_SUCCESS, data}}
  function failure(errors){ return {type: Constants.CREATE_OFFICE_FAILURE, errors}}
}

export function updateOffice(office, cb){
  return async dispatch =>{
    dispatch(request());
    const response  = await Services.updateOffice(office)
    const {responseCode, data, errors} = response;
    if(responseCode === 0){
      dispatch(success(data));
      if(cb){
        setTimeout(()=>{cb()}, 2000)
      }
    }else{
      dispatch(failure(errors))
    }
    return response
  };

  function request(){ return { type: Constants.UPDATE_OFFICE_REQUEST}}
  function success(data){ return {type: Constants.UPDATE_OFFICE_SUCCESS, data}}
  function failure(errors){ return {type: Constants.UPDATE_OFFICE_FAILURE, errors}}
}




