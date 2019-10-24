import {TYPE_INPUT} from "../../constants/Constants";

const typeDestinations = [
  {id: "0", value: "Facultad"},
  {id: "1", value: "Oficina Interna"},
  {id: "2", value: "Instituacion Externa"},
  {id: "3", value: "Dependencia Int. UNMSM"},
  {id: "4", value: "Dependencia Ext. UNMSM"},
  {id: "5", value: "Dependencia Sede Central"}
]

const formOficiosCirculares = (typeDocuments)=> [
  {
    "id": "tipoDocuId",
    "label": "Tipo de Documento:",
    "type": TYPE_INPUT.INPUT_SELECT,
    "required": true,
    "listItems":typeDocuments
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