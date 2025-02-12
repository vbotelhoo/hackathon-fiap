# Fiap News Backend

Este é o backend do projeto Fiap News, uma API para gerenciar notícias.

## Funcionalidades

- Listar todas as notícias
- Filtrar notícias por categoria
- Publicar uma nova notícia

## Rotas da API

### Listar todas as notícias

**GET** `/news`

#### Parâmetros de Query

- `categoria` (opcional): Filtra as notícias pela categoria especificada.

#### Respostas

- `200 OK`: Retorna uma lista de notícias.
- `404 Not Found`: Nenhuma notícia encontrada para a categoria especificada.
- `500 Internal Server Error`: Erro interno do servidor.

### Publicar uma nova notícia

**POST** `/news/publicarNoticia`

#### Corpo da Requisição

```json
{
  "titulo": "Título da notícia",
  "conteudo": "Conteúdo da notícia",
  "autor": "Autor da notícia",
  "categoria": "Categoria da notícia",
  "imagemUrl": "URL da imagem da notícia"
}