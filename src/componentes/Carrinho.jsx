import { useContext } from "react";
import formatarPreco from "../lib/funcoes";
import { LojaContext } from "../providers/AppContextProvider";
import Alerta from "./Alerta";

/**
 * O componente ItemDoCarrinho representa um item
 * da lista de produtos do Carrinho.
 *
 * @param {{produto, onRemover}} param0
 * @returns
 */
function ItemDoCarrinho({ produto, onRemover }) {
  return (
    <li>
      <div>{produto.nome}</div>
      <div>{produto.quantidadeNoCarrinho}</div>
      <div>{formatarPreco(produto.preco * produto.quantidadeNoCarrinho)}</div>
      <div>
        <button onClick={() => onRemover(produto)}>X</button>
      </div>
    </li>
  );
}

/**
 * O componente Carrinho representa a interface gráfica
 * que apresenta a lista de produtos do carrinho,
 * a quantidade unitária e o total.
 *
 * @returns
 */
export default function Carrinho() {
  // utiliza o hook useContext para obter os valores do LojaContext
  const { produtosDoCarrinho, onRemover } = useContext(LojaContext);

  /**
   * Esta função calcula o total do carrinho com base
   * nos preços dos produtos e suas quantidades no carrinho.
   *
   * @returns
   */
  const calcularTotal = () => {
    let total = 0.0;
    if (produtosDoCarrinho) {
      produtosDoCarrinho.forEach(
        (produto) => (total += produto.preco * produto.quantidadeNoCarrinho)
      );
    }
    return total;
  };

  return (
    <div className="carrinho">
      <h1>Seu carrinho</h1>
      <ul id="lista-carrinho">
        {produtosDoCarrinho &&
          produtosDoCarrinho.map((produto) => (
            <ItemDoCarrinho
              key={produto.id}
              produto={produto}
              onRemover={onRemover}
            ></ItemDoCarrinho>
          ))}
        {(!produtosDoCarrinho ||
          (produtosDoCarrinho && produtosDoCarrinho.length === 0)) && (
          <Alerta
            titulo={"Seu carrinho está vazio"}
            mensagem={"Que tal mudar essa situação? 😉"}
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
