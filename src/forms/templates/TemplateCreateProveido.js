import {TYPE_DESTINYS, TYPE_INPUT} from "../../constants/Constants";
import {DOCUMENT_INTERN} from "../../utils/Constants";

export const formProveidosInternos = [
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
    "id": "originName",
    "label": "Origen:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": true
  },
  {
    "id": "destinyName",
    "label": "Destino:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": true
  },
  {
    "id": "currentDate",
    "label": "Fecha de emisión:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": true
  },
]

export const formProveidosExternos = (typeDocuments, onChange1, destinationsOrigin, onChange2, destinationsFinal, onChange3) => [
  {
    "id": "typeDocumentReference",
    "label": "Documento:",
    "type": TYPE_INPUT.INPUT_SELECT,
    "required": true,
    "listItems":typeDocuments,
    "onChangeCustom": onChange1
  },
  {
    "id": DOCUMENT_INTERN.REFERENCE_DOCUMENT,
    "label": "Nro. documento:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": false,
    "required": true
  },
  {
    "id": DOCUMENT_INTERN.ASUNTO,
    "label": "Asunto:",
    "type": TYPE_INPUT.INPUT_TEXT_AREA,
    "readOnly": false,
    "required": true
  },
  {
    "id": "tipoOrigenId",
    "label": "Tipo de origen:",
    "type": TYPE_INPUT.INPUT_SELECT,
    "readOnly": false,
    "required": true,
    "listItems":TYPE_DESTINYS,
    "onChangeCustom": onChange2
  },
  {
    "id": DOCUMENT_INTERN.ORIGIN_ID,
    "label": "Dep. origen:",
    "type": TYPE_INPUT.INPUT_SELECT,
    "readOnly": false,
    "required": true,
    "listItems":destinationsOrigin
  },
  {
    "id": "tipoDestinoId",
    "label": "Tipo de destino:",
    "type": TYPE_INPUT.INPUT_SELECT,
    "readOnly": false,
    "required": true,
    "listItems":TYPE_DESTINYS,
    "onChangeCustom": onChange3
  },
  {
    "id": DOCUMENT_INTERN.DESTINY_ID,
    "label": "Dep. destino:",
    "type": TYPE_INPUT.INPUT_SELECT,
    "readOnly": false,
    "required":true,
    "listItems":destinationsFinal
  },
  {
    "id": DOCUMENT_INTERN.CURRENT_DATE,
    "label": "Fecha:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": true
  },
  {
    "id": "user",
    "label": "Usuario:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": true
  },
]