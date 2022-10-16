import { useState, useEffect } from "react";
import "./App.css";
import Cabecalho from "./componentes/Cabecalho";
import Carrinho from "./componentes/Carrinho";
import ListaDeProdutos from "./componentes/ListaDeProdutos";
import Rodape from "./componentes/Rodape";
import { strapiDataToObject } from "./lib/funcoes";
import Alerta from "./componentes/Alerta";

function App() {
  const [produtos, setProdutos] = useState(null);
  const [erro, setErro] = useState(null);
  const [produtosComprados, setProdutosComprados] = useState([]);

useEffect(() => {
  const fetchProdutos = async () => {
    const response = await fetch('http://localhost:1337/api/produtos/?populate=foto');
    const json = await response.json();
    if (json.data) {
      const dados = strapiDataToObject(json.data);
      setProdutos(dados);
    }
    if (json.error) {
      setErro(`Erro na comunicação com o servidor de dados (${json.error.name} - ${json.error.status} - ${json.error.message})`);
    }
  }
  fetchProdutos().catch((error) => setErro(error));
}, []);

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
          {produtos && !erro && (
            <ListaDeProdutos
              produtos={produtos}
              onComprar={onComprar}>
            </ListaDeProdutos>
          )}
          {!produtos && !erro && (
            <Alerta
              mensagem={'Por favor, aguarde. Carregando...'}>
            </Alerta>
          )}
          {erro && (
            <Alerta
              titulo={'Não foi possível obter os dados de produtos.'}
              mensagem={erro.toString()}>
            </Alerta>
          )}
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
