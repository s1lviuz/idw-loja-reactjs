import { useState } from "react";
import "./App.css";
import Cabecalho from "./Cabecalho";
import Carrinho from "./Carrinho";
import ListaDeProdutos from "./ListaDeProdutos";
import Rodape from "./Rodape";

function App() {
  const produtos = [
    {
      "id": 1,
      "nome": "Produto Um",
      "preco": 15,
      "quantidadeNoCarrinho": 0
    },
    {
      "id": 2,
      "nome": "Produto Dois",
      "preco": 73,
      "quantidadeNoCarrinho": 0
    },
    {
      "id": 3,
      "nome": "Produto Três",
      "preco": 199.99,
      "quantidadeNoCarrinho": 0
    }
  ];

  const [produtosComprados, setProdutosComprados] = useState([]);

  const onComprar = (produto) => {
    // procura o produto no carrinho
    let item = produtosComprados.find(p => p.id === produto.id);

    if (!item) {
      // o produto não está no carrinho, então adiciona
      item = { ...produto, quantidadeNoCarrinho: 1 };
      // atualiza o state
      setProdutosComprados([...produtosComprados, item]);
    } else {
      // o produto está no carrinho, então cria uma nova 
      // lista de produtos para atualizar o carrinho
      const lista = produtosComprados.map((item) => {
        if (item.id === produto.id) {
          // se o item da lista atual é o produto que está sendo 
          // comprado, então incrementa a quantidade no carrinho
          item.quantidadeNoCarrinho++;
        }
        return item;
      })
      // atualiza o state
      setProdutosComprados(lista);
    }
  };

  const onRemover = (produto) => {
    // cria uma nova lista de produtos para atualizar o carrinho
    const lista = produtosComprados.map((item) => {
      if (item.id === produto.id) {
        // se o item da lista atual é o produto que está
        // sendo removido do carrinho, então
        // decrementa a quantidade no carrinho
        item.quantidadeNoCarrinho--;
      }
      return item;
    })
      // remove da lista o item com quantidade igual a 0
      .filter((item) => item.quantidadeNoCarrinho !== 0);

    // atualiza o state
    setProdutosComprados(lista);
  };

  return (
    <div className="App">
      <Cabecalho />
      <div className="conteudo">
        <div className="lista">
          <h1>Produtos</h1>
          <ListaDeProdutos
            produtos={produtos}
            onComprar={onComprar}>
          </ListaDeProdutos>
        </div>
        <Carrinho
          produtos={produtosComprados}
          onRemover={onRemover}>
        </Carrinho>
      </div>
      <Rodape />
    </div>
  );
}

export default App;
