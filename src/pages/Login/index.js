import "./login.css";
import "../../css/button.css";
import "../../css/form.css";
import "../../css/container.css";

import { Logo } from "../../components/Logo";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebaseConnection";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Input } from "../../components/Input";

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
        <form className="form" onSubmit={handleLogin}>
          <Input
            type="email"
            placeholder="Digite seu email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            type="password"
            placeholder="********"
            autoComplete="on"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="btn" type="submit">
            Acessar
          </button>
        </form>
      </main>
    </div>
  );
}
