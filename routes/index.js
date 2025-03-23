import Router from 'express';

const router = Router();

//test de conexión
router.get('/ping', (req, res) => {
   res.send('pong');
});

export default router;