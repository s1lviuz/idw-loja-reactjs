import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useLojaContext } from "../providers/AppProvider";
import { useAuthContext } from "../providers/AuthProvider";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";

/**
 * O componente BarraDeNavegação fornece a interface gráfica
 * de uma barra global de navegação que se ajusta conforme
 * as dimensões da tela.
 */
export default function BarraDeNavegacao() {
  const { handleAbrirCarrinho } = useLojaContext();
  const { user, signOut } = useAuthContext();
  const navigate = useNavigate();

  const handleSairClick = (e) => {
    e.preventDefault();
    signOut();
    navigate("/contas/entrar");
  };

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
            {user == null && (
              <Nav.Link as={Link} to="/contas/entrar">
                Entrar
              </Nav.Link>
            )}
            {user != null && (
              <NavDropdown title={user.username} menuVariant="dark">
                <NavDropdown.Item as={Link} to="/perfil">
                  Perfil
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/pedidos">
                  Pedidos
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleSairClick}>
                  Sair
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
