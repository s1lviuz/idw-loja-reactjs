import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";

/**
 * Formata o número como moeda em padrão BRL (Real Brasileiro).
 *
 * @param {number} valor
 * @returns
 */
function formatarPreco(valor) {
  return valor.toLocaleString(undefined, {
    style: "currency",
    currency: "BRL",
  });
}

function App() {
  const [carrinho, setCarrinho] = useState([]);
  const [totalDoCarrinho, setTotalDoCarrinho] = useState(0.0);
  const produtos = [
    {
      id: 1,
      nome: "Produto Um",
      preco: 15,
    },
    {
      id: 2,
      nome: "Produto Dois",
      preco: 73,
    },
    {
      id: 3,
      nome: "Produto Três",
      preco: 199.99,
    },
  ];
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
      <header className="cabecalho">
        <div className="marca">Loja PMW</div>
      </header>
      <div className="conteudo">
        <div className="lista">
          <h1>Produtos</h1>
          <ul id="lista-produtos">
            {produtos.map((produto) => (
              <li key={produto.id}>
                <div className="titulo">{produto.nome}</div>
                <div className="comprar">
                  <div className="preco">{formatarPreco(produto.preco)}</div>
                  <button onClick={() => comprarProduto(produto)}>
                    Comprar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="carrinho">
          <h1>Seu carrinho</h1>
          <ul id="lista-carrinho">
            {carrinho.map((item) => (
              <li key={item.produto.id}>
                <div>{item.produto.nome}</div>
                <div>{item.quantidade} un.</div>
                <div>{formatarPreco(item.total)}</div>
                <button onClick={() => removerItem(item)}>X</button>
              </li>
            ))}
          </ul>
          <div id="carrinho-total">
            <div>Total</div>
            <div>{formatarPreco(totalDoCarrinho)}</div>
          </div>
        </div>
      </div>
      <footer className="rodape">
        <div>Loja PMW &copy; 2022 - Todos os direitos reservados.</div>
        <div>
          Desenvolvido com
          <img src={logo} className="App-logo" alt="logo" />
        </div>
      </footer>
    </div>
  );
}

export default App;
