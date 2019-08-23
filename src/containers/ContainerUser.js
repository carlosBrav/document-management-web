import React, {Component} from 'react';
import CommonMenu from "../components/commons/CommonMenu";
import {Route, Switch} from "react-router-dom";
import DocRecibidos from "../components/pages/DocRecibidos";
import DocConfirmados from "../components/pages/DocConfirmados";
import DocRespuesta from "../components/pages/DocRespuesta";
import Busqueda_avanzada from "../components/pages/Busqueda_avanzada";


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
          url: '/user'
        },
        firstColumn: {
          title: 'Ver',
          subMenus: [
            {
              title: 'Documentos',
              url: '/user/documentos'
            },
            {
              title: 'Documentos internos',
              url: '/user/document_internos'
            },
            {
              title: 'Oficios OGPL',
              url: '/user/document_oficios'
            }
          ]
        },
        secondColumn: {
          title: 'Reportes especiales',
        }
        ,
        thirdColumn: {
          title: 'Búsqueda avanzada',
          url: '/user/busqueda_avanzada'
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
              <Route exact path="/user/documentos" component={DocRecibidos}/>
              <Route exact path="/user/document_internos" component={DocConfirmados}/>
              <Route exact path='/user/document_oficios' component={DocRespuesta}/>
              <Route exact path='/user/busqueda_avanzada' component={Busqueda_avanzada}/>
            </Switch>
          </Route>
        </div>

      </div>
    )
  }
}
export default ContainerAdmin

