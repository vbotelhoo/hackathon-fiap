import React from "react";
import { useParams } from "react-router-dom";
import "./NoticiaDetalhada.css";

const NoticiaDetalhada = ({ noticias }) => {
  const { id } = useParams();
  const noticia = noticias.find((item) => item._id === id);

  if (!noticia) {
    return <p className="error">Notícia não encontrada.</p>;
  }

  return (
    <div className="noticia-detalhada">
      <h1>{noticia.titulo}</h1>
      <img src={noticia.imagemUrl} alt={noticia.titulo} className="noticia-imagem" />
      <p className="noticia-meta">
        Por <strong>{noticia.autor}</strong> em {noticia.dataPublicacao}
      </p>
      <p>{noticia.conteudo}</p>
    </div>
  );
};

export default NoticiaDetalhada;