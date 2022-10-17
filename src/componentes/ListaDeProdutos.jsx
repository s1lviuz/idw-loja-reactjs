import { Link } from "react-router-dom";
import formatarPreco from "../lib/funcoes";

/**
 * O componente Produto apresenta as informações do produto
 * na lista de produtos.
 *
 * @param {{produto, onComprar}} props
 * @returns
 */
function Produto({ produto, onComprar }) {
  return (
    <li>
      <div>
        <img
          src={`http://localhost:1337${produto.foto?.formats?.thumbnail?.url}`}
          width={64}
          alt={produto.nome}
        ></img>
      </div>
      <div
        style={{
          flexGrow: 1,
          paddingLeft: 20,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div className="titulo">
          <Link to={`produtos/${produto.id}`}>{produto.nome}</Link>
        </div>
        <div className="comprar">
          <div className="preco">{formatarPreco(produto.preco)}</div>
          <button onClick={() => onComprar(produto)}>Comprar</button>
        </div>
      </div>
    </li>
  );
}

/**
 * O componente ListaDeProdutos apresenta a lista dos produtos.
 *
 * @param {{produtos, onComprar}} Props
 * @returns
 */
export default function ListaDeProdutos({ produtos, onComprar }) {
  return (
    <ul id="lista-produtos">
      {produtos.map((produto) => (
        <Produto
          key={produto.id}
          produto={produto}
          onComprar={onComprar}
        ></Produto>
      ))}
    </ul>
  );
}
