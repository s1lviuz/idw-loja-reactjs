import * as dayjs from "dayjs";
import "dayjs/locale/pt-br";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import formatarPreco from "../../lib/funcoes";
import auth from "../../lib/auth";
import { Link, redirect, useLoaderData } from "react-router-dom";
import { Pedidos } from "../../lib/Pedidos"
import { Button } from "react-bootstrap";
import { Card } from "react-bootstrap";
import Alerta from "../../componentes/Alerta";
import * as Component from '../../lib/styledComponents/Pedidos';

dayjs.locale("pt-br");
dayjs.extend(relativeTime);
dayjs.extend(localizedFormat);

export async function loader() {
    const user = auth.getUserInfo();
    if (!user) {
        return redirect("/contas/entrar");
    }
    const { pedidos, meta } = await Pedidos.find();
    return { pedidos, meta };
}

const Pedido = ({ id, data, total }) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>Pedido #{id}</Card.Title>
                <Component.InfoPedido>
                    <Card.Text>Data: <i>{dayjs(data).format("L LT")}</i></Card.Text>
                    <Card.Text>Total: {formatarPreco(total)}</Card.Text>
                </Component.InfoPedido>
                <Component.LinkPedido>
                    <Button as={Link} to={id.toString()} variant="outline-secondary" >Abrir</Button>
                </Component.LinkPedido>
            </Card.Body>
        </Card>
    )
}

const MeusPedidos = () => {
    const { pedidos } = useLoaderData();

    return (
        <>
            {pedidos && <Component.Container>
                <Component.Title>Meus Pedidos</Component.Title>
                {pedidos.map((pedido) => (
                    <Pedido
                        key={pedido.id}
                        id={pedido.id}
                        data={pedido.attributes.createdAt}
                        total={pedido.attributes.valorTotal}
                    />
                ))}
            </Component.Container>}
            {(!pedidos || pedidos.length === 0) && <Card>
                <Card.Body>
                    <Alerta
                        titulo={"Você ainda não fez nenhum pedido"}
                        mensagem={"Que tal mudar essa situação? 😉"}
                    />
                </Card.Body>
            </Card>}
        </>
    )
}

export default MeusPedidos;