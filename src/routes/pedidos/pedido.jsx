import * as dayjs from "dayjs";
import "dayjs/locale/pt-br";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import formatarPreco from "../../lib/funcoes";
import auth from "../../lib/auth";
import { redirect, useLoaderData } from "react-router-dom";
import { Pedidos } from "../../lib/Pedidos"

import Table from 'react-bootstrap/Table';

dayjs.locale("pt-br");
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export async function loader({ params }) {
    const user = auth.getUserInfo();
    if (!user) {
        return redirect("/contas/entrar");
    }
    const { pedido, meta } = await Pedidos.findOne(params.idPedido);
    return { pedido, meta };
}

const DetalhesDoPedido = ({ data, total, produtos }) => {
    return (
        <div>
            <div style={{ display: "flex", justifyContent: "space-between", margin: "15px 0" }}>
                <div>Data: <i>{dayjs(data).format("L LT")}</i></div>
                <div>Total: {formatarPreco(total)}</div>
            </div>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Total</th>
                    </tr>
                </thead>
                {produtos && produtos.map((produto, idx) => {
                    const nome = produto.attributes.produto.data.attributes.nome
                    const quant = produto.attributes.quant
                    const total = produto.attributes.produto.data.attributes.preco * quant
                    return (
                        <tbody key={idx}>
                            <tr>
                                <td>{nome}</td>
                                <td>{quant}</td>
                                <td>{formatarPreco(total)}</td>
                            </tr>
                        </tbody>
                    )
                })}
            </Table>
        </div>
    )
}

const Pedido = () => {
    const { pedido } = useLoaderData();

    return (
        <>
            <h2>Detalhes do Pedido #{pedido.id}</h2>
            {pedido && <DetalhesDoPedido
                data={pedido.createdAt}
                total={pedido.valorTotal}
                produtos={pedido.itens}
            />}
        </>
    )
}

export default Pedido;