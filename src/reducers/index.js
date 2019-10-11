import { combineReducers } from 'redux';
import {authentication} from "./authentication";
import {dataView} from "./dataView";
import {initialData} from "./initialData";
import {movements} from "./movements";

const rootReducer = combineReducers({
  authentication,
  dataView,
  initialData,
  movements
})

export default rootReducer