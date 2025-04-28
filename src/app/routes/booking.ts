import Router from "express";
import { getAllBookings, createBooking, cancelBooking, refundBooking } from "../controllers/booking";

const router = Router();

router.get('/', getAllBookings)
router.post('/', createBooking);
router.patch('/cancel/:id', cancelBooking);
router.patch('/refund/:id', refundBooking);


export default router