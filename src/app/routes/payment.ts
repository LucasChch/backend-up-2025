import Router from 'express';
import { getAllPayments } from '../controllers/payment';

const router = Router();

router.get('/', getAllPayments);

export default router;