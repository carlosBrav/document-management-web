import * as Constants from '../actions/Constants';
import filter from "lodash/filter";
import some from "lodash/some";

const initialState =  {message: [], isLoading: false, data: [], dataAdmin: [], circularData: [], circularDetails: []};

export function documentIntern(state = initialState, action) {
  const {message, errors, data} = action
  switch (action.type) {
    case Constants.GET_INTERN_DOCUMENTS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case Constants.GET_INTERN_DOCUMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data
      };
    case Constants.GET_INTERN_DOCUMENTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors
      };
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
        circularData: dataFiltered
      };
    case Constants.GET_CIRCULAR_DOCUMENTS_FAILURE:
      return {
        ...state,
        isLoading:false,
        message: [errors],
        circularDetails: []
      };
    case Constants.GET_CIRCULAR_DETAILS_REQUEST:
      return {
        ...state,
        isLoading: true,
        circularDetails: []
      };
    case Constants.GET_CIRCULAR_DETAILS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        circularDetails: data
      };
    case Constants.GET_ADMIN_INTERN_DOCUMENTS_REQUEST:
      return {
        ...state,
        isLoading: true
      };
    case Constants.GET_ADMIN_INTERN_DOCUMENTS_SUCCESS:

      return {
        ...state,
        isLoading: false,
        dataAdmin: data
      };
    case Constants.GET_ADMIN_INTERN_DOCUMENTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        errors
      }
    default: return state
  }
}