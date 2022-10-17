import { Outlet } from "react-router-dom";
import "./App.css";
import Cabecalho from "./componentes/Cabecalho";
import Carrinho from "./componentes/Carrinho";
import Rodape from "./componentes/Rodape";
import AppContextProvider from "./providers/AppContextProvider";

function App() {
  return (
    <AppContextProvider>
      <div className="App">
        <Cabecalho />
        <div className="conteudo">
          <main>
            <Outlet />
          </main>
          <Carrinho />
        </div>
        <Rodape />
      </div>
    </AppContextProvider>
  );
}

export default App;
