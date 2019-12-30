import {TYPE_INPUT} from "../../constants/Constants";
import {typeDestinations} from "../../fakedata/ListDataDocuments";

const formOficiosCirculares = (typeDocuments, onChange)=> [
  {
    "id": "tipoDocuId",
    "label": "Tipo de Documento:",
    "type": TYPE_INPUT.INPUT_SELECT,
    "required": true,
    "listItems":typeDocuments,
    "onChangeCustom": onChange
  },
  {
    "id": "document",
    "label": "Documento:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": true
  },
  {
    "type": TYPE_INPUT.INPUT_CIRCULAR,
    "idTypeDestinations":"typeDestinationsId",
    "idDestinations": "destinationsId",
    "typeDestinations": typeDestinations
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
    "id": "firma",
    "label": "Firma:",
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
    "id": "areaResponsable",
    "label": "Área responsable:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": true
  }
];

export default formOficiosCirculares