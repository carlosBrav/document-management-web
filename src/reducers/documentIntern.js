import * as Constants from '../actions/Constants';

const initialState =  {message: [], isLoading: false};

export function documentIntern(state = initialState, action) {
  const {message, errors} = action
  switch (action.type) {
    case Constants.CREATE_CIRCULAR_DOCUMENTS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case Constants.CREATE_CIRCULAR_DOCUMENTS_SUCCESS:
      return {
        ...state,
        message: [message],
        isLoading: false
      };
    case Constants.CREATE_CIRCULAR_DOCUMENTS_FAILURE:
      return {
        ...state,
        errors,
        isLoading: false
      };
    default: return state
  }
}