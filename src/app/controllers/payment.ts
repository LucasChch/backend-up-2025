import { Request, Response, NextFunction } from 'express';
import * as PaymentService from "../services/payment";

export const getAllPayments = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const payments = await PaymentService.getAllPayments();
      res.status(200).json(payments);
   } catch (error) {
      next(error);
   }
}