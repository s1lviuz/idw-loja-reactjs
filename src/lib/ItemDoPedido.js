import { BEARER } from "../constants";
import api from "../lib/axios";
import auth from "./auth";

/**
 * Define um Singleton com métodos para acessar o endpoint ItemDoPedido do backend.
 */
export const ItemDoPedido = {
    /**
 * Cria o ItemDoPedido no backend.
 * 
 * @param {Number} produtoId O identificador do produto
 * @param {Number} quant A quantidade do produto
 * @returns 
 */
    async create(produtoId, quant) {
        try {
            const response = await api.post('itens', {
                data: {
                    produto: produtoId,
                    quant: quant
                }
            }, {
                headers: {
                    'Authorization': `${BEARER} ${auth.getToken()}`
                }
            })
            if (response.data) {
                const item = response.data;
                return item;
            }
            if (response.error) {
                throw response.error;
            }
        }
        catch (error) {
            throw error
        }
    }
}