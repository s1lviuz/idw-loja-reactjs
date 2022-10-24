import { useContext } from "react";
import { Button } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { useLoaderData, useRouteError } from "react-router-dom";
import gfm from "remark-gfm";
import formatarPreco, { strapiDataToObject } from "../lib/funcoes";
import { LojaContext } from "../providers/AppContextProvider";

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
    <div>
      <div className="row me-2 mt-4">
        <div className="col-md-9">
          <div className="card p-3  border-0">
            <div className="row">
              <div className="col-md-3">
                <img
                  src={`http://localhost:1337${dados.foto?.formats?.thumbnail?.url}`}
                  className="img-fluid"
                  alt={dados.nome}
                ></img>
              </div>
              <div className="col-md-9">
                <h1 className="fs-3">{dados.nome}</h1>
                <div className="my-4">
                  <ReactMarkdown remarkPlugins={[gfm]}>
                    {dados.descricao}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0">
            <div className="card-body">
              <div className="fs-2 mb-3">{formatarPreco(dados.preco)}</div>
              <Button onClick={() => onComprar(dados)} className="w-100">
                Comprar
              </Button>
            </div>
          </div>
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
