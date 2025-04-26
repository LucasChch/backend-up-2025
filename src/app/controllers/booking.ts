import { Request, Response, NextFunction } from 'express';
import * as BookingService from "../services/booking";
import { ValidationError } from '../models/errors';
import { CreateBookingDto } from '../interfaces/booking';
import { CreatePaymentDto } from '../interfaces/payment';

export const createBooking = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { customerId, turns, items, startTime } = req.body;

      if (!customerId || !turns || !items || !startTime) {
         throw new ValidationError("Falta información requerida para dar de alta una reserva.");
      }

      if (turns < 1 || turns > 3) {
         throw new ValidationError("El número de turnos debe ser entre 1 y 3.");
      }

      // Aca podría agregar un paymentData, donde tomo el método de pago y el tipo de moneda
      const bookingData: CreateBookingDto = {
         customerId,
         items,
         startTime: new Date(startTime),
         endTime: new Date(new Date(startTime).getTime() + turns * 30 * 60 * 1000), // 30 minutos por turno
         turns,
         status: 'booked',
      }

      const paymentData: CreatePaymentDto = {
         amount: req.body.amount, // el monto que paga el usuario
         currency: req.body.currency,
         method: req.body.method
      }
      const booking = await BookingService.createBooking(bookingData, paymentData);
      res.status(201).json(booking);
   }
   catch (error) {
      next(error);
   }
}


//TODO:
export const cancelBooking = async (req: Request, res: Response, next: NextFunction) => {
   try {
      res.status(400).json('Falta Implementacion')
   } catch (error) {
      next(error);
   }
}