import {TYPE_INPUT} from "../../constants/Constants";
import {list_dependencies} from "../../fakedata/ListDataDocuments";

export const formEditOficioCircular = [

  {
    "id": "correlative",
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
    "id": "dependenciaId",
    "label": "Área responsable:",
    "type": TYPE_INPUT.INPUT_SELECT,
    "listItems":list_dependencies,
    "required": true
  }
];