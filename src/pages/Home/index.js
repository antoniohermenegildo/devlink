import "./home.css";

import { Social } from "../../components/social";

import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

export default function Home() {
  return (
    <div className="home__container">
      <header className="home__cabecalho">
        <h1>Sujeito Programador</h1>
      </header>
      <main className="home__conteudo-principal">
        <span>Veja Meus Links 👇</span>
        <section className="home__links">
          <a className="home__link" href="#">
            <p className="home__link-texto">Canal no Youtube</p>
          </a>
          <a className="home__link" href="#">
            <p className="home__link-texto">Grupo Privado no Telegram</p>
          </a>
          <a className="home__link" href="#">
            <p className="home__link-texto">
              Treinamento Fábrica de Aplicativos
            </p>
          </a>
        </section>
      </main>
      <footer className="home__rodape">
        <Social url="https://facebook.com/">
          <FaFacebook size={35} color="#ffffff" />
        </Social>
        <Social url="https://youtube.com/">
          <FaYoutube size={35} color="#ffffff" />
        </Social>{" "}
        <Social url="https://instagram.com/">
          <FaInstagram size={35} color="#ffffff" />
        </Social>
      </footer>
    </div>
  );
}
