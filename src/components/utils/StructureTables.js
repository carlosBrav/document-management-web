
import { BUTTON_TYPE } from '../../constants/Constants';
import {ICON_TYPE} from "../commons/CommonIcon";

export const getStructureForDocRecibidos = (onToggleAddDocSelect,checkAllDoc) => (
  [
    {
      columnHeader: '',
      elementHeader: BUTTON_TYPE.CHECKBOX,
      actionHeader: checkAllDoc,
      actions: [{
        actionType: 'button',
        action: (index) => onToggleAddDocSelect(index)
      }]
    },
    {
      columnHeader: 'Num. Tram.',
      rowProp: 'tramNum',
      classSearchRow: 'container-search-field normal-size',
      filterHeader: true
    },
    {
      columnHeader: 'Mov.',
      rowProp: 'moviNum'
    },
    {
      columnHeader: 'Destino',
      rowProp: 'moviDestino',
      classSearchRow: 'container-search-field long-size',
      filterHeader: true,
      rowStyle: 'custom-td'
    },
    {
      columnHeader: 'F. Envio',
      rowProp: 'moviFecEnv',
      classSearchRow: 'container-search-field medium-size',
      filterHeader: true
    },
    {
      columnHeader: 'Indicador',
      rowProp: 'indiNombre'
    },
    {
      columnHeader: 'Observación',
      rowProp: 'moviObs'
    },
    {
      columnHeader: 'Doc. Nombre',
      rowProp: 'document'
    }
  ]
)

export const getStructureForDocConfirmados = (onToggleAddDocSelect,checkAllDoc) => (
  [
    {
      columnHeader: '',
      elementHeader: BUTTON_TYPE.CHECKBOX,
      actionHeader: checkAllDoc,
      actions: [{
        actionType: 'button',
        action: (index) => onToggleAddDocSelect(index)
      }]
    },
    {
      columnHeader: 'Num. Tram.',
      rowProp: 'numTram',
      classSearchRow: 'container-search-field normal-size',
      filterHeader: true
    },
    {
      columnHeader: 'Mov.',
      rowProp: 'movimiento'
    },
    {
      columnHeader: 'Destino',
      rowProp: 'destinoNombre',
      classSearchRow: 'container-search-field long-size',
      filterHeader: true
    },
    {
      columnHeader: 'F. Envio',
      rowProp: 'fechaEnvio',
      classSearchRow: 'container-search-field medium-size',
      filterHeader: true
    },
    {
      columnHeader: 'Indicador',
      rowProp: 'indiNombre'
    },
    {
      columnHeader: 'Observación',
      rowProp: 'observacion'
    },
    {
      columnHeader: 'Doc. Nombre',
      rowProp: 'document'
    }
  ]
)

export const getStructureForDocResp = (onToggleAddDocSelect,checkAllDoc) => (
  [
    {
      columnHeader: '',
      elementHeader: BUTTON_TYPE.CHECKBOX,
      actionHeader: checkAllDoc,
      actions: [{
        actionType: 'button',
        action: (index) => onToggleAddDocSelect(index)
      }]
    },
    {
      columnHeader: 'Num. Tram.',
      rowProp: 'numTram',
      classSearchRow: 'container-search-field normal-size',
      filterHeader: true
    },
    {
      columnHeader: 'Mov.',
      rowProp: 'movimiento'
    },
    {
      columnHeader: 'Doc. Rpta.',
      rowProp: 'internDocument'
    },
    {
      columnHeader: 'Origen',
      rowProp: 'origenNombre',
      classSearchRow: 'container-search-field long-size',
      filterHeader: true
    },
    {
      columnHeader: 'F. Envio',
      rowProp: 'fechaEnvio',
      classSearchRow: 'container-search-field medium-size',
      filterHeader: true
    },
    {
      columnHeader: 'Indicador',
      rowProp: 'indiNombre'
    },
    {
      columnHeader: 'Observación',
      rowProp: 'observacion'
    },
    {
      columnHeader: 'Doc. Nombre',
      rowProp: 'document'
    }
  ]
)

