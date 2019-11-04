import {TYPE_INPUT} from "../../constants/Constants";
import {list_dependencies} from "../../fakedata/ListDataDocuments";

export const formDeriveDocuments= [
  {
    "id": "officeId",
    "label": "Derivar a:",
    "type": TYPE_INPUT.INPUT_SELECT,
    "readOnly": false,
    "required": true,
    "listItems": list_dependencies
  },
  {
    "id": "currentDate",
    "label": "Fecha:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": true
  },
];