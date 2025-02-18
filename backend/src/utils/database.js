import mongoose from "mongoose";
import 'dotenv/config';

const URI = process.env.DB_DATABASE;

const databaseConnection = async () => {
    if(!global.mongoose){
        mongoose.set('strictQuery', false)
        global.mongoose = await mongoose.connect(URI)
    }
}

export default databaseConnection