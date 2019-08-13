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
import CommonPickList from "../components/commons/CommonPickList";

class ContainerAdmin extends Component{

  goToPage=(pageDirection)=>{
    const {history} = this.props;
    history.push(pageDirection)
  };

  render(){
    return(
      <div className='container-admin'>
        <div className='container-menu-admin'>
          <CommonMenu goToDocRecibidos={()=> this.goToPage('/admin/document_recibidos')}
                      goToDocConfirmados={()=> this.goToPage('/admin/document_confirmados')}
                      goToDocumentRespuesta={()=> this.goToPage('/admin/document_respuesta')}
                      goToDocumentCirculares={()=> this.goToPage('/admin/document_circular')}
                      goToDocumentProveidos={()=> this.goToPage('/admin/document_proveido')}
                      goToDocumentGenerados={()=> this.goToPage('/admin/document_generado')}
                      goToBusquedaAvanzada={()=> this.goToPage('/admin/busqueda_avanzada')}
                      goToControlDocumentos={()=> this.goToPage('/admin/control_documentos')}
                      goToTest={()=> this.goToPage('/admin/test')}
                      goToAdmin={()=> this.goToPage('/admin')}/>
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

export default ContainerAdmin