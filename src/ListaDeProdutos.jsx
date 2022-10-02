import Produto from "./Produto";

export default function ListaDeProdutos({ produtos, fnComprarProduto }) {
  return (
    <ul id="lista-produtos">
      {produtos.map((produto) => (
        <Produto
          key={produto.id}
          produto={produto}
          onClick={() => fnComprarProduto(produto)}
        ></Produto>
      ))}
    </ul>
  );
}
