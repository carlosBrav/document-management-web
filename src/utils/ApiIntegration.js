import {getCSRFTokenValue} from "./Utils";

function getHeaders(jsonFormat, myToken){

  const token =  getCSRFTokenValue() || myToken;

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': jsonFormat ? 'application/json' : 'application/x-www-form-urlencoded'
  }

  return {
    headers: (!!token ? {...headers, 'authorization': 'Bearer ' + token} : headers),
    credentials: 'same-origin' //'include'  //
  };
}

export default class ApiIntegration {

  static getServer(url) {
    const {location} = window;
    // API_PATH +
    return location.protocol+'//'+location.host  +  url;
  }

  static  handleResponse(response) {
    return response.json()
      .then(data => {
        if (!response.ok) {
          if (response.status === 401) {
            // auto logout if 401 response returned from api
            //ApiUtils.logout();
          }
          const error = (response && response.errors) || (data && data.message) || response.statusText;
          return Promise.reject(error, response.status);
        }
        return data;
      });
  }

  static doPost(url, body, jsonFormat = false, token) {

    const requestOptions = {
      method: 'POST',
      ...getHeaders(jsonFormat, token),
      body: body
    };
    return fetch(this.getServer(url), requestOptions).then(ApiIntegration.handleResponse);
  }

  static doGet(url, jsonFormat = false) {

    const requestOptions = {
      method: 'GET',
      ...getHeaders(jsonFormat),
    };

    //return fetch(ApiUtils.getServer(url), requestOptions).then(ApiUtils.handleResponse);
    return fetch(url, requestOptions).then(ApiIntegration.handleResponse);
  }

  static doPut(url, body, jsonFormat = false) {
    const requestOptions = {
      method: 'PUT',
      ...getHeaders(jsonFormat),
      body: body
    };

    return fetch(url, requestOptions).then(ApiIntegration.handleResponse);
  }

  static doDelete(url, jsonFormat = false) {
    const requestOptions = {
      method: 'DELETE',
      ...getHeaders(jsonFormat),
    };

    return fetch(url, requestOptions).then(ApiIntegration.handleResponse);
  }

}