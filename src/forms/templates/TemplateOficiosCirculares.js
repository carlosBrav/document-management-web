import {TYPE_INPUT} from "../../constants/Constants";
import {list_dependencies,list_type_destinations} from '../../fakedata/ListDataDocuments';

export const formOficiosCirculares = [
  {
    "id": "tipoDocumentId",
    "label": "Tipo de Documento:",
    "type": TYPE_INPUT.INPUT_SELECT,
    "required": true,
    "listItems":list_dependencies
  },
  {
    "id": "documentId",
    "label": "Documento:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": true
  },
  {
    "type": TYPE_INPUT.INPUT_CIRCULAR,
    "idTypeDestinations":"typeDestinationsId",
    "idDestinations": "destinationsId",
    "typeDestinations": list_type_destinations
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
    "readOnly": true
  },
  {
    "id": "firmaId",
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
    "id": "areaResponsableId",
    "label": "Área responsable:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": true
  }
];