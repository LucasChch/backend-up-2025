import express from 'express';
import cors from 'cors';
import routes from './routes/index';
import connectMongoDB from './config/mongodb.config';

const app = express();

app.use(cors());
app.use(express.json());

//conexión a la base de datos
connectMongoDB();

app.use(routes);



app.listen(3000, () => {
   console.log('Server running on port 3000');
});
