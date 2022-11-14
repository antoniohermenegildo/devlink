import { useState, useEffect } from "react";
import "./home.css";

import { Social } from "../../components/Social";
import { FaFacebook, FaInstagram, FaYoutube } from "react-icons/fa";

import {
  getDocs,
  collection,
  orderBy,
  query,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

export default function Home() {
  const [links, setLinks] = useState([]);
  const [socialLinks, setSocialLinks] = useState({});

  useEffect(() => {
    function loadLinks() {
      const linksRef = collection(db, "links");
      const queryRef = query(linksRef, orderBy("created", "asc"));

      getDocs(queryRef).then((snapshot) => {
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
    }
    loadLinks();
  }, []);

  useEffect(() => {
    function loadSocialLinks() {
      const docRef = doc(db, "social", "link");
      getDoc(docRef).then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setSocialLinks({
            facebook: snapshot.data().facebook,
            instagram: snapshot.data().instagram,
            youtube: snapshot.data().youtube,
          });
        }
      });
    }
    loadSocialLinks();
  }, []);

  return (
    <div className="home__container">
      <h1 className="title">Sujeito Programador</h1>
      <span>Veja Meus Links 👇</span>
      <main className="links">
        {links.map((item) => (
          <section
            key={item.id}
            className="link__area"
            style={{ backgroundColor: item.bg }}
          >
            <a href={item.url} target="blank">
              <p className="link__text" style={{ color: item.txtColor }}>
                {item.name}
              </p>
            </a>
          </section>
        ))}
      </main>

      {links.length !== 0 && Object.keys(socialLinks).length > 0 && (
        <footer className="home__rodape">
          <Social url={socialLinks?.facebook}>
            <FaFacebook size={35} color="#ffffff" />
          </Social>
          <Social url={socialLinks?.youtube}>
            <FaYoutube size={35} color="#ffffff" />
          </Social>{" "}
          <Social url={socialLinks?.instagram}>
            <FaInstagram size={35} color="#ffffff" />
          </Social>
        </footer>
      )}
    </div>
  );
}
