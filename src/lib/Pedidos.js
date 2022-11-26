import * as qs from "qs";
import { BEARER } from "../constants";
import api from "../lib/axios";
import auth from "./auth";

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
          },
          sort: {
            id: 'desc'
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
    try {
      const query = qs.stringify({
        populate: [
          'items',
          'items.produto'
        ]
      })
      const response = await api.get(`pedidos/${id}/?${query}`, {
        headers: {
          Authorization: `${BEARER} ${auth.getToken()}`
        }
      })
      if (response.data) {
        const pedido = {
          id: response.data.data.id,
          itens: response.data.data.attributes.items.data,
          createdAt: response.data.data.attributes.createdAt,
          valorTotal: response.data.data.attributes.valorTotal
        }
        return { pedido, meta: response.meta };
      }
      if (response.error) {
        throw response.error;
      }
    } catch (error) {
      throw error;
    }
  },
  /**
   * Cria um registro de pedido para o usuário da sessão e para os itens do pedido
   * identificado por `itensDoPedido`.
   * 
   * @param {Array<Number>} itensDoPedido Os identificadores e quantidade dos itens do pedido
   * @param {Number} valorTotal O valor total do pedido
   * @returns 
   */
  async create(itensDoPedido, valorTotal) {
    const user = auth.getUserInfo();
    try {
      const response = await api.post('pedidos', {
        data: {
          user: user.id,
          items: itensDoPedido,
          valorTotal: valorTotal
        }
      }, {
        headers: {
          'Authorization': `${BEARER} ${auth.getToken()}`
        }
      });
      if (response.data) {
        const pedido = response;
        return pedido;
      }
      if (response.error) {
        throw response.error;
      }
    } catch (error) {
      throw error;
    }
  }
}