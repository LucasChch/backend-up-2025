import {Request, Response} from 'express';
import * as BookingService from "../services/booking";

export const createBooking = async (req: Request, res: Response) => {
   try {
      const bookingData = req.body;//TODO: validar el body
      const booking = await BookingService.createBooking(bookingData);
      res.status(201).json(booking);
   }
   catch (error) {
      console.log("Error in createBooking:", error);
      res.status(500).json({ message: error });
   }
}
