import * as qs from "qs";
import { BEARER } from "../constants";
import api from "../lib/axios";
import auth from "./auth";
import { strapiDataToObject } from "./funcoes";

/**
 * Define um Singleton com métodos para acessar o endpoint Pedidos do backend.
 */
export const Pedidos = {
  /**
 * Obtém a lista dos pedidos para o usuário da sessão.
 */
  async find() {
    const user = auth.getUserInfo();
    try {
      const response = await api.get('pedidos', {
        params: {
          user: {
            id: user.id,
          }
        },
        headers: {
          Authorization: `${BEARER} ${auth.getToken()}`
        }
      })
      if (response.data) {
        const pedidos = response.data.data;
        return { pedidos, meta: response.meta };
      }
      if (response.error) {
        throw response.error;
      }
    } catch (error) {
      throw error;
    }
  },
  /**
 * Obtém os dados do pedido identificado por `id`.
 * 
 * @param {Number} id O identificador do pedido
 * @returns 
 */
  async findOne(id) {
    const user = auth.getUserInfo();
    try {
      const response = await api.get('pedidos', {
        params: {
          populate: [
            'items',
            'items.produto',
            'items.produto.foto'
          ],
          user: {
            id: user.id,
          },
          id: id
        },
        headers: {
          Authorization: `${BEARER} ${auth.getToken()}`
        }
      })
      if (response.data) {
        const pedido = response.data.data[0];
        return { pedido, meta: response.meta };
      }
      if (response.error) {
        throw response.error;
      }
    } catch (error) {
      throw error;
    }
  }
  // /**
  //  * Obtém a lista dos favoritos para o usuário da sessão e para o produto
  //  * identificado por `pedidoId`.
  //  * 
  //  * @param {Number} pedidoId O identificador do produto
  //  * @returns A lista de favoritos
  //  */
  // async findByProduto(pedidoId) {
  //   return Favoritos.find(pedidoId);
  // },
  // /**
  //    * Exclui um pedido.
  //    * @param {Number} id O identificador do pedido
  //    */
  // async delete(id) {
  //   try {
  //     const response = await fetch(`${API}/pedidos/${id}`, {
  //       method: 'DELETE',
  //       headers: {
  //         Authorization: `${BEARER} ${auth.getToken()}`
  //       }
  //     });
  //     const json = await response.json();
  //     if (json.error) {
  //       throw json.error;
  //     }
  //   } catch (error) {
  //     throw error;
  //   }
  // },
  // /**
  //  * Cria um registro de pedido para o usuário da sessão e para os itens do pedido
  //  * identificado por `itensDoPedido`.
  //  * 
  //  * @param {Object} itensDoPedido O identificador do produto
  //  * @returns 
  //  */
  // async create(itensDoPedido) {
  //   const user = auth.getUserInfo();
  //   try {
  //     const response = await fetch(`${API}/pedidos`, {
  //       method: 'POST',
  //       headers: {
  //         Authorization: `${BEARER} ${auth.getToken()}`,
  //         "Content-type": "application/json",
  //       },
  //       body: JSON.stringify(
  //         {
  //           data: {
  //             user: user.id,
  //             itens_do_pedido: itensDoPedido,
  //           }
  //         }
  //       )
  //     });
  //     const json = await response.json();
  //     if (json.data) {
  //       const favorito = strapiDataToObject(json.data);
  //       return favorito;
  //     }
  //     if (json.error) {
  //       throw json.error;
  //     }
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}