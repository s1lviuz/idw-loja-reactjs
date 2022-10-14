import formatarPreco from "./funcoes";

export default function Produto({ produto }) {
  return (
    <li>
      <div className="titulo">{produto.nome}</div>
      <div className="comprar">
        <div className="preco">{formatarPreco(produto.preco)}</div>
        <button>Comprar</button>
      </div>
    </li>
  );
}
