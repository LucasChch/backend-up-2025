import * as CustomerRepository from '../repositories/customer'

export const createCustomer = async (customerData:any) => {
   return await CustomerRepository.createCustomer(customerData)
}