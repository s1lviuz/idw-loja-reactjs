export default function Alerta({ titulo, mensagem }) {
  return (
    <div>
      {titulo && <div>{titulo}</div>}
      {mensagem && <div>{mensagem}</div>}
    </div>
  );
}
