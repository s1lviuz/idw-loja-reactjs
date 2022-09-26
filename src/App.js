import logo from "./logo.svg";
import "./App.css";

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
              <li>
                <div className="titulo">{produto.nome}</div>
                <div className="comprar">
                  <div className="preco">{formatarPreco(produto.preco)}</div>
                  <button>Comprar</button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="carrinho">
          <h1>Seu carrinho</h1>
          <ul id="lista-carrinho"></ul>
          <div id="carrinho-total">
            <div>Total</div>
            <div>{formatarPreco(0)}</div>
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
