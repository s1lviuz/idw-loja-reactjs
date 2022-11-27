import { useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import formatarPreco from "../lib/funcoes";
import { Pedidos } from "../lib/Pedidos";
import { ItemDoPedido } from "../lib/ItemDoPedido";
import { useLojaContext } from "../providers/AppProvider";
import { useNavigate, Link } from "react-router-dom";
import auth from "../lib/auth";
import Alerta from "./Alerta";
import "./Carrinho.scss";
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
        <Button variant="warning" size="sm" onClick={() => onRemover(produto)}>
          X
        </Button>
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
  const { produtosDoCarrinho, setProdutosDoCarrinho, onRemover, setShowCarrinho } = useLojaContext();

  // estado que controla o spinner em finalizar o pedido
  const [carregando, setCarregando] = useState(false);

  // hook do React Router para redirecionar navegação
  const navigate = useNavigate()

  // carrega as informações do usuário da sessão
  const user = auth.getUserInfo();

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

  const finalizarPedido = async () => {
    setCarregando(!carregando)
    try {
      let itensIds = []
      produtosDoCarrinho.forEach(async (produto, idx) => {
        const response = await ItemDoPedido.create(produto.id, produto.quantidadeNoCarrinho)
        itensIds.push(response.data.id)
        if (idx + 1 === produtosDoCarrinho.length) {
          try {
            const _response = await Pedidos.create(itensIds, calcularTotal())
            if (_response.status === 200) {
              setProdutosDoCarrinho([])
              setShowCarrinho(false)
              navigate("/pedidos")
            }
          }
          catch (error) {
            throw error
          }
        }
      })
    } catch (error) {
      console.log(error)
    } finally {
      setCarregando(!carregando)
    }
  }

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
      {!carregando && produtosDoCarrinho.length > 0 && user && <Button className="button-carrinho" variant="success" onClick={finalizarPedido} >
        Finalizar Pedido
      </Button>}
      {carregando && <Button className="button-carrinho" variant="success" disabled>
        <Spinner
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      </Button>}
      {!user && <Card>
        <Alerta
          titulo="Entre para finalizar seu pedido"
          mensagem="Você pode fazer isso por aqui 😉"
        />
        <Button variant="success" as={Link} to={"contas/entrar"}>Entrar</Button>
      </Card>}
    </div>
  );
}
