import mongoose from "mongoose";

const connectMongoDB = async () => {
   try {
     await mongoose.connect("mongodb://admin:admin@localhost:27017/retaldb?authSource=admin"); //TODO: Cambiarlo por una variable de entorno
     console.log('Conectado a la base de datos');
   } catch (error) {
     console.error('Error al conectar a la base de datos', error);
     process.exit(1);
   }
 };
 
 export default connectMongoDB;