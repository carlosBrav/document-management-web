import {TYPE_INPUT} from "../../constants/Constants";
import {list_dependencies} from "../../fakedata/ListDataDocuments";

export const formDeriveDocuments= (typeDocuments) =>
  [
  {
    "id": "tipoDocumento",
    "label": "Tipo de Documento:",
    "type": TYPE_INPUT.INPUT_SELECT,
    "readOnly": false,
    "required": true,
    "listItems": typeDocuments
  },
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
    "id": "referencia",
    "label": "Referencia:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": true
  },
  {
    "id": "destinyId",
    "label": "Oficina Interna:",
    "type": TYPE_INPUT.INPUT_SELECT,
    "readOnly": false,
    "required": true,
    "listItems": list_dependencies
  },
  {
    "id": "fecha",
    "label": "Fecha:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": false,
    "required": true
  },
  {
    "id": "hora",
    "label": "Hora:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": true
  },
  {
    "id": "motivo",
    "label": "Motivo:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": true
  },
  {
    "id": "user",
    "label": "Usuario:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": true
  }
];