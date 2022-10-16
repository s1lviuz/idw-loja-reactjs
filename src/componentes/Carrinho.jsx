import formatarPreco from "../lib/funcoes";
import Alerta from './Alerta';

function ItemDoCarrinho({ produto, onRemover }) {
  return (
    <li>
      <div>{produto.nome}</div>
      <div>{produto.quantidadeNoCarrinho}</div>
      <div>{formatarPreco(produto.preco * produto.quantidadeNoCarrinho)}</div>
      <div><button onClick={() => onRemover(produto)}>X</button></div>
    </li>
  );
}

export default function Carrinho({ produtos, onRemover }) {
  const calcularTotal = () => {
    let total = 0.0;
    if (produtos) {
      produtos.forEach(
        (produto) => (total += produto.preco * produto.quantidadeNoCarrinho)
      );
    }
    return total;
  };

  return (
    <div className="carrinho">
      <h1>Seu carrinho</h1>
      <ul id="lista-carrinho">
        {produtos &&
          produtos.map((produto) => (
            <ItemDoCarrinho
              key={produto.id}
              produto={produto}
              onRemover={onRemover}
            ></ItemDoCarrinho>
          ))}
        {(!produtos || (produtos && produtos.length === 0)) && (
          <Alerta
            titulo={'Seu carrinho está vazio'}
            mensagem={'Que tal mudar essa situação? 😉'}
          ></Alerta>
        )}
      </ul>
      <div id="carrinho-total">
        <div>Total</div>
        <div>{formatarPreco(calcularTotal())}</div>
      </div>
    </div>
  );
}
