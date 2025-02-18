import React, { useState } from "react";

const FormularioNoticia = ({ onAdicionarNoticia }) => {
  const [titulo, setTitulo] = useState("");
  const [conteudo, setConteudo] = useState("");
  const [autor, setAutor] = useState("");
  const [categoria, setCategoria] = useState("");
  const [imagemUrl, setImagemUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const novaNoticia = {
      titulo,
      conteudo,
      autor,
      categoria,
      imagemUrl,
    };

    try {
      const response = await fetch("http://localhost:3002/news/publicarNoticia", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(novaNoticia),
      });

      if (!response.ok) throw new Error("Erro ao adicionar notícia");

      onAdicionarNoticia(novaNoticia);
      alert("Notícia adicionada com sucesso!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="formulario-noticia">
      <h2>Adicionar Nova Notícia</h2>
      <div>
        <label>Título:</label>
        <input
          type="text"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Conteúdo:</label>
        <textarea
          value={conteudo}
          onChange={(e) => setConteudo(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Autor:</label>
        <input
          type="text"
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Categoria:</label>
        <input
          type="text"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
          required
        />
      </div>
      <div>
        <label>URL da Imagem:</label>
        <input
          type="text"
          value={imagemUrl}
          onChange={(e) => setImagemUrl(e.target.value)}
          required
        />
      </div>
      <button type="submit">Adicionar Notícia</button>
    </form>
  );
};

export default FormularioNoticia;