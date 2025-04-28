import Router from "express";
import { getAllBookings, createBooking, cancelBooking } from "../controllers/booking";

const router = Router();

router.get('/', getAllBookings)
router.post('/', createBooking);
router.patch('/:id/cancel', cancelBooking);


export default router