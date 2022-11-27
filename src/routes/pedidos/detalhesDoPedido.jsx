import * as dayjs from "dayjs";
import "dayjs/locale/pt-br";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import formatarPreco from "../../lib/funcoes";
import auth from "../../lib/auth";
import { Link, redirect, useLoaderData, useRouteError } from "react-router-dom";
import { Pedidos } from "../../lib/Pedidos"
import Table from 'react-bootstrap/Table';
import * as Component from '../../lib/styledComponents/Pedidos';

dayjs.locale("pt-br");
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export async function loader({ params }) {
    const user = auth.getUserInfo();
    if (!user) {
        return redirect("/contas/entrar");
    }
    const { pedido, meta } = await Pedidos.findOne(params.idPedido);
    if (pedido.userId !== user.id) {
        throw new Response("Not Found", { status: 404 });
    } else {
        return { pedido, meta };
    }
}

const DetalhesDoPedido = ({ data, total, produtos }) => {
    return (
        <>
            <Table responsive striped bordered hover>
                <thead>
                    <tr>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Total</th>
                    </tr>
                </thead>
                {produtos && <tbody>
                    {produtos.map((produto, idx) => {
                        const id = produto.attributes.produto.data.id
                        const nome = produto.attributes.produto.data.attributes.nome
                        const quant = produto.attributes.quant
                        const total = produto.attributes.produto.data.attributes.preco * quant
                        return (
                            <tr key={idx}>
                                <td><Link to={`../produtos/${id}`} className="text-decoration-none text-body">{nome}</Link></td>
                                <td>{quant}</td>
                                <td>{formatarPreco(total)}</td>
                            </tr>
                        )
                    })}
                </tbody>}
            </Table>
            <Component.InfoPedido>
                <Component.Text>Data: <i>{dayjs(data).format("L LT")}</i></Component.Text>
                <Component.Text>Total do pedido: {formatarPreco(total)}</Component.Text>
            </Component.InfoPedido>
        </>
    )
}

const Pedido = () => {
    const { pedido } = useLoaderData();

    return (
        <>
            {pedido && <Component.Container>
                <Component.Title>Detalhes do Pedido #{pedido.id}</Component.Title>
                <DetalhesDoPedido
                    data={pedido.createdAt}
                    total={pedido.valorTotal}
                    produtos={pedido.itens}
                />
            </Component.Container>}
        </>
    )
}

export const PedidoNaoEncontrado = () => {
    const error = useRouteError();
    return (
      <div>
        <h1>Oops!</h1>
        <p>Infelizmente o pedido que você procura não existe.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </div>
    );
  }

export default Pedido;