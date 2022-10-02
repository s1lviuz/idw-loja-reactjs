import formatarPreco from "./funcoes";

export default function Produto({ produto, onClick }) {
  return (
    <li>
      <div className="titulo">{produto.nome}</div>
      <div className="comprar">
        <div className="preco">{formatarPreco(produto.preco)}</div>
        <button onClick={onClick}>Comprar</button>
      </div>
    </li>
  );
}
