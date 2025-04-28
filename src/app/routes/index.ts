import Router from 'express';
import bookingApi from './booking';
import customerApi from './customer';
import productApi from './product';
import paymentApi from './payment';

const router = Router();

//test de conexión
router.get('/ping', (req, res) => {
   res.send('pong');
});

router.use('/booking', bookingApi);
router.use('/customer', customerApi);
router.use('/product', productApi)
router.use('/payment', paymentApi);

export default router;