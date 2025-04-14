import * as CustomerService from "../services/customer";

export const createCustomer = async (req:any, res:any) => {
   try {
      const customer = await CustomerService.createCustomer(req.body);
      res.status(201).json(customer);
   } catch (error) {
      console.log("Error in createCustomer:", error);
      res.status(500).json({ message: error });
   }
}
