import { useState, useEffect } from "react";
import "./admin.css";
import { Header } from "../../components/Header";
import { Logo } from "../../components/Logo";
import { Input } from "../../components/Input";

import { MdAddLink } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";
import { db } from "../../services/firebaseConnection";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

export default function Admin() {
  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [backgroundColorInput, setBackgroundColorInput] = useState("#f1f1f1");
  const [textColorInput, setTextColorInput] = useState("#121212");

  const [links, setLinks] = useState([]);

  {
    /*função oara pegar a lista de likns que tem no banco pra mostrar na pagina*/
  }
  useEffect(() => {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));

    onSnapshot(queryRef, (snapshot) => {
      let lista = [];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          txtColor: doc.data().txtColor,
        });
      });
      setLinks(lista);
    });
  }, []);

  {
    /*Função de incluir o registro no banco*/
  }
  async function handleRegister(e) {
    e.preventDefault();

    if (nameInput === "" || urlInput === "") {
      toast.warn("preencha todos os campos!");
      return;
    }
    {
      /*cria a coleção links com o documento e os atributos*/
    }
    addDoc(collection(db, "links"), {
      name: nameInput,
      url: urlInput,
      bg: backgroundColorInput,
      txtColor: textColorInput,
      created: new Date(),
    })
      .then(() => {
        {
          /*se der certo ele executa o then*/
        }
        setNameInput("");
        setUrlInput("");
        console.log("Link registrado com sucesso!");
      })
      .catch((error) => {
        {
          /*se der algum erro ele executa o catch*/
        }
        console.log("ERRO AO TENTAR REGISTRAR" + error);
        toast.error("Ops erro ao tentar salvar o link!");
      });
  }

  async function handleDeleteLink(id) {
    const docRef = doc(db, "links", id);
    await deleteDoc(docRef);
  }

  return (
    <div className="container">
      <Header />
      <Logo />
      <form className="form" onSubmit={handleRegister}>
        <label className="label">Nome do link</label>
        <Input
          placeholder="Nome do link..."
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />
        <label className="label">URL do link</label>
        <Input
          type="url"
          placeholder="URL do link..."
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />
        <section className="container__colors">
          <div>
            <label className="label right">Fundo do link</label>
            <input
              type="color"
              value={backgroundColorInput}
              onChange={(e) => setBackgroundColorInput(e.target.value)}
            />
          </div>
          <div>
            <label className="label right">Cor do link</label>
            <input
              type="color"
              value={textColorInput}
              onChange={(e) => setTextColorInput(e.target.value)}
            />
          </div>
        </section>

        {nameInput !== "" && (
          <div className="preview">
            <label className="label">Veja como esta ficando seu Link 👇</label>
            <article
              className="list"
              style={{ marginTop: 8, backgroundColor: backgroundColorInput }}
            >
              <p style={{ color: textColorInput }}>{nameInput}</p>
            </article>
          </div>
        )}

        <button className="btn" type="submit">
          Cadastrar <MdAddLink size={24} />
        </button>
      </form>
      <h2 className="title">Meus links</h2>

      {links.map((item, index) => (
        <article
          key={index}
          className="list animate__pop"
          style={{ backgroundColor: item.bg, color: item.txtColor }}
        >
          <p>{item.name}</p>
          <div>
            <button
              className="btn__delete"
              onClick={() => handleDeleteLink(item.id)}
            >
              <FiTrash2 size={18} color="#ffffff" />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
}
