
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
}

export function getFormattedDate(){
  let d = new Date();

  d = ('0' + d.getDate()).slice(-2) + "-" + ('0' + (d.getMonth() + 1)).slice(-2) + "-" + d.getFullYear() + " " + ('0' + d.getHours()).slice(-2) + ":" + ('0' + d.getMinutes()).slice(-2) + ":" + ('0' + d.getSeconds()).slice(-2);

  return d;
}