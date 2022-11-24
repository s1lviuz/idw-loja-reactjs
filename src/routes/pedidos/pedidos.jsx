import * as dayjs from "dayjs";
import "dayjs/locale/pt-br";
import localizedFormat from "dayjs/plugin/localizedFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import formatarPreco from "../../lib/funcoes";
import auth from "../../lib/auth";
import { Link, redirect, useLoaderData } from "react-router-dom";
import { Pedidos } from "../../lib/Pedidos"

import Button from "react-bootstrap/Button";

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
        <div style={{ background: "white", border: "1px solid black", borderRadius: "20px", padding: "1.5%", marginTop: "15px" }}>
            <h3>Pedido #{id}</h3>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <div style={{ display: "flex", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
                    <div>Data: <i>{dayjs(data).format("L LT")}</i></div>
                    <div>Total: {formatarPreco(total)}</div>
                </div>
                <Button as={Link} to={`${id}`} variant="outline-secondary" className="me-3">Abrir</Button>
            </div>
        </div>
    )
}

const MeusPedidos = () => {
    const { pedidos } = useLoaderData();

    return (
        <>
            <h1>Meus Pedidos</h1>
            {pedidos && <div>
                {pedidos.map((pedido) => (
                    <Pedido
                        key={pedido.id}
                        id={pedido.id}
                        data={pedido.attributes.createdAt}
                        total={pedido.attributes.valorTotal}
                    />
                ))}
            </div>}
        </>
    )
}

export default MeusPedidos;