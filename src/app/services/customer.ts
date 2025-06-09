import customer from '../models/customer'
import { ValidationError } from '../models/errors'
import * as CustomerRepository from '../repositories/customer'

export const getAllCustomers = async () => {
   return await CustomerRepository.getAllCustomers()
}

export const getCustomerById = async (customerId:string) => {
   return await CustomerRepository.getCustomerById(customerId)
}

export const createCustomer = async (customerData:any) => {

   if (customerData.email){
      // contiene @
      if (!customerData.email.includes('@')) {
         throw new ValidationError('El correo electrónico no es válido');
      }
      const existingCustomer = await CustomerRepository.getCustomerByEmail(customerData.email);
      if (existingCustomer) {
         throw new ValidationError('El correo electrónico ya está en uso');
      }
   }

   if(customerData.phone){
      // validación regex para el teléfono
      // permite números, +, -, espacios y paréntesis
      const phoneRegex = /^[0-9+\-\s\(\)]+$/;
      if (!phoneRegex.test(customerData.phone)) {
         throw new ValidationError('El número de teléfono no es válido');
      }
   }
   return await CustomerRepository.createCustomer(customerData)
}