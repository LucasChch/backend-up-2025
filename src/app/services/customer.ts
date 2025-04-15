import * as CustomerRepository from '../repositories/customer'

export const getAllCustomers = async () => {
   return await CustomerRepository.getAllCustomers()
}


export const createCustomer = async (customerData:any) => {
   return await CustomerRepository.createCustomer(customerData)
}