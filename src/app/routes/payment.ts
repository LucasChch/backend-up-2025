import Router from 'express';
import { getAllPayments, payPaymentWithCash } from '../controllers/payment';

const router = Router();

router.get('/', getAllPayments);
router.post('/payCash/:id', payPaymentWithCash);

export default router;