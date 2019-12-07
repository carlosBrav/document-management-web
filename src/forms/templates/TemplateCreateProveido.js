import {TYPE_INPUT} from "../../constants/Constants";

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

export const formProveidosExternos = [
  {
    "id": "documentTipoId",
    "label": "Documento:",
    "type": TYPE_INPUT.INPUT_SELECT,
    "readOnly": false,
    "required": true,
    "useOnChange": true
  },
  {
    "id": "nroDocumentoId",
    "label": "Nro. documento:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": false,
    "required": true
  },
  {
    "id": "asuntoId",
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
    "useOnChange": false
  },
  {
    "id": "depOrigenId",
    "label": "Dep. origen:",
    "type": TYPE_INPUT.INPUT_SELECT,
    "readOnly": false,
    "required": true,
    "useOnChange": false
  },
  {
    "id": "tipoDestinoId",
    "label": "Tipo de destino:",
    "type": TYPE_INPUT.INPUT_SELECT,
    "readOnly": false,
    "required": true,
    "useOnChange": false
  },
  {
    "id": "depDestinoId",
    "label": "Dep. destino:",
    "type": TYPE_INPUT.INPUT_SELECT,
    "readOnly": false,
    "required":true,
    "useOnChange": false
  },
  {
    "id": "fechaId",
    "label": "Fecha:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": true
  },
  {
    "id": "usuarioId",
    "label": "Usuario:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": true
  },
]