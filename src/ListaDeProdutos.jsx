import { useEffect, useState } from "react";
import Produto from "./Produto";
import Alerta from "./Alerta";

export default function ListaDeProdutos({ onComprarProduto }) {
  const [produtos, setProdutos] = useState(null);
  const [erroCarregarProdutos, setErroCarregarProdutos] = useState(null);

  useEffect(() => {
    console.log("useEffect...");
    return async () => {
      console.log("anon async function inside useEffect...");
      try {
        const request = await fetch("produtos.json");
        const produtos = await request.json();
        setProdutos(produtos);
      } catch (error) {
        setErroCarregarProdutos(error);
      }
    };
  }, []);

  return (
    <div className="lista">
      <h1>Produtos</h1>
      {produtos && (
        <ul id="lista-produtos">
          {produtos.map((produto) => (
            <Produto
              key={produto.id}
              produto={produto}
              onComprar={onComprarProduto}
            ></Produto>
          ))}
        </ul>
      )}
      {!produtos && !erroCarregarProdutos && (
        <Alerta mensagem={"Aguarde. Carregando..."} />
      )}
      {erroCarregarProdutos && (
        <Alerta
          titulo={
            "Não foi possível carregar os dados de produtos. Ocorreu um erro."
          }
          mensagem={erroCarregarProdutos.toString()}
        />
      )}
    </div>
  );
}
