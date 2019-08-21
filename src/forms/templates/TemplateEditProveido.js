import {list_dependencies,list_dependencies_2} from "../../fakedata/ListDataDocuments";
import {TYPE_INPUT} from "../../constants/Constants";

export const formEditProveido = [
  {
    "id": "documento",
    "label": "Documento:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": true
  },
  {
    "id": "asunto",
    "label": "Asunto:",
    "type": TYPE_INPUT.INPUT_TEXT_AREA,
    "readOnly": false,
    "required": true
  },
  {
    "id": "origen",
    "label": "Origen:",
    "type": TYPE_INPUT.INPUT_SELECT,
    "listItems":list_dependencies,
    "required": true
  },
  {
    "id": "destino",
    "label": "Destino:",
    "type": TYPE_INPUT.INPUT_SELECT,
    "listItems":list_dependencies_2,
    "required": true
  }
  ]