import { useState } from "react";
import "./App.css";
import Cabecalho from "./Cabecalho";
import Carrinho from "./Carrinho";
import ListaDeProdutos from "./ListaDeProdutos";
import Rodape from "./Rodape";

function App() {
  const [produtosComprados, setProdutosComprados] = useState([]);

  const comprarProduto = (produto) => {
    setProdutosComprados([...produtosComprados, { produto, adicionado: false }]);
  };

  return (
    <div className="App">
      <Cabecalho />
      <div className="conteudo">
        <ListaDeProdutos onComprarProduto={comprarProduto}></ListaDeProdutos>
        <Carrinho produtosComprados={produtosComprados}></Carrinho>
      </div>
      <Rodape />
    </div>
  );
}

export default App;
