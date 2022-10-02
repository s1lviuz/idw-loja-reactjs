import { useEffect, useState } from "react";
import Alerta from "./Alerta";
import "./App.css";
import Cabecalho from "./Cabecalho";
import Carrinho from "./Carrinho";
import ListaDeProdutos from "./ListaDeProdutos";
import Rodape from "./Rodape";

function App() {
  const [carrinho, setCarrinho] = useState([]);
  const [totalDoCarrinho, setTotalDoCarrinho] = useState(0.0);
  const [produtos, setProdutos] = useState(null);
  const [erroCarregarProdutos, setErroCarregarProdutos] = useState(null);

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
    const contemProduto = carrinho.find((p) => p.produto.id === produto.id);
    if (!contemProduto) {
      const novoItem = {
        produto,
        quantidade: 1,
        total: produto.preco,
      };
      setCarrinho([...carrinho, novoItem]);
    } else {
      const novoCarrinho = carrinho.map((item) => {
        if (item.produto.id === produto.id) {
          return {
            ...item,
            quantidade: item.quantidade + 1,
            total: (item.quantidade + 1) * produto.preco,
          };
        } else {
          return item;
        }
      });
      setCarrinho(novoCarrinho);
    }
    setTotalDoCarrinho((t) => t + produto.preco);
  };

  const removerItem = (item) => {
    let novoCarrinho = carrinho.map((i) => {
      if (i.produto.id === item.produto.id) {
        if (i.quantidade > 0) {
          return {
            ...i,
            quantidade: i.quantidade - 1,
            total: (i.quantidade - 1) * item.produto.preco,
          };
        } else {
          return i;
        }
      } else {
        return i;
      }
    });
    novoCarrinho = novoCarrinho.filter((i) => i.quantidade > 0);
    setCarrinho(novoCarrinho);
    if (item.quantidade > 0) {
      setTotalDoCarrinho((t) => t - item.produto.preco);
    }
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
              fnComprarProduto={comprarProduto}>
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
        <Carrinho
          itens={carrinho}
          fnRemoverItem={removerItem}
          total={totalDoCarrinho}>
        </Carrinho>
      </div>
      <Rodape />
    </div>
  );
}

export default App;
