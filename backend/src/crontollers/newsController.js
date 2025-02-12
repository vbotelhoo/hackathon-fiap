import { Router } from "express";
import { listaNoticias, createNoticia, procurarNoticias, procurarNoticiasPorParametros} from "../services/newsService.js";

const router = Router();

router.get('/', async (req, res) =>{
    try {
        // Chama a função listaNoticias para pegar todas as notícias do banco
        const noticias = await listaNoticias();
    
        // Verificando se foi passado um filtro pela categoria
        const categoriaFiltro = req.query.categoria;
    
        let noticiasFiltradas = noticias;
    
        // Se uma categoria for especificada, filtra as notícias pela categoria
        if (categoriaFiltro) {
          noticiasFiltradas = noticias.filter(n => n.categoria.toLowerCase() === categoriaFiltro.toLowerCase());
        }
    
        // Se houver notícias filtradas ou todas as notícias, retorna elas
        if (noticiasFiltradas.length > 0) {
          return res.status(200).json(noticiasFiltradas);
        } else {
          return res.status(404).json({ error: "Nenhuma notícia encontrada para a categoria especificada" });
        }
      } catch (error) {
        console.error('Erro ao processar a requisição:', error);
        return res.status(500).json({ error: "Erro interno do servidor" });
      }
})

router.post('/publicarNoticia', async (req, res) =>{
    try {
        const noticia = await createNoticia(req.body)
        res.status(201).send(noticia);
    } catch (error) {
        res.status(400).send(error)
    }
})

export default router;