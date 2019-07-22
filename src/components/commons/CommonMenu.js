import React, {Component} from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'

class CommonMenu extends Component{

  render(){
    const {goToDocRecibidos, goToDocConfirmados} = this.props
    return(
      <Navbar inverse >
        <Navbar.Header>
          <Navbar.Brand>
            <span>Oficina General de Planificacion</span>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav pullLeft={true}>
          <NavDropdown eventKey={1} title="SECG" id="basic-nav-dropdown_1">
            <MenuItem eventKey={1.1} onClick={goToDocRecibidos}>Documentos Recibidos</MenuItem>
            <MenuItem eventKey={1.2} onClick={goToDocConfirmados}>Documentos Confirmados</MenuItem>
          </NavDropdown>
        </Nav>
        <Nav  pullLeft={true}>
          <NavDropdown   eventKey={2} title="Sistema Interno"  id="basic-nav-dropdown_2">
            <MenuItem eventKey={2.1}>Gestión Documentos</MenuItem>
            <MenuItem eventKey={2.2}>Control Documentos</MenuItem>
            <MenuItem eventKey={2.3}>

            </MenuItem>
          </NavDropdown>
        </Nav>
        <Nav pullLeft={true}>
          <NavItem eventKey={3} href="#">
            Búsqueda avanzada
          </NavItem>
        </Nav>
        <Nav pullLeft={true}>
          <NavItem eventKey={4} href="#">
            Mantenimiento
          </NavItem>
        </Nav>
      </Navbar>
    )
  }
}

export default CommonMenu;