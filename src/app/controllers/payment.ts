import { Request, Response, NextFunction } from 'express';
import * as PaymentService from "../services/payment";
import { ValidationError } from '../models/errors';
import { CreatePaymentDto } from '../interfaces/payment';

export const getAllPayments = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const payments = await PaymentService.getAllPayments();
      res.status(200).json(payments);
   } catch (error) {
      next(error);
   }
}

export const payPaymentWithCash = async (req: Request, res: Response, next: NextFunction) => {
   try {
      // me manejo en base al id de la reserva
      const bookingId = req.params.id;

      const { amount, method, currency } = req.body;

      if (!bookingId || !amount || !method || !currency) {
         throw new ValidationError("Falta información requerida para pagar una reserva.");
      }

      if (method !== 'cash') {
         throw new ValidationError("El método de pago solo puede ser efectivo ('cash').");
      }

      const paymentData: CreatePaymentDto = {
         amount: amount, // el monto que paga el usuario
         currency: currency,
         method: method
      }

      const reponse = await PaymentService.payPaymentWithCash(bookingId, paymentData)
      res.status(200)
   } catch (error) {
      next(error)
   }
}