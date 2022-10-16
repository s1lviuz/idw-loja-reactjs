export default function Alerta({ titulo, mensagem }) {
  return (
    <div style={{ padding: `${10}px` }}>
      {titulo && (
        <div>
          <strong>{titulo}</strong>
        </div>
      )}
      {mensagem && <div>{mensagem}</div>}
    </div>
  );
}
