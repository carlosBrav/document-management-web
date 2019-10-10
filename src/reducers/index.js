import { combineReducers } from 'redux';
import {authentication} from "./authentication";
import {dataView} from "./dataView";
import {initialData} from "./initialData";

const rootReducer = combineReducers({
  authentication,
  dataView,
  initialData
})

export default rootReducer