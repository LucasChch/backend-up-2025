import Customer from '../models/customer';

export const getAllCustomers = async () => {
   return await Customer.find({});
};

export const createCustomer = async (customerData: any) => {
   const customer = new Customer(customerData);
   return await customer.save();
};