import {list_dependencies, list_dependencies_2} from "../../fakedata/ListDataDocuments";
import {TYPE_INPUT} from "../../constants/Constants";


export const formDocumGenerado = [
  {
    "id": "tipoDocumentId",
    "label": "Tipo de documento:",
    "type": TYPE_INPUT.INPUT_SELECT,
    "readOnly": false,
    "required": true
  },
  {
    "id": "documentId",
    "label": "Documento:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": true
  },
  {
    "id": "asuntoId",
    "label": "Asunto:",
    "type": TYPE_INPUT.INPUT_TEXT_AREA,
    "readOnly": false,
    "required":true
  },
  {
    "id": "fechaId",
    "label": "Fecha:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": true
  },
  {
    "id": "origenId",
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
    "listItems":list_dependencies
  },
  {
    "id": "destinoId",
    "label": "Destino:",
    "type": TYPE_INPUT.INPUT_SELECT,
    "readOnly": false,
    "required": true,
    "listItems":list_dependencies_2
  }
]