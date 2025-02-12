import mongoose from "mongoose";

const NewsSchema = new mongoose.Schema({
    titulo: { type: String, require: true },
    conteudo: {type: String, require: true},
    autor: {type: String, require: true},
    dataPublicacao: { type: Date, default: Date.now },
    categoria: {type: String, require: true},
    imagemUrl: {type: String, require: true}
});

export default mongoose.models.Noticia || mongoose.model('Noticia', NewsSchema);