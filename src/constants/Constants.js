import map from "lodash/map";
import filter from "lodash/filter";

export const BUTTON_TYPE = {
  CHECKBOX : 1,
  NORMAL: 2
};

export const TYPE_DESTINYS = [
  {id: '0',value: 'Facultad'},
  {id: '1',value: 'Oficina Interna'},
  {id: '2',value: 'Institucion Externa'},
  {id: '3',value: 'Dependencia Int. UNMSM'},
  {id: '4',value: 'Dependencia Ext. UNMSM'},
  {id: '5',value: 'Dependencia Sede Central'}
];

export const TYPE_INPUT = {
  INPUT_TEXT: 'text',
  INPUT_SELECT: 'select',
  INPUT_TEXT_AREA: 'textArea',
  INPUT_CIRCULAR: 'circular',
  LIST_GROUP: 'list-group'
};

export const TYPE_CONTENT_MODAL = {
  TYPE_CIRCULAR: 'circular'
};

export const TYPE_ACTION ={
  ADD: 'add',
  SUBTRACT: 'subtract'
};

export const getUsersOfCurrentOffice=(listData, userOfficeId)=>{
  return map(filter(listData, data => data.dependenciaId === userOfficeId), user =>({
    ...user,
    value: `${user.apellido}, ${user.nombre}`
  }))
};
