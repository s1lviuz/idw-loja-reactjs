import logo from "./logo.svg";

export default function Rodape() {
  return (
    <footer className="rodape">
      <div>Loja PMW &copy; 2022 - Todos os direitos reservados.</div>
      <div>
        Desenvolvido com
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    </footer>
  );
}
