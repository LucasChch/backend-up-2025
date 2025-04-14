import Router from 'express';
import { createCustomer } from '../controllers/customer';

const router = Router();

router.post('/', createCustomer);

export default router;


//CURLS
// curl -X POST \
//   http://localhost:3000/customer\
//   -H 'Content-Type: application/json' \
//   -d '{
//     "name": "Dalinar",
//     "email": "Dalinar@kholin.com",
//     "phone": "1234567890"
//   }'