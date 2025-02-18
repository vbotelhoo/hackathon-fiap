import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import "./App.css";
import NoticiaDetalhada from "./NoticiaDetalhada";

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
        const categorizedData = result.map((item, index) => ({
          ...item,
          categoriaNoticia: ["Front-end", "Backend", "Cloud", "Inteligência Artificial"][index % 4],
          autor: `Autor ${index + 1}`,
          dataPublicacao: new Date(Date.now() - index * 86400000).toLocaleDateString(),
          timestamp: Date.now() - index * 86400000,
          imagem: `https://picsum.photos/600/400?random=${index + 1}`,
        }));
        setData(categorizedData);
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
      ? [...data].sort((a, b) => b.timestamp - a.timestamp)
      : data.filter((item) => item.categoriaNoticia === selectedCategory);

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
          </nav>
        </header>
        <Routes>
          <Route
            path="/"
            element={
              <main className="news-container">
                {filteredData.map((item) => (
                  <article key={item._id} className="news-card">
                    <img src={item.imagem} alt={item.titulo} className="news-image" />
                    <h2 className="news-title">{item.titulo}</h2>
                    <div className="news-meta">
                      <span className="news-author">{item.autor}</span> | <span className="news-date">{item.dataPublicacao}</span>
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
          <Route path="/noticia/:id" element={<NoticiaDetalhada noticias={data} setSelectedCategory={setSelectedCategory} />} />
        </Routes>
        <footer className="footer">
          <p>© 2025 FIAP Tech News. Todos os direitos reservados.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
