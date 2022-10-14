import formatarPreco from "./funcoes";

function ItemDoCarrinho({ produto }) {
  return (
    <li>
      <div>{produto.nome}</div>
      <div>{formatarPreco(produto.preco)}</div>
      <button>X</button>
    </li>
  );
}

export default function Carrinho({ produtos }) {
  const calcularTotal = () => {
    let total = 0.0;
    if (produtos) {
      produtos.forEach((produto) => (total += produto.preco));
    }
    return total;
  };
  return (
    <div className="carrinho">
      <h1>Seu carrinho</h1>
      <ul id="lista-carrinho">
        {produtos &&
          produtos.map((produto) => (
            <ItemDoCarrinho key={produto.id} produto={produto}></ItemDoCarrinho>
          ))}
      </ul>
      <div id="carrinho-total">
        <div>Total</div>
        <div>{formatarPreco(calcularTotal())}</div>
      </div>
    </div>
  );
}
