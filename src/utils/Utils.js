import * as jwt_decode from "jwt-decode";
import findIndex from "lodash/findIndex";
import {CONSTANTS} from "./Constants";
import isEqual from "lodash/isEqual";
import moment from 'moment'

export function delete_cookie (name) {
  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

export function ValidateComponent(role, component, redirect){

  const currentUser = getParseObj('CURRENT_USER');
  if( currentUser && currentUser.rolName.toLowerCase() === role){
    return component
  }else {
    if(redirect)
      redirect()
  }
}

export function saveObj(key,obj){
  try{
    const stringObj = JSON.stringify(obj);
    localStorage.setItem(key, stringObj);
  }catch(e){
    console.log(e)
  }
}

export function getParseObj(key){
  let obj = {};
  try{
    const stringObj = localStorage.getItem(key);
    obj = JSON.parse(stringObj);
  }catch(e){
    console.log(e)
  }
  return obj;
}

export function getCSRFTokenValue(){
  const user = getParseObj('CURRENT_USER');
  return user && user['token'];
}

export function getDecodedToken() {
  const token = getCSRFTokenValue();
  try{
    return jwt_decode(token);
  }
  catch(Error){
    return null;
  }
}

export function getCurrentUser(){
  const user = getParseObj('CURRENT_USER');
  return user;
}

export function removeUser(key = 'CURRENT_USER'){
  try{
    localStorage.removeItem(key);
  }catch(e){
    console.log(e)
  }
}

export function getPath(role){
  const roles = ["admin", "usuario"]
  const idx = findIndex(roles, (item) => isEqual(item,role))

  if(idx !== -1){
    return roles[idx]
  }
  return '';
}

export function getComponent(role, component, defaultComponent, redirect){

  const currentUser = getParseObj('CURRENT_USER');
  if( currentUser && currentUser.role.toLowerCase() === role){
    return component
  }else {
    if(redirect)
      redirect()
    return () => defaultComponent
  }
}

export function proceedLogout(){
  delete_cookie('ppAppUser');
  localStorage.removeItem(CONSTANTS.LOGGED_IN_USER);
  localStorage.removeItem(CONSTANTS.CURRENT_USER);
}

export function transformToDate(dateString){
  return moment(dateString)
}

export function subtractDates(date){
  return moment().diff(date, 'days')
}