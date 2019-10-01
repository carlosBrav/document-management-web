
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