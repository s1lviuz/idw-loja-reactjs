import Produto from "./Produto";

export default function ListaDeProdutos({ produtos }) {
  return (
    <ul id="lista-produtos">
      {produtos.map((produto) => (
        <Produto key={produto.id} produto={produto}></Produto>
      ))}
    </ul>
  );
}
