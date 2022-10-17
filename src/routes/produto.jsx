import { useContext } from "react";
import { useLoaderData, useRouteError } from "react-router-dom";
import { strapiDataToObject } from "../lib/funcoes";
import { LojaContext } from "../providers/AppContextProvider";
import formatarPreco from "../lib/funcoes";
import './produto.css';

export async function loader({ params }) {
  try {
    const response = await fetch(
      `http://localhost:1337/api/produtos/${params.idProduto}/?populate=foto`
    );
    const json = await response.json();
    if (json.data) {
      const dados = strapiDataToObject(json.data);
      return { dados };
    }
    if (json.error) {
      throw json.error;
    }
  } catch (error) {
    throw error;
  }
}

export default function Produto() {
  const { dados } = useLoaderData();
  const { onComprar } = useContext(LojaContext);

  return (
    <div className="produto">
      <h1>{dados.nome}</h1>
      <div className="informacoes">
        <div className="foto">
          <img
            src={`http://localhost:1337${dados.foto?.formats?.thumbnail?.url}`}
            width={200}
            alt={dados.nome}
          ></img>
        </div>
        <div className="descricao">
          {dados.descricao}
        </div>
        <div className="compra">
          <div className="preco">{formatarPreco(dados.preco)}</div>
          <button onClick={() => onComprar(dados)}>Comprar</button>
        </div>
      </div>
    </div>
  );
}

export function ProdutoNaoEncontrado() {
  const error = useRouteError();
  return (
    <div>
      <h1>Oops!</h1>
      <p>Infelizmente o produto que você procura não existe.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
