import { useEffect, useState } from "react";
import Alerta from "./Alerta";
import "./App.css";
import Cabecalho from "./Cabecalho";
import Carrinho from "./Carrinho";
import ListaDeProdutos from "./ListaDeProdutos";
import Rodape from "./Rodape";

function App() {
  const [produtos, setProdutos] = useState(null);
  const [erroCarregarProdutos, setErroCarregarProdutos] = useState(null);
  const [produtosComprados, setProdutosComprados] = useState([]);

  useEffect(() => {
    return async () => {
      try {
        const request = await fetch("produtos.json");
        const produtos = await request.json();
        setProdutos(produtos);
      } catch (error) {
        setErroCarregarProdutos(error);
      }
    };
  }, []);

  const comprarProduto = (produto) => {
    setProdutosComprados([...produtosComprados, { produto, adicionado: false }]);
  };

  return (
    <div className="App">
      <Cabecalho />
      <div className="conteudo">
        <div className="lista">
          <h1>Produtos</h1>
          {produtos && (
            <ListaDeProdutos
              produtos={produtos}
              onComprarProduto={comprarProduto}>
            </ListaDeProdutos>
          )}
          {!produtos && !erroCarregarProdutos && (
            <Alerta mensagem={"Aguarde. Carregando..."} />
          )}
          {erroCarregarProdutos && (
            <Alerta
              titulo={"Não foi possível carregar os dados de produtos. Ocorreu um erro."}
              mensagem={erroCarregarProdutos.toString()} />
          )}
        </div>
        <Carrinho produtosComprados={produtosComprados}></Carrinho>
      </div>
      <Rodape />
    </div>
  );
}

export default App;
