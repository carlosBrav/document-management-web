import ApiIntegration from "../utils/ApiIntegration";

const endPoints = {
  AUTHENTICATION_LOGIN: '/api/login',
  VIEW_2: '/api/view2',
  INITIAL_DATA: '/api/initialState'
};


export default class Service {

  static login(user, password) {
    const postBody = JSON.stringify({user,password})
    return ApiIntegration.doPost(endPoints.AUTHENTICATION_LOGIN, postBody,true);
  }

  static getView2Data(){
    return ApiIntegration.doGet(endPoints.VIEW_2);
  }

  static getInitialData(){
    return ApiIntegration.doGet(endPoints.INITIAL_DATA)
  }

}