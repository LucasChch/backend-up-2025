import Router from 'express';
import { getAllProducts } from '../controllers/product';

const router = Router();

router.get('/', getAllProducts);

export default router;