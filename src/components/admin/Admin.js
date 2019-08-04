import React, {Component} from 'react';
import CommonMenu from '../commons/CommonMenu';
import { Route, Switch } from 'react-router-dom';
import DocRecibidos from "./DocRecibidos";
import DocConfirmados from "./DocConfirmados";
import Menu from '../utils/test';
import DocRespuesta from './DocRespuesta';

class Admin extends Component{

  goToDocRecibidos=()=>{
    const {history} = this.props
    history.push('/admin/doc_recibidos')
  };

  goToDocConfirmados=()=>{
    const {history} = this.props
    history.push('/admin/doc_confirmados')
  };

  goToTest=()=>{
    const {history} = this.props
    history.push('/admin/test')
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

  render(){
    return(
      <div className='container-admin'>
        <div className='container-menu-admin'>
          <CommonMenu goToDocRecibidos={this.goToDocRecibidos} goToDocConfirmados={this.goToDocConfirmados}
                      goToDocumentRespuesta={this.goToDocumentRespuesta}/>
        </div>
        <div className='admin-content'>
          <Route>
            <Switch>
              <Route exact path="/admin/doc_recibidos" component={DocRecibidos}/>
              <Route exact path="/admin/doc_confirmados" component={DocConfirmados}/>
              <Route exact path="/admin/test" component={Menu}/>
              <Route exact path='/admin/document_respuesta' component={DocRespuesta}/>
            </Switch>
          </Route>
        </div>

      </div>
    )
  }
}

export default Admin