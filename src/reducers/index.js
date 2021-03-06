import { combineReducers } from 'redux';
import {authentication} from "./authentication";
import {dataView} from "./dataView";
import {initialData} from "./initialData";
import {movements} from "./movements";
import {typeDocuments} from "./typeDocument";
import {correlative} from "./correlative";
import {user} from "./user";
import {documentIntern} from "./documentIntern";
import {office} from "./office";

const rootReducer = combineReducers({
  authentication,
  dataView,
  initialData,
  movements,
  typeDocuments,
  correlative,
  user,
  documentIntern,
  office
});

export default rootReducer