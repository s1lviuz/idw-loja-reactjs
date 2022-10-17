import { createContext, useEffect, useState } from "react";

// Define o context
export const LojaContext = createContext();

/**
 * O AppContextProvider é utilizado como state global do aplicativo.
 *
 * @param {{children}} Props
 * @returns
 */
const AppContextProvider = ({ children }) => {
  // obtém o valor do localStorage
  const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");

  // cria o state, inicializando-o com o que foi obtido do localStorage
  const [produtosDoCarrinho, setProdutosDoCarrinho] = useState(carrinho);

  const onComprar = (produto) => {
    // procura o produto no carrinho
    let item = produtosDoCarrinho.find((p) => p.id === produto.id);

    if (!item) {
      // o produto não está no carrinho, então adiciona
      item = { ...produto, quantidadeNoCarrinho: 1 };
      // atualiza o state
      setProdutosDoCarrinho([...produtosDoCarrinho, item]);
    } else {
      // o produto está no carrinho, então cria uma nova
      // lista de produtos para atualizar o carrinho
      const lista = produtosDoCarrinho.map((item) => {
        if (item.id === produto.id) {
          // se o item da lista atual é o produto que está sendo
          // comprado, então incrementa a quantidade no carrinho
          item.quantidadeNoCarrinho++;
        }
        return item;
      });
      // atualiza o state
      setProdutosDoCarrinho(lista);
    }
  };

  const onRemover = (produto) => {
    // cria uma nova lista de produtos para atualizar o carrinho
    const lista = produtosDoCarrinho
      .map((item) => {
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
    setProdutosDoCarrinho(lista);
  };

  // Utiliza o hook useEffect para executar um código
  // quando houver alteração no state produtosDoCarrinho.
  // Especificamente, o código atualiza o localStorage
  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(produtosDoCarrinho));
  }, [produtosDoCarrinho]);

  // Define o valor do LojaContext
  const values = {
    produtosDoCarrinho,
    setProdutosDoCarrinho,
    onComprar,
    onRemover,
  };

  return <LojaContext.Provider value={values}>{children}</LojaContext.Provider>;
};

export default AppContextProvider;
