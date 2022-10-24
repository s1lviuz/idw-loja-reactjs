import { useContext } from "react";
import Container from "react-bootstrap/Container";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Outlet } from "react-router-dom";
import "./App.scss";
import BarraDeNavegacao from "./componentes/BarraDeNavegacao";
import Carrinho from "./componentes/Carrinho";
import Rodape from "./componentes/Rodape";
import { LojaContext } from "./providers/AppContextProvider";

function App() {
  const { showCarrinho, handleFecharCarrinho } = useContext(LojaContext);

  return (
    <>
      <BarraDeNavegacao />

      <Container className="my-5">
        <main>
          <Outlet />
        </main>
      </Container>

      <Offcanvas
        show={showCarrinho}
        onHide={handleFecharCarrinho}
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Carrinho</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Carrinho />
        </Offcanvas.Body>
      </Offcanvas>

      <Rodape />
    </>
  );
}

export default App;
