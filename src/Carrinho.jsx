import { useState, useEffect } from "react";
import formatarPreco from "./funcoes";

function ItemDoCarrinho({ item, onRemover }) {
  return (
    <li>
      <div>{item.produto.nome}</div>
      <div>{item.quantidade} un.</div>
      <div>{formatarPreco(item.total)}</div>
      <button onClick={() => onRemover(item)}>X</button>
    </li>
  );
}

export default function Carrinho({ produtosComprados }) {
  const [itens, setItens] = useState([]);
  const [total, setTotal] = useState(0.0);

  useEffect(() => {
    console.log('Carrinho -> useEffect...');
    produtosComprados.forEach((itemComprado) => {
      if (!itemComprado.adicionado) {
        const produto = itemComprado.produto;
        const contemProduto = itens.find(
          (item) => item.produto.id === produto.id
        );
        if (!contemProduto) {
          const novoItem = {
            produto,
            quantidade: 1,
            total: produto.preco,
          };
          setItens([...itens, novoItem]);
        } else {
          const novoItens = itens.map((item) => {
            if (item.produto.id === produto.id) {
              return {
                ...item,
                quantidade: item.quantidade + 1,
                total: (item.quantidade + 1) * produto.preco,
              };
            } else {
              return item;
            }
          });
          setItens(novoItens);
        }
        itemComprado.adicionado = true;
        setTotal((t) => t + produto.preco);
      }
    });
  }, [produtosComprados, itens]);

  const onRemoverItem = (item) => {
    let novoItens = itens.map((i) => {
      if (i.produto.id === item.produto.id) {
        if (i.quantidade > 0) {
          return {
            ...i,
            quantidade: i.quantidade - 1,
            total: (i.quantidade - 1) * item.produto.preco,
          };
        } else {
          return i;
        }
      } else {
        return i;
      }
    });
    novoItens = novoItens.filter((i) => i.quantidade > 0);
    setItens(novoItens);
    if (item.quantidade > 0) {
      setTotal((t) => t - item.produto.preco);
    }
  };

  console.log('Carrinho -> render...');

  return (
    <div className="carrinho">
      <h1>Seu carrinho</h1>
      <ul id="lista-carrinho">
        {itens.map((item) => (
          <ItemDoCarrinho
            key={item.produto.id}
            item={item}
            onRemover={onRemoverItem}
          ></ItemDoCarrinho>
        ))}
      </ul>
      <div id="carrinho-total">
        <div>Total</div>
        <div>{formatarPreco(total)}</div>
      </div>
    </div>
  );
}
