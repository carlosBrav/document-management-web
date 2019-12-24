import {TYPE_DESTINYS, TYPE_INPUT} from "../../constants/Constants";


export const formDocumGenerado = (typeDocuments, onChange1, destinations, onChange2) => [
  {
    "id": "tipoDocuId",
    "label": "Tipo de documento:",
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
    "id": "asunto",
    "label": "Asunto:",
    "type": TYPE_INPUT.INPUT_TEXT_AREA,
    "readOnly": false,
    "required":true
  },
  {
    "id": "currentDate",
    "label": "Fecha:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": true
  },
  {
    "id": "origen",
    "label": "Origen:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": true
  },
  {
    "id": "tipoDestinoId",
    "label": "Tipo de Destino:",
    "type": TYPE_INPUT.INPUT_SELECT,
    "readOnly": false,
    "required": true,
    "listItems":TYPE_DESTINYS,
    "onChangeCustom": onChange2
  },
  {
    "id": "destinoId",
    "label": "Destino:",
    "type": TYPE_INPUT.INPUT_SELECT,
    "readOnly": false,
    "required": true,
    "listItems":destinations
  }
];

export const formEditDocument= users => [
  {
    "id": "document",
    "label": "Documento:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": true
  },
  {
    "id": "asunto",
    "label": "Asunto:",
    "type": TYPE_INPUT.INPUT_TEXT_AREA,
    "readOnly": false,
    "required":true
  },
  {
    "id": "userId",
    "label": "Responsable:",
    "type": TYPE_INPUT.INPUT_SELECT,
    "readOnly": false,
    "required": true,
    "listItems":users
  }
]