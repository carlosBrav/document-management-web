import React, {Component} from 'react';
import CommonMenu from '../commons/CommonMenu';
import { Route, Switch } from 'react-router-dom';
import DocRecibidos from "./DocRecibidos";
import DocConfirmados from "./DocConfirmados";
import DocRespuesta from './DocRespuesta';
import DocCirculares from "./DocCirculares";
import DocProveidos from "./DocProveidos";
import DocGenerados from "./DocGenerados";
import Busqueda_avanzada from "../../components/Busqueda_avanzada";
import ControlDocumentos from "./ControlDocumentos";
import CommonPickList from "../commons/CommonPickList";

class Admin extends Component{

  goToDocRecibidos=()=>{
    const {history} = this.props
    history.push('/admin/document_recibidos')
  };

  goToDocConfirmados=()=>{
    const {history} = this.props
    history.push('/admin/document_confirmados')
  };

  goToDocumentRespuesta=()=>{
    const {history} = this.props
    history.push('/admin/document_respuesta')
  };

  goToDocumentCirculares=()=>{
    const {history} = this.props
    history.push('/admin/document_circular')
  };

  goToDocumentProveidos=()=>{
    const {history} = this.props
    history.push('/admin/document_proveido')
  };

  goToDocumentGenerados=()=>{
    const {history} = this.props
    history.push('/admin/document_generado')
  };

  goToBusquedaAvanzada=()=>{
    const {history} = this.props
    history.push('/admin/busqueda_avanzada')
  };

  goToControlDocumentos=()=>{
    const {history} = this.props
    history.push('/admin/control_documentos')
  }

  goToTest=()=>{
    const {history} = this.props
    history.push('/admin/test')
  }


  render(){
    return(
      <div className='container-admin'>
        <div className='container-menu-admin'>
          <CommonMenu goToDocRecibidos={this.goToDocRecibidos} goToDocConfirmados={this.goToDocConfirmados}
                      goToDocumentRespuesta={this.goToDocumentRespuesta} goToDocumentCirculares={this.goToDocumentCirculares}
                      goToDocumentProveidos={this.goToDocumentProveidos} goToDocumentGenerados={this.goToDocumentGenerados}
                      goToBusquedaAvanzada={this.goToBusquedaAvanzada} goToControlDocumentos={this.goToControlDocumentos}
                      goToTest={this.goToTest}/>
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
              <Route exact path='/admin/test' component={CommonPickList}/>
            </Switch>
          </Route>
        </div>

      </div>
    )
  }
}

export default Admin