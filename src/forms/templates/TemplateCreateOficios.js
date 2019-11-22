import {TYPE_DESTINYS, TYPE_INPUT} from '../../constants/Constants';
import {list_dependencies,list_dependencies_2} from '../../fakedata/ListDataDocuments';

export const formOficios = [
  {
    "id": "documentId",
    "label": "Documento:",
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
    "id": "areaResponsableId",
    "label": "Área responsable:",
    "type": TYPE_INPUT.INPUT_SELECT,
    "readOnly": false,
    "required": true,
    "listItems":list_dependencies,
    "useOnChange": false
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
    "id": "destinyId",
    "label": "Destino:",
    "type": TYPE_INPUT.INPUT_SELECT,
    "readOnly": false,
    "required": true,
    "listItems":list_dependencies_2,
    "useOnChange": false
  }
]

export const formOficiosToExp= (change1,destinations) => [
  {
    "id": "numTram",
    "label": "Expediente:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": true
  },
  {
    "id": "asunto",
    "label": "Asunto:",
    "type": TYPE_INPUT.INPUT_TEXT_AREA,
    "readOnly": true
  },
  {
    "id": "observacion",
    "label": "Observación:",
    "type": TYPE_INPUT.INPUT_TEXT_AREA,
    "readOnly": false,
    "required": true
  },
  {
    "id": "fecha",
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
    "id": "responsable",
    "label": "Responsable:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": true
  },
  {
    "id": "tipoDestinoId",
    "label": "Tipo de Destino:",
    "type": TYPE_INPUT.INPUT_SELECT,
    "readOnly": false,
    "listItems":TYPE_DESTINYS,
    "onChangeCustom": change1
  },
  {
    "id": "destinyId",
    "label": "Destino:",
    "type": TYPE_INPUT.INPUT_SELECT,
    "readOnly": false,
    "listItems":destinations
  }
];