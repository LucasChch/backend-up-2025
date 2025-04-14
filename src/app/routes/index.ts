import Router from 'express';
import bookingApi from './booking';

const router = Router();

//test de conexión
router.get('/ping', (req, res) => {
   res.send('pong');
});

router.use('/booking', bookingApi);

export default router;