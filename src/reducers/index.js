import { combineReducers } from 'redux';
import {authentication} from "./authentication";
import {dataView} from "./dataView";
import {initialData} from "./initialData";
import {movements} from "./movements";
import {typeDocuments} from "./typeDocument";

const rootReducer = combineReducers({
  authentication,
  dataView,
  initialData,
  movements,
  typeDocuments
})

export default rootReducer