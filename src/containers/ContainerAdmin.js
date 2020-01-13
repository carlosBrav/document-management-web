import React, {Component} from 'react';
import CommonMenu from '../components/commons/CommonMenu';
import { Route, Switch } from 'react-router-dom';
import DocRecibidos from "../components/pages/DocRecibidos";
import DocConfirmados from "../components/pages/DocConfirmados";
import DocRespuesta from '../components/pages/DocRespuesta';
import DocCirculares from "../components/pages/DocCirculares";
import DocProveidos from "../components/pages/DocProveidos";
import DocGenerados from "../components/pages/DocGenerados";
import Busqueda_avanzada from "../components/pages/Busqueda_avanzada";
import ControlDocumentos from "../components/pages/ControlDocumentos";
import Maintenance_users from "../components/pages/Maintenance_users";
import Maintenance_offices from "../components/pages/Maintenance_offices";
import Test from '../components/utils/test';
import {getParseObj, removeUser, delete_cookie} from "../utils/Utils";
import ManageUser from "../components/pages/ManageUser";
import ManageOffice from "../components/pages/ManageOffice";
import {ValidateComponent} from "../utils/Utils";

class ContainerAdmin extends Component{

  goToPage=(pageDirection)=>{
    const {history} = this.props;
    history.push(pageDirection)
  };

  onLogOut= () => {
    const {history} = this.props
    delete_cookie('1P_JAR');
    removeUser();
    history.push(`/`);
  }

  render(){
    const {history} = this.props
    const redirect = () => {
      if(currentUser)
        history.push(`/${currentUser.role}`)
    };
    const currentUser = getParseObj('CURRENT_USER');
    const columns =
      {
        head: {
          title: 'Oficina General de Planificacion',
          url: '/admin'
        },
        firstColumn: {
          title: 'SECG',
          subMenus: [
            {
              title: 'Documentos recibidos',
              url: '/admin/document_recibidos'
            },
            {
              title: 'Documentos Confirmados',
              url: '/admin/document_confirmados'
            }
          ]
        },
        secondColumn: {
          title: 'Sistema interno',
          subMenus: [
            {
              title: 'Gestión documentos',
              subMenus: [
                {
                  title: 'Doc. Respuesta',
                  url: '/admin/document_respuesta'
                },
                {
                  title: 'Doc. Circulares',
                  url: '/admin/document_circular'
                },
                {
                  title: 'Doc. Proveídos',
                  url: '/admin/document_proveido'
                },
                {
                  title: 'Doc. Generados(otros)',
                  url: '/admin/document_generado'
                }
              ]
            },
            {
              title: 'Control documentos',
              url: '/admin/control_documentos'
            }
          ]
        }
        ,
        thirdColumn: {
            title: 'Búsqueda avanzada',
            url: '/admin/busqueda_avanzada'
          }
        ,
        fourthColumn: {
            title: 'Mantenimiento',
            subMenus: [
              {
                title: 'Gestión Usuarios',
                url: '/admin/Maintenance/users'
              },
              {
                title: 'Gestión Oficinas',
                url: '/admin/Maintenance/offices'
              },
            ],
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
              <Route exact path="/admin/document_recibidos" component={ValidateComponent('admin',DocRecibidos, redirect)}/>
              <Route exact path="/admin/document_confirmados" component={ValidateComponent('admin',DocConfirmados, redirect)}/>
              <Route exact path='/admin/document_respuesta' component={ValidateComponent('admin',DocRespuesta, redirect)}/>
              <Route exact path='/admin/document_circular' component={ValidateComponent('admin',DocCirculares, redirect)}/>
              <Route exact path='/admin/document_proveido' component={ValidateComponent('admin',DocProveidos, redirect)}/>
              <Route exact path='/admin/document_generado' component={ValidateComponent('admin',DocGenerados, redirect)}/>
              <Route exact path='/admin/busqueda_avanzada' component={ValidateComponent('admin',Busqueda_avanzada, redirect)}/>
              <Route exact path='/admin/control_documentos' component={ValidateComponent('admin',ControlDocumentos, redirect)}/>
              <Route exact path='/admin/Maintenance/users' component={ValidateComponent('admin',Maintenance_users, redirect)} />
              <Route exact path='/admin/Maintenance/offices' component={ValidateComponent('admin',Maintenance_offices, redirect)} />
              <Route exact path='/admin/test' component={Test}/>
              <Route exact path='/admin/user/:id' component={ValidateComponent(ManageUser, redirect)}/>
              <Route exact path='/admin/user' component={ValidateComponent(ManageUser, redirect)}/>
              <Route exact path='/admin/office/:id' component={ValidateComponent(ManageOffice, redirect)}/>
              <Route exact path='/admin/office' component={ValidateComponent(ManageOffice, redirect)}/>
            </Switch>
          </Route>
        </div>

      </div>
    )
  }
}

export default ContainerAdmin