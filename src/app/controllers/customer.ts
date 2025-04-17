import express, { Request, Response } from 'express';
import * as CustomerService from "../services/customer";

export const getAllCustomers = async (req: Request, res: Response) => {
   try {
      const customers = await CustomerService.getAllCustomers();
      res.status(200).json(customers);
   } catch (error) {
      console.log("Error in getAllCustomers:", error);
      res.status(500).json({ message: error });
   }
}

export const createCustomer = async (req: Request, res: Response) => {
   try {
      const customer = await CustomerService.createCustomer(req.body);
      res.status(201).json(customer);
   } catch (error) {
      console.log("Error in createCustomer:", error);
      res.status(500).json({ message: error });
   }
}