export const getStructureForDocRespOficios = (onToggleAddDocSelect,checkAllDoc) => (
  [
    {
      columnHeader: '',
      elementHeader: BUTTON_TYPE.CHECKBOX,
      actionHeader: checkAllDoc,
      actions: [{
        actionType: 'button',
        action: (index) => onToggleAddDocSelect(index)
      }]
    },
    {
      columnHeader: 'Documento',
      rowProp: 'document',
      classSearchRow: 'container-search-field normal-size',
      filterHeader: true
    },
    {
      columnHeader: 'Num. Tram.',
      rowProp: 'numTram',
      classSearchRow: 'container-search-field normal-size',
      filterHeader: true
    },
    {
      columnHeader: 'Destino',
      rowProp: 'destinoName',
      classSearchRow: 'container-search-field long-size',
      filterHeader: true
    },
    {
      columnHeader: 'F. Envio',
      rowProp: 'fechaCreacion',
      classSearchRow: 'container-search-field medium-size',
      filterHeader: true
    },
    {
      columnHeader: 'Observación',
      rowProp: 'observacion'
    },
    {
      columnHeader: 'Asunto',
      rowProp: 'asunto'
    },
    {
      columnHeader: 'Estado',
      rowProp: 'estado'
    }
  ]
)

export const getStructureForCircular = (onToggleAddDocSelect,checkAllDoc) => (
  [
    {
      columnHeader: '',
      elementHeader: BUTTON_TYPE.CHECKBOX,
      actionHeader: checkAllDoc,
      actions: [{
        actionType: 'button',
        action: (index) => onToggleAddDocSelect(index)
      }]
    },
    {
      columnHeader: 'Documento',
      rowProp: 'correlative',
      classSearchRow: 'container-search-field normal-size',
      filterHeader: true
    },
    {
      columnHeader: 'Asunto',
      rowProp: 'asunto'
    },
    {
      columnHeader: 'Area Resp.',
      rowProp: 'origenName',
      classSearchRow: 'container-search-field long-size',
      filterHeader: true
    },
    {
      columnHeader: 'Fecha Env.',
      rowProp: 'fechaCreacion'
    },
    {
      columnHeader: 'Firma',
      rowProp: 'firma',
    },
    {
      columnHeader: 'Responsable',
      rowProp: 'responsable'
    },
    {
      columnHeader: '',
      rowStyle: 'container-icons',
      actions: [
        {
          actionType: ICON_TYPE.SEARCH,
          action: data => this.onToggleViewDocumentDetails(data, true)
        },
        {
          actionType: ICON_TYPE.EDIT,
          action: data => this.onToggleEditDocument(data)
        }
      ]
    }
  ]
)

export const getStructureForProveido_1 = (onToggleAddDocSelect,checkAllDoc) => (
  [
    {
      columnHeader: '',
      elementHeader: BUTTON_TYPE.CHECKBOX,
      actionHeader: checkAllDoc,
      actions: [{
        actionType: 'button',
        action: (index) => onToggleAddDocSelect(index)
      }]
    },
    {
      columnHeader: 'Documento',
      rowProp: 'document',
      classSearchRow: 'container-search-field normal-size',
      filterHeader: true
    },
    {
      columnHeader: 'Asunto',
      rowProp: 'asunto',
    },
    {
      columnHeader: 'Origen',
      rowProp: 'originName',
      classSearchRow: 'container-search-field long-size',
      filterHeader: true
    },
    {
      columnHeader: 'Fecha Reg.',
      rowProp: 'fechaCreacion'
    }
  ]
)

export const getStructureForProveido_2 = (onToggleAddDocSelect,checkAllDoc,listFunctions) => (
  [
    {
      columnHeader: '',
      elementHeader: BUTTON_TYPE.CHECKBOX,
      actionHeader: checkAllDoc,
      actions: [{
        actionType: 'button',
        action: (index) => onToggleAddDocSelect(index)
      }]
    },
    {
      columnHeader: 'Documento',
      rowProp: 'document',
      classSearchRow: 'container-search-field normal-size',
      filterHeader: true
    },
    {
      columnHeader: 'Num. Doc.',
      rowProp: 'referenceDocument'
    },
    {
      columnHeader: 'Fech. Reg.',
      rowProp: 'fechaCreacion'
    },
    {
      columnHeader: 'Asunto',
      rowProp: 'asunto'
    },
    {
      columnHeader: 'Origen',
      rowProp: 'origenName',
      classSearchRow: 'container-search-field long-size',
      filterHeader: true
    },
    {
      columnHeader: 'Destino',
      rowProp: 'destinoName',
    },
    {
      columnHeader: 'Usuario',
      rowProp: 'user'
    },
    {
      columnHeader: '',
      rowStyle: 'container-icons',
      actions: [
        {
          actionType: ICON_TYPE.EDIT,
          action: data => listFunctions[0](data)
        }
      ]
    }
  ]
)

