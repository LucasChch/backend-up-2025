import { Request, Response, NextFunction } from 'express';
import * as ProductService from "../services/product";

export const getAllProducts = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const products = await ProductService.getAllProducts();
      res.status(200).json(products);
   } catch (error) {
      next(error);
   }
}