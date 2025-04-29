import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectMongoDB = async () => {
   try {
     const mongoUri = process.env.MONGO_URI;
     if (!mongoUri) {
       throw new Error("MONGO_URI is not defined in environment variables");
     }
     await mongoose.connect(mongoUri);
     console.log('Conectado a la base de datos');
   } catch (error) {
     console.error('Error al conectar a la base de datos', error);
     process.exit(1);
   }
 };
 
 export default connectMongoDB;