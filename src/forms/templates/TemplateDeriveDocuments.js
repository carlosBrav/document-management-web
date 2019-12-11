import {TYPE_INPUT} from "../../constants/Constants";
import {list_dependencies} from "../../fakedata/ListDataDocuments";
import {DOCUMENT_INTERN} from "../../utils/Constants";

export const formDeriveDocuments= (typeDocuments, onChange1) =>
  [
  {
    "id": DOCUMENT_INTERN.TYPE_DOCUMENT_ID,
    "label": "Tipo de Documento:",
    "type": TYPE_INPUT.INPUT_SELECT,
    "readOnly": false,
    "required": true,
    "listItems": typeDocuments,
    "onChangeCustom": onChange1
  },
  {
    "id": "document",
    "label": "Documento:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": true
  },
  {
    "id": DOCUMENT_INTERN.ASUNTO,
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
    "id": DOCUMENT_INTERN.DESTINY_ID,
    "label": "Oficina Interna:",
    "type": TYPE_INPUT.INPUT_SELECT,
    "readOnly": false,
    "required": true,
    "listItems": list_dependencies
  },
  {
    "id": DOCUMENT_INTERN.CURRENT_DATE,
    "label": "Fecha:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": false,
    "required": true
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