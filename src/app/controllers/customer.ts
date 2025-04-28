import { Request, Response, NextFunction } from 'express';
import * as CustomerService from "../services/customer";
import { validateObjectId } from '../utils/validatorObjectId';

export const getAllCustomers = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const customers = await CustomerService.getAllCustomers();
      res.status(200).json(customers);
   } catch (error) {
      next(error);
   }
}

export const getCustomerById = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const id = req.params.id
      validateObjectId(id)
      const customer = await CustomerService.getCustomerById(id)
      if (!customer) {
         res.status(404).json({ message: "Cliente no encontrado" });
         return;
      }
      res.status(200).json(customer)
   } catch (error) {
      next(error);
   }
}

export const createCustomer = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const customer = await CustomerService.createCustomer(req.body);
      res.status(201).json(customer);
   } catch (error) {
      next(error);
   }
}
