
export const CONFIG  = {
  authCookieName : 'ppAppUser',
  defaultDataKeys : ["USERS","LAKES","BOATS","BOAT_HISTORY_MAP","LOGGED_IN_USER"],

};

export const setCookie = (userInfo) => {
  document.cookie  = `${CONFIG.authCookieName}=${userInfo.userId}`;
};

export const CONSTANTS = {
  LOGGED_IN_USER:"LOGGED_IN_USER",
  CURRENT_USER:"CURRENT_USER",
};

export const DOCUMENT_INTERN = {
  DOCUMENT_STATE: 'estadoDocumento',
  TYPE_DOCUMENT_ID: 'tipoDocuId',
  DOCUMENT_NUMBER: 'numDocumento',
  SIGLAS: 'siglas',
  YEAR: 'anio',
  OBSERVATION: 'observacion',
  ASUNTO: 'asunto',
  ORIGIN_ID: 'origenId',
  DESTINY_ID: 'destinoId',
  USER_ID: 'userId',
  FIRM: 'firma',
  ACTIVE: 'active',
  CURRENT_DATE: 'currentDate',
  RESPONSABLE_AREA: 'responsableArea',
  REFERENCE_DOCUMENT: 'referenceDocument'
};

export const MOVEMENT = {
  ID: 'id',
  MOVEMENT: 'movimiento',
  NUM_TRAM: 'numTram',
  DOCUMENT_STATE: 'estadoDocumento',
  DESTINY: 'dependenciasId1',
  OBSERVATION: 'observacion',
  NAME_INDICATOR: 'indiNombre',
  CODE_INDICATOR: 'indiCod',
  DOCUMENT_NAME: 'docuNombre',
  DOCUMENT_NUMBER: 'docuNum',
  DOCUMENT_SIGLAS: 'docuSiglas',
  DOCUMENT_YEAR: 'docuAnio',
  CURRENT_DATE: 'currentDate',
  ENTER_DATE: 'fechaIngreso',
  SENT_DATE: 'fechaEnvio',
  PREVIOUS_MOVEMENT: 'previousMovementId'
};

export const TYPE_DOCUMENT = {
  oficios: '44545',
  proveidos: '84545'
}

export function getFormattedDate(){
  let d = new Date();

  d = ('0' + d.getDate()).slice(-2) + "/" + ('0' + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear() + " " + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);
  return d;
}

export function getFormattedOnlyDate(){
  let d = new Date();

  d = ('0' + d.getDate()).slice(-2) + "/" + ('0' + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear();
  return d;
}

export function getFormattedOnlyTime(){
  let d = new Date();

  d =  ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);
  return d;
}