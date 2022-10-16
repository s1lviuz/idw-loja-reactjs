import Produto from "./Produto";

export default function ListaDeProdutos({ produtos, onComprar }) {
  return (
    <ul id="lista-produtos">
      {produtos.map((produto) => (
        <Produto key={produto.id} produto={produto} onComprar={onComprar}></Produto>
      ))}
    </ul>
  );
}
