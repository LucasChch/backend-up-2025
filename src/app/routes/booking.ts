import Router from "express";
import { getAllBookings, createBooking, cancelBooking } from "../controllers/booking";

const router = Router();

router.get('/', getAllBookings)
router.post('/', createBooking);
router.patch('/cancel/:id', cancelBooking);


export default router