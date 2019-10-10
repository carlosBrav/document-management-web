
import * as Constants from '../actions/Constants';
const initialState =  {errors: [], data: [], isLoading: false};

export function dataView(state = initialState, action) {
  const {responseMessage, data} = action
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
    default:
      return state

  }
}