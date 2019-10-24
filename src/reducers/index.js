import { combineReducers } from 'redux';
import {authentication} from "./authentication";
import {dataView} from "./dataView";
import {initialData} from "./initialData";
import {movements} from "./movements";
import {typeDocuments} from "./typeDocument";
import {correlative} from "./correlative";
import {user} from "./user";

const rootReducer = combineReducers({
  authentication,
  dataView,
  initialData,
  movements,
  typeDocuments,
  correlative,
  user
})

export default rootReducer