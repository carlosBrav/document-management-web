import ApiIntegration from "../utils/ApiIntegration";

const endPoints = {
  AUTHENTICATION_LOGIN: '/api/login'
}


export default class Service {

  static login(user, password) {
    // const postBody = 'email=' + encodeURIComponent(email) + '&password=' + encodeURIComponent(password);
    const postBody = JSON.stringify({user,password})
    return ApiIntegration.doPost(endPoints.AUTHENTICATION_LOGIN, postBody,true);
  }

}