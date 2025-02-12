import mongoose from "mongoose";

const URI = 'mongodb+srv://USER:PASSWORD@fiapnews.i6xuq.mongodb.net/?retryWrites=true&w=majority&appName=FiapNews'

const databaseConnection = async () => {
    if(!global.mongoose){
        mongoose.set('strictQuery', false)
        global.mongoose = await mongoose.connect(URI)
    }
}

export default databaseConnection