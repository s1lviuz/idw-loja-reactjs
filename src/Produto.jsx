import formatarPreco from "./funcoes";

export default function Produto({ produto, onComprar }) {
  return (
    <li>
      <div>
        <img
          src={`http://localhost:1337${produto.foto.formats.thumbnail.url}`}
          width={64}
          alt={produto.nome}
        ></img>
      </div>
      <div
        style={{
          flexGrow: 1,
          paddingLeft: 20,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div className="titulo">{produto.nome}</div>
        <div className="comprar">
          <div className="preco">{formatarPreco(produto.preco)}</div>
          <button onClick={() => onComprar(produto)}>Comprar</button>
        </div>
      </div>
    </li>
  );
}