export const getStructureForDocGenerados = (onToggleAddDocSelect,checkAllDoc, listFunctions) => (
  [
    {
      columnHeader: '',
      elementHeader: BUTTON_TYPE.CHECKBOX,
      actionHeader: checkAllDoc,
      actions: [{
        actionType: 'button',
        action: (index) => onToggleAddDocSelect(index)
      }]
    },
    {
      columnHeader: 'Documento',
      rowProp: 'document',
      classSearchRow: 'container-search-field normal-size',
      filterHeader: true
    },
    {
      columnHeader: 'Fech. Reg.',
      rowProp: 'fechaCreacion'
    },
    {
      columnHeader: 'Asunto',
      rowProp: 'asunto',
    },
    {
      columnHeader: 'Origen',
      rowProp: 'origenName'
    },
    {
      columnHeader: 'Destino',
      rowProp: 'destinoName',
    },
    {
      columnHeader: 'Responsable',
      rowProp: 'responsable'
    },
    {
      columnHeader: '',
      rowStyle: 'container-icons',
      actions: [
        {
          actionType: ICON_TYPE.SEARCH,
          action: data => listFunctions[0](data)
        },
        {
          actionType: ICON_TYPE.EDIT,
          action: data => listFunctions[1](data)
        }
      ]
    }
  ]
)

export const getStructureBusqAvanzada = (onToggleAddDocSelect,checkAllDoc) => (
  [
    {
      columnHeader: '',
      elementHeader: BUTTON_TYPE.CHECKBOX,
      actionHeader: checkAllDoc,
      actions: [{
        actionType: 'button',
        action: (index) => onToggleAddDocSelect(index)
      }]
    },
    {
      columnHeader: 'Documento',
      rowProp: 'numTram',
      classSearchRow: 'container-search-field normal-size',
      filterHeader: true
    },
    {
      columnHeader: 'Fech. Ingreso.',
      rowProp: 'fechaIngreso'
    },
    {
      columnHeader: 'Fech. Envio',
      rowProp: 'fechaEnvio',
    },
    {
      columnHeader: 'Observacion',
      rowProp: 'observacion'
    },
    {
      columnHeader: 'Origen',
      rowProp: 'origenNombre',
    },
    {
      columnHeader: 'Derivado a',
      rowProp: 'destinoNombre',
    }
  ]
)

export const getStructureUsers = (onToggleAddDocSelect,checkAllDoc,listFunctions) => (
  [
    {
      columnHeader: 'Nombre',
      rowProp: 'nombre',
      classSearchRow: 'container-search-field normal-size',
      filterHeader: true
    },
    {
      columnHeader: 'Apellido',
      rowProp: 'apellido',
      classSearchRow: 'container-search-field normal-size',
      filterHeader: true
    },
    {
      columnHeader: 'Teléfono',
      rowProp: 'telefono',
    },
    {
      columnHeader: 'Correo',
      rowProp: 'email',
    },
    {
      columnHeader: 'Rol',
      rowProp: 'rolName',
    },
    {
      columnHeader: 'Oficina',
      rowProp: 'officeName'
    },
    {
      columnHeader: 'Usuario',
      rowProp: 'usuario'
    },
    {
      columnHeader: 'Estado',
      rowProp: 'status'
    },
    {
      columnHeader: '',
      rowStyle: 'container-icons',
      actions: [
        {
          actionType: ICON_TYPE.TRASH,
          action: listFunctions[0]
        }
      ]
    }
  ]
)

export const getStructureSeguimientoView = () => (
  [
    {
      columnHeader: 'Documento',
      rowProp: 'tramNum',
    },
    {
      columnHeader: 'Mov.',
      rowProp: 'moviNum'
    },
    {
      columnHeader: 'Fech. Ingreso.',
      rowProp: 'moviFecIng'
    },
    {
      columnHeader: 'Fech. Envio',
      rowProp: 'moviFecEnv',
    },
    {
      columnHeader: 'Origen',
      rowProp: 'moviOrigen',
    },
    {
      columnHeader: 'Derivado a',
      rowProp: 'moviDestino',
    }
  ]
)