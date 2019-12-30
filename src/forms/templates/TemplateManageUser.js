import {TYPE_INPUT} from "../../constants/Constants";
import {USER} from "../../utils/Constants";
import {list_dependencies, list_roles} from '../../fakedata/ListDataDocuments';

export const formEditUser = (isReadOnlySelect) =>
[
  {
    "id": USER.NOMBRE,
    "label": "Nombre:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": false,
    "required": true
  },
  {
    "id": USER.APELLIDO,
    "label": "Apellido:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": false,
    "required": true
  },
  {
    "id": USER.EMAIL,
    "label": "Correo:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": false,
    "required": true
  },
  {
    "id": USER.TELEFONO,
    "label": "Teléfono:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": false,
    "required": true
  },
  {
    "id": USER.DEPENDENCIA_ID,
    "label": "Oficina:",
    "type": TYPE_INPUT.INPUT_SELECT,
    "readOnly": false,
    "required": true,
    "listItems":list_dependencies
  },
  {
    "id": USER.ROL,
    "label": "Rol:",
    "type": TYPE_INPUT.INPUT_SELECT,
    "readOnly": isReadOnlySelect,
    "required": !isReadOnlySelect,
    "listItems":list_roles
  },
  {
    "id": USER.USER_NAME,
    "label": "Usuario:",
    "type": TYPE_INPUT.INPUT_TEXT,
    "readOnly": false,
    "required": true
  }
];

export const formCreateUser=(isReadOnlySelect)=>{
  const formUser = formEditUser(isReadOnlySelect)
  return [
    ...formUser,
    {
      "id": USER.PASSWORD,
      "label": "Contraseña:",
      "type": TYPE_INPUT.INPUT_TEXT_PASSWORD,
      "readOnly": false,
      "required": true
    },
    {
      "id": USER.CONFIRM_PASSWORD,
      "label": "Confirmar Contraseña:",
      "type": TYPE_INPUT.INPUT_TEXT_PASSWORD,
      "readOnly": false,
      "required": true
    }
  ]
}