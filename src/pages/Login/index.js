import "./login.css";

import { Logo } from "../../components/Logo";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    alert(email + " a senha desse email é " + password);
  }

  return (
    <div className="login__container">
      <header className="login__cabecalho">
        <Logo />
      </header>
      <main className="login__conteudo-principal">
        <form className="login__form" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Digite seu email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="********"
            autoComplete="on"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Acessar</button>
        </form>
      </main>
    </div>
  );
}
