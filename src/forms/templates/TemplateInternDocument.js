import {TYPE_DESTINYS, TYPE_INPUT} from '../../constants/Constants';

export const formCreateInternDocument = (typeDocuments, listUsers, destinations, onChange1,onChange2) =>[
  {
    "id": "tipoDocuId",
    "label": "Tipo de Documento:",
    "type": TYPE_INPUT.INPUT_SELECT,
    "required": true,
    "listItems":typeDocuments,
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
    "required": true
  },
  {
    "id": "fechaCreacion",
    "label": "Fecha:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": true
  },
  {
    "id": "horaCreacion",
    "label": "Hora:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": true
  },
  {
    "id": "origenName",
    "label": "Origen:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": true
  },
  {
    "id": "userAssignedId",
    "label": "Responsable:",
    "type": TYPE_INPUT.INPUT_SELECT,
    "required": true,
    "listItems":listUsers
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
]