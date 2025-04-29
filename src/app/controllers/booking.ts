import { Request, Response, NextFunction } from 'express';
import * as BookingService from "../services/booking";
import { ValidationError } from '../models/errors';
import { CreateBookingDto } from '../interfaces/booking';
import { CreatePaymentDto } from '../interfaces/payment';

export const getAllBookings = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const bookings = await BookingService.getAllBookings();
      res.status(200).json(bookings);
   } catch (error) {
      next(error);
   }
}

export const createBooking = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const { customerId, totalTurns, items, startTime } = req.body;

      if (!customerId || !totalTurns || !items || !startTime) {
         throw new ValidationError("Falta información requerida para dar de alta una reserva.");
      }

      if (totalTurns < 1 || totalTurns > 3) {
         throw new ValidationError("El número de turnos debe ser entre 1 y 3.");
      }

      const bookingData: CreateBookingDto = {
         customerId,
         items,
         startTime: new Date(startTime),
         endTime: new Date(new Date(startTime).getTime() + totalTurns * 30 * 60 * 1000), // 30 minutos por turno
         totalTurns,
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

export const cancelBooking = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const bookingId  = req.params.id;
      if (!bookingId) {
         throw new ValidationError("Falta información requerida para cancelar una reserva.");
      }
      const booking = await BookingService.cancelBooking(bookingId);
      res.status(200).json(booking);
   } catch (error) {
      next(error);
   }
}

export const refundBooking = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const bookingId  = req.params.id;
      if (!bookingId) {
         throw new ValidationError("Falta información requerida para cancelar una reserva.");
      }
      const booking = await BookingService.refundBooking(bookingId);
      res.status(200).json(booking);
   } catch (error) {
      next(error);
   }
}