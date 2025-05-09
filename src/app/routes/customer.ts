import Router from 'express';
import { createCustomer, getAllCustomers, getCustomerById } from '../controllers/customer';

const router = Router();

router.get('/', getAllCustomers);
router.get('/:id', getCustomerById);
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

// curl -X GET http://localhost:3000/customer