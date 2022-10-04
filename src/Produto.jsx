import formatarPreco from "./funcoes";

export default function Produto({ produto, onComprar }) {
  return (
    <li>
      <div className="titulo">{produto.nome}</div>
      <div className="comprar">
        <div className="preco">{formatarPreco(produto.preco)}</div>
        <button onClick={() => onComprar(produto)}>Comprar</button>
      </div>
    </li>
  );
}
