import formatarPreco from "./funcoes";

function ItemDoCarrinho({ item }) {
  return (
    <li>
      <div>{item.produto.nome}</div>
      <div>{item.quantidade} un.</div>
      <div>{formatarPreco(item.total)}</div>
      <button>X</button>
    </li>
  );
}

export default function Carrinho({ itens }) {
  return (
    <div className="carrinho">
      <h1>Seu carrinho</h1>
      <ul id="lista-carrinho">
        {itens.map((item) => (
          <ItemDoCarrinho key={item.produto.id} item={item}></ItemDoCarrinho>
        ))}
      </ul>
      <div id="carrinho-total">
        <div>Total</div>
        <div>{formatarPreco(0.0)}</div>
      </div>
    </div>
  );
}
