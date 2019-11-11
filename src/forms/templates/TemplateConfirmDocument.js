import {TYPE_INPUT} from "../../constants/Constants";


export const formConfirmDocuments = (users) => [
  {
    "id": "asignadoA",
    "label": "Asignado a:",
    "type": TYPE_INPUT.INPUT_SELECT,
    "readOnly": false,
    "required": true,
    "listItems": users,
    "useOnChange": false
  },
  {
    "id": "currentDate",
    "label": "Fecha:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": true
  },
];