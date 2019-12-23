import {TYPE_INPUT} from "../../constants/Constants";

export const formEditProveido = dependencies => [
  {
    "id": "referenceDocument",
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
    "id": "origenId",
    "label": "Origen:",
    "type": TYPE_INPUT.INPUT_SELECT,
    "listItems":dependencies,
    "required": true,
    "useOnChange": false
  },
  {
    "id": "destinoId",
    "label": "Destino:",
    "type": TYPE_INPUT.INPUT_SELECT,
    "listItems":dependencies,
    "required": true,
    "useOnChange": false
  }
  ]