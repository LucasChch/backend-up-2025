import Router from "express";
import { createBooking, cancelBooking } from "../controllers/booking";

const router = Router();

router.post('/', createBooking);
router.patch('/:id/cancel', cancelBooking);


export default router