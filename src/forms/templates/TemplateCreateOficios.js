import {TYPE_INPUT} from '../../constants/Constants';
import {list_dependencies,list_dependencies_2} from '../../fakedata/ListDataDocuments';

export const formOficios = [
  {
    "id": "oficioId",
    "label": "Expediente:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": true
  },
  {
    "id": "asuntoId",
    "label": "Asunto:",
    "type": TYPE_INPUT.INPUT_TEXT_AREA,
    "readOnly": true
  },
  {
    "id": "observacionId",
    "label": "Observación:",
    "type": TYPE_INPUT.INPUT_TEXT_AREA,
    "readOnly": false,
    "required": true
  },
  {
    "id": "fechaId",
    "label": "Fecha:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": false
  },
  {
    "id": "origenId",
    "label": "Origen:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": true
  },
  {
    "id": "responsableId",
    "label": "Responsable:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": true
  },
  {
    "id": "tipoDestinoId",
    "label": "Tipo de Destino:",
    "type": TYPE_INPUT.INPUT_SELECT,
    "readOnly": false,
    "listItems":list_dependencies
  },
  {
    "id": "destinoId",
    "label": "Destino:",
    "type": TYPE_INPUT.INPUT_SELECT,
    "readOnly": false,
    "listItems":list_dependencies_2
  }
];