import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import NoticiaDetalhada from "./NoticiaDetalhada";
import FormularioNoticia from "./FormularioNoticia";

const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Todas");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3002/news/");
        if (!response.ok) throw new Error("Erro ao buscar dados");

        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const categories = ["Todas", "Ultimas Novidades", "Front-end", "Backend", "Cloud", "Inteligência Artificial"];

  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  const filteredData =
    selectedCategory === "Todas"
      ? shuffleArray([...data])
      : selectedCategory === "Ultimas Novidades"
      ? [...data].sort((a, b) => new Date(b.dataPublicacao) - new Date(a.dataPublicacao))
      : data.filter((item) => item.categoria === selectedCategory);

  const handleAdicionarNoticia = (novaNoticia) => {
    setData([...data, novaNoticia]);
  };

  if (loading) return <p className="loading">Carregando...</p>;
  if (error) return <p className="error">Erro: {error}</p>;

  return (
    <Router>
      <div className="news-site">
        <header className="header">
          <h1>FIAP Tech News</h1>
          <nav className="category-menu" style={{ flexWrap: "wrap" }}>
            {categories.map((category) => (
              <Link
                key={category}
                to="/"
                className={`category-button ${selectedCategory === category ? "active" : ""}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Link>
            ))}
            <Link to="/adicionar-noticia" className="category-button">
              Adicionar Notícia
            </Link>
          </nav>
        </header>
        <Routes>
          <Route
            path="/"
            element={
              <main className="news-container">
                {filteredData.map((item) => (
                  <article key={item._id} className="news-card">
                    <img src={item.imagemUrl} alt={item.titulo} className="news-image" />
                    <h2 className="news-title">{item.titulo}</h2>
                    <div className="news-meta">
                      <span className="news-author">{item.autor}</span> | <span className="news-date">{new Date(item.dataPublicacao).toLocaleDateString()}</span>
                    </div>
                    <p className="news-body">{item.conteudo.slice(0, 100)}...</p>
                    <Link to={`/noticia/${item._id}`} className="read-more">
                      Leia mais
                    </Link>
                  </article>
                ))}
              </main>
            }
          />
          <Route path="/noticia/:id" element={<NoticiaDetalhada noticias={data} />} />
          <Route path="/adicionar-noticia" element={<FormularioNoticia onAdicionarNoticia={handleAdicionarNoticia} />} />
        </Routes>
        <footer className="footer">
          <p>© 2025 FIAP Tech News. Todos os direitos reservados.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;