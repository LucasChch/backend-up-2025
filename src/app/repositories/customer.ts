import Customer from '../models/customer';

export const getAllCustomers = async () => {
   return await Customer.find({});
};

export const getCustomerById = async (id: string) => {
   return await Customer.findById(id);
};

export const createCustomer = async (customerData: any) => {
   const customer = new Customer(customerData);
   return await customer.save();
};

export const getCustomerByEmail = async (email: string) => {
   return await Customer.findOne({ 'email': email });
};
