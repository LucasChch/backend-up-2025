import Customer from '../models/customer';


export const createCustomer = async (customerData: any) => {
   const customer = new Customer(customerData);
   return await customer.save();
};