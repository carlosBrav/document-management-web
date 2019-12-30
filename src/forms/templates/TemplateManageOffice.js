import {TYPE_INPUT} from "../../constants/Constants";
import {OFFICES} from "../../utils/Constants";
import {typeDestinations} from "../../fakedata/ListDataDocuments";

export const formEditOffice = (isReadOnly) =>
[
  {
    "id": OFFICES.CODIGO,
    "label": "Codigo:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": isReadOnly,
  },
  {
    "id": OFFICES.NOMBRE,
    "label": "Nombre:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": false,
    "required": true
  },
  {
    "id": OFFICES.SIGLAS,
    "label": "Siglas:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": false,
    "required": true
  },
  {
    "id": OFFICES.TIPO,
    "label": "Tipo:",
    "type": TYPE_INPUT.INPUT_SELECT,
    "readOnly": false,
    "required": true,
    "listItems":typeDestinations
  }
]