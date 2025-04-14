import Router from 'express';
//import bookingApi from '../booking';
import customerApi from './customer';

const router = Router();

//test de conexión
router.get('/ping', (req, res) => {
   res.send('pong');
});

//router.use('/booking', bookingApi);
router.use('/customer', customerApi);

export default router;