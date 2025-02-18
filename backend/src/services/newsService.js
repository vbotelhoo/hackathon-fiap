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

export const atualizaNoticia = async (id, noticia) => {
    await databaseConnection();
    const atualizaNoticia = await newsModel.findByIdAndUpdate(id, noticia, { new: true});
    return atualizaNoticia
};

export const deletaNoticia = async (id) => {
    await databaseConnection();
    const deletaNoticia = await newsModel.findByIdAndDelete(id);
    return deletaNoticia
}