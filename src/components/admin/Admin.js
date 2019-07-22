import React, {Component} from 'react';
import CommonMenu from '../commons/CommonMenu';
import { Route, Switch } from 'react-router-dom';
import DocRecibidos from "./DocRecibidos";
import DocConfirmados from "./DocConfirmados";

class Admin extends Component{

  goToDocRecibidos=()=>{
    const {history} = this.props
    history.push('/admin/doc_recibidos')
  }

  goToDocConfirmados=()=>{
    const {history} = this.props
    history.push('/admin/doc_confirmados')
  }

  render(){
    return(
      <div className='container-admin'>
        <div className='container-menu-admin'>
          <CommonMenu goToDocRecibidos={this.goToDocRecibidos} goToDocConfirmados={this.goToDocConfirmados} />
        </div>
        <div className='admin-content'>
          <Route>
            <Switch>
              <Route exact path="/admin/doc_recibidos" component={DocRecibidos}/>
              <Route exact path="/admin/doc_confirmados" component={DocConfirmados}/>
            </Switch>
          </Route>
        </div>

      </div>
    )
  }
}

export default Admin