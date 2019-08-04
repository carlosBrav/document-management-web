import React, {Component} from 'react';

class CommonMenu extends Component{

  render(){
    const {goToDocRecibidos, goToDocConfirmados, goToDocumentRespuesta} = this.props
    return(
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="navbar-brand hover-pointer">Oficina General de Planificacion</div>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item dropdown">
              <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown"
                 aria-haspopup="true" aria-expanded="false">
                SECG
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <div className="dropdown-item hover-pointer" onClick={()=>goToDocRecibidos()}>Documentos Recibidos</div>
                <div className="dropdown-item hover-pointer" onClick={()=>goToDocConfirmados()} >Documentos Confirmados</div>
              </div>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link  dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Sistema Interno</a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li className="dropdown-submenu">
                  <a className="dropdown-item dropdown-toggle" data-toggle="dropdown"  href="#">Gestión Documentos</a>
                  <ul className="dropdown-menu">
                    <div className="dropdown-item hover-pointer" onClick={()=> goToDocumentRespuesta()}>Doc. Respuesta</div>
                    <div className="dropdown-item hover-pointer" >Doc. Circulares</div>
                    <div className="dropdown-item hover-pointer" >Doc. Proveidos</div>
                    <div className="dropdown-item hover-pointer" >Doc. Generados (otros)</div>
                  </ul>
                </li>
                <a className="dropdown-item" href="#">Control Documentos</a>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Búsqueda avanzada</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Mantenimiento</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

export default CommonMenu;