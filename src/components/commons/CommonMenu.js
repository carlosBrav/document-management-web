import React, {Component} from 'react';

class CommonMenu extends Component{

  render(){
    const {goToDocRecibidos, goToDocConfirmados, goToDocumentRespuesta, goToDocumentCirculares, goToDocumentProveidos, goToDocumentGenerados,
      goToBusquedaAvanzada, goToControlDocumentos, goToTest} = this.props
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
                    <div className="dropdown-item hover-pointer" onClick={()=> goToDocumentCirculares()}>Doc. Circulares</div>
                    <div className="dropdown-item hover-pointer" onClick={()=> goToDocumentProveidos()}>Doc. Proveidos</div>
                    <div className="dropdown-item hover-pointer" onClick={()=> goToDocumentGenerados()}>Doc. Generados (otros)</div>
                  </ul>
                </li>
                <div className="dropdown-item hover-pointer" onClick={()=> goToControlDocumentos()}>Control Documentos</div>
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-link hover-pointer" onClick={()=> goToBusquedaAvanzada()}>Búsqueda avanzada</div>
            </li>
            <li className="nav-item">
              <div className="nav-link hover-pointer" onClick={()=> goToTest()}>test</div>
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