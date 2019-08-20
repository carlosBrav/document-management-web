import {TYPE_INPUT} from "../../constants/Constants";
import {list_dependencies} from "../../fakedata/ListDataDocuments";

export const formEditOficioCircular = [

  {
    "id": "correlativo",
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
    "id": "responsable",
    "label": "Área responsable:",
    "type": TYPE_INPUT.INPUT_SELECT,
    "listItems":list_dependencies,
    "required": true
  }
];