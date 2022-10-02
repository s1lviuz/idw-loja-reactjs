/**
 * Formata o número como moeda em padrão BRL (Real Brasileiro).
 *
 * @param {number} valor
 * @returns
 */
function formatarPreco(valor) {
  return valor.toLocaleString(undefined, {
    style: "currency",
    currency: "BRL",
  });
}

export default formatarPreco;