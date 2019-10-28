import * as Constants from '../actions/Constants';
import filter from "lodash/filter";
import some from "lodash/some";

const initialState =  {message: [], isLoading: false, data: []};

export function documentIntern(state = initialState, action) {
  const {message, errors, data} = action
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
    case Constants.GET_CIRCULAR_DOCUMENTS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case Constants.GET_CIRCULAR_DOCUMENTS_SUCCESS:
      const {typeDocuments} = action
      const dataFiltered = filter(data, itemData => {
        return some(typeDocuments, type => {
          return type === itemData.tipoDocuId
        })
      });
      return {
        ...state,
        isLoading: false,
        data: dataFiltered
      };
    case Constants.GET_CIRCULAR_DOCUMENTS_FAILURE:
      return {
        ...state,
        isLoading:false,
        message: [errors]
      }
    default: return state
  }
}