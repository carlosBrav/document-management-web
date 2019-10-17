import ApiIntegration from "../utils/ApiIntegration";
import isObject from "lodash/isObject";
import keys from "lodash/keys";

const endPoints = {
  AUTHENTICATION_LOGIN: '/api/login',
  VIEW_2: '/api/view2',
  INITIAL_DATA: '/api/initialState',
  MOVEMENTS: '/api/movements',
  MOVEMENTS_BY_TRAM_NUM: '/api/movements/numTram',
  MOVEMENTS_BY_OFFICE: '/api/movements/office',
  MOVEMENTS_BY_DATE: '/api/movements/currentDate'
};

function getUrlPath(...data){

  const urlParams =  data && data.length > 0 ?  [...data].pop() : null;
  const _data = urlParams && isObject(urlParams) ?  data.slice(0, data.length -1) : data;
  const newParams =  urlParams && isObject(urlParams) ?  keys(urlParams).map(key=> key + '=' + urlParams[key]).join('&') : '';
  return _data.filter(item => !!item).join('/') + (newParams && newParams.length > 0 ? '?' + newParams: '' );
}

export default class Service {

  static login(user, password) {
    const postBody = JSON.stringify({user,password})
    const url = getUrlPath(endPoints.AUTHENTICATION_LOGIN)
    return ApiIntegration.doPost(url, postBody,true);
  }

  static getView2Data(){
    const url = getUrlPath(endPoints.VIEW_2)
    return ApiIntegration.doGet(url);
  }

  static getInitialData(){
    const url = getUrlPath(endPoints.INITIAL_DATA)
    return ApiIntegration.doGet(url)
  }

  static insertMovements(movements,userId){
    const postBody = JSON.stringify({movements})
    const url = getUrlPath(endPoints.MOVEMENTS, userId)
    return ApiIntegration.doPost(url,postBody,true)
  }

  static getMovements(numTram, officeId){
    let url = "";
    if(numTram && numTram.trim().length>0){
      url = getUrlPath(endPoints.MOVEMENTS_BY_TRAM_NUM, numTram)
    }else{
      if(officeId && officeId.trim().length>0){
        url = getUrlPath(endPoints.MOVEMENTS_BY_OFFICE, officeId)
      }else{
        url = getUrlPath(endPoints.MOVEMENTS_BY_DATE)
      }
    }
    return ApiIntegration.doGet(url)
  }

  static deleteMovement(movementsIds){
    const listIds = JSON.stringify({movementsIds})
    console.log("LIST IDS ", listIds)
    const url = getUrlPath(endPoints.MOVEMENTS)
    console.log("URL ", url)
    return ApiIntegration.doDelete(url, listIds, true)
  }
}