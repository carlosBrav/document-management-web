import React, {Component} from 'react';
import CommonMenu from "../components/commons/CommonMenu";
import {Route, Switch} from "react-router-dom";
import DocumentsReceived from "../components/pages/usuario/recieved_documents";
import DocumentsAssigned from "../components/pages/usuario/assigned_documents";
import InternDocuments from "../components/pages/usuario/intern_documents";
import DocRespuesta from "../components/pages/DocRespuesta";
import Busqueda_avanzada from "../components/pages/Busqueda_avanzada";
import {delete_cookie, getParseObj, removeUser} from "../utils/Utils";

class ContainerAdmin extends Component{

  goToPage=(pageDirection)=>{
    const {history} = this.props;
    history.push(pageDirection)
  };

  onLogOut= () => {
    const {history} = this.props;
    delete_cookie('1P_JAR');
    removeUser();
    history.push(`/`);
  };

  render(){
    const currentUser = getParseObj('CURRENT_USER');
    const columns =
      {
        head: {
          title: 'Oficina General de Planificacion',
          url: '/usuario'
        },
        firstColumn: {
          title: 'Ver',
          subMenus: [
            {
              title: 'Documentos',
              url: (currentUser.rolName === 'asignador') ? '/usuario/documentos' : '/usuario/documentos_asignados'
            },
            {
              title: 'Documentos internos',
              url: '/usuario/document_internos'
            },
            {
              title: 'Oficios OGPL',
              url: '/usuario/document_oficios'
            }
          ]
        },
        secondColumn: {
          title: 'Reportes especiales',
        }
        ,
        thirdColumn: {
          title: 'Búsqueda avanzada',
          url: '/usuario/busqueda_avanzada'
        }
        ,
        fourthColumn: {
          title: 'Mantenimiento'
        },
        fifthColumn: {
          title: currentUser.nombre,
          subMenus: [
            {title: "Cerrar sesión",
              action: this.onLogOut
            }
          ]
        }

      };

    return(
      <div className='container-admin'>
        <div className='container-menu-admin'>
          <CommonMenu menus={columns} goToPage={this.goToPage}/>
        </div>
        <div className='admin-content'>
          <Route>
            <Switch>
              <Route exact path="/usuario/documentos" component={DocumentsReceived}/>
              <Route exact path="/usuario/documentos_asignados" component={DocumentsAssigned}/>
              <Route exact path="/usuario/document_internos" component={InternDocuments}/>
              <Route exact path='/usuario/document_oficios' component={DocRespuesta}/>
              <Route exact path='/usuario/busqueda_avanzada' component={Busqueda_avanzada}/>
            </Switch>
          </Route>
        </div>

      </div>
    )
  }
}
export default ContainerAdmin

