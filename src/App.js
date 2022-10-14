import { useState } from "react";
import "./App.css";
import Cabecalho from "./Cabecalho";
import Carrinho from "./Carrinho";
import ListaDeProdutos from "./ListaDeProdutos";
import Rodape from "./Rodape";

function App() {
  const produtos = [
    {
      "id": 1,
      "nome": "Produto Um",
      "preco": 15
    },
    {
      "id": 2,
      "nome": "Produto Dois",
      "preco": 73
    },
    {
      "id": 3,
      "nome": "Produto Três",
      "preco": 199.99
    }
  ];

  const [produtosComprados, setProdutosComprados] = useState([produtos[1]]);

  return (
    <div className="App">
      <Cabecalho />
      <div className="conteudo">
        <div className="lista">
          <h1>Produtos</h1>
          <ListaDeProdutos produtos={produtos}></ListaDeProdutos>
        </div>
        <Carrinho produtos={produtosComprados}></Carrinho>
      </div>
      <Rodape />
    </div>
  );
}

export default App;
