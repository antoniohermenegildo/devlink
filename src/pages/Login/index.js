import "./login.css";

import { Logo } from "../../components/Logo";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  {
    /* Pegando as informações digitadas nos inputs */
  }
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  {
    /* Função de Autenticação */
  }
  function handleLogin(e) {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("Preencha todos os campos!");
      return;
    }
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("Bem vindo de volta :) ");
        navigate("/admin", { replace: true });
      })
      .catch(() => {
        toast.error("Erro ao tentar fazer o login!");
      });
  }
  {
    /* Formulário de login */
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
