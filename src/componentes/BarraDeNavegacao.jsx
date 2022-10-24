import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { LojaContext } from "../providers/AppContextProvider";

/**
 * O componente BarraDeNavegação fornece a interface gráfica
 * de uma barra global de navegação que se ajusta conforme
 * as dimensões da tela. 
 */
export default function BarraDeNavegacao() {
  const { handleAbrirCarrinho } = useContext(LojaContext);
  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <Container>
        <Navbar.Brand as={Link} to="">
          Loja PMW
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="loja-navbar-nav" />
        <Navbar.Collapse id="loja-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="">
              Loja
            </Nav.Link>
            <Nav.Link onClick={handleAbrirCarrinho}>Carrinho</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
