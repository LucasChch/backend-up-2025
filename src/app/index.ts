import express from 'express';
import cors from 'cors';
import routes from './routes/index';
import connectMongoDB from './config/mongodb.config';
import initDB from './config/initdb/initdb';
import { errorHandler } from './middlewares/errorHandler';

const app = express();

app.use(cors());
app.use(express.json());

//conexión a la base de datos
connectMongoDB();
// Inicializo la base
//initDB();

app.use(routes);

app.use(errorHandler);

app.listen(3000, () => {
   console.log('Server running on port 3000');
});
