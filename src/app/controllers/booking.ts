import { Request, Response, NextFunction } from 'express';
import * as BookingService from "../services/booking";
import { ValidationError } from '../models/errors';

export const createBooking = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { customerId, turns, items, startTime } = req.body;

      if (!customerId || !turns || !items || !startTime) {
         throw new ValidationError("Falta información requerida para dar de alta una reserva.");
      }

      if (turns < 1 || turns > 3) {
         throw new ValidationError("El número de turnos debe ser entre 1 y 3.");
      }
      const booking = await BookingService.createBooking(req.body);
      res.status(201).json(booking);
   }
   catch (error) {
      next(error);
   }
}
