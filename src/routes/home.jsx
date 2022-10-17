import { useContext } from "react";
import { useLoaderData, useRouteError } from "react-router-dom";
import ListaDeProdutos from "../componentes/ListaDeProdutos";
import { strapiDataToObject } from "../lib/funcoes";
import { LojaContext } from "../providers/AppContextProvider";

export async function loader() {
  try {
    const response = await fetch(
      "http://localhost:1337/api/produtos/?populate=foto"
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

export default function Home() {
  const { dados } = useLoaderData();
  const { onComprar } = useContext(LojaContext);

  return (
    <div className="lista">
      <h1>Produtos</h1>
      <ListaDeProdutos produtos={dados} onComprar={onComprar}></ListaDeProdutos>
    </div>
  );
}

export function ServidorIndisponivel() {
  const error = useRouteError();
  return (
    <div>
      <h1>Oops!</h1>
      <p>
        Infelizmente temos um problema para obter os dados de produtos. Tente
        novamente dentro de instantes.
      </p>
      <p>
      <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}
