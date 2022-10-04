import Produto from "./Produto";

export default function ListaDeProdutos({ produtos, onComprarProduto }) {
  return (
    <ul id="lista-produtos">
      {produtos.map((produto) => (
        <Produto
          key={produto.id}
          produto={produto}
          onComprar={onComprarProduto}
        ></Produto>
      ))}
    </ul>
  );
}
