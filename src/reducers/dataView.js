
import * as Constants from '../actions/Constants';
const initialState =  {errors: [], data: [], dataViewMovements: [], dataLocalMovements: [], isLoading: false, isLoadingMovements: false};

export function dataView(state = initialState, action) {
  const {responseMessage, data,dataView2,dataLocal} = action
  switch(action.type){
    case Constants.GET_VIEW2_DATA_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case Constants.GET_VIEW2_DATA_SUCCESS:
      if(data){
        return{
          ...state,
          data,
          isLoading: false
        }
      }
      return {...state};
    case Constants.GET_VIEW2_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors: [responseMessage]
      }
    case Constants.GET_VIEW2_BY_TRAM_NUM_REQUEST:
      return {
        ...state,
        isLoadingMovements: true
      }
    case Constants.GET_VIEW2_BY_TRAM_NUM_SUCCESS:
      if(dataView2 && dataLocal){
        return {
          ...state,
          isLoadingMovements: false,
          dataView2,
          dataLocal
        }
      }
      return {
        ...state
      }
    case Constants.GET_VIEW2_BY_TRAM_NUM_FAILURE:
      return {
        ...state,
        isLoadingMovements: false,
        errors: [responseMessage]
      }
    default:
      return state

  }
}