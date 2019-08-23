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
import Test from '../components/utils/test';

class ContainerAdmin extends Component{

  goToPage=(pageDirection)=>{
    const {history} = this.props;
    history.push(pageDirection)
  };

  render(){

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
            title: 'Mantenimiento'
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
              <Route exact path="/admin/document_recibidos" component={DocRecibidos}/>
              <Route exact path="/admin/document_confirmados" component={DocConfirmados}/>
              <Route exact path='/admin/document_respuesta' component={DocRespuesta}/>
              <Route exact path='/admin/document_circular' component={DocCirculares}/>
              <Route exact path='/admin/document_proveido' component={DocProveidos}/>
              <Route exact path='/admin/document_generado' component={DocGenerados}/>
              <Route exact path='/admin/busqueda_avanzada' component={Busqueda_avanzada}/>
              <Route exact path='/admin/control_documentos' component={ControlDocumentos}/>
              <Route exact path='/admin/test' component={Test}/>
            </Switch>
          </Route>
        </div>

      </div>
    )
  }
}

export default ContainerAdmin