import databaseConnection from "../utils/database.js";
import newsModel from "../models/newsModel.js";


export const listaNoticias = async () => {
    await databaseConnection();
    const noticias = await newsModel.find()
    return noticias;
};

export const createNoticia = async (noticia) => {
    await databaseConnection();
    const createNoticia = await newsModel.create(noticia);
    return createNoticia;
};